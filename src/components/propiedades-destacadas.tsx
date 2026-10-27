import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Contenedor } from "@/components/ui/bloques";
import { Reveal } from "@/components/reveal";
import { TarjetaPropiedad } from "@/components/tarjeta-propiedad";
import { propiedades, type Idioma } from "@/data/propiedades";
import { cn } from "@/lib/cn";

export async function PropiedadesDestacadas({ locale }: { locale: Idioma }) {
  const t = await getTranslations({ locale, namespace: "destacados" });

  return (
    <section id="propiedades" aria-labelledby="titulo-destacados" className="scroll-mt-20 bg-paper">
      <Contenedor className="py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 id="titulo-destacados" className="text-[length:var(--text-title)] leading-[1.02] font-light">
            {t("titulo")}
          </h2>
          <p className="max-w-sm text-taupe">{t("descripcion")}</p>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {propiedades.map((p, i) => (
            <li key={p.slug} className={cn(i === 1 && "md:mt-16", i === 2 && "md:mt-32")}>
              <Reveal delay={i * 0.1}>
                <TarjetaPropiedad p={p} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex md:mt-28 md:justify-center">
          <Button href={`/${locale}/propiedades`} variante="contorno">
            {t("verTodas")}
          </Button>
        </div>
      </Contenedor>
    </section>
  );
}
