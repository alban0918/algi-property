/**
 * Ubicación y nombre de descarga de las fichas técnicas en PDF.
 *
 * Los PDF se generan en cada build (scripts/fichas-pdf.mjs) dentro de una carpeta privada,
 * fuera de `public/`: solo se descargan con un enlace firmado que entrega /api/interesados
 * después del formulario (ver src/app/api/ficha/route.ts).
 * Sin importaciones con alias: el script de generación lo carga directamente con Node.
 */
export const CARPETA_FICHAS = "fichas-privadas";

/** Ruta del PDF relativa a la carpeta privada. */
export function archivoFicha(idioma: "es" | "en", slug: string): string {
  return `${idioma}/${slug}.pdf`;
}

/** Nombre con el que se guarda el archivo al descargarlo. */
export function nombreDescarga(idioma: "es" | "en", nombreInmueble: string): string {
  const base = idioma === "es" ? "Ficha técnica" : "Fact sheet";
  return `${base} - ${nombreInmueble.replace(/[\\/:*?"<>|]/g, "")} - ALGI Property.pdf`;
}

/** Variante sin tildes ni espacios para navegadores que no leen el nombre en UTF-8. */
export function nombreDescargaAscii(idioma: "es" | "en", slug: string): string {
  return `ALGI-Property-${idioma === "es" ? "ficha-tecnica" : "fact-sheet"}-${slug}.pdf`;
}
