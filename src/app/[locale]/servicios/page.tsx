import { PageHeader } from "@/components/page-header";
import { CtaContacto } from "@/components/cta-contacto";
import { Reveal } from "@/components/reveal";
import { Contenedor, Desplegable, Lista } from "@/components/ui/bloques";
import { servicios as s } from "@/content/servicios";
import { fijarIdioma, metadatos } from "@/lib/pagina";

export async function generateMetadata({ params }: PageProps<"/[locale]/servicios">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, s.titulo, s.lead, "/servicios");
}

export default async function Servicios({ params }: PageProps<"/[locale]/servicios">) {
  const locale = fijarIdioma((await params).locale);

  return (
    <>
      <PageHeader titulo={s.titulo[locale]} tituloCursiva={s.tituloCursiva[locale]} lead={s.lead[locale]} />

      <nav
        aria-label={s.titulo[locale]}
        className="sticky top-[4.5rem] z-30 border-b border-line bg-paper lg:top-20"
      >
        <Contenedor>
          <ul className="flex gap-8 overflow-x-auto py-4 whitespace-nowrap">
            {s.indice.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className="eyebrow block py-1 text-taupe transition-colors hover:text-ink"
                >
                  {i.etiqueta[locale]}
                </a>
              </li>
            ))}
          </ul>
        </Contenedor>
      </nav>

      {/* Asesoría */}
      <section id="asesoria" aria-labelledby="t-asesoria" className="scroll-mt-32 bg-paper">
        <Contenedor className="py-24 lg:py-32">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <h2 id="t-asesoria" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {s.asesoria.titulo[locale]}
            </h2>
            <p className="max-w-prose text-taupe">{s.asesoria.intro[locale]}</p>
          </Reveal>
          <ul className="mt-16">
            {s.asesoria.pilares.map((p) => (
              <li key={p.titulo.es}>
                <Reveal className="grid gap-6 border-t border-line py-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
                  <h3 className="font-display text-4xl leading-none font-light text-brass-deep italic">{p.titulo[locale]}</h3>
                  <div className="space-y-5">
                    <p className="font-display text-2xl leading-snug">{p.texto[locale]}</p>
                    <Lista items={p.items.map((it) => it[locale])} className="text-taupe" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      {/* Compra y venta */}
      {s.compraventa.map((cv, idx) => (
        <section
          key={cv.id}
          id={cv.id}
          aria-labelledby={`t-${cv.id}`}
          data-surface={idx === 0 ? undefined : "dark"}
          className={idx === 0 ? "scroll-mt-32 bg-paper-2" : "scroll-mt-32 bg-night text-cream"}
        >
          <Contenedor className="py-24 lg:py-32">
            <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
              <h2 id={`t-${cv.id}`} className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
                {cv.titulo[locale]}
              </h2>
              <p className={idx === 0 ? "max-w-prose text-taupe" : "max-w-prose text-cream/85"}>{cv.intro[locale]}</p>
            </Reveal>

            <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-24">
              {(
                [
                  ["compradores", cv.compradores],
                  ["vendedores", cv.vendedores],
                ] as const
              ).map(([clave, grupos]) => (
                <Reveal key={clave}>
                  <h3 className={`font-display text-3xl font-light italic ${idx === 0 ? "text-brass-deep" : "text-brass-light"}`}>
                    {s.etiquetas[clave][locale]}
                  </h3>
                  <div className={`mt-6 border-t ${idx === 0 ? "border-line" : "border-cream/20"}`}>
                    {grupos.map((g) => (
                      <Desplegable
                        key={g.titulo.es}
                        titulo={g.titulo[locale]}
                        className={idx === 0 ? undefined : "border-cream/20 [&>div]:text-cream/80"}
                      >
                        <Lista items={g.items.map((it) => it[locale])} />
                      </Desplegable>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-16 max-w-2xl font-display text-3xl leading-snug font-light italic">{cv.cierre[locale]}</p>
            </Reveal>
          </Contenedor>
        </section>
      ))}

      {/* Financiamiento */}
      <section id="financiamiento" aria-labelledby="t-fin" className="scroll-mt-32 bg-paper">
        <Contenedor className="py-24 lg:py-32">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <h2 id="t-fin" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {s.financiamiento.titulo[locale]}
            </h2>
            <p className="max-w-prose text-taupe">{s.financiamiento.intro[locale]}</p>
          </Reveal>
          <dl className="mt-16 grid gap-x-24 md:grid-cols-2">
            {s.financiamiento.opciones.map((o) => (
              <Reveal key={o.titulo.es} className="border-t border-line py-8">
                <dt className="font-display text-3xl leading-tight font-medium">{o.titulo[locale]}</dt>
                <dd className="mt-3 max-w-prose text-taupe">{o.texto[locale]}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="mt-10 max-w-3xl border-t border-line pt-8 text-sm text-taupe">{s.financiamiento.cierre[locale]}</p>
          </Reveal>
        </Contenedor>
      </section>

      {/* Seguros */}
      <section id="seguros" aria-labelledby="t-seg" data-surface="dark" className="scroll-mt-32 bg-pine text-cream">
        <Contenedor className="py-24 lg:py-32">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <h2 id="t-seg" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {s.seguros.titulo[locale]}
            </h2>
            <p className="max-w-prose text-cream/85">{s.seguros.intro[locale]}</p>
          </Reveal>
          <ul className="mt-16 grid gap-y-10 border-t border-cream/20 md:grid-cols-2 lg:grid-cols-4">
            {s.seguros.tipos.map((t, i) => (
              <li key={t.titulo.es} className={`pt-8 md:pr-8 ${i > 0 ? "lg:border-l lg:border-cream/20 lg:pl-8" : ""}`}>
                <Reveal delay={i * 0.08}>
                  <h3 className="font-display text-3xl leading-tight font-light text-brass-light italic">{t.titulo[locale]}</h3>
                  <p className="mt-4 text-sm text-cream/85">{t.texto[locale]}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <CtaContacto locale={locale} />
    </>
  );
}
