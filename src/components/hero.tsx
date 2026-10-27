"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";

/** Portada a pantalla completa: foto con zoom lento, parallax al desplazar y titular que sube desde una máscara. */
export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const sinMovimiento = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yFoto = useTransform(scrollYProgress, [0, 1], ["0%", sinMovimiento ? "0%" : "16%"]);
  const yTexto = useTransform(scrollYProgress, [0, 1], ["0%", sinMovimiento ? "0%" : "-14%"]);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, sinMovimiento ? 1 : 0]);

  return (
    <section
      ref={ref}
      data-surface="dark"
      className="relative isolate flex min-h-[640px] h-[100svh] flex-col justify-between overflow-hidden bg-night text-cream"
    >
      <motion.div aria-hidden="true" style={{ y: yFoto }} className="absolute -inset-y-[8%] inset-x-0 -z-20">
        <div className="slow-zoom relative h-full w-full">
          <Image
            src="/images/stock/hero-casa-atardecer.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_88%]"
          />
        </div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/90 via-night/35 via-50% to-night/85" />

      <motion.div style={{ y: yTexto, opacity: opacidad }} className="px-4 pt-28 sm:px-8 sm:pt-32 lg:pt-36">
        <h1 key={locale} className="font-display text-[length:var(--text-display)] leading-[0.9] tracking-[-0.02em]">
          <span className="rise-mask">
            <span className="rise font-light uppercase [animation-delay:0.1s]">{t("linea1")}</span>
          </span>
          <span className="rise-mask pl-[3vw] sm:pl-[5vw]">
            <span className="rise pb-[0.14em] font-normal text-brass-light italic [animation-delay:0.28s]">
              {t("linea2")}
            </span>
          </span>
        </h1>
      </motion.div>

      <div className="flex flex-col gap-8 px-4 pb-8 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-10">
        <div aria-hidden="true" className="fade-up hidden items-center gap-4 [animation-delay:1s] sm:flex">
          <span className="block h-12 w-px origin-top animate-pulse bg-brass-light" />
          <span className="eyebrow text-cream/80">{t("bajar")}</span>
        </div>
        <div className="fade-up max-w-sm space-y-6 [animation-delay:0.9s]">
          <p className="text-[0.9375rem] leading-relaxed text-cream">{t("descripcion")}</p>
          <Button href="#propiedades" variante="enlace" superficie="oscuro">
            {t("explorar")}
          </Button>
        </div>
      </div>
    </section>
  );
}
