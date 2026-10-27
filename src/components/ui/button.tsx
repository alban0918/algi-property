import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/arrow";

type Variante = "solido" | "contorno" | "enlace";
type Superficie = "claro" | "oscuro";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variante?: Variante;
  superficie?: Superficie;
  children: ReactNode;
}

const base =
  "group relative inline-flex min-h-11 items-center justify-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] cursor-pointer";

const estilos: Record<Variante, Record<Superficie, string>> = {
  solido: {
    claro: "bg-ink text-paper px-7 py-3.5 hover:bg-taupe",
    oscuro: "bg-cream text-night px-7 py-3.5 hover:bg-brass-light",
  },
  contorno: {
    claro: "border border-ink text-ink px-7 py-3.5 hover:bg-ink hover:text-paper",
    oscuro: "border border-brass-light text-cream px-7 py-3.5 hover:bg-brass-light hover:text-night",
  },
  enlace: {
    claro: "text-ink pb-2 border-b border-brass hover:border-ink",
    oscuro: "text-cream pb-2 border-b border-brass-light hover:border-cream",
  },
};

/** Botón de marca. Se renderiza como enlace porque en este sitio cada acción navega o abre un canal de contacto. */
export function Button({
  variante = "solido",
  superficie = "claro",
  className,
  children,
  ...resto
}: ButtonProps) {
  return (
    <a className={cn(base, estilos[variante][superficie], className)} {...resto}>
      {children}
      {variante === "enlace" && <Arrow className="group-hover:translate-x-1" />}
    </a>
  );
}
