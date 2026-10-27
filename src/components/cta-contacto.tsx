import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { contacto, enlaceWhatsApp } from "@/data/contacto";

/** Cierre de página: una sola acción clara, hablar con Algi. */
export async function CtaContacto({ locale, mensaje }: { locale: string; mensaje?: string }) {
  const t = await getTranslations({ locale, namespace: "cta" });
  const texto = mensaje ?? (await getTranslations({ locale, namespace: "comun" }))("whatsappMensaje");

  return (
    <section data-surface="dark" className="bg-pine text-cream">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <Reveal>
          <h2 className="font-display text-[length:var(--text-title)] leading-[1.02] font-light">
            {t("titulo")} <span className="text-brass-light italic">{t("tituloCursiva")}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="space-y-6">
          <p className="max-w-md text-cream/90">{t("texto")}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={enlaceWhatsApp(texto)} target="_blank" rel="noopener noreferrer" superficie="oscuro">
              {t("whatsapp")}
            </Button>
            <a
              href={`mailto:${contacto.correo}`}
              className="text-sm text-cream/90 underline decoration-brass-light underline-offset-4 transition-colors hover:text-brass-light"
            >
              {contacto.correo}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
