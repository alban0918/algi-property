import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Contenedor, Lista } from "@/components/ui/bloques";
import { privacidad } from "@/content/privacidad";
import { empresa } from "@/data/empresa";
import { enlaceWhatsApp } from "@/data/contacto";
import { tx } from "@/content/tx";
import { fijarIdioma, metadatos } from "@/lib/pagina";

const indice = tx("En esta página", "On this page");

export async function generateMetadata({ params }: PageProps<"/[locale]/privacidad">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, tx("Política de tratamiento de datos", "Data processing policy"), privacidad.lead, "/privacidad");
}

export default async function Privacidad({ params }: PageProps<"/[locale]/privacidad">) {
  const locale = fijarIdioma((await params).locale);
  const p = privacidad;
  const e = p.etiquetas;

  const responsable: { etiqueta: string; valor: ReactNode }[] = [
    { etiqueta: e.razonSocial[locale], valor: empresa.razonSocial },
    ...(empresa.nit ? [{ etiqueta: e.nit[locale], valor: empresa.nit }] : []),
    { etiqueta: e.domicilio[locale], valor: empresa.domicilio },
    ...(empresa.direccion ? [{ etiqueta: e.direccion[locale], valor: empresa.direccion }] : []),
    {
      etiqueta: e.correo[locale],
      valor: (
        <a href={`mailto:${empresa.correoDatos}`} className="underline decoration-brass underline-offset-4 hover:text-brass-deep">
          {empresa.correoDatos}
        </a>
      ),
    },
    {
      etiqueta: e.telefono[locale],
      valor: (
        <a
          href={enlaceWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="tabular underline decoration-brass underline-offset-4 hover:text-brass-deep"
        >
          {empresa.telefonoDatos}
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHeader titulo={p.titulo[locale]} tituloCursiva={p.tituloCursiva[locale]} lead={p.lead[locale]} />

      <section className="bg-paper">
        <Contenedor className="grid gap-14 py-20 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:py-28">
          <nav aria-label={indice[locale]} className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-brass-deep">{indice[locale]}</p>
            <ol className="mt-5 space-y-3 border-l border-line pl-5 text-sm">
              <li>
                <a href="#responsable" className="text-taupe transition-colors hover:text-ink">
                  {p.responsableTitulo[locale]}
                </a>
              </li>
              {p.secciones.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-taupe transition-colors hover:text-ink">
                    {s.titulo[locale]}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-taupe">{p.vigencia[locale]}</p>
          </nav>

          <div className="min-w-0 max-w-prose space-y-16">
            <section id="responsable" aria-labelledby="t-responsable" className="scroll-mt-28">
              <h2 id="t-responsable" className="font-display text-3xl font-light text-brass-deep italic sm:text-4xl">
                {p.responsableTitulo[locale]}
              </h2>
              <dl className="mt-6 border-t border-line">
                {responsable.map((r) => (
                  <div key={r.etiqueta} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="text-sm text-taupe">{r.etiqueta}</dt>
                    <dd className="font-medium break-words">{r.valor}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {p.secciones.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`t-${s.id}`} className="scroll-mt-28">
                <h2 id={`t-${s.id}`} className="font-display text-3xl font-light text-brass-deep italic sm:text-4xl">
                  {s.titulo[locale]}
                </h2>
                <div className="mt-6 space-y-5 text-taupe">
                  {s.intro && <p>{s.intro[locale]}</p>}
                  {s.lista && <Lista items={s.lista.map((l) => l[locale])} className="text-ink/85" />}
                  {s.parrafos?.map((par) => <p key={par.es}>{par[locale]}</p>)}
                </div>
              </section>
            ))}
          </div>
        </Contenedor>
      </section>
    </>
  );
}
