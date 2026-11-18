/**
 * Crea o actualiza las tablas de la base de datos de interesados (db/esquema.sql).
 * Uso: npm run db:esquema   (lee DATABASE_URL de .env.local)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL. Cópiala de Neon a .env.local y vuelve a ejecutar npm run db:esquema.");
  process.exit(1);
}

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sqlTexto = await fs.readFile(path.join(raiz, "db/esquema.sql"), "utf8");
const sentencias = sqlTexto
  .split("\n")
  .filter((l) => !l.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

const sql = neon(url);
for (const s of sentencias) await sql.query(s);
const [{ n }] = await sql.query("SELECT count(*)::int AS n FROM interesados");
console.log(`Esquema listo (${sentencias.length} sentencias). Interesados registrados: ${n}.`);
