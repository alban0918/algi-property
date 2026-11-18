"use client";

import { useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Idioma } from "@/data/propiedades";
import { enlaceWhatsApp } from "@/data/contacto";
import { IconoDescarga } from "@/components/ui/arrow";
import { clasesBoton } from "@/components/ui/button";
import { campo } from "@/components/ui/campo";
import { paises, paisPorDefecto, validarInteresado, type CampoInteresado } from "@/lib/interesado";
import { cn } from "@/lib/cn";

const CLAVE_GUARDADO = "algi:interesado";

interface Guardado {
  nombre: string;
  pais: string;
  telefono: string;
  correo: string;
}

type ErrorGeneral = "rapido" | "frecuencia" | "servidor";

const ejemploTelefono: Record<string, string> = {
  CO: "300 123 4567",
  US: "305 555 0123",
  OT: "+44 20 7946 0958",
};

function leerGuardado(): Guardado | null {
  try {
    const crudo = window.localStorage.getItem(CLAVE_GUARDADO);
    return crudo ? (JSON.parse(crudo) as Guardado) : null;
  } catch {
    return null;
  }
}

function guardar(datos: Guardado) {
  try {
    window.localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(datos));
  } catch {
    // Sin almacenamiento (modo privado o bloqueado): la próxima vez se piden de nuevo.
  }
}

interface Props {
  slug: string;
  /** Nombre del inmueble en el idioma de la página. */
  nombre: string;
  /** Mensaje de WhatsApp sobre el inmueble, para el caso de error. */
  mensajeWhatsApp: string;
  etiqueta: string;
  className?: string;
}

/**
 * Botón "Descargar ficha técnica" con su ventana de datos: la persona deja nombre y teléfono
 * (correo opcional), autoriza el tratamiento y recibe un enlace temporal al PDF.
 */
