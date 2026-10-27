import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CtaContacto } from "@/components/cta-contacto";
import { GaleriaFicha } from "@/components/galeria-ficha";
import { Reveal } from "@/components/reveal";
import { TarjetaPropiedad } from "@/components/tarjeta-propiedad";
import { Contenedor, Lista } from "@/components/ui/bloques";
import { Button } from "@/components/ui/button";
import { contacto, enlaceWhatsApp } from "@/data/contacto";
import { obtenerPropiedad, propiedades } from "@/data/propiedades";
import { formatearPrecio } from "@/lib/formato";
import { fijarIdioma, metadatos } from "@/lib/pagina";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => propiedades.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/propiedades/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = fijarIdioma(l);
  const p = obtenerPropiedad(slug);
  if (!p) return {};
  return {
    ...metadatos(locale, p.nombre, p.resumen, `/propiedades/${p.slug}`),
    openGraph: {
      title: `${p.nombre[locale]} | ALGI Property`,
      description: p.resumen[locale],
      images: [p.fotos[0].archivo],
    },
  };
}

export default async function Ficha({ params }: PageProps<"/[locale]/propiedades/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = fijarIdioma(l);
  const p = obtenerPropiedad(slug);
  if (!p) notFound();

  const t = await getTranslations({ locale, namespace: "ficha" });
  const td = await getTranslations({ locale, namespace: "destacados" });
  const otras = propiedades.filter((o) => o.slug !== p.slug);
  const precio = p.precio ? formatearPrecio(p.precio, locale) : td("consultar");
  const mensaje = t("mensajeWhatsApp", { nombre: p.nombre[locale] });

  return (
    <>
      <section data-surface="dark" className="bg-night text-cream">
        <Contenedor className="pt-32 pb-10 sm:pt-40">
          <nav aria-label="breadcrumb" className="text-sm text-cream/70">
            <Link href="/propiedades" className="underline-offset-4 hover:text-brass-light hover:underline">
              {t("volver")}
            </Link>
          </nav>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-[length:var(--text-headline)] leading-[0.95] font-light tracking-[-0.02em]">
                <span className="rise-mask">
                  <span className="rise block [animation-delay:0.1s]">{p.nombre[locale]}</span>
                </span>
              </h1>
              <p className="fade-up mt-5 text-cream/85 [animation-delay:0.5s]">
                {p.ubicacion.barrio[locale]} · {p.ubicacion.ciudad}
                {p.ubicacion.detalle && ` · ${p.ubicacion.detalle[locale]}`}
              </p>
            </div>
            <div className="fade-up flex items-center gap-4 [animation-delay:0.6s]">
              <span className="eyebrow bg-cream px-3 py-1.5 text-night">{td(`operaciones.${p.operacion}`)}</span>
              <p className="font-display text-3xl text-brass-light tabular">{precio}</p>
            </div>
          </div>
        </Contenedor>
      </section>

      <section className="bg-paper">
        <Contenedor className="grid gap-12 py-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <GaleriaFicha fotos={p.fotos} />

            <div className="mt-16 space-y-12">
              <Reveal>
                <p className="font-display text-3xl leading-snug font-light sm:text-4xl">{p.resumen[locale]}</p>
              </Reveal>
              <Reveal>
                <h2 className="font-display text-3xl font-light text-brass-deep italic">{t("caracteristicas")}</h2>
                <Lista items={p.caracteristicas.map((c) => c[locale])} className="mt-6 max-w-prose" />
              </Reveal>
              {p.nota && (
                <Reveal>
                  <p className="max-w-prose border-t border-line pt-6 text-sm text-taupe">{p.nota[locale]}</p>
                </Reveal>
              )}
            </div>
          </div>

          <aside aria-label={t("datos")} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-3xl font-light text-brass-deep italic">{t("datos")}</h2>
            <dl className="mt-6 border-t border-line">
              {p.datos.map((d) => (
                <div key={d.etiqueta.es} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="text-sm text-taupe">{d.etiqueta[locale]}</dt>
                  <dd className="text-right font-medium tabular">{d.valor[locale]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col items-start gap-5">
              <Button href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                {t("consultar")}
              </Button>
              <a
                href={`mailto:${contacto.correo}?subject=${encodeURIComponent(p.nombre[locale])}`}
                className="text-sm text-taupe underline decoration-brass underline-offset-4 transition-colors hover:text-ink"
              >
                {contacto.correo}
              </a>
            </div>
          </aside>
        </Contenedor>
      </section>

      <section aria-labelledby="t-otras" className="bg-paper-2">
        <Contenedor className="py-20 lg:py-28">
          <h2 id="t-otras" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
            {t("otras")}
          </h2>
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:max-w-4xl">
            {otras.map((o) => (
              <li key={o.slug}>
                <TarjetaPropiedad p={o} />
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <CtaContacto locale={locale} mensaje={mensaje} />
    </>
  );
}
