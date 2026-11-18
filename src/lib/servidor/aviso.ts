/**
 * Correo de aviso a ALGI por cada interesado, enviado con la API de Resend.
 * El diseño usa tablas y estilos en línea porque los clientes de correo no admiten CSS moderno.
 * Solo para el servidor.
 */
import type { Interesado } from "@/lib/interesado";

export interface DatosAviso extends Interesado {
  propiedad: { nombre: string; url: string };
  idioma: "es" | "en";
  fecha: Date;
}

const c = {
  paper: "#f7f5f2",
  line: "#d9d2cb",
  ink: "#2a2220",
  taupe: "#6b5a55",
  brassDeep: "#7a5c34",
  brassLight: "#d2ae7c",
  night: "#0e1a18",
  cream: "#f3eee6",
};
const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Segoe UI', Helvetica, Arial, sans-serif";

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

/** Mensaje de WhatsApp ya redactado para responderle al interesado, en su idioma. */
export function mensajeRespuesta(d: DatosAviso): string {
  const nombre = d.nombre.split(" ")[0];
  return d.idioma === "es"
    ? `Hola ${nombre}, te escribo de ALGI Property. Vi que descargaste la ficha técnica de ${d.propiedad.nombre}. ¿Te puedo ayudar con alguna duda o agendar una visita?`
    : `Hi ${nombre}, this is ALGI Property. I saw you downloaded the fact sheet for ${d.propiedad.nombre}. Can I help with any questions or arrange a viewing?`;
}

function fechaBogota(f: Date): string {
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "long", timeStyle: "short", timeZone: "America/Bogota" }).format(f);
}

function telefonoLegible(e164: string): string {
  const m = e164.match(/^\+57(\d{3})(\d{3})(\d{4})$/);
  return m ? `+57 ${m[1]} ${m[2]} ${m[3]}` : e164;
}

export function asuntoAviso(d: DatosAviso): string {
  return `Nuevo interesado: ${d.nombre} · ${d.propiedad.nombre}`;
}

export function htmlAviso(d: DatosAviso): string {
  const wa = `https://wa.me/${d.telefono.slice(1)}?text=${encodeURIComponent(mensajeRespuesta(d))}`;
  const filas: [string, string][] = [
    ["Teléfono", `<a href="tel:${esc(d.telefono)}" style="color:${c.ink};text-decoration:none">${esc(telefonoLegible(d.telefono))}</a>`],
    ["Correo", d.correo ? `<a href="mailto:${esc(d.correo)}" style="color:${c.ink}">${esc(d.correo)}</a>` : `<span style="color:${c.taupe}">No lo dejó</span>`],
    ["Inmueble", `<a href="${esc(d.propiedad.url)}" style="color:${c.ink}">${esc(d.propiedad.nombre)}</a>`],
    ["Idioma", d.idioma === "es" ? "Español" : "Inglés"],
    ["Fecha", esc(fechaBogota(d.fecha))],
  ];
  const tabla = filas
    .map(
      ([k, v]) => `<tr>
        <td style="padding:12px 0;border-bottom:1px solid ${c.line};font:13px ${sans};color:${c.taupe};width:110px;vertical-align:top">${k}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${c.line};font:500 15px ${sans};color:${c.ink};text-align:right">${v}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(asuntoAviso(d))}</title></head>
<body style="margin:0;padding:0;background:${c.paper}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.paper}">
<tr><td align="center" style="padding:32px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${c.line}">
    <tr><td style="background:${c.night};padding:26px 32px">
      <div style="font:300 30px ${serif};letter-spacing:6px;color:${c.cream};line-height:1">ALGI</div>
      <div style="font:500 9px ${sans};letter-spacing:4px;color:${c.cream};margin-top:6px">PROPERTY</div>
    </td></tr>
    <tr><td style="padding:32px 32px 8px">
      <div style="font:600 11px ${sans};letter-spacing:2.5px;text-transform:uppercase;color:${c.brassDeep}">Ficha técnica descargada</div>
      <div style="font:400 30px ${serif};color:${c.ink};line-height:1.15;margin-top:10px">${esc(d.nombre)}</div>
      <div style="font:15px/1.6 ${sans};color:${c.taupe};margin-top:8px">Descargó la ficha de <strong style="color:${c.ink};font-weight:600">${esc(d.propiedad.nombre)}</strong> y autorizó el contacto.</div>
    </td></tr>
    <tr><td style="padding:8px 32px 8px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tabla}</table>
    </td></tr>
    <tr><td style="padding:24px 32px 12px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background:${c.ink}"><a href="${esc(wa)}" style="display:inline-block;padding:14px 26px;font:600 12px ${sans};letter-spacing:2px;text-transform:uppercase;color:${c.paper};text-decoration:none">Escribir por WhatsApp</a></td>
        <td style="width:12px"></td>
        <td style="border:1px solid ${c.ink}"><a href="${esc(d.propiedad.url)}" style="display:inline-block;padding:13px 22px;font:600 12px ${sans};letter-spacing:2px;text-transform:uppercase;color:${c.ink};text-decoration:none">Ver inmueble</a></td>
      </tr></table>
      <div style="font:13px/1.6 ${sans};color:${c.taupe};margin-top:14px">El botón de WhatsApp abre un mensaje ya redactado en ${d.idioma === "es" ? "español" : "inglés"}, el idioma en que navegó el sitio.</div>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid ${c.line}">
      <div style="font:12px/1.6 ${sans};color:${c.taupe}">Aviso automático de algiproperty.com. La persona aceptó la política de tratamiento de datos. Si pide que borren sus datos, hay que eliminarlos de la base de datos.</div>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

export function textoAviso(d: DatosAviso): string {
  return [
    `Ficha técnica descargada: ${d.propiedad.nombre}`,
    "",
    `Nombre: ${d.nombre}`,
    `Teléfono: ${telefonoLegible(d.telefono)}`,
    `Correo: ${d.correo ?? "No lo dejó"}`,
    `Inmueble: ${d.propiedad.nombre} (${d.propiedad.url})`,
    `Idioma: ${d.idioma === "es" ? "Español" : "Inglés"}`,
    `Fecha: ${fechaBogota(d.fecha)}`,
    "",
    `Responder por WhatsApp: https://wa.me/${d.telefono.slice(1)}?text=${encodeURIComponent(mensajeRespuesta(d))}`,
  ].join("\n");
}

export async function enviarAviso(cfg: { clave: string; remitente: string; destino: string[] }, d: DatosAviso): Promise<void> {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.clave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.remitente,
      to: cfg.destino,
      subject: asuntoAviso(d),
      html: htmlAviso(d),
      text: textoAviso(d),
      ...(d.correo ? { reply_to: d.correo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`Resend respondió ${r.status}`);
}
