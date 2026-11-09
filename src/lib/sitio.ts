/**
 * URL pública del sitio. Se define con NEXT_PUBLIC_SITE_URL al desplegar;
 * mientras tanto se usa la dirección prevista en Vercel.
 */
export const urlSitio = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algiproperty.com").replace(/\/$/, "");

export const nombreSitio = "ALGI Property";
