"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { Logo } from "@/components/ui/logo";
import { enlaceWhatsApp } from "@/data/contacto";
import { cn } from "@/lib/cn";

const enlaces = [
  { clave: "nosotros", href: "/nosotros" },
  { clave: "servicios", href: "/servicios" },
  { clave: "inversiones", href: "/inversiones" },
  { clave: "florida", href: "/florida" },
  { clave: "propiedades", href: "/propiedades" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 40);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // Con el menú móvil abierto: Escape lo cierra y se bloquea el scroll de la página.
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const whatsapp = enlaceWhatsApp(t("comun.whatsappMensaje"));

  return (
    <>
      <header
        data-surface="dark"
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-cream transition-[background-color,backdrop-filter] duration-500",
          conFondo || abierto ? "bg-night/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-8 lg:h-20">
          <Link href="/" aria-label="ALGI Property" className="text-[0.95rem]">
            <Logo tone="dark" />
          </Link>

          <nav aria-label={t("comun.navegacionPrincipal")} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {enlaces.map(({ clave, href }) => {
                const activo = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={clave}>
                    <Link
                      href={href}
                      aria-current={activo ? "page" : undefined}
                      className="eyebrow relative block py-2 text-cream/90 transition-colors duration-300 hover:text-brass-light after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-brass-light after:transition-transform after:duration-500 after:ease-[var(--ease-out-expo)] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                    >
                      {t(`nav.${clave}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow hidden min-h-11 items-center border border-brass-light px-5 text-cream transition-colors duration-300 hover:bg-brass-light hover:text-night xl:inline-flex"
            >
              {t("comun.hablemos")}
            </a>
            <LanguageSwitch />
            <button
              type="button"
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? t("comun.cerrarMenu") : t("comun.abrirMenu")}
              onClick={() => setAbierto((v) => !v)}
              className="flex size-11 cursor-pointer flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-6 bg-cream transition-transform duration-300",
                  abierto && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-cream transition-transform duration-300",
                  abierto && "-translate-y-[4px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        data-surface="dark"
        id="menu-movil"
        data-lenis-prevent
        hidden={!abierto}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-night px-6 pt-10 pb-10 lg:hidden"
      >
        <ul className="flex flex-col">
          {enlaces.map(({ clave, href }) => (
            <li key={clave} className="border-b border-cream/15">
              <Link
                href={href}
                onClick={() => setAbierto(false)}
                className="block py-5 font-display text-4xl font-light text-cream"
              >
                {t(`nav.${clave}`)}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow mt-10 inline-flex min-h-12 items-center border border-brass-light px-7 text-cream"
        >
          {t("comun.hablemos")}
        </a>
      </div>
    </>
  );
}
