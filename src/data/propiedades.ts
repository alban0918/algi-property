/**
 * Inmuebles de Algi Property, transcritos de las fichas técnicas originales.
 * Cualquier dato que no figure en la ficha se deja sin definir (no se inventa).
 */

export type Idioma = "es" | "en";
export type Texto = Record<Idioma, string>;

export type TipoInmueble = "industrial" | "residencial" | "edificio";
export type Operacion = "alquiler" | "venta";

export interface Foto {
  archivo: string;
  alt: Texto;
  /** Imagen generada o recreada, no una foto actual del inmueble. */
  ilustrativa?: boolean;
}

export interface Propiedad {
  slug: string;
  tipo: TipoInmueble;
  operacion: Operacion;
  nombre: Texto;
  ubicacion: { barrio: Texto; ciudad: string; detalle?: Texto };
  /** Precio en pesos colombianos. Ausente = "consultar". */
  precio?: {
    valor: number;
    /** Unidad del precio: total o por metro cuadrado al mes. */
    unidad: "total" | "m2-mes";
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
    tipo: "industrial",
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
    tipo: "residencial",
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
];

export function obtenerPropiedad(slug: string): Propiedad | undefined {
  return propiedades.find((p) => p.slug === slug);
}
