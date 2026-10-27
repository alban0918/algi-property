/** Datos de contacto corporativos de Algi Property (confirmados por el cliente). */
export const contacto = {
  telefonoVisible: "+57\u00a0316\u00a0043\u00a08862",
  /** Formato internacional sin signos, para enlaces wa.me y tel:. */
  telefonoInternacional: "573160438862",
  correo: "falban68@hotmail.com",
  ciudad: "Cali, Colombia",
} as const;

export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${contacto.telefonoInternacional}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
