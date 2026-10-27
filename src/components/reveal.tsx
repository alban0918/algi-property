import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Se conserva por compatibilidad; la entrada se rige por el scroll, no por un retardo. */
  delay?: number;
  className?: string;
}

/**
 * Entrada suave al llegar a la pantalla, hecha solo con CSS (`animation-timeline: view()`, ver globals.css).
 * El contenido existe y es visible en el HTML inicial: no depende de JavaScript ni de la hidratación,
 * y en navegadores sin esa función simplemente se muestra sin animar.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
