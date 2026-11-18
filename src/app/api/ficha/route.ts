/**
 * Entrega la ficha técnica en PDF solo con un enlace firmado y vigente (lo crea /api/interesados).
 * Los PDF viven en una carpeta privada que se incluye en la función (outputFileTracingIncludes).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { obtenerPropiedad } from "@/data/propiedades";
import { nombreDescarga, nombreDescargaAscii } from "@/lib/ficha-pdf";
import { leerConfig } from "@/lib/servidor/config";
import { verificarEnlaceFicha } from "@/lib/servidor/token";

const sinCache = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" };

export async function GET(request: Request) {
  const { secreto } = leerConfig();
  if (!secreto) return new Response("Servicio no configurado", { status: 503, headers: sinCache });

  const r = verificarEnlaceFicha(secreto, new URL(request.url).searchParams);
  if (!r.ok) {
    const mensaje = r.motivo === "vencido" ? "El enlace venció. Vuelve a la ficha del inmueble para descargarla de nuevo." : "Enlace no válido.";
    return new Response(mensaje, { status: 403, headers: { ...sinCache, "Content-Type": "text/plain; charset=utf-8" } });
  }

  // El slug firmado debe existir en el catálogo: así nunca se lee una ruta arbitraria del disco.
  const propiedad = obtenerPropiedad(r.slug);
  if (!propiedad) return new Response("No encontrada", { status: 404, headers: sinCache });

  let pdf: Buffer;
  try {
    // Carpeta escrita literal (igual a CARPETA_FICHAS) para que el empaquetador incluya solo esos PDF.
    pdf = await readFile(path.join(process.cwd(), "fichas-privadas", r.idioma, `${propiedad.slug}.pdf`));
  } catch {
    console.error(`[ficha] Falta el PDF de ${r.idioma}/${propiedad.slug}; ¿se ejecutó npm run fichas?`);
    return new Response("Ficha no disponible", { status: 404, headers: sinCache });
  }

  const nombre = nombreDescarga(r.idioma, propiedad.nombre[r.idioma]);
  return new Response(new Uint8Array(pdf), {
    headers: {
      ...sinCache,
      "Content-Type": "application/pdf",
      "Content-Length": String(pdf.length),
      "Content-Disposition": `attachment; filename="${nombreDescargaAscii(r.idioma, propiedad.slug)}"; filename*=UTF-8''${encodeURIComponent(nombre)}`,
    },
  });
}
