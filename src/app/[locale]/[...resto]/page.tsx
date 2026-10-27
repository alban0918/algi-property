import { notFound } from "next/navigation";

/** Captura cualquier ruta desconocida bajo /es o /en para que el 404 use el diseño del sitio. */
export default function Desconocida() {
  notFound();
}