export function DescargaFicha({ slug, nombre, mensajeWhatsApp, etiqueta, className }: Props) {
  const t = useTranslations("descarga");
  const locale = useLocale() as Idioma;
  const dialogo = useRef<HTMLDialogElement>(null);
  const formulario = useRef<HTMLFormElement>(null);
  const tituloListo = useRef<HTMLHeadingElement>(null);
  const abiertoEn = useRef(0);

  const [apertura, setApertura] = useState(0);
  const [inicial, setInicial] = useState<Guardado | null>(null);
  const [pais, setPais] = useState(paisPorDefecto[locale]);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<CampoInteresado[]>([]);
  const [errorGeneral, setErrorGeneral] = useState<ErrorGeneral | null>(null);
  const [listo, setListo] = useState<{ enlace: string; nombre: string } | null>(null);

  function abrir() {
    const g = leerGuardado();
    setInicial(g);
    setPais(g?.pais && paises.some((p) => p.codigo === g.pais) ? g.pais : paisPorDefecto[locale]);
    setErrores([]);
    setErrorGeneral(null);
    setListo(null);
    setEnviando(false);
    setApertura((n) => n + 1);
    abiertoEn.current = performance.now();
    dialogo.current?.showModal();
  }

  const cerrar = () => dialogo.current?.close();

  function enfocarPrimerError(campos: CampoInteresado[]) {
    const orden: CampoInteresado[] = ["nombre", "telefono", "correo", "autorizacion"];
    const primero = orden.find((c) => campos.includes(c));
    if (primero) formulario.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
  }

  async function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    const fd = new FormData(e.currentTarget);
    const entrada = {
      nombre: String(fd.get("nombre") ?? ""),
      pais,
      telefono: String(fd.get("telefono") ?? ""),
      correo: String(fd.get("correo") ?? ""),
      autorizacion: fd.get("autorizacion") === "on",
    };

    const v = validarInteresado(entrada);
    setErrorGeneral(null);
    if (!v.ok) {
      setErrores(v.errores);
      enfocarPrimerError(v.errores);
      return;
    }
    setErrores([]);
    setEnviando(true);

    try {
      const r = await fetch("/api/interesados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...entrada,
          slug,
          idioma: locale,
          t: Math.round(performance.now() - abiertoEn.current),
          sitio: String(fd.get("sitio") ?? ""),
        }),
      });
      const j = (await r.json().catch(() => null)) as { ok?: boolean; enlace?: string; codigo?: string; campos?: CampoInteresado[] } | null;

      if (r.ok && j?.ok && j.enlace) {
        guardar({ nombre: v.datos.nombre, pais, telefono: entrada.telefono.trim(), correo: entrada.correo.trim() });
        setListo({ enlace: j.enlace, nombre: v.datos.nombre.split(" ")[0] });
        window.location.assign(j.enlace);
        requestAnimationFrame(() => tituloListo.current?.focus());
      } else if (r.status === 422 && j?.campos?.length) {
        setErrores(j.campos);
        enfocarPrimerError(j.campos);
      } else {
        setErrorGeneral(j?.codigo === "rapido" || j?.codigo === "frecuencia" ? j.codigo : "servidor");
      }
    } catch {
      setErrorGeneral("servidor");
    } finally {
      setEnviando(false);
    }
  }

  const tieneError = (c: CampoInteresado) => errores.includes(c);
  const paisActual = paises.find((p) => p.codigo === pais);

  return (
    <>
      <button type="button" onClick={abrir} aria-haspopup="dialog" className={clasesBoton("contorno", "claro", className)}>
        <IconoDescarga />
        {etiqueta}
      </button>

      <dialog
        ref={dialogo}
        data-lenis-prevent
        aria-labelledby="t-descarga"
        onClick={(e) => e.target === dialogo.current && cerrar()}
        className="descarga m-auto max-h-[calc(100dvh-2rem)] w-[min(35rem,calc(100vw-2rem))] max-w-none overflow-y-auto bg-paper p-0 text-ink shadow-[0_40px_90px_-30px_rgba(14,26,24,0.55)] backdrop:bg-night/75"
      >
        <div className="relative px-6 pt-8 pb-8 sm:px-10 sm:pt-11 sm:pb-10">
          <button
            type="button"
            onClick={cerrar}
            aria-label={t("cerrar")}
            className="absolute top-2 right-2 grid size-11 cursor-pointer place-items-center text-taupe transition-colors hover:text-ink sm:top-4 sm:right-4"
          >
            <svg aria-hidden="true" viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>

          {listo ? (
            <div role="status" className="pr-6">
              <p className="eyebrow text-brass-deep">{t("listoEyebrow")}</p>
              <h2
                id="t-descarga"
                ref={tituloListo}
                tabIndex={-1}
                className="mt-3 font-display text-[2rem] leading-[1.05] font-light outline-none sm:text-[2.5rem]"
              >
                {t("listoTitulo")}
              </h2>
              <p className="mt-4 text-taupe">{t("listoTexto", { nombre: listo.nombre })}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={listo.enlace} className={clasesBoton("solido", "claro", "w-full sm:w-auto")}>
                  <IconoDescarga />
                  {t("descargarOtraVez")}
                </a>
                <button type="button" onClick={cerrar} className={clasesBoton("contorno", "claro", "w-full sm:w-auto")}>
                  {t("cerrar")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="eyebrow pr-8 text-brass-deep">{t("eyebrow")}</p>
              <h2 id="t-descarga" className="mt-3 pr-6 font-display text-[2rem] leading-[1.05] font-light sm:text-[2.5rem]">
                {nombre}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-taupe">{t("intro")}</p>

              <form key={apertura} ref={formulario} onSubmit={alEnviar} noValidate className="mt-8 space-y-7">
                {/* Campo trampa: oculto para las personas, los robots lo rellenan. */}
                <div aria-hidden="true" className="sr-only">
                  <label>
                    Sitio web
                    <input type="text" name="sitio" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                <div>
                  <label htmlFor={`df-nombre-${slug}`} className="eyebrow text-taupe">
                    {t("nombre")}
                  </label>
                  <input
                    id={`df-nombre-${slug}`}
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={80}
                    autoFocus
                    defaultValue={inicial?.nombre ?? ""}
                    aria-invalid={tieneError("nombre") || undefined}
                    aria-describedby={tieneError("nombre") ? `df-e-nombre-${slug}` : undefined}
                    className={cn(campo, tieneError("nombre") && "border-red-700")}
                  />
                  {tieneError("nombre") && (
                    <p id={`df-e-nombre-${slug}`} className="mt-2 text-sm text-red-800">
                      {t("errores.nombre")}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="eyebrow text-taupe">{t("telefono")}</legend>
                  <div className="grid grid-cols-[minmax(0,8.75rem)_minmax(0,1fr)] gap-4">
                    <select
                      aria-label={t("indicativo")}
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                      autoComplete="tel-country-code"
                      className={cn(campo, "cursor-pointer tabular")}
                    >
                      {paises.map((p) => (
                        <option key={p.codigo} value={p.codigo}>
                          {p.prefijo ? `+${p.prefijo} · ${p.nombre[locale]}` : p.nombre[locale]}
                        </option>
                      ))}
                    </select>
                    <input
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete={paisActual?.prefijo ? "tel-national" : "tel"}
                      required
                      maxLength={24}
                      aria-label={t("telefono")}
                      placeholder={ejemploTelefono[pais] ?? ""}
                      defaultValue={inicial?.telefono ?? ""}
                      aria-invalid={tieneError("telefono") || undefined}
                      aria-describedby={cn(tieneError("telefono") && `df-e-telefono-${slug}`, pais === "OT" && `df-a-telefono-${slug}`) || undefined}
                      className={cn(campo, "tabular", tieneError("telefono") && "border-red-700")}
                    />
                  </div>
                  {pais === "OT" && (
                    <p id={`df-a-telefono-${slug}`} className="mt-2 text-sm text-taupe">
                      {t("telefonoAyuda")}
                    </p>
                  )}
                  {tieneError("telefono") && (
                    <p id={`df-e-telefono-${slug}`} className="mt-2 text-sm text-red-800">
                      {t("errores.telefono")}
                    </p>
                  )}
                </fieldset>

                <div>
                  <label htmlFor={`df-correo-${slug}`} className="eyebrow text-taupe">
                    {t("correo")}
                  </label>
                  <input
                    id={`df-correo-${slug}`}
                    name="correo"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    maxLength={120}
                    defaultValue={inicial?.correo ?? ""}
                    aria-invalid={tieneError("correo") || undefined}
                    aria-describedby={tieneError("correo") ? `df-e-correo-${slug}` : undefined}
                    className={cn(campo, tieneError("correo") && "border-red-700")}
                  />
                  {tieneError("correo") && (
                    <p id={`df-e-correo-${slug}`} className="mt-2 text-sm text-red-800">
                      {t("errores.correo")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id={`df-autorizacion-${slug}`}
                      name="autorizacion"
                      type="checkbox"
                      aria-invalid={tieneError("autorizacion") || undefined}
                      aria-describedby={tieneError("autorizacion") ? `df-e-autorizacion-${slug}` : undefined}
                      className={cn(
                        "mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-brass-deep)]",
                        tieneError("autorizacion") && "outline outline-2 outline-offset-2 outline-red-700",
                      )}
                    />
                    <label htmlFor={`df-autorizacion-${slug}`} className="cursor-pointer text-sm leading-relaxed text-taupe">
                      {t("autorizacionAntes")}{" "}
                      <Link
                        href="/privacidad"
                        target="_blank"
                        className="text-ink underline decoration-brass underline-offset-4 transition-colors hover:text-brass-deep"
                      >
                        {t("autorizacionEnlace")}
                      </Link>
                      .
                    </label>
                  </div>
                  {tieneError("autorizacion") && (
                    <p id={`df-e-autorizacion-${slug}`} className="mt-2 text-sm text-red-800">
                      {t("errores.autorizacion")}
                    </p>
                  )}
                </div>

                {errorGeneral && (
                  <div role="alert" className="border-l-2 border-red-700 bg-paper-2 px-4 py-3 text-sm">
                    <p className="text-ink">{t(`errores.${errorGeneral}`)}</p>
                    {errorGeneral === "servidor" && (
                      <a
                        href={enlaceWhatsApp(mensajeWhatsApp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block font-medium underline decoration-brass underline-offset-4 hover:text-brass-deep"
                      >
                        {t("errores.whatsapp")}
                      </a>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    type="submit"
                    aria-disabled={enviando || undefined}
                    className={clasesBoton("solido", "claro", cn("w-full", enviando && "cursor-progress bg-taupe"))}
                  >
                    {enviando ? (
                      <>
                        <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border border-paper/40 border-t-paper" />
                        {t("enviando")}
                      </>
                    ) : (
                      <>
                        <IconoDescarga />
                        {t("enviar")}
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-taupe">{t("privado")}</p>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
