import { tx, type Texto } from "./tx";

/**
 * Política de tratamiento de datos personales (Ley 1581 de 2012 y Decreto 1377 de 2013,
 * compilado en el Decreto 1074 de 2015). Borrador técnico: debe revisarlo un abogado.
 * Si cambia el contenido, actualizar `versionPolitica`: cada interesado guarda la versión que aceptó.
 */
export const versionPolitica = "2026-11-18";

export interface SeccionPolitica {
  id: string;
  titulo: Texto;
  /** Frase que introduce la lista. */
  intro?: Texto;
  lista?: Texto[];
  /** Párrafos que siguen a la lista. */
  parrafos?: Texto[];
}

export const privacidad = {
  titulo: tx("Política de tratamiento", "Personal data"),
  tituloCursiva: tx("de datos personales.", "processing policy."),
  lead: tx(
    "Qué datos recogemos cuando descargas una ficha técnica, para qué los usamos y cómo puedes consultarlos, corregirlos o pedir que los borremos.",
    "What data we collect when you download a fact sheet, what we use it for, and how you can access, correct or delete it.",
  ),
  vigencia: tx("Vigente desde el 18 de noviembre de 2026.", "Effective from 18 November 2026."),
  responsableTitulo: tx("Responsable del tratamiento", "Data controller"),
  etiquetas: {
    razonSocial: tx("Razón social", "Company name"),
    nit: tx("NIT", "Tax ID (NIT)"),
    domicilio: tx("Domicilio", "Registered office"),
    direccion: tx("Dirección", "Address"),
    correo: tx("Correo para temas de datos", "Email for data requests"),
    telefono: tx("Teléfono y WhatsApp", "Phone and WhatsApp"),
  },
  secciones: [
    {
      id: "datos",
      titulo: tx("Qué datos recogemos", "What data we collect"),
      lista: [
        tx(
          "Al descargar una ficha técnica: tu nombre, tu teléfono, tu correo si decides darlo, el inmueble que consultaste, el idioma en que navegabas y la fecha.",
          "When you download a fact sheet: your name, your phone number, your email if you choose to give it, the property you viewed, the language you were browsing in and the date.",
        ),
        tx(
          "Para evitar abusos, una huella cifrada de tu dirección IP que no permite recuperarla y que se borra a las 24 horas.",
          "To prevent abuse, an encrypted fingerprint of your IP address that cannot be reversed and is deleted after 24 hours.",
        ),
        tx(
          "El formulario de contacto no guarda nada en este sitio: abre WhatsApp o tu correo con el mensaje redactado, y lo que envíes queda en esa conversación con ALGI Property.",
          "The contact form stores nothing on this site: it opens WhatsApp or your email with the message written, and what you send stays in that conversation with ALGI Property.",
        ),
        tx(
          "Tu navegador recuerda en tu propio dispositivo los datos del formulario de descarga, para no pedírtelos de nuevo. Puedes borrarlos limpiando los datos del sitio en tu navegador. No usamos cookies de seguimiento ni herramientas de analítica.",
          "Your browser remembers the download form details on your own device so you are not asked again. You can delete them by clearing this site's data in your browser. We do not use tracking cookies or analytics tools.",
        ),
      ],
    },
    {
      id: "finalidades",
      titulo: tx("Para qué los usamos", "What we use it for"),
      lista: [
        tx("Contactarte sobre el inmueble que consultaste.", "To contact you about the property you viewed."),
        tx(
          "Ofrecerte asesoría inmobiliaria y otros inmuebles que puedan interesarte.",
          "To offer you real estate advice and other properties that may interest you.",
        ),
        tx("Atender tus consultas y solicitudes.", "To answer your questions and requests."),
        tx(
          "Saber qué inmuebles generan más interés, en estadísticas internas.",
          "To learn which properties attract the most interest, in internal statistics.",
        ),
      ],
      parrafos: [
        tx("No vendemos ni cedemos tus datos a terceros.", "We do not sell or hand over your data to third parties."),
      ],
    },
    {
      id: "autorizacion",
      titulo: tx("Tu autorización", "Your consent"),
      parrafos: [
        tx(
          "Solo guardamos tus datos si marcas la casilla de autorización del formulario. La casilla nunca viene marcada. Puedes retirar tu autorización en cualquier momento escribiéndonos.",
          "We only store your data if you tick the consent box on the form. The box is never pre-ticked. You can withdraw your consent at any time by writing to us.",
        ),
      ],
    },
    {
      id: "derechos",
      titulo: tx("Tus derechos", "Your rights"),
      intro: tx("Como titular de los datos puedes:", "As the data subject you can:"),
      lista: [
        tx("Conocer, actualizar y corregir tus datos.", "Access, update and correct your data."),
        tx("Pedir prueba de la autorización que diste.", "Request proof of the consent you gave."),
        tx("Saber cómo hemos usado tus datos.", "Know how we have used your data."),
        tx(
          "Revocar la autorización y pedir que borremos tus datos.",
          "Withdraw your consent and ask us to delete your data.",
        ),
        tx(
          "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
          "File complaints with Colombia's Superintendence of Industry and Commerce (SIC).",
        ),
        tx("Acceder gratis a tus datos.", "Access your data free of charge."),
      ],
    },
    {
      id: "solicitudes",
      titulo: tx("Cómo ejercerlos", "How to exercise them"),
      parrafos: [
        tx(
          "Escríbenos al correo o al WhatsApp de esta página con tu nombre, el teléfono que usaste y lo que necesitas. Respondemos las consultas en máximo diez días hábiles y los reclamos en máximo quince días hábiles, como establece la Ley 1581 de 2012.",
          "Write to the email or WhatsApp on this page with your name, the phone number you used and what you need. We answer queries within ten business days and complaints within fifteen business days, as set out in Colombian Law 1581 of 2012.",
        ),
      ],
    },
    {
      id: "proveedores",
      titulo: tx("Proveedores y servidores fuera de Colombia", "Providers and servers outside Colombia"),
      parrafos: [
        tx(
          "Para funcionar, el sitio usa proveedores que procesan los datos por cuenta de ALGI Property: Vercel aloja la web, Neon guarda la base de datos y Resend envía el aviso interno por correo. Sus servidores pueden estar fuera de Colombia, principalmente en Estados Unidos. Al dar tu autorización aceptas esa transmisión internacional, que se hace solo para las finalidades de esta política.",
          "To work, the site uses providers that process data on behalf of ALGI Property: Vercel hosts the website, Neon stores the database and Resend sends the internal email notice. Their servers may be outside Colombia, mainly in the United States. By giving your consent you accept this international transfer, made only for the purposes in this policy.",
        ),
      ],
    },
    {
      id: "seguridad",
      titulo: tx("Seguridad y conservación", "Security and retention"),
      parrafos: [
        tx(
          "Los datos viajan cifrados, el acceso está limitado a las personas de ALGI Property que atienden a los interesados y las claves de los servicios no están en el código del sitio.",
          "Data travels encrypted, access is limited to the ALGI Property staff who follow up with enquiries, and service keys are not stored in the site's code.",
        ),
        tx(
          "Conservamos tus datos mientras sean necesarios para estas finalidades y como máximo dos años desde el último contacto, salvo que antes pidas que los borremos.",
          "We keep your data while it is needed for these purposes and for no more than two years after the last contact, unless you ask us to delete it sooner.",
        ),
      ],
    },
    {
      id: "cambios",
      titulo: tx("Cambios a esta política", "Changes to this policy"),
      parrafos: [
        tx(
          "Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha.",
          "If we change this policy, we will publish the new version on this page with its date.",
        ),
      ],
    },
  ] as SeccionPolitica[],
};
