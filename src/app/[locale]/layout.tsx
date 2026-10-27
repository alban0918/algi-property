import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import { urlSitio } from "@/lib/sitio";
import "../globals.css";

// Se cargan pesos estáticos concretos: en pruebas pesaron menos que las fuentes variables (LCP de portada 2,1 s frente a 3,1 s).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0e1a18",
};

export function generateMetadata(): Metadata {
  return { metadataBase: new URL(urlSitio) };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "comun" });

  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen">
        <NextIntlClientProvider>
          <a href="#contenido" className="skip-link">
            {t("saltar")}
          </a>
          <JsonLd locale={locale} />
          <SmoothScroll />
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
