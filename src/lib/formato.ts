import type { Idioma, Propiedad, Texto } from "@/data/propiedades";

export function texto(valor: Texto, idioma: Idioma): string {
  return valor[idioma];
}

/** Formatea el precio de un inmueble en pesos colombianos, abreviando los millones. */
export function formatearPrecio(
  precio: NonNullable<Propiedad["precio"]>,
  idioma: Idioma,
): string {
  const iva = precio.masIva ? (idioma === "es" ? " + IVA" : " + VAT") : "";

  if (precio.unidad === "m2-mes") {
    const cifra = new Intl.NumberFormat(idioma === "es" ? "es-CO" : "en-US").format(precio.valor);
    return idioma === "es"
      ? `$${cifra} por m² al mes${iva}`
      : `COP ${cifra} per m² / month${iva}`;
  }

  const millones = precio.valor / 1_000_000;
  const cifra = new Intl.NumberFormat(idioma === "es" ? "es-CO" : "en-US").format(millones);
  return idioma === "es" ? `$${cifra} millones${iva}` : `COP ${cifra} million${iva}`;
}
