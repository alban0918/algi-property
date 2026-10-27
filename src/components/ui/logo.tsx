import { cn } from "@/lib/cn";

interface LogoProps {
  /** `light` para fondos claros, `dark` para fondos oscuros. */
  tone?: "light" | "dark";
  className?: string;
  showSubtitle?: boolean;
}

/** Wordmark de ALGI Property reconstruido en texto, nítido a cualquier tamaño. */
export function Logo({ tone = "light", className, showSubtitle = true }: LogoProps) {
  return (
    <span
      translate="no"
      className={cn(
        "inline-flex flex-col items-center leading-none",
        tone === "dark" ? "text-cream" : "text-taupe",
        className,
      )}
    >
      <span className="font-display text-[1.9em] font-light tracking-[0.12em]">ALGI</span>
      {showSubtitle && " "}
      {showSubtitle && (
        <span className="mt-[0.5em] text-[0.42em] font-normal tracking-[0.42em] uppercase">
          Property
        </span>
      )}
    </span>
  );
}
