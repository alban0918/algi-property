/**
 * Inmuebles de Algi Property, transcritos de las fichas técnicas originales.
 * Cualquier dato que no figure en la ficha se deja sin definir (no se inventa).
 */

export type Idioma = "es" | "en";
export type Texto = Record<Idioma, string>;

export const tiposResidenciales = ["casa", "apartamento", "apartaestudio", "finca"] as const;
export const tiposComerciales = ["lote", "local", "bodega", "edificio", "oficina", "hotel"] as const;

export type TipoResidencial = (typeof tiposResidenciales)[number];
export type TipoComercial = (typeof tiposComerciales)[number];
export type TipoInmueble = TipoResidencial | TipoComercial;
export type Categoria = "residencial" | "comercial";
export type Operacion = "alquiler" | "venta";

/** Un inmueble es residencial o comercial según su tipo principal. */
export function categoriaDe(tipo: TipoInmueble): Categoria {
  return (tiposResidenciales as readonly string[]).includes(tipo) ? "residencial" : "comercial";
}

export interface Foto {
  archivo: string;
  alt: Texto;
  /** Imagen generada o recreada, no una foto actual del inmueble. */
  ilustrativa?: boolean;
}

export interface Propiedad {
  slug: string;
  /** Tipo principal; define la categoría (residencial o comercial) y la etiqueta de la tarjeta. */
  tipo: TipoInmueble;
  /** Otros tipos con los que también debe aparecer al filtrar (por ejemplo, bodega con oficinas). */
  tambien?: TipoInmueble[];
  /** Segunda operación disponible (por ejemplo, en venta y también en alquiler). */
  tambienOperacion?: Operacion;
  /** Inmueble que genera renta; aparece en el filtro "Propiedades de inversión". */
  inversion?: boolean;
  operacion: Operacion;
  nombre: Texto;
  ubicacion: { barrio: Texto; ciudad: string; detalle?: Texto };
  /** Precio en pesos colombianos. Ausente = "consultar". */
  precio?: {
    valor: number;
    /** Unidad del precio: total, por metro cuadrado, canon total al mes o por metro cuadrado al mes. */
    unidad: "total" | "mes" | "m2" | "m2-mes";
    masIva?: boolean;
  };
  resumen: Texto;
  /** Datos clave en forma de tabla, tal como en la ficha. */
  datos: { etiqueta: Texto; valor: Texto }[];
  caracteristicas: Texto[];
  fotos: Foto[];
  /** Notas adicionales rotuladas (por ejemplo, imagen ilustrativa). */
  nota?: Texto;
}

const base = "/images/propiedades";

