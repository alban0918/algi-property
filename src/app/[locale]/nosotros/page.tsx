import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { CtaContacto } from "@/components/cta-contacto";
import { Reveal } from "@/components/reveal";
import { Contenedor } from "@/components/ui/bloques";
import { nosotros } from "@/content/nosotros";
import { fijarIdioma, metadatos } from "@/lib/pagina";

export async function generateMetadata({ params }: PageProps<"/[locale]/nosotros">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, nosotros.titulo, nosotros.lead, "/nosotros");
}

export default async function Nosotros({ params }: PageProps<"/[locale]/nosotros">) {
  const locale = fijarIdioma((await params).locale);
  const n = nosotros;

  return (
    <>
      <PageHeader
        titulo={n.titulo[locale]}
        tituloCursiva={n.tituloCursiva[locale]}
        lead={n.lead[locale]}
        imagen={{ src: "/images/stock/cali-vista-aerea.webp", posicion: "object-[50%_70%]", gris: true }}
      />

      <section aria-labelledby="propuesta" className="bg-paper">
        <Contenedor className="grid gap-12 py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-24 lg:py-32">
          <Reveal>
            <h2 id="propuesta" className="font-display text-[length:var(--text-title)] leading-[1.08] font-light">
              {n.propuesta.destacado[locale]}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="space-y-6 lg:pt-3">
            <p className="font-display text-2xl font-medium text-brass-deep italic">{n.propuesta.titulo[locale]}</p>
            <p className="max-w-prose text-taupe">{n.propuesta.texto[locale]}</p>
          </Reveal>
        </Contenedor>
      </section>

      <section data-surface="dark" className="bg-pine text-cream">
        <Contenedor className="grid gap-16 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          {[n.mision, n.vision].map((bloque, i) => (
            <Reveal key={bloque.titulo.es} delay={i * 0.15} className="space-y-6">
              <h2 className="font-display text-[length:var(--text-headline)] leading-none font-light text-brass-light italic">
                {bloque.titulo[locale]}
              </h2>
              <p className="font-display text-3xl leading-tight font-light">{bloque.destacado[locale]}</p>
              <p className="max-w-prose text-cream/85">{bloque.texto[locale]}</p>
            </Reveal>
          ))}
        </Contenedor>
      </section>

      <section aria-label={n.principios.map((p) => p.titulo[locale]).join(", ")} className="bg-paper">
        <Contenedor className="py-24 lg:py-32">
          <ul>
            {n.principios.map((p, i) => (
              <li key={p.titulo.es}>
                <Reveal delay={i * 0.08} className="grid gap-4 border-t border-line py-10 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-14">
                  <h3 className="font-display text-4xl leading-none font-light sm:text-5xl">{p.titulo[locale]}</h3>
                  <p className="max-w-prose self-end text-taupe">{p.texto[locale]}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <section data-surface="dark" className="relative isolate flex min-h-[28rem] items-end overflow-hidden bg-night text-cream sm:min-h-[36rem]">
        <Image src="/images/stock/cali-la-ermita.webp" alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover object-[50%_30%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/30 to-night/20" />
        <Contenedor className="w-full pb-12 sm:pb-16">
          <Reveal className="max-w-2xl space-y-4">
            <h2 className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">{n.ciudad.titulo[locale]}</h2>
            <p className="text-cream/90">{n.ciudad.texto[locale]}</p>
          </Reveal>
        </Contenedor>
      </section>

      <CtaContacto locale={locale} />
    </>
  );
}
