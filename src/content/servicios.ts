import { tx, type Texto } from "./tx";

interface Grupo {
  titulo: Texto;
  items: Texto[];
}

export const servicios = {
  titulo: tx("Servicios", "Services"),
  tituloCursiva: tx("inmobiliarios integrales.", "from start to finish."),
  lead: tx(
    "Asesoría financiera, legal y tributaria, compra y venta, financiamiento y seguros, en un solo equipo.",
    "Financial, legal and tax advisory, buying and selling, financing and insurance, all with a single team.",
  ),
  indice: [
    { id: "asesoria", etiqueta: tx("Asesoría", "Advisory") },
    { id: "residencial", etiqueta: tx("Residencial", "Residential") },
    { id: "comercial", etiqueta: tx("Comercial", "Commercial") },
    { id: "financiamiento", etiqueta: tx("Financiamiento", "Financing") },
    { id: "seguros", etiqueta: tx("Seguros", "Insurance") },
  ],

  asesoria: {
    titulo: tx("Asesoría financiera, legal y tributaria", "Financial, legal and tax advisory"),
    intro: tx(
      "Un servicio integral que cubre los aspectos fundamentales para el éxito de cualquier transacción inmobiliaria. Nuestro enfoque multidisciplinario te permite decidir con información y con el respaldo de expertos en cada área.",
      "A comprehensive service covering the aspects that matter most to any real estate transaction. Our multidisciplinary approach lets you decide with solid information and the backing of experts in each field.",
    ),
    pilares: [
      {
        titulo: tx("Financiera", "Financial"),
        texto: tx(
          "Porque esta puede ser la mayor inversión de tu vida, optimizamos cada transacción para que se haga en las condiciones más favorables.",
          "Because this may be the biggest investment of your life, we optimise each transaction so it happens on the most favourable terms.",
        ),
        items: [
          tx("Análisis de viabilidad y rentabilidad: proyectamos valorizaciones, retornos y riesgos con datos sólidos.", "Feasibility and profitability analysis: we project appreciation, returns and risks using solid data."),
          tx("Gestión de financiación: buscamos y negociamos condiciones óptimas con bancos y entidades financieras.", "Financing management: we find and negotiate the best terms with banks and financial institutions."),
        ],
      },
      {
        titulo: tx("Legal", "Legal"),
        texto: tx(
          "Garantizamos que cada operación cumpla la legislación vigente y proteja tus derechos e intereses.",
          "We make sure every operation complies with current legislation and protects your rights and interests.",
        ),
        items: [
          tx("Revisión y redacción de contratos: promesas de compraventa, escrituras, arrendamientos y más.", "Contract review and drafting: purchase promises, deeds, leases and more."),
          tx("Due diligence legal: verificamos la situación jurídica de la propiedad antes de comprar.", "Legal due diligence: we check the legal status of the property before you buy."),
          tx("Resolución de conflictos: te representamos en disputas buscando la solución más favorable y rápida.", "Dispute resolution: we represent you in disputes, seeking the fastest, most favourable outcome."),
        ],
      },
      {
        titulo: tx("Tributaria", "Tax"),
        texto: tx(
          "La planificación tributaria es esencial para maximizar los beneficios de una operación inmobiliaria.",
          "Tax planning is essential to maximise the benefits of any real estate operation.",
        ),
        items: [
          tx("¿Qué impuestos debo pagar por la compra o venta de mi propiedad?", "What taxes do I have to pay when buying or selling my property?"),
          tx("¿Cómo puedo reducir el impacto tributario de la compra o venta?", "How can I reduce the tax impact of buying or selling?"),
        ],
      },
    ],
  },

  compraventa: [
    {
      id: "residencial",
      titulo: tx("Compra y venta residencial", "Residential buying and selling"),
      intro: tx(
        "Un servicio completo, desde identificar la propiedad ideal hasta cerrar la transacción, con una experiencia eficiente y sin complicaciones.",
        "A complete service, from finding the ideal property to closing the transaction, with an efficient, hassle-free experience.",
      ),
      cierre: tx(
        "Con ALGI, comprar y vender se vuelve una experiencia satisfactoria y libre de estrés.",
        "With ALGI, buying and selling becomes a satisfying, stress-free experience.",
      ),
      compradores: [
        {
          titulo: tx("Búsqueda personalizada", "Personalised search"),
          items: [
            tx("Entendemos tus preferencias, presupuesto y expectativas.", "We understand your preferences, budget and expectations."),
            tx("Acceso a propiedades exclusivas, incluso no publicadas.", "Access to exclusive properties, including unlisted ones."),
            tx("Visitas guiadas a las propiedades seleccionadas.", "Guided visits to shortlisted properties."),
          ],
        },
        {
          titulo: tx("Asesoría en la compra", "Buying advice"),
          items: [
            tx("Evaluación y negociación a tu favor.", "Assessment and negotiation on your behalf."),
            tx("Análisis comparativo de mercado para validar el precio.", "Comparative market analysis to validate the price."),
            tx("Apoyo para obtener la financiación adecuada.", "Support in securing the right financing."),
          ],
        },
        {
          titulo: tx("Cierre de la transacción", "Closing"),
          items: [
            tx("Gestión legal y documental conforme a la normativa vigente.", "Legal and document management in line with current regulations."),
            tx("Acompañamiento en el cierre, revisando cada detalle.", "Support through closing, checking every detail."),
          ],
        },
      ] satisfies Grupo[],
      vendedores: [
        {
          titulo: tx("Estrategia de venta", "Sales strategy"),
          items: [
            tx("Valoración precisa basada en un análisis profundo del mercado.", "Accurate valuation based on in-depth market analysis."),
            tx("Plan de marketing: medios digitales, redes sociales y base de clientes potenciales.", "Marketing plan: digital media, social networks and our database of prospective buyers."),
            tx("Home staging y recomendaciones para aumentar el valor.", "Home staging and recommendations to increase value."),
          ],
        },
        {
          titulo: tx("Proceso de venta eficiente", "Efficient sales process"),
          items: [
            tx("Gestión de visitas y ofertas, con análisis de cada oferta.", "Management of visits and offers, with an analysis of each offer."),
            tx("Negociación profesional que defiende tus intereses.", "Professional negotiation that defends your interests."),
          ],
        },
        {
          titulo: tx("Cierre seguro y rápido", "Safe, fast closing"),
          items: [
            tx("Redacción y revisión de todos los documentos legales.", "Drafting and review of all legal documents."),
            tx("Acompañamiento hasta la culminación de la venta.", "Support until the sale is complete."),
          ],
        },
      ] satisfies Grupo[],
    },
    {
      id: "comercial",
      titulo: tx("Compra y venta comercial", "Commercial buying and selling"),
      intro: tx(
        "Oficinas, bodegas, locales y más, para inversionistas, empresarios y corporaciones que buscan maximizar el valor de sus inversiones inmobiliarias.",
        "Offices, warehouses, retail units and more, for investors, entrepreneurs and corporations seeking to maximise the value of their real estate investments.",
      ),
      cierre: tx(
        "Con ALGI, cada transacción comercial aporta valor significativo a tus metas de negocio.",
        "With ALGI, every commercial transaction adds real value to your business goals.",
      ),
      compradores: [
        {
          titulo: tx("Identificación de oportunidades", "Identifying opportunities"),
          items: [
            tx("Análisis de tus metas: expansión, inversión o un espacio ideal para operar.", "Analysis of your goals: expansion, investment or the ideal space to operate."),
            tx("Cartera diversa, en mercado abierto y listados exclusivos.", "A diverse portfolio, in the open market and in exclusive listings."),
            tx("Estudios de viabilidad: ubicación, rentabilidad y entorno comercial.", "Feasibility studies: location, profitability and commercial environment."),
          ],
        },
        {
          titulo: tx("Asesoría y negociación", "Advice and negotiation"),
          items: [
            tx("Evaluación financiera, potencial de retorno y riesgos asociados.", "Financial assessment, return potential and associated risks."),
            tx("Negociación estratégica para una inversión rentable a largo plazo.", "Strategic negotiation for a profitable long-term investment."),
            tx("Soporte en financiación comercial y estructuración de acuerdos.", "Support with commercial financing and deal structuring."),
          ],
        },
        {
          titulo: tx("Cierre de la transacción", "Closing"),
          items: [
            tx("Gestión legal y documental segura.", "Safe legal and document management."),
            tx("Supervisión de cada detalle hasta cerrar sin complicaciones.", "Oversight of every detail through to a smooth closing."),
          ],
        },
      ] satisfies Grupo[],
      vendedores: [
        {
          titulo: tx("Venta y comercialización", "Sales and marketing"),
          items: [
            tx("Valoración precisa de la propiedad comercial.", "Accurate valuation of the commercial property."),
            tx("Marketing en medios especializados, redes y base de inversores.", "Marketing in specialist media, social networks and our investor database."),
            tx("Sugerencias de mejora para aumentar su atractivo.", "Improvement suggestions to increase its appeal."),
          ],
        },
        {
          titulo: tx("Gestión del proceso", "Managing the process"),
          items: [
            tx("Manejo de visitas y ofertas, con análisis detallado.", "Handling of visits and offers, with detailed analysis."),
            tx("Negociación profesional para las mejores condiciones.", "Professional negotiation for the best possible terms."),
          ],
        },
        {
          titulo: tx("Cierre de la venta", "Closing the sale"),
          items: [
            tx("Gestión de todos los documentos legales necesarios.", "Management of all necessary legal documents."),
            tx("Acompañamiento hasta la culminación, de forma fluida.", "Support through to completion, smoothly."),
          ],
        },
      ] satisfies Grupo[],
    },
  ],
  etiquetas: {
    compradores: tx("Para compradores", "For buyers"),
    vendedores: tx("Para vendedores", "For sellers"),
  },

  financiamiento: {
    titulo: tx("Financiamiento inmobiliario", "Real estate financing"),
    intro: tx(
      "En Colombia existen varias alternativas de crédito hipotecario para comprar vivienda o propiedades comerciales. Estas son las principales.",
      "Colombia offers several mortgage options for buying homes or commercial property. These are the main ones.",
    ),
    opciones: [
      {
        titulo: tx("Crédito hipotecario tradicional", "Traditional mortgage"),
        texto: tx(
          "El más común: para vivienda nueva o usada, construcción o lotes. Tasa fija o variable, plazos generalmente de 5 a 30 años, y financiación habitual del 70% al 80% del valor (algunas entidades hasta el 90%). Requiere evaluación de capacidad de pago, historial crediticio y avalúo.",
          "The most common: for new or used homes, construction or land. Fixed or variable rate, terms generally 5 to 30 years, and typical financing of 70% to 80% of the value (some lenders up to 90%). Requires an affordability check, credit history and a property appraisal.",
        ),
      },
      {
        titulo: tx("Crédito en UVR", "UVR-indexed mortgage"),
        texto: tx(
          "Indexado a la inflación, con tasa generalmente más baja que en pesos, aunque la deuda puede crecer en términos nominales si la inflación es alta. Puede ofrecer cuotas iniciales más bajas.",
          "Indexed to inflation, usually with a lower rate than peso loans, although the debt can grow in nominal terms if inflation is high. It can offer lower initial instalments.",
        ),
      },
      {
        titulo: tx("Leasing habitacional", "Housing leasing"),
        texto: tx(
          "El banco compra la propiedad y tú la usas pagando un canon mensual con opción de compra al final del contrato. Plazos de 10 a 20 años, sin cuota inicial y con posibles beneficios fiscales.",
          "The bank buys the property and you use it by paying a monthly fee with an option to buy at the end of the contract. Terms of 10 to 20 years, no down payment and possible tax benefits.",
        ),
      },
      {
        titulo: tx("Vivienda de interés social (VIS)", "Social-interest housing (VIS)"),
        texto: tx(
          "Para viviendas cuyo valor no supera el límite fijado por el Gobierno. Puede incluir subsidios nacionales o de cajas de compensación familiar, sujetos a requisitos de ingresos y a no haber sido propietario antes.",
          "For homes whose value does not exceed the limit set by the Government. May include national or family compensation fund subsidies, subject to income requirements and not having owned a home before.",
        ),
      },
      {
        titulo: tx("Crédito para no residentes", "Mortgage for non-residents"),
        texto: tx(
          "Algunas entidades prestan a colombianos que viven en el exterior y quieren comprar en Colombia, con condiciones similares a las tradicionales y posibles garantías o depósitos adicionales.",
          "Some lenders offer loans to Colombians living abroad who want to buy in Colombia, on terms similar to traditional ones and possibly with extra guarantees or deposits.",
        ),
      },
      {
        titulo: tx("Fondos privados de inversión", "Private investment funds"),
        texto: tx(
          "Financiación con condiciones personalizadas y más flexibilidad en plazos y montos, normalmente con tasas más altas y análisis más detallado de la inversión.",
          "Financing with tailored terms and more flexibility on terms and amounts, normally at higher rates and with a more detailed review of the investment.",
        ),
      },
    ],
    cierre: tx(
      "Al elegir, compara tasa de interés, plazo, moneda (pesos o UVR) e implicaciones fiscales entre varias entidades. En ALGI te acompañamos a encontrar la financiación más adecuada para ti. Esta información es orientativa y las condiciones cambian: confírmalas con la entidad financiera.",
      "When choosing, compare interest rate, term, currency (pesos or UVR) and tax implications across several lenders. At ALGI we help you find the most suitable financing. This information is a general guide and conditions change: confirm them with your lender.",
    ),
  },

  seguros: {
    titulo: tx("Seguros inmobiliarios", "Real estate insurance"),
    intro: tx(
      "Proteger tu inversión es fundamental para tu tranquilidad. Cubrimos las contingencias que pueden afectar una propiedad residencial o comercial.",
      "Protecting your investment is key to your peace of mind. We cover the contingencies that can affect a residential or commercial property.",
    ),
    tipos: [
      {
        titulo: tx("Todo riesgo", "All-risk property"),
        texto: tx("Daños o pérdidas en la estructura por desastres naturales, incendios, explosiones o actos vandálicos.", "Damage or loss to the structure from natural disasters, fire, explosions or vandalism."),
      },
      {
        titulo: tx("Arrendamiento", "Rental"),
        texto: tx("Para propietarios que alquilan: cobertura de impago, daños al inmueble y asistencia legal.", "For landlords: cover for unpaid rent, damage to the property and legal assistance."),
      },
      {
        titulo: tx("Construcción", "Construction"),
        texto: tx("Para obras y remodelaciones: cobertura de obras en construcción y responsabilidad civil durante la obra.", "For building and renovation works: cover for works in progress and liability during construction."),
      },
      {
        titulo: tx("Contenidos del hogar", "Home contents"),
        texto: tx("Electrodomésticos, joyas, muebles y enseres, sin importar si eres propietario o arrendatario.", "Appliances, jewellery, furniture and belongings, whether you own or rent."),
      },
    ],
  },
};
