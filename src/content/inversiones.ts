import { tx } from "./tx";

export const inversiones = {
  titulo: tx("Inversiones", "Real estate"),
  tituloCursiva: tx("inmobiliarias.", "investments."),
  lead: tx(
    "Una de las formas más populares de invertir capital: generar ingresos y aumentar el valor de tu patrimonio con la estrategia que mejor se ajusta a ti.",
    "One of the most popular ways to put capital to work: generate income and grow your wealth with the strategy that suits you best.",
  ),
  definicion: {
    titulo: tx("Qué es invertir en bienes raíces", "What investing in real estate means"),
    texto: tx(
      "Una inversión inmobiliaria implica la compra, propiedad, gestión, arrendamiento o venta de bienes raíces con el objetivo de generar ingresos, apreciación del valor del activo, o ambos.",
      "A real estate investment means buying, owning, managing, renting out or selling property in order to generate income, appreciation in the value of the asset, or both.",
    ),
  },
  caracteristicas: {
    titulo: tx("Características", "Characteristics"),
    items: [
      { titulo: tx("Tangibilidad", "Tangibility"), texto: tx("Son activos físicos, más seguros que acciones o criptomonedas.", "Physical assets, generally safer than stocks or crypto.") },
      { titulo: tx("Apreciación", "Appreciation"), texto: tx("Con el tiempo tienden a aumentar su valor.", "Over time they tend to gain value.") },
      { titulo: tx("Ingresos pasivos", "Passive income"), texto: tx("El alquiler genera ingresos regulares sin vender el activo.", "Renting generates regular income without selling the asset.") },
      { titulo: tx("Diversificación", "Diversification"), texto: tx("Reducen el riesgo global de tu portafolio.", "They reduce the overall risk of your portfolio.") },
      { titulo: tx("Protección ante la inflación", "Inflation protection"), texto: tx("Mantienen o aumentan su valor en épocas de inflación.", "They tend to hold or grow their value during inflation.") },
    ],
  },
  beneficios: {
    titulo: tx("Beneficios", "Benefits"),
    items: [
      { titulo: tx("Estabilidad", "Stability"), texto: tx("Menos volátiles que acciones o bonos.", "Less volatile than stocks or bonds.") },
      { titulo: tx("Apalancamiento", "Leverage"), texto: tx("Puedes financiar con hipoteca y comprar con un capital inicial relativamente bajo.", "You can finance with a mortgage and buy with relatively little initial capital.") },
      { titulo: tx("Ingresos múltiples", "Multiple income streams"), texto: tx("Valorización del capital más ingresos por alquiler.", "Capital appreciation plus rental income.") },
    ],
  },
  modalidades: {
    titulo: tx("Modalidades de inversión", "Ways to invest"),
    caracteristicasEtiqueta: tx("Características", "Characteristics"),
    beneficiosEtiqueta: tx("Beneficios", "Benefits"),
    items: [
      {
        id: "renta-tradicional",
        titulo: tx("Renta tradicional", "Traditional rental"),
        texto: tx(
          "Arrendar una propiedad residencial o comercial por un período prolongado, generalmente contratos de un año o más.",
          "Renting out a residential or commercial property for a long period, usually on contracts of a year or more.",
        ),
        caracteristicas: [
          tx("Ingresos constantes y previsibles durante el contrato.", "Steady, predictable income during the lease."),
          tx("Relación a largo plazo con los inquilinos, con menos rotación.", "A long-term relationship with tenants and less turnover."),
          tx("Requiere gestión y mantenimiento continuos.", "Requires ongoing management and maintenance."),
        ],
        beneficios: [
          tx("Flujo estable que puede cubrir la hipoteca y los costos.", "A steady flow that can cover the mortgage and costs."),
          tx("La propiedad puede valorizarse mientras genera renta.", "The property can appreciate while it earns rent."),
          tx("Control para renovar, vender o cambiar las condiciones.", "Control to renew, sell or change the lease terms."),
        ],
      },
      {
        id: "rentas-cortas",
        titulo: tx("Rentas cortas", "Short-term rentals"),
        texto: tx(
          "Alquilar por días o semanas a turistas y visitantes a través de plataformas como Airbnb o Booking.",
          "Renting by the day or week to tourists and visitors through platforms such as Airbnb or Booking.",
        ),
        caracteristicas: [
          tx("Alta rotación de huéspedes, con más ingresos y más gestión.", "High guest turnover: more income and more management."),
          tx("Tarifas por noche más altas que en el alquiler tradicional.", "Nightly rates higher than traditional rent."),
          tx("Flexibilidad para bloquear fechas y usar la propiedad.", "Flexibility to block dates and use the property yourself."),
        ],
        beneficios: [
          tx("Ingresos potencialmente mayores según ubicación y demanda.", "Potentially higher income depending on location and demand."),
          tx("Puedes usar la propiedad cuando no está alquilada.", "You can use the property when it isn’t booked."),
          tx("Oportunidad de valorización mientras genera ingresos.", "Appreciation potential while it earns income."),
        ],
        servicio: tx(
          "En ALGI gestionamos todo el proceso para tu alquiler transitorio: evaluación de la propiedad, optimización de su presentación, suscripción en las principales plataformas, asesoría continua y gestión de marketing.",
          "At ALGI we manage the whole short-term rental process: property assessment, presentation optimisation, listing on the main platforms, ongoing advice and marketing management.",
        ),
      },
      {
        id: "flipping",
        titulo: tx("Flipping inmobiliario", "Property flipping"),
        texto: tx(
          "Comprar una propiedad, generalmente por debajo del valor de mercado, renovarla y venderla a un precio más alto en poco tiempo.",
          "Buying a property, usually below market value, renovating it and selling it at a higher price within a short time.",
        ),
        caracteristicas: [
          tx("Corto plazo: compra, renovación y venta, por lo general en un año.", "Short term: purchase, renovation and sale, usually within a year."),
          tx("Requiere inversión adicional para renovar o mejorar.", "Requires additional investment to renovate or improve."),
          tx("Riesgo y recompensa: depende del mercado y de controlar los costos.", "Risk and reward: depends on the market and on keeping costs under control."),
        ],
        beneficios: [
          tx("Rendimientos potencialmente altos en poco tiempo.", "Potentially high returns in a short time."),
          tx("Contribuye a renovar y mejorar la infraestructura urbana.", "Helps renew and improve urban infrastructure."),
          tx("Diversifica tus estrategias en el mercado inmobiliario.", "Diversifies your strategies in the property market."),
        ],
      },
      {
        id: "crowdfunding",
        titulo: tx("Crowdfunding inmobiliario", "Real estate crowdfunding"),
        texto: tx(
          "Varios inversionistas unen recursos para financiar un proyecto y reciben una participación en las ganancias.",
          "Several investors pool resources to fund a project in exchange for a share of the profits.",
        ),
        caracteristicas: [
          tx("Permite a pequeños inversionistas entrar a proyectos grandes.", "Lets smaller investors take part in large projects."),
          tx("Puedes repartir tus fondos en varios proyectos.", "You can spread your funds across several projects."),
          tx("Se realiza en plataformas en línea que facilitan la gestión.", "Run through online platforms that simplify management."),
        ],
        beneficios: [
          tx("Bajo capital inicial.", "Low initial capital."),
          tx("Acceso a desarrollos residenciales, comerciales o industriales.", "Access to residential, commercial or industrial developments."),
          tx("Los beneficios se reparten según tu participación.", "Profits are shared according to your stake."),
        ],
      },
      {
        id: "preventa",
        titulo: tx("Inmuebles en preventa", "Pre-construction purchases"),
        texto: tx(
          "Comprar una propiedad antes de que esté terminada, normalmente a un precio menor que el del mercado una vez finalizada.",
          "Buying a property before it is completed, normally at a lower price than the market value once it is finished.",
        ),
        caracteristicas: [
          tx("Precio de entrada más bajo, asumiendo riesgos propios de la construcción.", "Lower entry price, taking on the risks that come with construction."),
          tx("Potencial de apreciación a medida que avanza la obra.", "Appreciation potential as construction progresses."),
          tx("Hay que esperar a la entrega para ocupar o vender.", "You wait until delivery to occupy or sell."),
        ],
        beneficios: [
          tx("Ganancias potenciales altas entre la compra y la entrega.", "High potential gains between purchase and delivery."),
          tx("En algunos casos, posibilidad de personalizar la propiedad.", "In some cases, the chance to customise the property."),
          tx("Aseguras una buena ubicación antes de que suban los precios.", "Secure a prime location before prices rise."),
        ],
      },
    ],
  },
  cierre: tx(
    "Según tu perfil de riesgo, el capital disponible y tus objetivos, puedes optar por ingresos pasivos como el alquiler tradicional, inversiones de corto plazo como el flipping o formas innovadoras como el crowdfunding. En ALGI te asesoramos en cada etapa para que saques el máximo provecho a tu inversión.",
    "Depending on your risk profile, available capital and goals, you can choose passive income such as traditional renting, short-term plays such as flipping, or innovative formats such as crowdfunding. At ALGI we advise you at every stage so you get the most from your investment.",
  ),
};
