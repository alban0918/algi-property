/**
 * Registro de una persona interesada antes de descargar una ficha técnica.
 *
 * Flujo: valida los datos → frena bots (campo trampa, tiempo mínimo, límite por IP) →
 * guarda en la base de datos → avisa a ALGI por correo → responde con un enlace de descarga
 * firmado y temporal. Si falla la base de datos o el correo, basta con que uno de los dos
 * funcione para no perder el contacto; si fallan ambos, se pide intentar de nuevo.
 */
import { obtenerPropiedad } from "@/data/propiedades";
import { versionPolitica } from "@/content/privacidad";
import { validarInteresado } from "@/lib/interesado";
import { urlSitio } from "@/lib/sitio";
import { enviarAviso } from "@/lib/servidor/aviso";
import { leerConfig } from "@/lib/servidor/config";
import { guardarInteresado, marcarAvisoEnviado, superaLimite } from "@/lib/servidor/db";
import { crearEnlaceFicha, huellaIp } from "@/lib/servidor/token";

/** Nadie completa nombre, teléfono y la casilla en menos tiempo que esto; un script sí. */
const TIEMPO_MINIMO_MS = 1500;

type Codigo = "datos" | "rapido" | "frecuencia" | "servidor";

function error(codigo: Codigo, estado: number, campos?: string[]) {
  return Response.json({ ok: false, codigo, campos }, { status: estado, headers: { "Cache-Control": "no-store" } });
}

const texto = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(request: Request) {
  const cfg = leerConfig();
  if (!cfg.secreto || (!cfg.prueba && !cfg.baseDatos && !cfg.resend)) {
    console.error("[interesados] Falta configuración: FICHAS_SECRETO y al menos DATABASE_URL o Resend.");
    return error("servidor", 503);
  }

  // Solo JSON y desde este mismo sitio: otra web no puede enviar formularios desde el navegador de sus visitantes.
  if (!request.headers.get("content-type")?.includes("application/json")) return error("datos", 415);
  const origen = request.headers.get("origin");
  if (origen && origen !== new URL(request.url).origin && origen !== urlSitio) return error("datos", 403);

  let cuerpo: Record<string, unknown>;
  try {
    const crudo = await request.text();
    if (crudo.length > 4000) return error("datos", 413);
    cuerpo = JSON.parse(crudo);
    if (!cuerpo || typeof cuerpo !== "object") throw new Error();
  } catch {
    return error("datos", 400);
  }

  // Campo trampa: invisible para las personas, los robots lo rellenan.
  if (texto(cuerpo.sitio)) return error("datos", 400);
  if (typeof cuerpo.t !== "number" || cuerpo.t < TIEMPO_MINIMO_MS) return error("rapido", 400);

  const idioma = cuerpo.idioma === "en" ? "en" : "es";
  const propiedad = obtenerPropiedad(texto(cuerpo.slug));
  if (!propiedad) return error("datos", 400);

  const v = validarInteresado({
    nombre: texto(cuerpo.nombre),
    pais: texto(cuerpo.pais),
    telefono: texto(cuerpo.telefono),
    correo: texto(cuerpo.correo),
    autorizacion: cuerpo.autorizacion === true,
  });
  if (!v.ok) return error("datos", 422, v.errores);

  const enlace = crearEnlaceFicha(cfg.secreto, idioma, propiedad.slug);
  if (cfg.prueba) return Response.json({ ok: true, enlace }, { headers: { "Cache-Control": "no-store" } });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "desconocida";
  const datos = { ...v.datos, propiedad: propiedad.slug, idioma, politica: versionPolitica };

  let id: number | null = null;
  if (cfg.baseDatos) {
    try {
      if (await superaLimite(cfg.baseDatos, huellaIp(cfg.secreto, ip))) return error("frecuencia", 429);
    } catch (e) {
      // Si el límite no se puede consultar, se sigue: es mejor un posible spam que perder un interesado.
      console.error("[interesados] No se pudo consultar el límite:", (e as Error).message);
    }
    try {
      id = await guardarInteresado(cfg.baseDatos, datos);
    } catch (e) {
      console.error("[interesados] No se pudo guardar:", (e as Error).message);
    }
  }

  let avisado = false;
  if (cfg.resend) {
    try {
      await enviarAviso(cfg.resend, {
        ...v.datos,
        idioma,
        fecha: new Date(),
        propiedad: { nombre: propiedad.nombre.es, url: `${urlSitio}/es/propiedades/${propiedad.slug}` },
      });
      avisado = true;
      if (id !== null && cfg.baseDatos) await marcarAvisoEnviado(cfg.baseDatos, id).catch(() => {});
    } catch (e) {
      console.error("[interesados] No se pudo enviar el aviso:", (e as Error).message);
    }
  }

  if (id === null && !avisado) return error("servidor", 503);
  return Response.json({ ok: true, enlace }, { headers: { "Cache-Control": "no-store" } });
}
