/**
 * Enlaces de descarga firmados (HMAC-SHA256): solo quien completó el formulario recibe uno,
 * y vence a los pocos minutos. Solo para el servidor.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const VIGENCIA_ENLACE_MS = 15 * 60 * 1000;

interface DatosEnlace {
  idioma: "es" | "en";
  slug: string;
  /** Momento de vencimiento en milisegundos desde 1970. */
  vence: number;
}

function firma(secreto: string, d: DatosEnlace): string {
  return createHmac("sha256", secreto).update(`ficha:${d.idioma}:${d.slug}:${d.vence}`).digest("base64url");
}

export function crearEnlaceFicha(secreto: string, idioma: "es" | "en", slug: string, ahora = Date.now()): string {
  const d = { idioma, slug, vence: ahora + VIGENCIA_ENLACE_MS };
  const q = new URLSearchParams({ i: idioma, p: slug, v: String(d.vence), f: firma(secreto, d) });
  return `/api/ficha?${q}`;
}

/** Comprueba firma y vigencia. Devuelve los datos del enlace o el motivo del rechazo. */
export function verificarEnlaceFicha(
  secreto: string,
  q: URLSearchParams,
  ahora = Date.now(),
): { ok: true; idioma: "es" | "en"; slug: string } | { ok: false; motivo: "incompleto" | "firma" | "vencido" } {
  const idioma = q.get("i");
  const slug = q.get("p");
  const vence = Number(q.get("v"));
  const recibida = q.get("f");
  if ((idioma !== "es" && idioma !== "en") || !slug || !Number.isFinite(vence) || !recibida) {
    return { ok: false, motivo: "incompleto" };
  }
  const esperada = Buffer.from(firma(secreto, { idioma, slug, vence }));
  const dada = Buffer.from(recibida);
  if (esperada.length !== dada.length || !timingSafeEqual(esperada, dada)) return { ok: false, motivo: "firma" };
  if (vence < ahora) return { ok: false, motivo: "vencido" };
  return { ok: true, idioma, slug };
}

/** Huella irreversible de la IP para limitar abusos sin guardar la dirección real. */
export function huellaIp(secreto: string, ip: string): string {
  return createHmac("sha256", secreto).update(`ip:${ip}`).digest("base64url").slice(0, 24);
}
