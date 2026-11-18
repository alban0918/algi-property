/**
 * Acceso a la base de datos de interesados (Postgres en Neon, por HTTP). Esquema en db/esquema.sql.
 * Solo para el servidor.
 */
import { neon } from "@neondatabase/serverless";
import type { Interesado } from "@/lib/interesado";

/** Envíos permitidos por IP en la ventana de tiempo, para frenar scripts automáticos. */
export const LIMITE_ENVIOS = 6;

export async function superaLimite(url: string, huella: string): Promise<boolean> {
  const sql = neon(url);
  // Limpia los intentos de más de un día, registra este y cuenta los de los últimos 10 minutos.
  const filas = await sql`
    WITH limpieza AS (DELETE FROM intentos WHERE creado < now() - interval '1 day'),
         nuevo AS (INSERT INTO intentos (ip_hash) VALUES (${huella}))
    SELECT count(*)::int AS n FROM intentos WHERE ip_hash = ${huella} AND creado > now() - interval '10 minutes'
  `;
  return (filas[0]?.n ?? 0) >= LIMITE_ENVIOS;
}

export async function guardarInteresado(
  url: string,
  d: Interesado & { propiedad: string; idioma: string; politica: string },
): Promise<number> {
  const sql = neon(url);
  const filas = await sql`
    INSERT INTO interesados (nombre, telefono, correo, propiedad, idioma, politica)
    VALUES (${d.nombre}, ${d.telefono}, ${d.correo}, ${d.propiedad}, ${d.idioma}, ${d.politica})
    RETURNING id
  `;
  return Number(filas[0].id);
}

export async function marcarAvisoEnviado(url: string, id: number): Promise<void> {
  const sql = neon(url);
  await sql`UPDATE interesados SET aviso_enviado = true WHERE id = ${id}`;
}
