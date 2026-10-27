import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const idiomas = ["es", "en"] as const;
const rutas = [
  "",
  "/nosotros",
  "/servicios",
  "/inversiones",
  "/florida",
  "/propiedades",
  "/propiedades/bodega-acopi-850",
  "/propiedades/casa-los-alamos",
  "/propiedades/edificio-granada",
  "/contacto",
];

for (const idioma of idiomas) {
  for (const ruta of rutas) {
    const url = `/${idioma}${ruta}`;

    test.describe(url, () => {
      test("responde 200, tiene un h1 y el idioma correcto", async ({ page }) => {
        const respuesta = await page.goto(url);
        expect(respuesta?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", idioma);
        await expect(page.locator("h1")).toHaveCount(1);
      });

      test("no se desborda horizontalmente en celular (390 px)", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(url);
        await page.waitForLoadState("networkidle");
        const { ancho, ventana } = await page.evaluate(() => ({
          ancho: document.documentElement.scrollWidth,
          ventana: window.innerWidth,
        }));
        expect(ancho).toBeLessThanOrEqual(ventana);
      });

      test("no tiene violaciones de accesibilidad serias (axe, WCAG 2.2 AA)", async ({ browser }) => {
        // Con "reducir movimiento" las animaciones de entrada no ocultan contenido a medias y los contrastes son medibles.
        const contexto = await browser.newContext({ reducedMotion: "reduce" });
        const page = await contexto.newPage();
        await page.goto(`http://localhost:3210${url}`);
        await page.waitForLoadState("networkidle");
        const resultado = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const graves = resultado.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        await contexto.close();
        expect(graves.map((v) => `${v.id}: ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
      });
    });
  }
}

test.describe("detección del idioma del navegador en la raíz", () => {
  test.describe("navegador en español", () => {
    test.use({ locale: "es-CO" });
    test("redirige a /es", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/es$/);
    });
  });

  test.describe("navegador en inglés", () => {
    test.use({ locale: "en-US" });
    test("redirige a /en", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/en$/);
    });
  });
});

test("una ficha inexistente responde 404 real, también en inglés", async ({ request }) => {
  for (const url of ["/es/propiedades/no-existe", "/en/propiedades/no-existe", "/es/ruta-inexistente"]) {
    const r = await request.get(url);
    expect(r.status(), url).toBe(404);
  }
});

test("el sitemap lista todas las páginas en ambos idiomas y robots apunta a él", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)?.length).toBe(rutas.length * idiomas.length);
  expect(await (await request.get("/robots.txt")).text()).toContain("sitemap.xml");
});

test("las cabeceras de seguridad están presentes", async ({ request }) => {
  const h = (await request.get("/es")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["referrer-policy"]).toBeTruthy();
  expect(h["x-powered-by"]).toBeUndefined();
});
