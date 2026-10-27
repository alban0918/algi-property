import { getTranslations } from "next-intl/server";

/** Cinta de servicios que corre en bucle. Decorativa: el contenido real está en las páginas de servicios. */
export async function Cinta({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const items = t.raw("cinta") as string[];
  const fila = items.map((item) => (
    <span key={item} className="flex items-center gap-10 pr-10">
      <span>{item}</span>
      <span aria-hidden="true" className="text-brass-light">·</span>
    </span>
  ));

  return (
    <div aria-hidden="true" data-surface="dark" className="overflow-hidden bg-pine py-4 whitespace-nowrap text-cream">
      <div className="marquee-track font-display text-[1.5rem] font-light italic sm:text-[1.75rem]">
        <div className="flex">{fila}</div>
        <div className="flex">{fila}</div>
      </div>
    </div>
  );
}
