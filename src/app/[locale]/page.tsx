import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/hero";
import { Cinta } from "@/components/cinta";
import { PropiedadesDestacadas } from "@/components/propiedades-destacadas";
import { fijarIdioma, metadatos } from "@/lib/pagina";
import { tx } from "@/content/tx";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = fijarIdioma((await params).locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = metadatos(locale, tx(t("titulo"), t("titulo")), tx(t("descripcion"), t("descripcion")));
  return { ...base, title: { absolute: t("titulo") } };
}

export default async function Inicio({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Cinta locale={locale} />
      <PropiedadesDestacadas locale={locale} />
    </>
  );
}
