import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { CtaContacto } from "@/components/cta-contacto";
import { Catalogo } from "@/components/catalogo";
import { Contenedor } from "@/components/ui/bloques";
import { TarjetaPropiedad } from "@/components/tarjeta-propiedad";
import { propiedades } from "@/data/propiedades";
import { tx } from "@/content/tx";
import { fijarIdioma, metadatos } from "@/lib/pagina";

const titulo = tx("Propiedades", "Properties");
const descripcion = tx(
  "Inmuebles en venta y alquiler en Cali y Yumbo: casa, bodega industrial y edificio.",
  "Properties for sale and rent in Cali and Yumbo: a house, an industrial warehouse and an apartment building.",
);

export async function generateMetadata({ params }: PageProps<"/[locale]/propiedades">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, titulo, descripcion, "/propiedades");
}

export default async function Propiedades({ params }: PageProps<"/[locale]/propiedades">) {
  const locale = fijarIdioma((await params).locale);
  const t = await getTranslations({ locale, namespace: "catalogo" });

  return (
    <>
      <PageHeader titulo={t("titulo")} tituloCursiva={t("tituloCursiva")} lead={t("lead")} />
      <section className="bg-paper">
        <Contenedor className="py-16 lg:py-24">
          <h2 className="sr-only">{t("resultadosTitulo")}</h2>
          {/* useSearchParams exige Suspense; el respaldo muestra la lista completa ya renderizada. */}
          <Suspense
            fallback={
              <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {propiedades.map((p) => (
                  <li key={p.slug}>
                    <TarjetaPropiedad p={p} />
                  </li>
                ))}
              </ul>
            }
          >
            <Catalogo />
          </Suspense>
        </Contenedor>
      </section>
      <CtaContacto locale={locale} />
    </>
  );
}
