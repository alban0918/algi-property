"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Foto, Idioma } from "@/data/propiedades";
import { cn } from "@/lib/cn";

/** Galería de un inmueble: foto principal, tira de miniaturas y vista ampliada accesible (dialog). */
export function GaleriaFicha({ fotos }: { fotos: Foto[] }) {
  const t = useTranslations("ficha");
  const locale = useLocale() as Idioma;
  const [actual, setActual] = useState(0);
  const dialogo = useRef<HTMLDialogElement>(null);
  const total = fotos.length;
  const foto = fotos[actual];

  const mover = (delta: number) => setActual((i) => (i + delta + total) % total);

  // Navegación con flechas del teclado dentro de la vista ampliada.
  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (!d.open) return;
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const Etiqueta = foto.ilustrativa ? (
    <span className="eyebrow absolute bottom-4 left-4 bg-night/80 px-3 py-1.5 text-cream">{t("ilustrativa")}</span>
  ) : null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => dialogo.current?.showModal()}
        aria-label={`${t("ampliar")}: ${foto.alt[locale]}`}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-night sm:aspect-[16/9]"
      >
        <Image
          key={foto.archivo}
          src={foto.archivo}
          alt={foto.alt[locale]}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        {Etiqueta}
      </button>

      <ul className="flex gap-3 overflow-x-auto pb-2" aria-label={t("miniaturas")}>
        {fotos.map((f, i) => (
          <li key={f.archivo} className="shrink-0">
            <button
              type="button"
              onClick={() => setActual(i)}
              aria-label={t("fotoN", { n: i + 1, total })}
              aria-current={i === actual}
              className={cn(
                "relative block h-20 w-28 cursor-pointer overflow-hidden transition-opacity duration-300 sm:h-24 sm:w-36",
                i === actual ? "opacity-100 outline outline-2 outline-offset-2 outline-brass-deep" : "opacity-60 hover:opacity-100",
              )}
            >
              <Image src={f.archivo} alt="" fill sizes="144px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        data-lenis-prevent
        aria-label={foto.alt[locale]}
        onClick={(e) => e.target === dialogo.current && dialogo.current?.close()}
        className="m-auto h-[100dvh] max-h-none w-screen max-w-none bg-night/95 p-0 text-cream backdrop:bg-night"
      >
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <p className="eyebrow tabular">{t("fotoN", { n: actual + 1, total })}</p>
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="eyebrow min-h-11 cursor-pointer border border-cream/40 px-5 transition-colors hover:bg-cream hover:text-night"
            >
              {t("cerrar")}
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image src={foto.archivo} alt={foto.alt[locale]} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-8">
            <button
              type="button"
              onClick={() => mover(-1)}
              className="eyebrow min-h-11 cursor-pointer border border-cream/40 px-5 transition-colors hover:bg-cream hover:text-night"
            >
              {t("anterior")}
            </button>
            {foto.ilustrativa && <p className="eyebrow text-brass-light">{t("ilustrativa")}</p>}
            <button
              type="button"
              onClick={() => mover(1)}
              className="eyebrow min-h-11 cursor-pointer border border-cream/40 px-5 transition-colors hover:bg-cream hover:text-night"
            >
              {t("siguiente")}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
