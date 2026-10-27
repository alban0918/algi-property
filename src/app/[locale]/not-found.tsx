import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/arrow";
import { Contenedor } from "@/components/ui/bloques";

/** 404 dentro del diseño del sitio y en el idioma del visitante. */
export default function NoEncontrado() {
  const t = useTranslations("noEncontrado");

  return (
    <section data-surface="dark" className="bg-night text-cream">
      <Contenedor className="flex min-h-[80svh] flex-col justify-center gap-8 pt-32 pb-20">
        <p className="font-display text-[length:var(--text-display)] leading-none font-light text-brass-light italic">404</p>
        <h1 className="max-w-3xl font-display text-[length:var(--text-title)] leading-[1.05] font-light">{t("titulo")}</h1>
        <p className="max-w-md text-cream/85">{t("texto")}</p>
        <Link
          href="/"
          className="group eyebrow inline-flex min-h-11 w-max items-center gap-3 border-b border-brass-light pb-2 text-cream transition-colors hover:border-cream"
        >
          {t("volver")}
          <Arrow className="group-hover:translate-x-1" />
        </Link>
      </Contenedor>
    </section>
  );
}
