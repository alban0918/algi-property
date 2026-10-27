"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { contacto, enlaceWhatsApp } from "@/data/contacto";
import { cn } from "@/lib/cn";

const intereses = ["comprar", "vender", "alquilar", "invertirCali", "invertirFlorida", "asesoria", "otro"] as const;

const campo =
  "w-full border-0 border-b border-ink/40 bg-transparent py-3 text-[1rem] text-ink placeholder:text-taupe/70 focus:border-brass-deep focus:shadow-[0_1px_0_0_var(--color-brass-deep)] focus:outline-none";

/**
 * Formulario sin servidor: compone el mensaje y abre WhatsApp (o el correo) con el texto listo para enviar.
 * No guarda ni transmite datos por sí mismo.
 */
export function FormularioContacto() {
  const t = useTranslations("contacto.form");
  const [errores, setErrores] = useState<{ nombre?: boolean; mensaje?: boolean }>({});

  function leer(form: HTMLFormElement) {
    const d = new FormData(form);
    const nombre = String(d.get("nombre") ?? "").trim();
    const correo = String(d.get("correo") ?? "").trim();
    const interes = String(d.get("interes") ?? "");
    const mensaje = String(d.get("mensaje") ?? "").trim();
    return { nombre, correo, interes, mensaje };
  }

  function componer(v: ReturnType<typeof leer>) {
    const lineas = [t("saludo", { nombre: v.nombre })];
    if (v.interes) lineas.push(t("lineaInteres", { interes: t(`intereses.${v.interes}`) }));
    lineas.push(v.mensaje);
    if (v.correo) lineas.push(t("lineaCorreo", { correo: v.correo }));
    return lineas.join("\n\n");
  }

  function validar(v: ReturnType<typeof leer>, form: HTMLFormElement) {
    const e = { nombre: !v.nombre, mensaje: !v.mensaje };
    setErrores(e);
    // Lleva el foco al primer campo con error.
    if (e.nombre) form.querySelector<HTMLElement>("#nombre")?.focus();
    else if (e.mensaje) form.querySelector<HTMLElement>("#mensaje")?.focus();
    return !e.nombre && !e.mensaje;
  }

  function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = leer(e.currentTarget);
    if (!validar(v, e.currentTarget)) return;
    window.open(enlaceWhatsApp(componer(v)), "_blank", "noopener,noreferrer");
  }

  function porCorreo(form: HTMLFormElement | null) {
    if (!form) return;
    const v = leer(form);
    if (!validar(v, form)) return;
    window.location.href = `mailto:${contacto.correo}?subject=${encodeURIComponent(t("asunto"))}&body=${encodeURIComponent(componer(v))}`;
  }

  return (
    <form onSubmit={alEnviar} noValidate className="space-y-8" id="formulario">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="eyebrow text-taupe">{t("nombre")}</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errores.nombre || undefined}
            aria-describedby={errores.nombre ? "error-nombre" : undefined}
            className={cn(campo, errores.nombre && "border-red-700")}
          />
          {errores.nombre && <p id="error-nombre" className="mt-2 text-sm text-red-800">{t("errorNombre")}</p>}
        </div>
        <div>
          <label htmlFor="correo" className="eyebrow text-taupe">{t("correo")}</label>
          <input id="correo" name="correo" type="email" inputMode="email" autoComplete="email" spellCheck={false} className={campo} />
        </div>
      </div>

      <div>
        <label htmlFor="interes" className="eyebrow text-taupe">{t("interes")}</label>
        <select id="interes" name="interes" defaultValue="" className={cn(campo, "cursor-pointer")}>
          <option value="">{t("interesPlaceholder")}</option>
          {intereses.map((i) => (
            <option key={i} value={i}>{t(`intereses.${i}`)}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="eyebrow text-taupe">{t("mensaje")}</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          aria-invalid={errores.mensaje || undefined}
          aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
          className={cn(campo, "resize-y", errores.mensaje && "border-red-700")}
        />
        {errores.mensaje && <p id="error-mensaje" className="mt-2 text-sm text-red-800">{t("errorMensaje")}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          className="eyebrow min-h-12 cursor-pointer bg-ink px-8 text-paper transition-colors duration-300 hover:bg-taupe"
        >
          {t("enviarWhatsApp")}
        </button>
        <button
          type="button"
          onClick={(e) => porCorreo(e.currentTarget.form)}
          className="eyebrow min-h-12 cursor-pointer border-b border-brass pb-1 text-ink transition-colors hover:border-ink"
        >
          {t("enviarCorreo")}
        </button>
      </div>
      <p className="max-w-prose text-sm text-taupe">{t("ayuda")}</p>
    </form>
  );
}
