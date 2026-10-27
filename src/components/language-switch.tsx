"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Selector ES / EN: un clic cambia el idioma y conserva la página actual. */
export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslations("comun");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pendiente, iniciar] = useTransition();

  function cambiar(nuevo: Locale) {
    if (nuevo === locale) return;
    iniciar(() => router.replace(pathname, { locale: nuevo }));
  }

  return (
    <div
      role="group"
      aria-label={t("cambiarIdioma")}
      className={cn(
        "inline-flex items-center rounded-full border border-cream/50 p-[3px] transition-opacity",
        pendiente && "opacity-60",
        className,
      )}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => cambiar(l)}
          className={cn(
            "min-h-9 min-w-11 cursor-pointer rounded-full px-3 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
            l === locale ? "bg-cream text-night" : "text-cream hover:text-brass-light",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
