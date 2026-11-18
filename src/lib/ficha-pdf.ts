/**
 * Ruta pública de la ficha técnica en PDF de un inmueble. La usan el botón de descarga y
 * scripts/fichas-pdf.mjs, que genera los archivos. El nombre del archivo es descriptivo porque
 * es el que ve quien descarga (el servidor lo envía en Content-Disposition).
 * Sin importaciones: el script la carga directamente con Node.
 */
export function rutaFichaPdf(idioma: "es" | "en", slug: string): string {
  const prefijo = idioma === "es" ? "ALGI-Property-ficha-tecnica" : "ALGI-Property-fact-sheet";
  return `/fichas/${idioma}/${prefijo}-${slug}.pdf`;
}
