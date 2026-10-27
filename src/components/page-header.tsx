import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  titulo: string;
  /** Segunda línea del título en cursiva y latón. */
  tituloCursiva?: string;
  lead?: string;
  imagen?: { src: string; posicion?: string; gris?: boolean };
  children?: ReactNode;
}

/** Cabecera oscura de página interna. El título es el elemento principal; la foto es atmósfera. */
export function PageHeader({ titulo, tituloCursiva, lead, imagen, children }: PageHeaderProps) {
  return (
    <section data-surface="dark" className="relative isolate overflow-hidden bg-night text-cream">
      {imagen && (
        <>
          <Image
            src={imagen.src}
            alt=""
            fill
            priority
            quality={55}
            sizes="100vw"
            className={cn("-z-20 object-cover", imagen.posicion, imagen.gris && "opacity-70 grayscale")}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/80 via-night/35 to-night/95" />
          {imagen.gris && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brass/25 mix-blend-multiply" />}
        </>
      )}
      <div className="mx-auto max-w-[90rem] px-4 pt-36 pb-16 sm:px-8 sm:pt-44 sm:pb-24">
        <h1 className="max-w-5xl font-display text-[length:var(--text-headline)] leading-[0.95] font-light tracking-[-0.02em]">
          <span className="rise-mask">
            <span className="rise block [animation-delay:0.1s]">{titulo}</span>
          </span>
          {tituloCursiva && (
            <span className="rise-mask">
              <span className="rise block pb-[0.12em] font-normal text-brass-light italic [animation-delay:0.25s]">
                {tituloCursiva}
              </span>
            </span>
          )}
        </h1>
        {lead && <p className="fade-up mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-cream/90 [animation-delay:0.7s]">{lead}</p>}
        {children && <div className="fade-up mt-10 [animation-delay:0.9s]">{children}</div>}
      </div>
    </section>
  );
}
