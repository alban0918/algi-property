import { expect, test } from "@playwright/test";
import { propiedades } from "../../src/data/propiedades";
import { crearEnlaceFicha, VIGENCIA_ENLACE_MS } from "../../src/lib/servidor/token";
import { secretoPruebas } from "../../playwright.config";

/**
 * Registro de interesados y descarga protegida de las fichas técnicas.
 * El servidor de pruebas corre con LEADS_MODO=prueba: valida y firma, pero no usa base de datos ni correo.
 * Contra el sitio publicado (E2E_BASE_URL) no se ejecutan, para no registrar interesados falsos.
 */
test.skip(!!process.env.E2E_BASE_URL, "Registra interesados: solo contra el servidor local de pruebas.");

const valido = {
  nombre: "Laura Gómez",
  pais: "CO",
  telefono: "300 123 4567",
  correo: "laura@example.com",
  autorizacion: true,
  t: 5000,
  sitio: "",
};

test.describe("fichas técnicas en PDF", () => {
  for (const idioma of ["es", "en"] as const) {
    test(`toda propiedad entrega su ficha de dos páginas tras el formulario (${idioma})`, async ({ request }) => {
      for (const p of propiedades) {
        const r = await request.post("/api/interesados", { data: { ...valido, slug: p.slug, idioma } });
        expect(r.status(), p.slug).toBe(200);
        const { enlace } = await r.json();
        expect(enlace, p.slug).toMatch(/^\/api\/ficha\?/);

        const pdf = await request.get(enlace);
        expect(pdf.status(), p.slug).toBe(200);
        expect(pdf.headers()["content-type"], p.slug).toBe("application/pdf");
        expect(pdf.headers()["content-disposition"], p.slug).toContain("attachment;");
        expect(pdf.headers()["cache-control"], p.slug).toContain("no-store");
        const cuerpo = (await pdf.body()).toString("latin1");
        expect(cuerpo.startsWith("%PDF"), p.slug).toBe(true);
        expect(cuerpo.match(/\/Type\s*\/Page[^s]/g)?.length, p.slug).toBe(2);
      }
    });
  }

  test("la descarga lleva el nombre del inmueble", async ({ request }) => {
    const r = await request.post("/api/interesados", { data: { ...valido, slug: "casa-los-alamos", idioma: "es" } });
    const pdf = await request.get((await r.json()).enlace);
    const disposicion = pdf.headers()["content-disposition"];
    expect(disposicion).toContain('filename="ALGI-Property-ficha-tecnica-casa-los-alamos.pdf"');
    expect(decodeURIComponent(disposicion.split("filename*=UTF-8''")[1])).toBe("Ficha técnica - Casa Los Álamos - ALGI Property.pdf");
  });
});

test.describe("protección de las fichas", () => {
  test("los PDF ya no son archivos públicos", async ({ request }) => {
    expect((await request.get("/fichas/es/casa-los-alamos.pdf")).status()).toBe(404);
    expect((await request.get("/fichas/es/ALGI-Property-ficha-tecnica-casa-los-alamos.pdf")).status()).toBe(404);
    expect((await request.get("/fichas-privadas/es/casa-los-alamos.pdf")).status()).toBe(404);
  });

  test("sin enlace firmado, con la firma alterada o vencido, no hay PDF", async ({ request }) => {
    expect((await request.get("/api/ficha")).status()).toBe(403);
    expect((await request.get("/api/ficha?i=es&p=casa-los-alamos&v=9999999999999&f=falsa")).status()).toBe(403);

    // Firma válida para otro inmueble: cambiar el slug invalida el enlace.
    const ajeno = crearEnlaceFicha(secretoPruebas, "es", "edificio-granada").replace("edificio-granada", "casa-los-alamos");
    expect((await request.get(ajeno)).status()).toBe(403);

    const vencido = crearEnlaceFicha(secretoPruebas, "es", "casa-los-alamos", Date.now() - VIGENCIA_ENLACE_MS - 1000);
    const r = await request.get(vencido);
    expect(r.status()).toBe(403);
    expect(await r.text()).toContain("venció");
  });
});

test.describe("validación del registro", () => {
  const enviar = (request: import("@playwright/test").APIRequestContext, datos: object) =>
    request.post("/api/interesados", { data: { ...valido, slug: "casa-los-alamos", idioma: "es", ...datos } });

  test("rechaza datos incompletos e indica los campos", async ({ request }) => {
    const r = await enviar(request, { nombre: "", telefono: "123", correo: "sin-arroba", autorizacion: false });
    expect(r.status()).toBe(422);
    expect((await r.json()).campos).toEqual(["nombre", "telefono", "correo", "autorizacion"]);
  });

  test("acepta correo vacío y número internacional con +", async ({ request }) => {
    expect((await enviar(request, { correo: "" })).status()).toBe(200);
    expect((await enviar(request, { pais: "OT", telefono: "+44 20 7946 0958" })).status()).toBe(200);
  });

  test("solo acepta JSON enviado desde el propio sitio", async ({ request }) => {
    const datos = JSON.stringify({ ...valido, slug: "casa-los-alamos", idioma: "es" });
    const textoPlano = await request.post("/api/interesados", { data: datos, headers: { "Content-Type": "text/plain" } });
    expect(textoPlano.status()).toBe(415);
    const otraWeb = await request.post("/api/interesados", {
      data: datos,
      headers: { "Content-Type": "application/json", Origin: "https://otra-web.example" },
    });
    expect(otraWeb.status()).toBe(403);
  });

  test("frena robots: campo trampa, envío instantáneo e inmueble inexistente", async ({ request }) => {
    expect((await enviar(request, { sitio: "https://spam.example" })).status()).toBe(400);
    const rapido = await enviar(request, { t: 300 });
    expect(rapido.status()).toBe(400);
    expect((await rapido.json()).codigo).toBe("rapido");
    expect((await enviar(request, { slug: "no-existe" })).status()).toBe(400);
  });
});
