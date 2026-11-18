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

/** Valor de una variable sin espacios ni comillas envolventes (por si se pegó tal cual de un archivo .env). */
function valor(v: string | undefined): string {
  return (v ?? "").trim().replace(/^(["'])(.*)\1$/, "$2").trim();
}

export function leerConfig(): ConfigInteresados {
  const e = process.env;
  const prueba = e.LEADS_MODO === "prueba" && e.VERCEL_ENV !== "production";
  const secretoCrudo = valor(e.FICHAS_SECRETO);
  const secreto = secretoCrudo.length >= 32 ? secretoCrudo : null;
  const destino = valor(e.AVISOS_DESTINO)
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const clave = valor(e.RESEND_API_KEY);
  const remitente = valor(e.AVISOS_REMITENTE);
  const resend = clave && remitente && destino.length ? { clave, remitente, destino } : null;
  return { prueba, secreto, baseDatos: valor(e.DATABASE_URL) || null, resend };
}
