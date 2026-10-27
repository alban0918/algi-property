import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Ancho máximo y márgenes laterales comunes a todas las secciones. */
export function Contenedor({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[90rem] px-4 sm:px-8", className)}>{children}</div>;
}

/** Lista con guion de latón como marcador. */
export function Lista({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-[0.85em] h-px w-4 shrink-0 bg-brass" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Bloque desplegable sin JavaScript (details/summary) con indicador + / −. */
export function Desplegable({ titulo, children, className }: { titulo: string; children: ReactNode; className?: string }) {
  return (
    <details className={cn("group border-b border-line", className)}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-2xl leading-tight font-medium marker:hidden [&::-webkit-details-marker]:hidden">
        <span>{titulo}</span>
        <span aria-hidden="true" className="relative block size-4 shrink-0">
          <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
          <span className="absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-6 text-taupe">{children}</div>
    </details>
  );
}
