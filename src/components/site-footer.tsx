import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { contacto, enlaceWhatsApp } from "@/data/contacto";
import { creditosFotos } from "@/data/creditos";

const enlaces = ["nosotros", "servicios", "inversiones", "florida", "propiedades", "contacto"] as const;

export async function SiteFooter({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });
  const anio = 2026;

  return (
    <footer data-surface="dark" className="bg-night text-cream">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 py-20 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-6">
          <Logo tone="dark" className="text-xl" />
          <p className="font-display text-3xl leading-tight font-light italic text-brass-light">{t("pie.lema")}</p>
          <p className="max-w-xs text-sm text-mist">{t("pie.descripcion")}</p>
        </div>

        <nav aria-label={t("pie.navegar")}>
          <h2 className="eyebrow mb-5 text-brass-light">{t("pie.navegar")}</h2>
          <ul className="space-y-3 text-sm">
            {enlaces.map((clave) => (
              <li key={clave}>
                <Link href={`/${clave}`} className="text-cream/90 transition-colors hover:text-brass-light">
                  {t(`nav.${clave}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-5 text-brass-light">{t("pie.contacto")}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={enlaceWhatsApp(t("comun.whatsappMensaje"))}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular text-cream/90 transition-colors hover:text-brass-light"
              >
                WhatsApp {contacto.telefonoVisible}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacto.correo}`} className="text-cream/90 transition-colors hover:text-brass-light">
                {contacto.correo}
              </a>
            </li>
            <li className="text-mist">{contacto.ciudad}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-4 py-6 text-xs text-mist sm:px-8 md:flex-row md:justify-between">
          <p>
            © {anio} ALGI Property. {t("pie.derechos")}
          </p>
          <p>{t("pie.proyecto")}</p>
          <p>
            {t("pie.fotos")}:{" "}
            {creditosFotos.map((c, i) => (
              <span key={c.archivo}>
                {i > 0 && ", "}
                <a href={c.pagina} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brass-light hover:underline">
                  {c.autor}
                </a>
              </span>
            ))}{" "}
            / Unsplash
          </p>
        </div>
      </div>
    </footer>
  );
}
