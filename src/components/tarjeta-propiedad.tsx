import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/arrow";
import type { Idioma, Propiedad } from "@/data/propiedades";
import { formatearPrecio } from "@/lib/formato";

/** Tarjeta de inmueble: foto grande, operación y tipo sobre la imagen, nombre y precio debajo. */
export function TarjetaPropiedad({ p, prioridad = false }: { p: Propiedad; prioridad?: boolean }) {
  const t = useTranslations("destacados");
  const locale = useLocale() as Idioma;
  const foto = p.fotos[0];

  return (
    <Link href={`/propiedades/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        <Image
          src={foto.archivo}
          alt={foto.alt[locale]}
          fill
          priority={prioridad}
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-x-0 top-0 flex gap-2 bg-gradient-to-b from-night/70 to-transparent p-4">
          <span className="eyebrow bg-cream px-3 py-1.5 text-night">{t(`operaciones.${p.operacion}`)}</span>
          <span className="eyebrow border border-cream/70 px-3 py-1.5 text-cream">{t(`tipos.${p.tipo}`)}</span>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <p className="eyebrow text-brass-deep">
          {p.ubicacion.barrio[locale]} · {p.ubicacion.ciudad}
        </p>
        <h3 className="font-display text-3xl leading-tight font-medium">{p.nombre[locale]}</h3>
        <p className="font-display text-xl text-taupe tabular">
          {p.precio ? formatearPrecio(p.precio, locale) : t("consultar")}
        </p>
        <span className="eyebrow inline-flex items-center gap-3 border-b border-brass pt-3 pb-2 text-ink transition-colors group-hover:border-ink">
          {t("verFicha")}
          <Arrow className="group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
