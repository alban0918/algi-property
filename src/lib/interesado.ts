/**
 * Datos de una persona interesada que descarga una ficha técnica: lista de indicativos,
 * normalización del teléfono y validación. Se usa igual en el navegador y en el servidor,
 * para que los mensajes de error coincidan con lo que el servidor acepta.
 */
import type { Idioma, Texto } from "@/data/propiedades";

export interface Pais {
  codigo: string;
  /** Indicativo internacional sin "+". Vacío en "Otro": el número se escribe completo con "+". */
  prefijo: string;
  nombre: Texto;
  /** Cantidad de dígitos del número nacional, cuando es fija. */
  digitos?: number;
}

export const paises: Pais[] = [
  { codigo: "CO", prefijo: "57", nombre: { es: "Colombia", en: "Colombia" }, digitos: 10 },
  { codigo: "US", prefijo: "1", nombre: { es: "Estados Unidos", en: "United States" }, digitos: 10 },
  { codigo: "MX", prefijo: "52", nombre: { es: "México", en: "Mexico" }, digitos: 10 },
  { codigo: "ES", prefijo: "34", nombre: { es: "España", en: "Spain" }, digitos: 9 },
  { codigo: "PA", prefijo: "507", nombre: { es: "Panamá", en: "Panama" } },
  { codigo: "EC", prefijo: "593", nombre: { es: "Ecuador", en: "Ecuador" } },
  { codigo: "PE", prefijo: "51", nombre: { es: "Perú", en: "Peru" } },
  { codigo: "VE", prefijo: "58", nombre: { es: "Venezuela", en: "Venezuela" } },
  { codigo: "CL", prefijo: "56", nombre: { es: "Chile", en: "Chile" } },
  { codigo: "AR", prefijo: "54", nombre: { es: "Argentina", en: "Argentina" } },
  { codigo: "OT", prefijo: "", nombre: { es: "Otro país", en: "Other country" } },
];

export const paisPorDefecto: Record<Idioma, string> = { es: "CO", en: "US" };

export type CampoInteresado = "nombre" | "telefono" | "correo" | "autorizacion";

export interface EntradaInteresado {
  nombre: string;
  pais: string;
  telefono: string;
  correo: string;
  autorizacion: boolean;
}

export interface Interesado {
  nombre: string;
  /** Formato internacional E.164: "+573001234567". */
  telefono: string;
  correo: string | null;
}

const CONTROL = /[\u0000-\u001f\u007f]/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Devuelve el teléfono en formato E.164 o null si no es válido. */
export function normalizarTelefono(codigoPais: string, numero: string): string | null {
  const limpio = numero.trim();
  if (!limpio || CONTROL.test(limpio) || /[^\d\s()+.-]/.test(limpio)) return null;
  const digitos = limpio.replace(/\D/g, "");

  // Quien escribe el número completo con "+" decide el indicativo.
  if (limpio.startsWith("+")) {
    return digitos.length >= 8 && digitos.length <= 15 ? `+${digitos}` : null;
  }

  const pais = paises.find((p) => p.codigo === codigoPais);
  if (!pais || !pais.prefijo) return null;
  // Se admite que pegue el número con su indicativo sin "+" (por ejemplo 57 300...).
  let nacional = digitos.replace(/^0+/, "");
  if (pais.digitos && nacional.length === pais.digitos + pais.prefijo.length && nacional.startsWith(pais.prefijo)) {
    nacional = nacional.slice(pais.prefijo.length);
  }
  if (pais.digitos ? nacional.length !== pais.digitos : nacional.length < 6 || nacional.length > 12) return null;
  const total = `${pais.prefijo}${nacional}`;
  return total.length <= 15 ? `+${total}` : null;
}

export function normalizarNombre(nombre: string): string {
  return nombre.replace(/\s+/g, " ").trim();
}

/** Valida los datos del formulario y devuelve los campos con error, o los datos normalizados. */
export function validarInteresado(
  e: EntradaInteresado,
): { ok: true; datos: Interesado } | { ok: false; errores: CampoInteresado[] } {
  const errores: CampoInteresado[] = [];
  const nombre = normalizarNombre(e.nombre);
  if (nombre.length < 2 || nombre.length > 80 || CONTROL.test(nombre) || !/\p{L}/u.test(nombre)) errores.push("nombre");

  const telefono = normalizarTelefono(e.pais, e.telefono);
  if (!telefono) errores.push("telefono");

  const correo = e.correo.trim();
  if (correo && (correo.length > 120 || CONTROL.test(correo) || !CORREO.test(correo))) errores.push("correo");

  if (e.autorizacion !== true) errores.push("autorizacion");

  if (errores.length) return { ok: false, errores };
  return { ok: true, datos: { nombre, telefono: telefono!, correo: correo ? correo.toLowerCase() : null } };
}
