/**
 * Inmuebles de Algi Property, transcritos de las fichas técnicas originales.
 * Cualquier dato que no figure en la ficha se deja sin definir (no se inventa).
 */

export type Idioma = "es" | "en";
export type Texto = Record<Idioma, string>;

export const tiposResidenciales = ["casa", "apartamento", "apartaestudio"] as const;
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
  operacion: Operacion;
  nombre: Texto;
  ubicacion: { barrio: Texto; ciudad: string; detalle?: Texto };
  /** Precio en pesos colombianos. Ausente = "consultar". */
  precio?: {
    valor: number;
    /** Unidad del precio: total, canon total al mes o por metro cuadrado al mes. */
    unidad: "total" | "mes" | "m2-mes";
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
    slug: "casa-lote-juanambu",
    tipo: "lote",
    operacion: "venta",
    nombre: { es: "Casa Lote Juanambú", en: "Juanambú Lot with House" },
    ubicacion: {
      barrio: { es: "Barrio Juanambú", en: "Juanambú neighbourhood" },
      ciudad: "Cali",
      detalle: { es: "Sobre la Avenida 9AN", en: "On Avenida 9AN" },
    },
    precio: { valor: 1_600_000_000, unidad: "total" },
    resumen: {
      es: "Lote de 502,66 m² para el desarrollo de proyectos habitacionales o apartaestudios para rentas cortas o largas, con excelente ubicación en el nor-oeste de Cali.",
      en: "502.66 m² lot for residential developments or studio apartments for short or long-term rentals, in an excellent north-west Cali location.",
    },
    datos: [
      { etiqueta: { es: "Área del lote", en: "Lot area" }, valor: { es: "502,66 m²", en: "502.66 m²" } },
      { etiqueta: { es: "Uso del suelo", en: "Zoning" }, valor: { es: "Residencial", en: "Residential" } },
      { etiqueta: { es: "Ubicación", en: "Location" }, valor: { es: "Juanambú, Av. 9AN", en: "Juanambú, Av. 9AN" } },
    ],
    caracteristicas: [
      { es: "Lote para desarrollo habitacional", en: "Lot for residential development" },
      { es: "Apto para apartaestudios de renta corta o larga", en: "Suitable for studio apartments for short or long-term rental" },
      { es: "Excelente ubicación en el nor-oeste de Cali", en: "Excellent north-west Cali location" },
      { es: "Sector residencial cerca de centros comerciales, clínicas, restaurantes, tiendas y cafés gourmet", en: "Residential area close to shopping centres, clinics, restaurants, shops and gourmet cafés" },
    ],
    fotos: [
      { archivo: `${base}/casa-lote-juanambu/01-vista-aerea.webp`, alt: { es: "Vista aérea con el lote marcado en amarillo", en: "Aerial view with the lot outlined in yellow" } },
      { archivo: `${base}/casa-lote-juanambu/02-muro-vegetacion.webp`, alt: { es: "Muro de piedra cubierto de vegetación", en: "Stone wall covered in vegetation" } },
      { archivo: `${base}/casa-lote-juanambu/03-calle.webp`, alt: { es: "Calle junto al lote con muro de piedra", en: "Street next to the lot with a stone wall" } },
      { archivo: `${base}/casa-lote-juanambu/04-vista-satelital.webp`, alt: { es: "Vista satelital del lote y su entorno", en: "Satellite view of the lot and its surroundings" } },
      { archivo: `${base}/casa-lote-juanambu/05-entorno.webp`, alt: { es: "Ubicación del lote en el barrio", en: "Location of the lot in the neighbourhood" } },
    ],
  },
];

export function obtenerPropiedad(slug: string): Propiedad | undefined {
  return propiedades.find((p) => p.slug === slug);
}