export const propiedades: Propiedad[] = [
  {
    slug: "bodega-acopi-850",
    tipo: "bodega",
    operacion: "alquiler",
    nombre: { es: "Bodega Acopi 850", en: "Acopi 850 Warehouse" },
    ubicacion: {
      barrio: { es: "Sector Acopi", en: "Acopi district" },
      ciudad: "Yumbo",
      detalle: {
        es: "Callejón de la Carrera 32",
        en: "Carrera 32 service road",
      },
    },
    precio: { valor: 27000, unidad: "m2-mes", masIva: true },
    resumen: {
      es: "Bodega nueva de 850 m² de área libre, con disponibilidad inmediata, en zona industrial con fácil acceso para vehículos de carga y distribución.",
      en: "Brand-new 850 m² warehouse with open floor area, available immediately, in an industrial zone with easy access for cargo and distribution vehicles.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "850 m²", en: "850 m²" } },
      { etiqueta: { es: "Altura", en: "Height" }, valor: { es: "14 m", en: "14 m" } },
      { etiqueta: { es: "Muelles", en: "Loading docks" }, valor: { es: "2", en: "2" } },
      {
        etiqueta: { es: "Administración", en: "Management fee" },
        valor: { es: "$3 millones", en: "COP 3 million" },
      },
      {
        etiqueta: { es: "Disponibilidad", en: "Availability" },
        valor: { es: "Inmediata", en: "Immediate" },
      },
    ],
    caracteristicas: [
      { es: "Acceso para tractomulas", en: "Access for tractor-trailers" },
      { es: "Muelles con nivelador", en: "Loading docks with dock levelers" },
      { es: "Área de oficinas y mezzanine", en: "Office area and mezzanine" },
      {
        es: "Infraestructura respaldada por altos estándares de seguridad y control",
        en: "Infrastructure backed by high security and access-control standards",
      },
      {
        es: "Fácil ingreso, cargue y descargue de mercancía",
        en: "Easy entry, loading and unloading of goods",
      },
    ],
    fotos: [
      { archivo: `${base}/bodega-acopi-850/01-fachada.webp`, alt: { es: "Fachada de la bodega Acopi 850 en Yumbo", en: "Façade of the Acopi 850 warehouse in Yumbo" } },
      { archivo: `${base}/bodega-acopi-850/02-interior-mezzanine.webp`, alt: { es: "Interior con mezzanine y escalera metálica", en: "Interior with mezzanine and steel staircase" } },
      { archivo: `${base}/bodega-acopi-850/03-nave-interior.webp`, alt: { es: "Nave interior de 14 metros de altura con iluminación cenital", en: "14-metre-high interior hall with overhead lighting" } },
      { archivo: `${base}/bodega-acopi-850/04-muelle.webp`, alt: { es: "Muelle de carga y descarga", en: "Loading and unloading dock" } },
      { archivo: `${base}/bodega-acopi-850/05-fachada-lateral.webp`, alt: { es: "Vista lateral de la bodega", en: "Side view of the warehouse" } },
      { archivo: `${base}/bodega-acopi-850/06-acceso-carga.webp`, alt: { es: "Acceso de carga para vehículos pesados", en: "Cargo access for heavy vehicles" } },
    ],
    nota: {
      es: "Los precios de alquiler se expresan por metro cuadrado y no incluyen IVA.",
      en: "Rental prices are quoted per square metre and exclude VAT.",
    },
  },
  {
    slug: "casa-los-alamos",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa Los Álamos", en: "Los Álamos House" },
    ubicacion: {
      barrio: { es: "Barrio Los Álamos", en: "Los Álamos neighbourhood" },
      ciudad: "Cali",
    },
    precio: { valor: 620_000_000, unidad: "total" },
    resumen: {
      es: "Casa independiente de dos pisos y 176 m² en el barrio Los Álamos, con patio ornamental, garaje y balcón.",
      en: "Detached two-storey house of 176 m² in the Los Álamos neighbourhood, with an ornamental patio, garage and balcony.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "176 m²", en: "176 m²" } },
      { etiqueta: { es: "Pisos", en: "Floors" }, valor: { es: "2", en: "2" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "4 (2 con baño)", en: "4 (2 en suite)" } },
      { etiqueta: { es: "Antigüedad", en: "Age" }, valor: { es: "20 años", en: "20 years" } },
      { etiqueta: { es: "Tipo", en: "Type" }, valor: { es: "Casa independiente", en: "Detached house" } },
    ],
    caracteristicas: [
      { es: "4 habitaciones, 2 con baño", en: "4 bedrooms, 2 with private bathroom" },
      { es: "Baño de alcobas y baño social", en: "Bedroom bathroom and guest bathroom" },
      { es: "Sala comedor", en: "Living and dining room" },
      { es: "Patio de ropas y patio ornamental", en: "Laundry patio and ornamental patio" },
      { es: "Garaje", en: "Garage" },
      { es: "Balcón", en: "Balcony" },
    ],
    fotos: [
      { archivo: `${base}/casa-los-alamos/01-fachada.webp`, alt: { es: "Fachada de la casa en Los Álamos", en: "Front of the house in Los Álamos" } },
      { archivo: `${base}/casa-los-alamos/02-patio.webp`, alt: { es: "Patio con piso de baldosa terracota", en: "Patio with terracotta tile floor" } },
      { archivo: `${base}/casa-los-alamos/03-comedor.webp`, alt: { es: "Comedor con mesa de madera", en: "Dining room with wooden table" } },
      { archivo: `${base}/casa-los-alamos/04-patio-interior.webp`, alt: { es: "Patio interior con plantas", en: "Interior patio with plants" } },
      { archivo: `${base}/casa-los-alamos/05-cocina.webp`, alt: { es: "Cocina integral", en: "Fitted kitchen" } },
      { archivo: `${base}/casa-los-alamos/06-sala.webp`, alt: { es: "Sala con ventanales hacia el patio", en: "Living room with large windows to the patio" } },
      { archivo: `${base}/casa-los-alamos/07-sala-estar.webp`, alt: { es: "Sala de estar", en: "Sitting room" } },
      { archivo: `${base}/casa-los-alamos/08-sala-comedor.webp`, alt: { es: "Sala comedor", en: "Living and dining area" } },
      { archivo: `${base}/casa-los-alamos/09-habitacion-principal.webp`, alt: { es: "Habitación con aire acondicionado", en: "Bedroom with air conditioning" } },
      { archivo: `${base}/casa-los-alamos/10-habitacion.webp`, alt: { es: "Habitación con ventana", en: "Bedroom with window" } },
      { archivo: `${base}/casa-los-alamos/11-bano.webp`, alt: { es: "Baño con ducha", en: "Bathroom with shower" } },
      { archivo: `${base}/casa-los-alamos/12-corredor.webp`, alt: { es: "Corredor interior", en: "Interior hallway" } },
    ],
  },
  {
    slug: "edificio-granada",
    tipo: "edificio",
    operacion: "venta",
    nombre: { es: "Edificio Granada", en: "Granada Building" },
    ubicacion: {
      barrio: { es: "Barrio Granada", en: "Granada neighbourhood" },
      ciudad: "Cali",
      detalle: { es: "Nor-oeste de Cali, sobre la Avenida 9AN", en: "North-west Cali, on Avenida 9AN" },
    },
    resumen: {
      es: "Edificio de apartamentos para remodelar, en una ubicación central de Cali, ideal para coliving, apartaestudios, hostal u hotel boutique, o uso mixto residencial y comercial.",
      en: "Apartment building ready for renovation in a central Cali location, ideal for co-living, studio flats, a hostel or boutique hotel, or mixed residential and commercial use.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "434,93 m²", en: "434.93 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "Aprox. 1.218 m², 8 apartamentos", en: "Approx. 1,218 m², 8 apartments" } },
      { etiqueta: { es: "Niveles", en: "Levels" }, valor: { es: "4 pisos, sótano, terraza y pozo de ascensor", en: "4 floors, basement, terrace and elevator shaft" } },
      { etiqueta: { es: "Altura promedio", en: "Average height" }, valor: { es: "2,20 m por piso aprox.", en: "Approx. 2.20 m per floor" } },
      { etiqueta: { es: "Uso de suelo", en: "Zoning" }, valor: { es: "Residencial", en: "Residential" } },
      { etiqueta: { es: "Estado estructural", en: "Structural condition" }, valor: { es: "Bueno (por evaluar)", en: "Good (to be assessed)" } },
      { etiqueta: { es: "Ocupación", en: "Occupancy" }, valor: { es: "Disponible", en: "Available" } },
      { etiqueta: { es: "Servicios públicos", en: "Utilities" }, valor: { es: "Completos, actualmente suspendidos", en: "All in place, currently suspended" } },
    ],
    caracteristicas: [
      { es: "Excelente ubicación central", en: "Excellent central location" },
      { es: "Áreas amplias y funcionales", en: "Spacious, functional areas" },
      { es: "Uso flexible y múltiple", en: "Flexible, multi-purpose use" },
      { es: "Estado estructural y pozo de ascensor", en: "Structural condition and elevator shaft" },
      { es: "Cerca de zona residencial y del centro de Cali", en: "Close to a residential area and downtown Cali" },
      { es: "Corredores comerciales y empresariales, centros comerciales, centros médicos y clínicas, restaurantes y tiendas gourmet", en: "Commercial and business corridors, shopping centres, medical centres and clinics, restaurants and gourmet shops" },
    ],
    fotos: [
      { archivo: `${base}/edificio-granada/01-fachada-actual.webp`, alt: { es: "Fachada actual del Edificio Granada", en: "Current façade of the Granada Building" } },
      { archivo: `${base}/edificio-granada/04-render-ilustrativo-comercial.webp`, alt: { es: "Imagen ilustrativa del edificio remodelado con locales comerciales", en: "Illustrative image of the renovated building with retail units" }, ilustrativa: true },
      { archivo: `${base}/edificio-granada/05-render-ilustrativo-residencial.webp`, alt: { es: "Imagen ilustrativa del edificio remodelado con balcones y jardineras", en: "Illustrative image of the renovated building with balconies and planters" }, ilustrativa: true },
      { archivo: `${base}/edificio-granada/02-vista-avenida.webp`, alt: { es: "Vista desde la Avenida 9AN", en: "View from Avenida 9AN" } },
      { archivo: `${base}/edificio-granada/03-vista-lateral.webp`, alt: { es: "Vista lateral del edificio", en: "Side view of the building" } },
    ],
    nota: {
      es: "Las imágenes del edificio remodelado son ilustrativas. Precio disponible bajo consulta.",
      en: "Images of the renovated building are illustrative. Price available on request.",
    },
  },
  {
    slug: "bodega-oficinas-bogota",
    tipo: "bodega",
    tambien: ["oficina"],
    operacion: "venta",
    nombre: { es: "Bodega y Oficinas en Bogotá", en: "Warehouse and Offices in Bogotá" },
    ubicacion: {
      barrio: { es: "Sector industrial", en: "Industrial district" },
      ciudad: "Bogotá",
      detalle: { es: "Carrera 31 con Calle 22B", en: "Carrera 31 and Calle 22B" },
    },
    precio: { valor: 17_439_900_000, unidad: "total" },
    resumen: {
      es: "Edificio de cinco pisos con bodega industrial y sede administrativa, en un sector estratégico de Bogotá, ideal para empresas que buscan fortalecer su operación administrativa y logística.",
      en: "Five-storey building with an industrial warehouse and administrative headquarters in a strategic area of Bogotá, ideal for companies looking to strengthen their administrative and logistics operations.",
    },
    datos: [
      { etiqueta: { es: "Tipo", en: "Type" }, valor: { es: "Oficinas con bodega", en: "Offices with warehouse" } },
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "2.553,5 m²", en: "2,553.5 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "4.439,2 m²", en: "4,439.2 m²" } },
      { etiqueta: { es: "Área de bodega", en: "Warehouse area" }, valor: { es: "2.294,68 m²", en: "2,294.68 m²" } },
      { etiqueta: { es: "Área de oficinas", en: "Office area" }, valor: { es: "2.144,52 m²", en: "2,144.52 m²" } },
      { etiqueta: { es: "Negociación", en: "Negotiation" }, valor: { es: "Directa", en: "Direct" } },
    ],
    caracteristicas: [
      { es: "Edificio de cinco pisos con ascensor Otis", en: "Five-storey building with Otis elevator" },
      { es: "Oficinas administrativas, auditorio y sala para juntas", en: "Administrative offices, auditorium and meeting room" },
      { es: "Zona de cocina y comedor, archivo y depósitos", en: "Kitchen and dining area, archive and storage" },
      { es: "Sótano con 18 espacios de parqueo", en: "Basement with 18 parking spaces" },
      { es: "Subestación eléctrica y energía trifásica", en: "Electrical substation and three-phase power" },
      { es: "Tanque de reserva de agua y sistema contra incendios", en: "Water reserve tank and fire-protection system" },
      { es: "Control de acceso y baños en todos los pisos", en: "Access control and restrooms on every floor" },
      { es: "Conectividad ideal para logística, distribución e industria", en: "Ideal connectivity for logistics, distribution and industry" },
    ],
    fotos: [
      { archivo: `${base}/bodega-oficinas-bogota/03-bodega.webp`, alt: { es: "Nave de la bodega con estanterías", en: "Warehouse hall with racking" } },
      { archivo: `${base}/bodega-oficinas-bogota/01-fachada.webp`, alt: { es: "Fachada del edificio en ladrillo visto", en: "Brick façade of the building" } },
      { archivo: `${base}/bodega-oficinas-bogota/02-vista-aerea.webp`, alt: { es: "Vista aérea del sector industrial", en: "Aerial view of the industrial area" } },
      { archivo: `${base}/bodega-oficinas-bogota/04-bodega-operacion.webp`, alt: { es: "Zona de operación de la bodega", en: "Warehouse operations area" } },
      { archivo: `${base}/bodega-oficinas-bogota/05-recepcion.webp`, alt: { es: "Recepción y sala de espera del primer piso", en: "Ground-floor reception and waiting room" } },
      { archivo: `${base}/bodega-oficinas-bogota/06-auditorio.webp`, alt: { es: "Auditorio del tercer piso", en: "Third-floor auditorium" } },
      { archivo: `${base}/bodega-oficinas-bogota/07-oficinas-pasillo.webp`, alt: { es: "Pasillo de oficinas administrativas", en: "Administrative offices corridor" } },
      { archivo: `${base}/bodega-oficinas-bogota/08-sala.webp`, alt: { es: "Sala del quinto piso", en: "Fifth-floor lounge" } },
      { archivo: `${base}/bodega-oficinas-bogota/09-comedor.webp`, alt: { es: "Comedor del cuarto piso", en: "Fourth-floor dining room" } },
    ],
  },
  {
    slug: "locales-spirito",
    tipo: "local",
    operacion: "venta",
    nombre: { es: "Locales Spirito", en: "Spirito Retail Units" },
    ubicacion: {
      barrio: { es: "Zona hotelera, norte de Cali", en: "Hotel district, north Cali" },
      ciudad: "Cali",
      detalle: { es: "Zona externa del Hotel Spirito", en: "Outside the Hotel Spirito" },
    },
    resumen: {
      es: "Tres locales comerciales en la zona externa del moderno Hotel Spirito, en una zona donde se desarrollan proyectos residenciales de alto perfil, con fácil acceso y excelente visibilidad.",
      en: "Three retail units outside the modern Hotel Spirito, in an area where high-profile residential projects are being developed, with easy access and excellent visibility.",
    },
    datos: [
      { etiqueta: { es: "Local 1", en: "Unit 1" }, valor: { es: "216 m²", en: "216 m²" } },
      { etiqueta: { es: "Local 2", en: "Unit 2" }, valor: { es: "215 m²", en: "215 m²" } },
      { etiqueta: { es: "Local 3", en: "Unit 3" }, valor: { es: "204 m²", en: "204 m²" } },
      { etiqueta: { es: "Disponibles", en: "Available" }, valor: { es: "3 locales", en: "3 units" } },
    ],
    caracteristicas: [
      { es: "Fácil acceso y excelente visibilidad para clientes locales y visitantes del hotel", en: "Easy access and excellent visibility for local customers and hotel guests" },
      { es: "Cerca del Centro Comercial Chipichape y Home Center", en: "Close to the Chipichape shopping centre and Home Center" },
      { es: "Dentro de una propiedad hotelera con ocupación permanente", en: "Inside a hotel property with permanent occupancy" },
      { es: "Seguridad 24/7 y servicios compartidos de alta calidad", en: "24/7 security and high-quality shared services" },
      { es: "Parqueaderos para visitantes", en: "Visitor parking" },
      { es: "Ideal para tiendas gourmet, tiendas de moda y oficinas de servicios premium", en: "Ideal for gourmet shops, fashion stores and premium service offices" },
    ],
    fotos: [
      { archivo: `${base}/locales-spirito/02-fachada-locales.webp`, alt: { es: "Fachada acristalada de los locales", en: "Glazed façade of the retail units" } },
      { archivo: `${base}/locales-spirito/01-entorno.webp`, alt: { es: "Entorno del Hotel Spirito con zona de parqueo", en: "Surroundings of the Hotel Spirito with parking area" } },
      { archivo: `${base}/locales-spirito/03-acceso-peatonal.webp`, alt: { es: "Acceso peatonal frente a los locales", en: "Pedestrian access in front of the units" } },
      { archivo: `${base}/locales-spirito/04-local-interior.webp`, alt: { es: "Interior de un local con ventanal", en: "Interior of a unit with a large window" } },
      { archivo: `${base}/locales-spirito/05-local-fondo.webp`, alt: { es: "Fondo de un local con techo a la vista", en: "Back of a unit with exposed ceiling" } },
      { archivo: `${base}/locales-spirito/06-local-columna.webp`, alt: { es: "Local con columna y amplia luz", en: "Unit with a column and plenty of daylight" } },
      { archivo: `${base}/locales-spirito/07-local-amplio.webp`, alt: { es: "Local amplio de planta libre", en: "Spacious open-plan unit" } },
    ],
  },
  {
    slug: "apartaestudio-bellavista",
    tipo: "apartaestudio",
    operacion: "venta",
    nombre: { es: "Apartaestudio Bellavista", en: "Bellavista Studio Apartment" },
    ubicacion: {
      barrio: { es: "Barrio Bellavista", en: "Bellavista neighbourhood" },
      ciudad: "Cali",
    },
    precio: { valor: 330_000_000, unidad: "total" },
    resumen: {
      es: "Apartaestudio de 77 m² y dos ambientes con una vista inigualable, habitación principal con baño, parqueadero en sótano y depósito.",
      en: "77 m² studio apartment with two living areas and an unbeatable view, a main bedroom with private bathroom, basement parking and a storage room.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "77 m²", en: "77 m²" } },
      { etiqueta: { es: "Piso", en: "Floor" }, valor: { es: "3, sin ascensor", en: "3, no elevator" } },
      { etiqueta: { es: "Ambientes", en: "Living areas" }, valor: { es: "2", en: "2" } },
      { etiqueta: { es: "Administración", en: "Management fee" }, valor: { es: "$510.000", en: "COP 510,000" } },
    ],
    caracteristicas: [
      { es: "Habitación principal con baño", en: "Main bedroom with private bathroom" },
      { es: "Baño social", en: "Guest bathroom" },
      { es: "Sala", en: "Living room" },
      { es: "Parqueadero en sótano", en: "Basement parking" },
      { es: "Depósito de metal", en: "Metal storage unit" },
      { es: "Vista inigualable", en: "Unbeatable view" },
    ],
    fotos: [
      { archivo: `${base}/apartaestudio-bellavista/01-vista.webp`, alt: { es: "Ventanal con vista a los cerros de Cali", en: "Large window with a view of the Cali hills" } },
      { archivo: `${base}/apartaestudio-bellavista/02-sala.webp`, alt: { es: "Sala con ventanales y puerta de madera", en: "Living room with large windows and a wooden door" } },
      { archivo: `${base}/apartaestudio-bellavista/03-ambiente.webp`, alt: { es: "Ambiente amplio con piso de baldosa", en: "Spacious area with tile floor" } },
      { archivo: `${base}/apartaestudio-bellavista/04-habitacion.webp`, alt: { es: "Habitación con pared de ladrillo a la vista", en: "Bedroom with exposed brick wall" } },
      { archivo: `${base}/apartaestudio-bellavista/05-cocina.webp`, alt: { es: "Cocina con mesón de granito", en: "Kitchen with granite counter" } },
      { archivo: `${base}/apartaestudio-bellavista/06-bano.webp`, alt: { es: "Baño con ducha", en: "Bathroom with shower" } },
      { archivo: `${base}/apartaestudio-bellavista/07-parqueadero.webp`, alt: { es: "Parqueadero en el sótano", en: "Basement parking" } },
      { archivo: `${base}/apartaestudio-bellavista/08-zona-verde.webp`, alt: { es: "Zona verde interior del conjunto", en: "Interior green area of the complex" } },
    ],
  },
  {
    slug: "apartamento-santa-teresita",
    tipo: "apartamento",
    operacion: "venta",
    nombre: { es: "Apartamento Santa Teresita", en: "Santa Teresita Apartment" },
    ubicacion: {
      barrio: { es: "Barrio Santa Teresita", en: "Santa Teresita neighbourhood" },
      ciudad: "Cali",
    },
    precio: { valor: 650_000_000, unidad: "total" },
    resumen: {
      es: "Apartamento de 143,5 m² en el tercer piso, con piso en mármol y acabados en madera de cedro Caquetá, tres habitaciones, cocina integral y dos parqueaderos en línea.",
      en: "143.5 m² third-floor apartment with marble floors and Caquetá cedar wood finishes, three bedrooms, a fitted kitchen and two tandem parking spaces.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "143,5 m²", en: "143.5 m²" } },
      { etiqueta: { es: "Piso", en: "Floor" }, valor: { es: "3", en: "3" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "3 (principal con baño)", en: "3 (main en suite)" } },
      { etiqueta: { es: "Parqueaderos", en: "Parking" }, valor: { es: "2 en línea", en: "2 in tandem" } },
      { etiqueta: { es: "Administración", en: "Management fee" }, valor: { es: "$725.000", en: "COP 725,000" } },
    ],
    caracteristicas: [
      { es: "Piso en mármol y acabados de madera en cedro Caquetá", en: "Marble floors and Caquetá cedar wood finishes" },
      { es: "3 habitaciones, la principal con baño", en: "3 bedrooms, the main one with private bathroom" },
      { es: "Sala comedor", en: "Living and dining room" },
      { es: "Cocina integral", en: "Fitted kitchen" },
      { es: "Baño social", en: "Guest bathroom" },
      { es: "Alcoba de servicio con baño y zona de oficios", en: "Maid's room with bathroom and utility area" },
      { es: "Depósito", en: "Storage room" },
      { es: "Entrada y salida con dispositivo electrónico", en: "Electronic entry and exit device" },
    ],
    fotos: [
      { archivo: `${base}/apartamento-santa-teresita/01-sala-comedor.webp`, alt: { es: "Sala comedor con ventanales", en: "Living and dining room with large windows" } },
      { archivo: `${base}/apartamento-santa-teresita/02-alcoba-principal.webp`, alt: { es: "Alcoba principal con aire acondicionado", en: "Main bedroom with air conditioning" } },
      { archivo: `${base}/apartamento-santa-teresita/03-alcoba.webp`, alt: { es: "Alcoba con escritorio", en: "Bedroom with desk" } },
      { archivo: `${base}/apartamento-santa-teresita/04-estudio.webp`, alt: { es: "Habitación amplia con ventanal", en: "Large room with big window" } },
      { archivo: `${base}/apartamento-santa-teresita/05-cocina.webp`, alt: { es: "Cocina integral con mesón de granito", en: "Fitted kitchen with granite counter" } },
      { archivo: `${base}/apartamento-santa-teresita/06-bano-principal.webp`, alt: { es: "Baño con ducha de vidrio", en: "Bathroom with glass shower" } },
      { archivo: `${base}/apartamento-santa-teresita/07-bano-social.webp`, alt: { es: "Baño con mueble de madera", en: "Bathroom with wooden vanity" } },
      { archivo: `${base}/apartamento-santa-teresita/08-hall.webp`, alt: { es: "Hall con puertas de madera", en: "Hall with wooden doors" } },
      { archivo: `${base}/apartamento-santa-teresita/09-pasillo.webp`, alt: { es: "Pasillo hacia la sala", en: "Hallway towards the living room" } },
      { archivo: `${base}/apartamento-santa-teresita/10-recepcion-edificio.webp`, alt: { es: "Recepción del edificio", en: "Building reception" } },
    ],
  },
  {
    slug: "locales-pacific-mall",
    tipo: "local",
    operacion: "alquiler",
    nombre: { es: "Locales Pacific Mall", en: "Pacific Mall Retail Units" },
    ubicacion: {
      barrio: { es: "Chipichape", en: "Chipichape" },
      ciudad: "Cali",
      detalle: { es: "Centro Comercial Pacific Mall", en: "Pacific Mall shopping centre" },
    },
    precio: { valor: 29_032_200, unidad: "mes", masIva: true },
    resumen: {
      es: "Locales comerciales en el segundo piso del Centro Comercial Pacific Mall, un complejo comercial y de oficinas en Chipichape, reconocido por su moderna arquitectura y sostenibilidad.",
      en: "Retail units on the second floor of the Pacific Mall shopping centre, a retail and office complex in Chipichape known for its modern architecture and sustainability.",
    },
    datos: [
      { etiqueta: { es: "Área disponible", en: "Available area" }, valor: { es: "483,87 m² en el piso 2", en: "483.87 m² on floor 2" } },
      { etiqueta: { es: "Locales", en: "Units" }, valor: { es: "134,03 · 167,20 · 182,64 m²", en: "134.03 · 167.20 · 182.64 m²" } },
      { etiqueta: { es: "Canon total", en: "Total rent" }, valor: { es: "$29.032.200 + IVA", en: "COP 29,032,200 + VAT" } },
      { etiqueta: { es: "Administración total", en: "Total management fee" }, valor: { es: "$21.906.138 + IVA", en: "COP 21,906,138 + VAT" } },
    ],
    caracteristicas: [
      { es: "Cinco niveles comerciales con diversas tiendas", en: "Five retail levels with a wide range of stores" },
      { es: "Marcas nacionales e internacionales", en: "National and international brands" },
      { es: "Área de restaurantes con terraza", en: "Restaurant area with terrace" },
      { es: "Ubicado en el sector de Chipichape", en: "Located in the Chipichape district" },
      { es: "Complejo comercial y de oficinas de arquitectura moderna y sostenible", en: "Retail and office complex with modern, sustainable architecture" },
    ],
    fotos: [
      { archivo: `${base}/locales-pacific-mall/01-fachada.webp`, alt: { es: "Fachada del Centro Comercial Pacific Mall", en: "Façade of the Pacific Mall shopping centre" } },
      { archivo: `${base}/locales-pacific-mall/02-vista-aerea.webp`, alt: { es: "Vista aérea del centro comercial y su entorno", en: "Aerial view of the shopping centre and its surroundings" } },
      { archivo: `${base}/locales-pacific-mall/03-edificio.webp`, alt: { es: "Edificio visto desde la calle", en: "Building seen from the street" } },
      { archivo: `${base}/locales-pacific-mall/04-atrio.webp`, alt: { es: "Atrio con los niveles comerciales", en: "Atrium with the retail levels" } },
      { archivo: `${base}/locales-pacific-mall/05-niveles-comerciales.webp`, alt: { es: "Niveles comerciales con tiendas", en: "Retail levels with stores" } },
      { archivo: `${base}/locales-pacific-mall/06-pasillo-local.webp`, alt: { es: "Pasillo del segundo piso con un local disponible", en: "Second-floor corridor with an available unit" } },
    ],
    nota: {
      es: "Los valores de canon y administración corresponden al total de los tres locales y no incluyen IVA.",
      en: "Rent and management fee figures are the total for the three units and exclude VAT.",
    },
  },
  {
    slug: "lotes-jamundi",
    tipo: "lote",
    operacion: "venta",
    nombre: { es: "Lotes en Jamundí", en: "Lots in Jamundí" },
    ubicacion: {
      barrio: { es: "Autopista Panamericana", en: "Panamericana Highway" },
      ciudad: "Jamundí",
      detalle: {
        es: "Limita con la Autopista Panamericana y con los barrios Ciudadela Terranova y Terranova Apartamentos Sector J",
        en: "Borders the Panamericana Highway and the Ciudadela Terranova and Terranova Apartamentos Sector J neighbourhoods",
      },
    },
    precio: { valor: 9_000_000_000, unidad: "total" },
    resumen: {
      es: "Lote de terreno de 60.540 m² con uso de suelo residencial y servicios públicos aprobados para hasta 180 edificios de hasta 5 pisos, sobre la Autopista Panamericana.",
      en: "60,540 m² plot with residential zoning and utilities approved for up to 180 buildings of up to 5 floors, on the Panamericana Highway.",
    },
    datos: [
      { etiqueta: { es: "Área total", en: "Total area" }, valor: { es: "60.540 m²", en: "60,540 m²" } },
      { etiqueta: { es: "Lote 1", en: "Lot 1" }, valor: { es: "5.220 m²", en: "5,220 m²" } },
      { etiqueta: { es: "Lote 2", en: "Lot 2" }, valor: { es: "14.790 m²", en: "14,790 m²" } },
      { etiqueta: { es: "Lote 3", en: "Lot 3" }, valor: { es: "40.530 m²", en: "40,530 m²" } },
      { etiqueta: { es: "Uso de suelo", en: "Zoning" }, valor: { es: "Residencial", en: "Residential" } },
    ],
    caracteristicas: [
      { es: "Uso de suelo residencial", en: "Residential zoning" },
      { es: "Servicios públicos aprobados para hasta 180 edificios", en: "Utilities approved for up to 180 buildings" },
      { es: "Edificios de hasta 5 pisos", en: "Buildings of up to 5 floors" },
      { es: "Frente a la Autopista Panamericana", en: "Fronting the Panamericana Highway" },
      { es: "Colinda con Ciudadela Terranova y Terranova Apartamentos Sector J", en: "Adjoins Ciudadela Terranova and Terranova Apartamentos Sector J" },
    ],
    fotos: [
      { archivo: `${base}/lotes-jamundi/01-vista-aerea.webp`, alt: { es: "Vista aérea con el lote delimitado en amarillo", en: "Aerial view with the plot outlined in yellow" } },
      { archivo: `${base}/lotes-jamundi/02-delimitacion.webp`, alt: { es: "Delimitación del lote junto a los conjuntos residenciales", en: "Plot boundary next to the residential complexes" } },
      { archivo: `${base}/lotes-jamundi/03-entorno.webp`, alt: { es: "Ubicación del lote y su entorno urbano", en: "Location of the plot and its urban surroundings" } },
    ],
  },
  {
    slug: "local-centenario",
    tipo: "local",
    inversion: true,
    operacion: "venta",
    nombre: { es: "Local Centenario", en: "Centenario Retail Unit" },
    ubicacion: {
      barrio: { es: "Centro Empresarial Torre Centenario", en: "Torre Centenario Business Centre" },
      ciudad: "Cali",
    },
    precio: { valor: 2_565_000_000, unidad: "total" },
    resumen: {
      es: "Local comercial de 344,48 m² con renta, arrendado a D1 en el Centro Empresarial Torre Centenario, con incremento anual de IPC + 1.",
      en: "344.48 m² income-producing retail unit leased to D1 in the Torre Centenario Business Centre, with an annual increase of CPI + 1.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "344,48 m²", en: "344.48 m²" } },
      { etiqueta: { es: "Arrendatario", en: "Tenant" }, valor: { es: "D1", en: "D1" } },
      { etiqueta: { es: "Renovación del contrato", en: "Lease renewal" }, valor: { es: "Febrero de 2026", en: "February 2026" } },
      { etiqueta: { es: "Rentabilidad", en: "Yield" }, valor: { es: "0,85 %", en: "0.85%" } },
      { etiqueta: { es: "Incremento anual", en: "Annual increase" }, valor: { es: "IPC + 1", en: "CPI + 1" } },
    ],
    caracteristicas: [
      { es: "Local comercial con renta", en: "Income-producing retail unit" },
      { es: "Arrendatario de marca reconocida (D1)", en: "Well-known brand as tenant (D1)" },
      { es: "Incremento anual de IPC + 1", en: "Annual increase of CPI + 1" },
      { es: "Ubicado en el Centro Empresarial Torre Centenario", en: "Located in the Torre Centenario Business Centre" },
    ],
    fotos: [
      { archivo: `${base}/local-centenario/01-fachada.webp`, alt: { es: "Fachada del edificio del local", en: "Façade of the building housing the unit" } },
      { archivo: `${base}/local-centenario/02-edificio-esquina.webp`, alt: { es: "Edificio visto desde la esquina", en: "Building seen from the corner" } },
      { archivo: `${base}/local-centenario/03-vista-lateral.webp`, alt: { es: "Vista lateral del edificio", en: "Side view of the building" } },
      { archivo: `${base}/local-centenario/04-local-interior.webp`, alt: { es: "Interior del local con góndolas", en: "Unit interior with shelving" } },
      { archivo: `${base}/local-centenario/05-local-pasillo.webp`, alt: { es: "Pasillo central del local", en: "Central aisle of the unit" } },
      { archivo: `${base}/local-centenario/06-local-gondolas.webp`, alt: { es: "Zona de góndolas del local", en: "Shelving area of the unit" } },
      { archivo: `${base}/local-centenario/07-calle.webp`, alt: { es: "Calle frente al edificio", en: "Street in front of the building" } },
      { archivo: `${base}/local-centenario/08-vista-satelital.webp`, alt: { es: "Vista satelital de la ubicación", en: "Satellite view of the location" } },
    ],
  },
  {
    slug: "lote-palmira-las-mercedes",
    tipo: "lote",
    operacion: "venta",
    nombre: { es: "Lote Las Mercedes, Palmira", en: "Las Mercedes Lot, Palmira" },
    ubicacion: {
      barrio: { es: "Sector Las Mercedes", en: "Las Mercedes district" },
      ciudad: "Palmira",
    },
    precio: { valor: 750_000, unidad: "m2" },
    resumen: {
      es: "Lote de 8.000 m² en la zona de expansión urbana Las Mercedes, con uso de suelo mixto de vivienda y comercio, en una de las zonas de mayor proyección de Palmira.",
      en: "8,000 m² plot in the Las Mercedes urban expansion area, with mixed housing and commercial zoning, in one of Palmira's fastest-growing districts.",
    },
    datos: [
      { etiqueta: { es: "Área", en: "Area" }, valor: { es: "8.000 m²", en: "8,000 m²" } },
      { etiqueta: { es: "Uso de suelo", en: "Zoning" }, valor: { es: "Vivienda y comercio", en: "Housing and commercial" } },
      { etiqueta: { es: "Altura máxima", en: "Maximum height" }, valor: { es: "10 pisos", en: "10 floors" } },
      { etiqueta: { es: "Ocupación máxima", en: "Maximum site coverage" }, valor: { es: "0,80, con loteo individual", en: "0.80, with individual subdivision" } },
      { etiqueta: { es: "Plan parcial", en: "Partial plan" }, valor: { es: "Las Mercedes, Acuerdo 080 de 2011", en: "Las Mercedes, Agreement 080 of 2011" } },
    ],
    caracteristicas: [
      { es: "Zona de expansión urbana Las Mercedes, reglamentada por el Acuerdo 080 de 2011 del POT", en: "Las Mercedes urban expansion area, regulated by Agreement 080 of 2011 of the land-use plan" },
      { es: "Apto para proyectos residenciales, conjuntos multifamiliares, uso mixto o iniciativas comerciales", en: "Suitable for residential projects, multifamily complexes, mixed use or commercial ventures" },
      { es: "Sector residencial de estratos 3, 4 y 5, con proyectos de vivienda de clase media y media-alta", en: "Residential area of socioeconomic strata 3, 4 and 5, with middle and upper-middle income housing projects" },
      { es: "Acceso a colegios, servicios de salud, comercio y corredores viales hacia Palmira, Cali y el corredor industrial del Valle", en: "Access to schools, healthcare, shops and roads linking Palmira, Cali and the Valle industrial corridor" },
      { es: "Palmira: más de 300.000 habitantes, segunda ciudad del Valle del Cauca y cercana al aeropuerto Alfonso Bonilla Aragón", en: "Palmira: over 300,000 inhabitants, the second city of Valle del Cauca, close to Alfonso Bonilla Aragón airport" },
    ],
    fotos: [
      { archivo: `${base}/lote-palmira-las-mercedes/01-lote.webp`, alt: { es: "Vista aérea del lote delimitado en amarillo", en: "Aerial view of the plot outlined in yellow" } },
      { archivo: `${base}/lote-palmira-las-mercedes/02-delimitacion.webp`, alt: { es: "Delimitación del lote entre cultivos", en: "Plot boundary among farmland" } },
      { archivo: `${base}/lote-palmira-las-mercedes/03-entorno.webp`, alt: { es: "Ubicación del lote y su entorno urbano", en: "Location of the plot and its urban surroundings" } },
      { archivo: `${base}/lote-palmira-las-mercedes/04-plan-parcial.webp`, alt: { es: "Plano del plan parcial de la zona de expansión Las Mercedes", en: "Plan of the Las Mercedes expansion area partial plan" } },
    ],
    nota: {
      es: "El precio es por metro cuadrado.",
      en: "The price is per square metre.",
    },
  },
  {
    slug: "locales-g-sur",
    tipo: "local",
    inversion: true,
    operacion: "venta",
    nombre: { es: "Locales G Sur con Renta", en: "G Sur Retail Units with Income" },
    ubicacion: {
      barrio: { es: "Barrio El Caney", en: "El Caney neighbourhood" },
      ciudad: "Cali",
      detalle: {
        es: "Avenida Calle 48 entre carreras 83C y 83E, sur de Cali",
        en: "Avenida Calle 48 between carreras 83C and 83E, south Cali",
      },
    },
    precio: { valor: 6_500_000_000, unidad: "total" },
    resumen: {
      es: "Locales con renta de marcas reconocidas (Cruz Verde, La Mejor y Dollarcity), en zona residencial del sur de Cali cercana a supermercados generadores de tráfico.",
      en: "Retail units leased to well-known brands (Cruz Verde, La Mejor and Dollarcity), in a residential area of south Cali close to traffic-generating supermarkets.",
    },
    datos: [
      { etiqueta: { es: "Área total construida", en: "Total built area" }, valor: { es: "722 m²", en: "722 m²" } },
      { etiqueta: { es: "Área Cruz Verde", en: "Cruz Verde area" }, valor: { es: "80 m²", en: "80 m²" } },
      { etiqueta: { es: "Área La Mejor", en: "La Mejor area" }, valor: { es: "161 m²", en: "161 m²" } },
      { etiqueta: { es: "Área Dollarcity", en: "Dollarcity area" }, valor: { es: "581 m²", en: "581 m²" } },
      { etiqueta: { es: "Renta actual", en: "Current rent" }, valor: { es: "$53,4 millones", en: "COP 53.4 million" } },
      { etiqueta: { es: "Rentabilidad", en: "Yield" }, valor: { es: "0,82 %", en: "0.82%" } },
    ],
    caracteristicas: [
      { es: "Locales arrendados a marcas reconocidas", en: "Units leased to well-known brands" },
      { es: "Zona residencial en el sur de Cali", en: "Residential area in south Cali" },
      { es: "Cerca de generadores de tráfico: supermercados Surtifamiliar, Ara y Bodytech", en: "Close to traffic generators: Surtifamiliar and Ara supermarkets and Bodytech" },
      { es: "Frente a la Avenida Calle 48", en: "Fronting Avenida Calle 48" },
    ],
    fotos: [
      { archivo: `${base}/locales-g-sur/01-fachada-locales.webp`, alt: { es: "Fachada de los locales con Cruz Verde, La Mejor y Dollarcity", en: "Façade of the units with Cruz Verde, La Mejor and Dollarcity" } },
      { archivo: `${base}/locales-g-sur/02-vista-calle.webp`, alt: { es: "Locales vistos desde la avenida", en: "Units seen from the avenue" } },
      { archivo: `${base}/locales-g-sur/03-plano.webp`, alt: { es: "Plano de distribución de los locales", en: "Floor plan showing the layout of the units" } },
    ],
  },
  {
    slug: "edificio-fatima",
    tipo: "edificio",
    inversion: true,
    operacion: "venta",
    nombre: { es: "Edificio Fátima Apartaestudios", en: "Fátima Studio Apartments Building" },
    ubicacion: {
      barrio: { es: "Barrio Granada", en: "Granada neighbourhood" },
      ciudad: "Cali",
      detalle: { es: "Avenida 7N # 17AN-60", en: "Avenida 7N # 17AN-60" },
    },
    precio: { valor: 1_100_000_000, unidad: "total" },
    resumen: {
      es: "Edificio de tres pisos con 9 apartaestudios en el corazón de Granada, con ingreso mensual por arrendamientos y alta demanda en el sector.",
      en: "Three-storey building with 9 studio apartments in the heart of Granada, with monthly rental income and strong demand in the area.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "158 m²", en: "158 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "Aprox. 450 m²", en: "Approx. 450 m²" } },
      { etiqueta: { es: "Pisos", en: "Floors" }, valor: { es: "3", en: "3" } },
      { etiqueta: { es: "Apartaestudios", en: "Studio apartments" }, valor: { es: "9", en: "9" } },
      { etiqueta: { es: "Ingreso mensual por arrendamientos", en: "Monthly rental income" }, valor: { es: "$7.755.000", en: "COP 7,755,000" } },
    ],
    caracteristicas: [
      { es: "9 apartaestudios en 3 pisos", en: "9 studio apartments over 3 floors" },
      { es: "Ingreso mensual por arrendamientos", en: "Monthly rental income" },
      { es: "Excelente ubicación y alta demanda en el sector", en: "Excellent location and strong demand in the area" },
      { es: "Una inversión segura en el corazón de Granada", en: "A secure investment in the heart of Granada" },
    ],
    fotos: [
      { archivo: `${base}/edificio-fatima/01-fachada.webp`, alt: { es: "Fachada del Edificio Fátima", en: "Façade of the Fátima Building" } },
      { archivo: `${base}/edificio-fatima/02-vista-frontal.webp`, alt: { es: "Vista frontal del edificio", en: "Front view of the building" } },
      { archivo: `${base}/edificio-fatima/03-vista-lateral.webp`, alt: { es: "Vista lateral y garaje del edificio", en: "Side view and garage of the building" } },
    ],
  },
  {
    slug: "casa-la-morada",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa La Morada", en: "La Morada House" },
    ubicacion: {
      barrio: { es: "Parcelación La Morada", en: "La Morada gated community" },
      ciudad: "Jamundí",
    },
    precio: { valor: 1_280_000_000, unidad: "total" },
    resumen: {
      es: "Casa campestre en La Morada, Jamundí, con piscina, jacuzzi, zona de BBQ y amplios jardines, en total tranquilidad y a pocos minutos de todo.",
      en: "Country house in La Morada, Jamundí, with a pool, jacuzzi, BBQ area and large gardens, in complete peace and just minutes from everything.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "1.000 m²", en: "1,000 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "254 m²", en: "254 m²" } },
      { etiqueta: { es: "Área privada", en: "Private area" }, valor: { es: "290 m²", en: "290 m²" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "3, la principal con baño", en: "3, the main one en suite" } },
      { etiqueta: { es: "Baños", en: "Bathrooms" }, valor: { es: "5", en: "5" } },
      { etiqueta: { es: "Estudios", en: "Studies" }, valor: { es: "2", en: "2" } },
      { etiqueta: { es: "Parqueaderos", en: "Parking" }, valor: { es: "3 vehículos", en: "3 vehicles" } },
      { etiqueta: { es: "Administración", en: "Management fee" }, valor: { es: "$863.000", en: "COP 863,000" } },
    ],
    caracteristicas: [
      { es: "Amplia sala en el segundo piso y sala comedor en el primero", en: "Large lounge on the second floor and living-dining room on the first" },
      { es: "Balcón amplio hacia la piscina", en: "Large balcony overlooking the pool" },
      { es: "Cocina integral y área de oficios", en: "Fitted kitchen and utility area" },
      { es: "Piscina, jacuzzi, área social y zona para BBQ", en: "Pool, jacuzzi, social area and BBQ zone" },
      { es: "Amplios jardines", en: "Spacious gardens" },
      { es: "Paneles solares calculados para toda la casa, con 4 personas, electrodomésticos normales y calentador Bosch", en: "Solar panels sized for the whole house with 4 residents, standard appliances and a Bosch water heater" },
    ],
    fotos: [
      { archivo: `${base}/casa-la-morada/01-fachada-piscina.webp`, alt: { es: "Fachada posterior de la casa con la piscina", en: "Rear façade of the house with the pool" } },
      { archivo: `${base}/casa-la-morada/02-jardin.webp`, alt: { es: "Jardín y fachada lateral de la casa", en: "Garden and side façade of the house" } },
      { archivo: `${base}/casa-la-morada/03-piscina.webp`, alt: { es: "Piscina y fachada de la casa", en: "Pool and house façade" } },
      { archivo: `${base}/casa-la-morada/04-lateral.webp`, alt: { es: "Vista lateral de la casa y su jardín", en: "Side view of the house and its garden" } },
      { archivo: `${base}/casa-la-morada/05-fachada-lateral.webp`, alt: { es: "Fachada lateral de la casa", en: "Side façade of the house" } },
      { archivo: `${base}/casa-la-morada/06-acceso.webp`, alt: { es: "Acceso a la casa entre vegetación", en: "Entrance to the house among greenery" } },
      { archivo: `${base}/casa-la-morada/07-piscina-jardin.webp`, alt: { es: "Piscina rodeada de jardín", en: "Pool surrounded by garden" } },
      { archivo: `${base}/casa-la-morada/08-parqueadero.webp`, alt: { es: "Zona de parqueo junto a la casa", en: "Parking area next to the house" } },
      { archivo: `${base}/casa-la-morada/09-ventanales.webp`, alt: { es: "Ventanales y balcón de la casa", en: "Windows and balcony of the house" } },
      { archivo: `${base}/casa-la-morada/10-habitacion.webp`, alt: { es: "Habitación con salida al balcón", en: "Bedroom with balcony access" } },
    ],
  },
  {
    slug: "casa-condominio-las-mercedes",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa de Lujo Las Mercedes", en: "Las Mercedes Luxury House" },
    ubicacion: {
      barrio: { es: "Condominio Campestre Las Mercedes", en: "Las Mercedes country condominium" },
      ciudad: "Jamundí",
    },
    precio: { valor: 11_000_000_000, unidad: "total" },
    resumen: {
      es: "Complejo inteligente de lujo en cinco módulos independientes, de estilo vanguardista y con domótica de última generación, en el Condominio Campestre Las Mercedes.",
      en: "Luxury smart complex in five independent modules, avant-garde in style and with state-of-the-art home automation, in the Las Mercedes country condominium.",
    },
    datos: [
      { etiqueta: { es: "Lote", en: "Lot" }, valor: { es: "5.000 m²", en: "5,000 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "3.100 m²", en: "3,100 m²" } },
      { etiqueta: { es: "Módulos", en: "Modules" }, valor: { es: "5 independientes", en: "5 independent" } },
      { etiqueta: { es: "Suite principal", en: "Master suite" }, valor: { es: "160 m², con terraza de 40 m²", en: "160 m², with a 40 m² terrace" } },
      { etiqueta: { es: "Casa de mayordomo y escoltas", en: "Butler and security house" }, valor: { es: "70 m² independientes", en: "70 m², self-contained" } },
      { etiqueta: { es: "Parqueadero cubierto", en: "Covered parking" }, valor: { es: "8 vehículos", en: "8 vehicles" } },
    ],
    caracteristicas: [
      { es: "Domótica para control de sonido, iluminación, cortinas y piscina", en: "Home automation for sound, lighting, curtains and pool" },
      { es: "Dobles alturas de 9 metros con ventanales de piso a techo", en: "9-metre double-height ceilings with floor-to-ceiling windows" },
      { es: "Pisos importados de España y acabados de lujo", en: "Floors imported from Spain and luxury finishes" },
      { es: "Casa principal con 6 habitaciones, 3 de ellas con baño y vestier privado, y 4 habitaciones de servicio con baño", en: "Main house with 6 bedrooms, 3 of them with private bathroom and walk-in closet, and 4 service rooms with bathroom" },
      { es: "Cocina con electrodomésticos KitchenAid, capilla privada y oficina de negocios", en: "Kitchen with KitchenAid appliances, private chapel and business office" },
      { es: "Discoteca para 200 personas, cine, casino, gimnasio, salón de juegos y sauna", en: "Nightclub for 200 people, cinema, casino, gym, games room and sauna" },
      { es: "Bar piscina y jacuzzi exterior climatizado para 12 personas", en: "Pool bar and heated outdoor jacuzzi for 12 people" },
      { es: "Cancha de fútbol, huerta, árboles frutales y sistema de riego automatizado", en: "Football pitch, vegetable garden, fruit trees and automated irrigation" },
      { es: "Energía solar y aljibe", en: "Solar power and water cistern" },
      { es: "Garaje con 3 vitrinas de exhibición domotizadas", en: "Garage with 3 automated display cases" },
    ],
    fotos: [
      { archivo: `${base}/casa-condominio-las-mercedes/01-piscina.webp`, alt: { es: "Piscina y fachada de la casa", en: "Pool and house façade" } },
      { archivo: `${base}/casa-condominio-las-mercedes/02-comedor.webp`, alt: { es: "Comedor con doble altura", en: "Double-height dining room" } },
      { archivo: `${base}/casa-condominio-las-mercedes/03-jardin-fuente.webp`, alt: { es: "Jardín con fuente y zonas verdes", en: "Garden with fountain and green areas" } },
      { archivo: `${base}/casa-condominio-las-mercedes/04-sala.webp`, alt: { es: "Sala principal con sofás en esquina", en: "Main living room with corner sofas" } },
      { archivo: `${base}/casa-condominio-las-mercedes/05-capilla.webp`, alt: { es: "Capilla privada", en: "Private chapel" } },
      { archivo: `${base}/casa-condominio-las-mercedes/06-terraza-piscina.webp`, alt: { es: "Terraza con camas de sol junto a la piscina", en: "Terrace with sunbeds by the pool" } },
      { archivo: `${base}/casa-condominio-las-mercedes/07-escalera-doble-altura.webp`, alt: { es: "Escalera en espiral y doble altura", en: "Spiral staircase and double-height space" } },
      { archivo: `${base}/casa-condominio-las-mercedes/08-sala-estar.webp`, alt: { es: "Sala de estar con vista al jardín", en: "Lounge with garden views" } },
      { archivo: `${base}/casa-condominio-las-mercedes/09-piscina-dia.webp`, alt: { es: "Piscina y zonas sociales de día", en: "Pool and social areas by day" } },
      { archivo: `${base}/casa-condominio-las-mercedes/10-billar.webp`, alt: { es: "Salón de billar", en: "Billiards room" } },
      { archivo: `${base}/casa-condominio-las-mercedes/11-discoteca.webp`, alt: { es: "Discoteca de la casa", en: "The house nightclub" } },
      { archivo: `${base}/casa-condominio-las-mercedes/12-piscina-noche.webp`, alt: { es: "Piscina iluminada de noche", en: "Pool lit up at night" } },
      { archivo: `${base}/casa-condominio-las-mercedes/13-vista-nocturna.webp`, alt: { es: "Vista nocturna de la casa y la piscina", en: "Night view of the house and pool" } },
      { archivo: `${base}/casa-condominio-las-mercedes/14-vista-aerea.webp`, alt: { es: "Vista aérea del complejo", en: "Aerial view of the complex" } },
    ],
  },
  {
    slug: "casa-pance-bello-horizonte",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa Pance, Bello Horizonte", en: "Pance House, Bello Horizonte" },
    ubicacion: {
      barrio: { es: "Parcelación Bello Horizonte, Pance", en: "Bello Horizonte gated community, Pance" },
      ciudad: "Cali",
    },
    precio: { valor: 2_500_000_000, unidad: "total" },
    resumen: {
      es: "Casa remodelada en una de las zonas campestres más privilegiadas del sur de Cali, con piscina, sauna, jacuzzi y amplias zonas sociales entre árboles.",
      en: "Renovated house in one of the most privileged country areas of south Cali, with a pool, sauna, jacuzzi and large social areas among the trees.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "1.150 m²", en: "1,150 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "560 m²", en: "560 m²" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "5", en: "5" } },
      { etiqueta: { es: "Baños", en: "Bathrooms" }, valor: { es: "7", en: "7" } },
      { etiqueta: { es: "Parqueaderos", en: "Parking" }, valor: { es: "6", en: "6" } },
      { etiqueta: { es: "Administración", en: "Management fee" }, valor: { es: "$1.700.000", en: "COP 1,700,000" } },
    ],
    caracteristicas: [
      { es: "Amplia sala comedor y sala de estudio o TV", en: "Large living-dining room and study or TV room" },
      { es: "Cocina, cuarto de oficios con baño completo y área de aseo", en: "Kitchen, utility room with full bathroom and cleaning area" },
      { es: "Piscina, sauna, jacuzzi, kiosco bar, toldo y kiosco de asados", en: "Pool, sauna, jacuzzi, bar gazebo, awning and BBQ gazebo" },
      { es: "Cuarto de herramientas", en: "Tool room" },
      { es: "Parcelación con cancha de tenis, sendero peatonal, juegos infantiles y piscina", en: "Gated community with tennis court, walking path, playground and pool" },
      { es: "Rodeada de árboles, tranquilidad y seguridad", en: "Surrounded by trees, quiet and security" },
    ],
    fotos: [
      { archivo: `${base}/casa-pance-bello-horizonte/01-fachada.webp`, alt: { es: "Fachada de la casa en ladrillo con jardín", en: "Brick façade of the house with garden" } },
      { archivo: `${base}/casa-pance-bello-horizonte/02-fachada-frontal.webp`, alt: { es: "Frente de la casa y zona de parqueo", en: "Front of the house and parking area" } },
      { archivo: `${base}/casa-pance-bello-horizonte/03-terraza-piscina.webp`, alt: { es: "Terraza cubierta frente a la piscina", en: "Covered terrace facing the pool" } },
      { archivo: `${base}/casa-pance-bello-horizonte/04-piscina.webp`, alt: { es: "Piscina con corredor cubierto", en: "Pool with covered walkway" } },
      { archivo: `${base}/casa-pance-bello-horizonte/05-sala.webp`, alt: { es: "Sala con muebles de cuero", en: "Living room with leather furniture" } },
      { archivo: `${base}/casa-pance-bello-horizonte/06-comedor-escalera.webp`, alt: { es: "Comedor y escalera", en: "Dining room and staircase" } },
      { archivo: `${base}/casa-pance-bello-horizonte/07-cocina.webp`, alt: { es: "Cocina blanca", en: "White kitchen" } },
      { archivo: `${base}/casa-pance-bello-horizonte/08-piscina-casa.webp`, alt: { es: "Piscina y fachada posterior", en: "Pool and rear façade" } },
      { archivo: `${base}/casa-pance-bello-horizonte/09-corredor-piscina.webp`, alt: { es: "Corredor de madera junto a la piscina", en: "Timber-roofed walkway by the pool" } },
      { archivo: `${base}/casa-pance-bello-horizonte/10-comedor-exterior.webp`, alt: { es: "Comedor exterior frente a la piscina", en: "Outdoor dining area facing the pool" } },
      { archivo: `${base}/casa-pance-bello-horizonte/11-zona-bar.webp`, alt: { es: "Zona de bar y mesas exteriores", en: "Bar area and outdoor tables" } },
      { archivo: `${base}/casa-pance-bello-horizonte/12-kiosco-billar.webp`, alt: { es: "Kiosco con mesa de billar", en: "Gazebo with a pool table" } },
      { archivo: `${base}/casa-pance-bello-horizonte/13-entrada.webp`, alt: { es: "Entrada con ladrillo y plantas", en: "Brick entrance with plants" } },
    ],
  },
  {
    slug: "casa-prados-del-norte",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa Prados del Norte", en: "Prados del Norte House" },
    ubicacion: {
      barrio: { es: "Barrio Prados del Norte", en: "Prados del Norte neighbourhood" },
      ciudad: "Cali",
      detalle: { es: "Avenida 3 Oeste # 10-27", en: "Avenida 3 Oeste # 10-27" },
    },
    precio: { valor: 1_300_000_000, unidad: "total" },
    resumen: {
      es: "Casa esquinera de dos pisos y sótano, sobre una vía principal del norte de Cali, ideal para una sede administrativa o corporativa, entidad oficial o empresarial.",
      en: "Corner house of two floors and a basement on a main road in north Cali, ideal for administrative or corporate headquarters, a public body or a business.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "338 m²", en: "338 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "406,70 m²", en: "406.70 m²" } },
      { etiqueta: { es: "Niveles", en: "Levels" }, valor: { es: "2 pisos y sótano", en: "2 floors and a basement" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "5", en: "5" } },
      { etiqueta: { es: "Parqueaderos", en: "Parking" }, valor: { es: "2 en sótano", en: "2 in the basement" } },
    ],
    caracteristicas: [
      { es: "Casa esquinera sobre vía principal", en: "Corner house on a main road" },
      { es: "Primer piso: cocina, zona de aseo, comedor, patio con fuente decorativa, sala, estadero, salón de estudio y baño social", en: "First floor: kitchen, cleaning area, dining room, patio with decorative fountain, living room, lounge, study and guest bathroom" },
      { es: "Segundo piso: habitación principal con vestier, jacuzzi y baño, balcón a la calle, hall de TV, 3 habitaciones y baños completos", en: "Second floor: master bedroom with walk-in closet, jacuzzi and bathroom, street-facing balcony, TV hall, 3 bedrooms and full bathrooms" },
      { es: "Sótano: 2 parqueaderos, habitación de servicio con baño completo y 2 depósitos", en: "Basement: 2 parking spaces, service room with full bathroom and 2 storage rooms" },
      { es: "Amplios espacios e iluminación natural", en: "Spacious rooms and natural light" },
      { es: "Acceso desde la Avenida Sexta y la Avenida Tercera Norte, cerca de centros comerciales, bancos, clínicas y consultorios médicos", en: "Access from Avenida Sexta and Avenida Tercera Norte, close to shopping centres, banks, clinics and medical practices" },
    ],
    fotos: [
      { archivo: `${base}/casa-prados-del-norte/01-fachada.webp`, alt: { es: "Fachada esquinera de la casa", en: "Corner façade of the house" } },
      { archivo: `${base}/casa-prados-del-norte/02-hall-segundo-piso.webp`, alt: { es: "Hall del segundo piso y baranda de la escalera", en: "Second-floor hall and staircase balustrade" } },
      { archivo: `${base}/casa-prados-del-norte/03-cocina.webp`, alt: { es: "Cocina con arcos y gabinetes blancos", en: "Kitchen with arched windows and white cabinets" } },
      { archivo: `${base}/casa-prados-del-norte/04-sala-tv.webp`, alt: { es: "Hall de TV", en: "TV hall" } },
      { archivo: `${base}/casa-prados-del-norte/05-estudio.webp`, alt: { es: "Salón de estudio con muebles empotrados", en: "Study with built-in furniture" } },
      { archivo: `${base}/casa-prados-del-norte/06-alcoba.webp`, alt: { es: "Alcoba con piso de madera", en: "Bedroom with wooden floor" } },
      { archivo: `${base}/casa-prados-del-norte/07-sala.webp`, alt: { es: "Sala con salida al exterior", en: "Living room with exterior access" } },
      { archivo: `${base}/casa-prados-del-norte/08-patio.webp`, alt: { es: "Patio con muro de piedra", en: "Patio with a stone wall" } },
      { archivo: `${base}/casa-prados-del-norte/09-bano-principal.webp`, alt: { es: "Baño principal con tocador doble", en: "Master bathroom with double vanity" } },
      { archivo: `${base}/casa-prados-del-norte/10-jacuzzi.webp`, alt: { es: "Jacuzzi del baño principal", en: "Master bathroom jacuzzi" } },
      { archivo: `${base}/casa-prados-del-norte/11-biblioteca.webp`, alt: { es: "Alcoba con biblioteca empotrada", en: "Bedroom with built-in bookcase" } },
      { archivo: `${base}/casa-prados-del-norte/12-estudio-segundo-piso.webp`, alt: { es: "Zona de estudio del segundo piso", en: "Second-floor study area" } },
    ],
  },
  {
    slug: "casa-bifamiliar-la-merced",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa Bifamiliar La Merced", en: "La Merced Two-Family House" },
    ubicacion: {
      barrio: { es: "Barrio La Merced", en: "La Merced neighbourhood" },
      ciudad: "Cali",
    },
    precio: { valor: 645_000_000, unidad: "total" },
    resumen: {
      es: "Casa bifamiliar de dos pisos con 8 habitaciones, 5 baños, tres salas comedor y tres patios, en estrato 4.",
      en: "Two-family house of two floors with 8 bedrooms, 5 bathrooms, three living-dining rooms and three patios, in socioeconomic stratum 4.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "322 m²", en: "322 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "176 m², 2 pisos", en: "176 m², 2 floors" } },
      { etiqueta: { es: "Antigüedad", en: "Age" }, valor: { es: "45 años", en: "45 years" } },
      { etiqueta: { es: "Habitaciones", en: "Bedrooms" }, valor: { es: "8", en: "8" } },
      { etiqueta: { es: "Baños", en: "Bathrooms" }, valor: { es: "5", en: "5" } },
      { etiqueta: { es: "Estrato", en: "Stratum" }, valor: { es: "4", en: "4" } },
    ],
    caracteristicas: [
      { es: "Casa bifamiliar de 2 pisos", en: "Two-family house over 2 floors" },
      { es: "3 salas comedor", en: "3 living-dining rooms" },
      { es: "3 espacios para TV o estudio", en: "3 TV or study spaces" },
      { es: "3 patios", en: "3 patios" },
      { es: "Garaje", en: "Garage" },
    ],
    fotos: [
      { archivo: `${base}/casa-bifamiliar-la-merced/01-fachada.webp`, alt: { es: "Fachada de la casa bifamiliar", en: "Façade of the two-family house" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/02-sala.webp`, alt: { es: "Sala con sofá y cuadros", en: "Living room with sofa and paintings" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/03-sala-estar.webp`, alt: { es: "Sala de estar con muebles de cuero", en: "Lounge with leather furniture" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/04-comedor.webp`, alt: { es: "Comedor y biblioteca", en: "Dining area and bookcase" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/05-comedor-principal.webp`, alt: { es: "Comedor con vitrina", en: "Dining room with display cabinet" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/06-cocina.webp`, alt: { es: "Cocina con mesón", en: "Kitchen with counter" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/07-escalera.webp`, alt: { es: "Escalera de la casa", en: "Staircase of the house" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/08-patio.webp`, alt: { es: "Patio con rejas", en: "Patio with security grilles" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/09-sala-segundo-piso.webp`, alt: { es: "Sala del segundo piso", en: "Second-floor living room" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/10-habitacion.webp`, alt: { es: "Habitación con closet", en: "Bedroom with wardrobe" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/11-bano.webp`, alt: { es: "Baño con pasillo", en: "Bathroom and hallway" } },
      { archivo: `${base}/casa-bifamiliar-la-merced/12-garaje-patio.webp`, alt: { es: "Garaje y patio", en: "Garage and patio" } },
    ],
  },
  {
    slug: "casa-la-flora",
    tipo: "casa",
    operacion: "venta",
    nombre: { es: "Casa La Flora", en: "La Flora House" },
    ubicacion: {
      barrio: { es: "Barrio La Flora", en: "La Flora neighbourhood" },
      ciudad: "Cali",
    },
    precio: { valor: 850_000_000, unidad: "total" },
    resumen: {
      es: "Casa independiente de 261,99 m² en La Flora, con un apartamento tipo loft independiente en el segundo piso.",
      en: "Detached house of 261.99 m² in La Flora, with a self-contained loft-style apartment on the second floor.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "388,40 m²", en: "388.40 m²" } },
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "261,99 m²", en: "261.99 m²" } },
      { etiqueta: { es: "Primer piso", en: "First floor" }, valor: { es: "4 habitaciones, 2 baños con tina", en: "4 bedrooms, 2 bathrooms with bathtub" } },
      { etiqueta: { es: "Segundo piso", en: "Second floor" }, valor: { es: "Apartamento tipo loft de 1 habitación", en: "1-bedroom loft-style apartment" } },
      { etiqueta: { es: "Garaje", en: "Garage" }, valor: { es: "Cubierto", en: "Covered" } },
    ],
    caracteristicas: [
      { es: "Primer piso: amplia sala comedor, espacio para TV o estudio y cocina integral", en: "First floor: large living-dining room, TV or study space and fitted kitchen" },
      { es: "Patio ornamental, jardín posterior, patio y zona de ropas", en: "Ornamental patio, back garden, laundry patio and utility area" },
      { es: "Habitación de servicio con baño", en: "Service room with bathroom" },
      { es: "Garaje cubierto y antejardín", en: "Covered garage and front garden" },
      { es: "Segundo piso: apartamento tipo loft con sala comedor, cocina integral, baño con tina, balcón y terraza", en: "Second floor: loft-style apartment with living-dining room, fitted kitchen, bathroom with bathtub, balcony and terrace" },
    ],
    fotos: [
      { archivo: `${base}/casa-la-flora/01-fachada.webp`, alt: { es: "Fachada de la casa entre jardines", en: "Façade of the house among gardens" } },
      { archivo: `${base}/casa-la-flora/02-sala.webp`, alt: { es: "Sala con muebles de madera y hamaca", en: "Living room with wooden furniture and hammock" } },
      { archivo: `${base}/casa-la-flora/03-sala-comedor.webp`, alt: { es: "Sala comedor amplia", en: "Large living-dining room" } },
      { archivo: `${base}/casa-la-flora/04-espacio-tv.webp`, alt: { es: "Espacio de estar con biblioteca", en: "Sitting area with bookshelves" } },
      { archivo: `${base}/casa-la-flora/05-cocina.webp`, alt: { es: "Cocina integral con comedor", en: "Fitted kitchen with dining table" } },
      { archivo: `${base}/casa-la-flora/06-habitacion.webp`, alt: { es: "Habitación con escritorio", en: "Bedroom with desk" } },
      { archivo: `${base}/casa-la-flora/07-habitacion-principal.webp`, alt: { es: "Habitación principal", en: "Main bedroom" } },
      { archivo: `${base}/casa-la-flora/08-loft.webp`, alt: { es: "Sala y comedor del loft", en: "Loft living and dining area" } },
      { archivo: `${base}/casa-la-flora/09-loft-sala.webp`, alt: { es: "Espacio abierto del loft con techo de madera", en: "Open loft space with timber ceiling" } },
      { archivo: `${base}/casa-la-flora/10-terraza.webp`, alt: { es: "Terraza con hamaca", en: "Terrace with hammock" } },
      { archivo: `${base}/casa-la-flora/11-patio.webp`, alt: { es: "Patio con zona de ropas", en: "Patio with laundry area" } },
    ],
  },
  {
    slug: "casa-santa-monica",
    tipo: "casa",
    tambienOperacion: "alquiler",
    operacion: "venta",
    nombre: { es: "Casa Santa Mónica", en: "Santa Mónica House" },
    ubicacion: {
      barrio: { es: "Santa Mónica Residencial", en: "Santa Mónica Residencial" },
      ciudad: "Cali",
    },
    precio: { valor: 600_000_000, unidad: "total" },
    resumen: {
      es: "Casa de dos niveles de 257,68 m², sólida y muy iluminada, en venta o alquiler. Sirve para oficinas, hotel boutique, hospedaje por aplicaciones, galería, spa o clínica de belleza.",
      en: "Two-level house of 257.68 m², solid and very bright, for sale or rent. Suitable for offices, a boutique hotel, app-based lodging, a gallery, a spa or a beauty clinic.",
    },
    datos: [
      { etiqueta: { es: "Área construida", en: "Built area" }, valor: { es: "257,68 m²", en: "257.68 m²" } },
      { etiqueta: { es: "Niveles", en: "Levels" }, valor: { es: "2", en: "2" } },
      { etiqueta: { es: "Valor de venta", en: "Sale price" }, valor: { es: "$600 millones", en: "COP 600 million" } },
      { etiqueta: { es: "Valor de alquiler", en: "Rent" }, valor: { es: "$5 millones al mes", en: "COP 5 million per month" } },
    ],
    caracteristicas: [
      { es: "Nivel 1: patio social, 2 baños sociales, estudio, 5 habitaciones y 1 habitación con baño privado", en: "Level 1: social patio, 2 guest bathrooms, study, 5 bedrooms and 1 bedroom with private bathroom" },
      { es: "Nivel 2: hall de acceso, sala comedor, baño social, zona de lavado y habitación de servicio con baño privado", en: "Level 2: entrance hall, living-dining room, guest bathroom, laundry area and service room with private bathroom" },
      { es: "Habitación con baño privado y entrada independiente", en: "Bedroom with private bathroom and separate entrance" },
      { es: "Garaje externo y garaje interno con entrada a la casa", en: "External garage and internal garage with direct entrance to the house" },
      { es: "Rodeada de árboles y muy iluminada", en: "Surrounded by trees and very bright" },
    ],
    fotos: [
      { archivo: `${base}/casa-santa-monica/01-fachada.webp`, alt: { es: "Fachada de la casa sobre la calle", en: "Street façade of the house" } },
      { archivo: `${base}/casa-santa-monica/02-sala.webp`, alt: { es: "Sala con piso de piedra", en: "Living room with stone floor" } },
      { archivo: `${base}/casa-santa-monica/03-salon.webp`, alt: { es: "Salón amplio", en: "Spacious hall" } },
      { archivo: `${base}/casa-santa-monica/04-cocina.webp`, alt: { es: "Cocina con mesón y gabinetes azules", en: "Kitchen with counter and blue cabinets" } },
      { archivo: `${base}/casa-santa-monica/05-garaje.webp`, alt: { es: "Garaje interno", en: "Internal garage" } },
      { archivo: `${base}/casa-santa-monica/06-patio.webp`, alt: { es: "Patio con palmas", en: "Patio with palms" } },
      { archivo: `${base}/casa-santa-monica/07-habitacion.webp`, alt: { es: "Habitación", en: "Bedroom" } },
      { archivo: `${base}/casa-santa-monica/08-habitacion-principal.webp`, alt: { es: "Habitación con cama negra", en: "Bedroom with black bed" } },
      { archivo: `${base}/casa-santa-monica/09-habitacion-suite.webp`, alt: { es: "Habitación con zona de estar", en: "Bedroom with sitting area" } },
      { archivo: `${base}/casa-santa-monica/10-bano.webp`, alt: { es: "Baño con ducha", en: "Bathroom with shower" } },
      { archivo: `${base}/casa-santa-monica/11-patio-interior.webp`, alt: { es: "Vista del patio interior desde arriba", en: "View of the inner patio from above" } },
      { archivo: `${base}/casa-santa-monica/12-pasillo.webp`, alt: { es: "Pasillo con salida a la terraza", en: "Corridor leading to the terrace" } },
    ],
  },
];

export function obtenerPropiedad(slug: string): Propiedad | undefined {
  return propiedades.find((p) => p.slug === slug);
}
