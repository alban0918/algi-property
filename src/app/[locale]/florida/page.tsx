import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { CtaContacto } from "@/components/cta-contacto";
import { Reveal } from "@/components/reveal";
import { Contenedor, Desplegable } from "@/components/ui/bloques";
import { Arrow } from "@/components/ui/arrow";
import { florida as f } from "@/content/florida";
import { fijarIdioma, metadatos } from "@/lib/pagina";

export async function generateMetadata({ params }: PageProps<"/[locale]/florida">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, f.titulo, f.lead, "/florida");
}

export default async function Florida({ params }: PageProps<"/[locale]/florida">) {
  const locale = fijarIdioma((await params).locale);
  const fin = f.financiamiento;

  return (
    <>
      <PageHeader
        titulo={f.titulo[locale]}
        tituloCursiva={f.tituloCursiva[locale]}
        lead={f.lead[locale]}
        imagen={{ src: "/images/stock/florida-miami-atardecer.webp", posicion: "object-[50%_55%]" }}
      />

      {/* Financiamiento */}
      <section aria-labelledby="t-fin" className="bg-paper">
        <Contenedor className="py-24 lg:py-32">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <h2 id="t-fin" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {fin.titulo[locale]}
            </h2>
            <p className="max-w-prose text-taupe">{fin.intro[locale]}</p>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <h3 className="font-display text-3xl font-light text-brass-deep italic">{fin.caracteristicasTitulo[locale]}</h3>
              <dl className="mt-6 border-t border-line">
                {fin.caracteristicas.map((c) => (
                  <div key={c.dato.es} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                    <dt className="max-w-[22ch] text-sm text-taupe">{c.detalle[locale]}</dt>
                    <dd className="font-display text-3xl font-medium tabular whitespace-nowrap">{c.dato[locale]}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-14 font-display text-3xl font-light text-brass-deep italic">{fin.otrosTitulo[locale]}</h3>
              <ul className="mt-6 space-y-3 text-sm text-taupe">
                {fin.otros.map((o) => (
                  <li key={o.es} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.85em] h-px w-4 shrink-0 bg-brass" />
                    <span>{o[locale]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-display text-3xl font-light text-brass-deep italic">{fin.pasosTitulo[locale]}</h3>
              <ol className="mt-6 border-t border-line">
                {fin.pasos.map((p, i) => (
                  <li key={p.es} className="flex items-baseline gap-6 border-b border-line py-5">
                    <span aria-hidden="true" className="w-8 font-display text-2xl text-brass tabular">{i + 1}</span>
                    <span className="font-display text-2xl leading-tight">{p[locale]}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="mt-20">
            <div className="border-t border-line">
              <Desplegable titulo={fin.requisitosTitulo[locale]}>
                <ul className="grid gap-x-16 gap-y-3 text-sm md:grid-cols-2">
                  {fin.requisitos.map((r) => (
                    <li key={r.es} className="flex gap-4">
                      <span aria-hidden="true" className="mt-[0.85em] h-px w-4 shrink-0 bg-brass" />
                      <span>{r[locale]}</span>
                    </li>
                  ))}
                </ul>
              </Desplegable>
            </div>
            <p className="mt-8 max-w-3xl text-sm text-taupe">{fin.aviso[locale]}</p>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug">{fin.cierre[locale]}</p>
          </Reveal>
        </Contenedor>
      </section>

      {/* Proyectos y propiedades */}
      <section aria-labelledby="t-proy" data-surface="dark" className="relative isolate overflow-hidden bg-night text-cream">
        <Image src="/images/stock/florida-miami-beach.webp" alt="" fill sizes="100vw" quality={55} className="-z-20 object-cover opacity-70" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/65 to-night/10" />
        <Contenedor className="py-24 lg:py-36">
          <Reveal className="max-w-2xl space-y-8">
            <h2 id="t-proy" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {f.proyectos.titulo[locale]}
            </h2>
            <p className="text-cream/90">{f.proyectos.texto[locale]}</p>
            <a
              href={f.proyectos.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 border-b border-brass-light pb-2 text-[0.6875rem] font-medium tracking-[0.18em] uppercase transition-colors hover:border-cream"
            >
              {f.proyectos.enlace[locale]}
              <Arrow className="group-hover:translate-x-1" />
            </a>
          </Reveal>
        </Contenedor>
      </section>

      {/* Asesoría y aliados */}
      <section aria-labelledby="t-ases" className="bg-paper-2">
        <Contenedor className="grid gap-16 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          <Reveal className="space-y-6">
            <h2 id="t-ases" className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">
              {f.asesoria.titulo[locale]}
            </h2>
            <p className="max-w-prose text-taupe">{f.asesoria.texto[locale]}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="font-display text-3xl font-light text-brass-deep italic">{f.aliados.titulo[locale]}</h3>
            <ul className="mt-6 border-t border-line">
              {f.aliados.items.map((a) => (
                <li key={a.nombre} className="border-b border-line">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="block font-display text-3xl leading-tight font-medium">{a.nombre}</span>
                      <span className="block text-sm text-taupe">{a.rol[locale]} · {a.etiquetaUrl}</span>
                    </span>
                    <Arrow className="group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Contenedor>
      </section>

      <CtaContacto locale={locale} />
    </>
  );
}
