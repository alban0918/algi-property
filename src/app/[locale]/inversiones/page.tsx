import { PageHeader } from "@/components/page-header";
import { CtaContacto } from "@/components/cta-contacto";
import { Reveal } from "@/components/reveal";
import { Contenedor, Lista } from "@/components/ui/bloques";
import { Button } from "@/components/ui/button";
import { inversiones as inv } from "@/content/inversiones";
import { tx } from "@/content/tx";
import { fijarIdioma, metadatos } from "@/lib/pagina";

export async function generateMetadata({ params }: PageProps<"/[locale]/inversiones">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, inv.titulo, inv.lead, "/inversiones");
}

export default async function Inversiones({ params }: PageProps<"/[locale]/inversiones">) {
  const locale = fijarIdioma((await params).locale);

  return (
    <>
      <PageHeader titulo={inv.titulo[locale]} tituloCursiva={inv.tituloCursiva[locale]} lead={inv.lead[locale]} />

      <section aria-labelledby="t-definicion" className="bg-paper">
        <Contenedor className="grid gap-12 py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:py-32">
          <Reveal>
            <h2 id="t-definicion" className="font-display text-[length:var(--text-title)] leading-[1.08] font-light">
              {inv.definicion.titulo[locale]}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-prose text-taupe lg:pt-3">{inv.definicion.texto[locale]}</p>
          </Reveal>
        </Contenedor>

        <Contenedor className="grid gap-16 pb-24 lg:grid-cols-2 lg:gap-24 lg:pb-32">
          {[inv.caracteristicas, inv.beneficios].map((bloque) => (
            <Reveal key={bloque.titulo.es}>
              <h3 className="font-display text-3xl font-light text-brass-deep italic">{bloque.titulo[locale]}</h3>
              <dl className="mt-6 border-t border-line">
                {bloque.items.map((it) => (
                  <div key={it.titulo.es} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[0.8fr_1.2fr] sm:gap-8">
                    <dt className="font-display text-2xl leading-tight font-medium">{it.titulo[locale]}</dt>
                    <dd className="text-sm text-taupe">{it.texto[locale]}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </Contenedor>
      </section>

      <section aria-labelledby="t-modalidades" data-surface="dark" className="bg-night text-cream">
        <Contenedor className="py-24 lg:py-32">
          <Reveal>
            <h2 id="t-modalidades" className="font-display text-[length:var(--text-headline)] leading-none font-light">
              {inv.modalidades.titulo[locale]}
            </h2>
          </Reveal>

          <ul className="mt-16 lg:mt-24">
            {inv.modalidades.items.map((m) => (
              <li key={m.id} id={m.id} className="scroll-mt-28 border-t border-cream/20">
                <div className="grid gap-10 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24 lg:py-20">
                  <Reveal>
                    <h3 className="font-display text-4xl leading-[1.05] font-light text-brass-light italic sm:text-5xl lg:sticky lg:top-32">
                      {m.titulo[locale]}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} className="space-y-10">
                    <p className="font-display text-2xl leading-snug sm:text-3xl">{m.texto[locale]}</p>
                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <h4 className="eyebrow mb-4 text-brass-light">{inv.modalidades.caracteristicasEtiqueta[locale]}</h4>
                        <Lista items={m.caracteristicas.map((c) => c[locale])} className="text-sm text-cream/85" />
                      </div>
                      <div>
                        <h4 className="eyebrow mb-4 text-brass-light">{inv.modalidades.beneficiosEtiqueta[locale]}</h4>
                        <Lista items={m.beneficios.map((b) => b[locale])} className="text-sm text-cream/85" />
                      </div>
                    </div>
                    {"servicio" in m && m.servicio && (
                      <p className="max-w-prose bg-pine p-6 text-sm text-cream/90">{m.servicio[locale]}</p>
                    )}
                  </Reveal>
                </div>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <section className="bg-paper">
        <Contenedor className="grid gap-8 py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24 lg:py-28">
          <Reveal>
            <p className="font-display text-3xl leading-snug font-light sm:text-4xl">{inv.cierre[locale]}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button href={`/${locale}/florida`} variante="enlace">
              {tx("Inversión en la Florida", "Investing in Florida")[locale]}
            </Button>
          </Reveal>
        </Contenedor>
      </section>

      <CtaContacto locale={locale} />
    </>
  );
}
