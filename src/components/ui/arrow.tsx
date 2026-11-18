import { cn } from "@/lib/cn";

/** Flecha dibujada en SVG (trazo de 1.25 px, mismo peso en todo el sitio). */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      className={cn("h-3 w-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)]", className)}
    >
      <path d="M0 6h18M13 1l5 5-5 5" />
    </svg>
  );
}

/** Flecha hacia abajo sobre una base: descarga. Mismo trazo que `Arrow`. */
export function IconoDescarga({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5", className)}
    >
      <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M1 13h12" />
    </svg>
  );
}
