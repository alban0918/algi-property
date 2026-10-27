import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { FormularioContacto } from "@/components/formulario-contacto";
import { Reveal } from "@/components/reveal";
import { Contenedor } from "@/components/ui/bloques";
import { contacto, enlaceWhatsApp } from "@/data/contacto";
import { tx } from "@/content/tx";
import { fijarIdioma, metadatos } from "@/lib/pagina";

const titulo = tx("Contacto", "Contact");
const descripcion = tx(
  "Escríbenos por WhatsApp o correo. Atención 24/7 para compra, venta, alquiler e inversión en Cali y la Florida.",
  "Reach us on WhatsApp or email. 24/7 support for buying, selling, renting and investing in Cali and Florida.",
);

export async function generateMetadata({ params }: PageProps<"/[locale]/contacto">) {
  const locale = fijarIdioma((await params).locale);
  return metadatos(locale, titulo, descripcion, "/contacto");
}

export default async function Contacto({ params }: PageProps<"/[locale]/contacto">) {
  const locale = fijarIdioma((await params).locale);
  const t = await getTranslations({ locale, namespace: "contacto" });
  const tc = await getTranslations({ locale, namespace: "comun" });

  return (
    <>
      <PageHeader titulo={t("titulo")} tituloCursiva={t("tituloCursiva")} lead={t("lead")} />
      <section className="bg-paper">
        <Contenedor className="grid gap-16 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-24 lg:py-28">
          <Reveal className="space-y-10">
            <div>
              <h2 className="font-display text-3xl font-light text-brass-deep italic">WhatsApp</h2>
              <a
                href={enlaceWhatsApp(tc("whatsappMensaje"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-display text-4xl leading-tight font-light underline decoration-brass decoration-1 underline-offset-8 transition-colors hover:text-brass-deep tabular sm:text-5xl"
              >
                {contacto.telefonoVisible}
              </a>
            </div>
            <div>
              <h2 className="font-display text-3xl font-light text-brass-deep italic">{t("correo")}</h2>
              <a
                href={`mailto:${contacto.correo}`}
                className="mt-3 inline-block font-display text-3xl leading-tight font-light underline decoration-brass decoration-1 underline-offset-8 transition-colors hover:text-brass-deep sm:text-4xl"
              >
                {contacto.correo}
              </a>
            </div>
            <div>
              <h2 className="font-display text-3xl font-light text-brass-deep italic">{t("donde")}</h2>
              <p className="mt-3 text-taupe">{contacto.ciudad}</p>
              <p className="text-taupe">{t("disponibilidad")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="font-display text-[length:var(--text-title)] leading-[1.05] font-light">{t("formTitulo")}</h2>
            <div className="mt-10">
              <FormularioContacto />
            </div>
          </Reveal>
        </Contenedor>
      </section>
    </>
  );
}
