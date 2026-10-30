import { contacto } from "@/data/contacto";
import { nombreSitio, urlSitio } from "@/lib/sitio";

/** Datos estructurados (schema.org) para que los buscadores entiendan quién es ALGI Property. */
export function JsonLd({ locale }: { locale: "es" | "en" }) {
  const datos = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: nombreSitio,
    url: `${urlSitio}/${locale}`,
    slogan: locale === "es" ? "Tu éxito, nuestra meta" : "Your success, our goal",
    description:
      locale === "es"
        ? "Consultoría inmobiliaria: asesoría financiera, legal y tributaria para comprar, vender e invertir en propiedad raíz en Colombia y en el sur de la Florida, EE. UU."
        : "Real estate consulting: financial, legal and tax advisory to buy, sell and invest in real estate in Colombia and in South Florida, USA.",
    telephone: `+${contacto.telefonoInternacional}`,
    email: contacto.correo,
    areaServed: ["Cali", "Yumbo", "Bogotá", "Colombia", "Florida"],
    address: { "@type": "PostalAddress", addressLocality: "Cali", addressRegion: "Valle del Cauca", addressCountry: "CO" },
    availableLanguage: ["es", "en"],
  };

  // Se escapa "<" para que el JSON nunca pueda cerrar la etiqueta script.
  const json = JSON.stringify(datos).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
