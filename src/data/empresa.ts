import { contacto } from "@/data/contacto";

/**
 * Datos legales de ALGI Property para la política de tratamiento de datos (Decreto 1377 de 2013, art. 13).
 * PENDIENTE: el cliente debe confirmar razón social, NIT y dirección exacta antes de publicar.
 * Mientras un dato sea null, la política no lo muestra.
 */
export const empresa = {
  razonSocial: "ALGI Property",
  nit: null as string | null,
  domicilio: "Cali, Valle del Cauca, Colombia",
  direccion: null as string | null,
  correoDatos: contacto.correo,
  telefonoDatos: contacto.telefonoVisible,
};
