import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Idioma, Texto } from "@/data/propiedades";
import { nombreSitio } from "@/lib/sitio";

/** Valida el idioma de la ruta y lo fija para el renderizado estático. */
export function fijarIdioma(locale: string): Idioma {
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

const localeOg: Record<Idioma, string> = { es: "es_CO", en: "en_US" };

/** Metadatos de una página: título, descripción, canónica, hreflang y Open Graph. */
export function metadatos(locale: Idioma, titulo: Texto, descripcion: Texto, ruta = ""): Metadata {
  const titulado = `${titulo[locale]} | ${nombreSitio}`;
  return {
    title: titulado,
    description: descripcion[locale],
    alternates: {
      canonical: `/${locale}${ruta}`,
      languages: { es: `/es${ruta}`, en: `/en${ruta}`, "x-default": `/es${ruta}` },
    },
    openGraph: {
      type: "website",
      siteName: nombreSitio,
      title: titulado,
      description: descripcion[locale],
      url: `/${locale}${ruta}`,
      locale: localeOg[locale],
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: nombreSitio }],
    },
    twitter: { card: "summary_large_image", title: titulado, description: descripcion[locale], images: ["/og.jpg"] },
  };
}
