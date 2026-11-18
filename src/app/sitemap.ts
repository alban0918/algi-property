import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { propiedades } from "@/data/propiedades";
import { urlSitio } from "@/lib/sitio";

const rutas = ["", "/nosotros", "/servicios", "/inversiones", "/florida", "/propiedades", "/contacto", "/privacidad"];

export default function sitemap(): MetadataRoute.Sitemap {
  const todas = [...rutas, ...propiedades.map((p) => `/propiedades/${p.slug}`)];

  return todas.flatMap((ruta) =>
    routing.locales.map((locale) => ({
      url: `${urlSitio}/${locale}${ruta}`,
      changeFrequency: "monthly" as const,
      priority: ruta === "" ? 1 : ruta === "/privacidad" ? 0.3 : ruta.startsWith("/propiedades/") ? 0.7 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${urlSitio}/${l}${ruta}`])),
      },
    })),
  );
}
