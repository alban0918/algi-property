/**
 * Configuración del registro de interesados, leída de variables de entorno (ver .env.example).
 * Solo para el servidor: nunca importar desde componentes de cliente.
 */
export interface ConfigInteresados {
  /** Sin base de datos ni correo: solo para las pruebas automáticas, nunca en producción. */
  prueba: boolean;
  secreto: string | null;
  baseDatos: string | null;
  resend: { clave: string; remitente: string; destino: string[] } | null;
}

export function leerConfig(): ConfigInteresados {
  const e = process.env;
  const prueba = e.LEADS_MODO === "prueba" && e.VERCEL_ENV !== "production";
  const secreto = e.FICHAS_SECRETO && e.FICHAS_SECRETO.length >= 32 ? e.FICHAS_SECRETO : null;
  const destino = (e.AVISOS_DESTINO ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const resend =
    e.RESEND_API_KEY && e.AVISOS_REMITENTE && destino.length
      ? { clave: e.RESEND_API_KEY, remitente: e.AVISOS_REMITENTE, destino }
      : null;
  return { prueba, secreto, baseDatos: e.DATABASE_URL || null, resend };
}
