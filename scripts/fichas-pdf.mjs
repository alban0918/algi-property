/**
 * Genera la ficha técnica en PDF de cada inmueble, en español e inglés:
 * public/fichas/{idioma}/ALGI-Property-…-{slug}.pdf (ver src/lib/ficha-pdf.ts)
 *
 * Se ejecuta solo antes de cada build (`prebuild`), así que toda propiedad nueva
 * en src/data/propiedades.ts tiene su ficha sin pasos manuales. Uso directo: npm run fichas
 *
 * Las fotos se eligen por calidad: se descartan las ilustrativas, las marcadas con
 * `ficha: false` y las que no tienen resolución suficiente para el espacio que ocuparían.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { Document, Font, Image, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";
import sharp from "sharp";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLICO = path.join(RAIZ, "public");
const SALIDA = path.join(PUBLICO, "fichas");

const { propiedades } = await import("../src/data/propiedades.ts");
const { contacto } = await import("../src/data/contacto.ts");
const { formatearPrecio } = await import("../src/lib/formato.ts");
const { rutaFichaPdf } = await import("../src/lib/ficha-pdf.ts");
const urlSitio = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.algiproperty.com").replace(/\/$/, "");
const mensajes = {
  es: JSON.parse(await fs.readFile(path.join(RAIZ, "messages/es.json"), "utf8")),
  en: JSON.parse(await fs.readFile(path.join(RAIZ, "messages/en.json"), "utf8")),
};

/* ---------- Fuentes de la marca (las mismas de la web) ---------- */
const fuentes = path.join(RAIZ, "node_modules/@fontsource");
Font.register({
  family: "Cormorant",
  fonts: [
    { src: `${fuentes}/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff`, fontWeight: 300 },
    { src: `${fuentes}/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff`, fontWeight: 400 },
    { src: `${fuentes}/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff`, fontWeight: 400, fontStyle: "italic" },
    { src: `${fuentes}/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff`, fontWeight: 500 },
  ],
});
Font.register({
  family: "Montserrat",
  fonts: [
    { src: `${fuentes}/montserrat/files/montserrat-latin-300-normal.woff`, fontWeight: 300 },
    { src: `${fuentes}/montserrat/files/montserrat-latin-400-normal.woff`, fontWeight: 400 },
    { src: `${fuentes}/montserrat/files/montserrat-latin-500-normal.woff`, fontWeight: 500 },
    { src: `${fuentes}/montserrat/files/montserrat-latin-600-normal.woff`, fontWeight: 600 },
  ],
});
// Sin guiones automáticos: el divisor por defecto es inglés y corta mal el español.
Font.registerHyphenationCallback((palabra) => [palabra]);

/* ---------- Paleta (globals.css) ---------- */
const c = {
  paper: "#f7f5f2",
  paper2: "#efebe6",
  line: "#d9d2cb",
  ink: "#2a2220",
  taupe: "#6b5a55",
  brass: "#a98254",
  brassDeep: "#7a5c34",
  brassLight: "#d2ae7c",
  night: "#0e1a18",
  cream: "#f3eee6",
  mist: "#b9b2a6",
};

/* ---------- Medidas (puntos; A4 = 595 x 842) ---------- */
const MARGEN = 40;
const ANCHO = 595.28 - MARGEN * 2;
const HERO = { w: ANCHO, h: 286 };
const GALERIA_HUECO = 8;
const GALERIA = { w: (ANCHO - GALERIA_HUECO * 2) / 3, h: 112 };
const GALERIA_MITAD = { w: (ANCHO - GALERIA_HUECO) / 2, h: 160 };
const GALERIA_MAX = 6;
/** Resolución mínima efectiva (píxeles por pulgada impresa) para que una foto se vea nítida en su espacio. */
const DPI_MIN_HERO = 85;
const DPI_MIN_GALERIA = 150;
const DPI_MIN_MITAD = 110;
/** Resolución de salida de las fotos dentro del PDF. */
const DPI_SALIDA = 220;
/** Estancias que lucen menos en una ficha de venta: solo se usan si no hay otras fotos válidas. */
const SECUNDARIAS = /bano|banos|pasillo|parqueadero|garaje|closet|hall|plano|delimitacion|satelital/;

/* ---------- Selección y preparación de fotos ---------- */
const cacheMeta = new Map();
async function medir(archivo) {
  if (!cacheMeta.has(archivo)) {
    const ruta = path.join(PUBLICO, archivo);
    const { width, height } = await sharp(ruta).metadata();
    cacheMeta.set(archivo, { ruta, width, height });
  }
  return cacheMeta.get(archivo);
}

/** Recorte centrado más grande con la proporción del hueco y su resolución efectiva. */
function recorte(meta, hueco) {
  const proporcion = hueco.w / hueco.h;
  let w = meta.width;
  let hh = Math.round(w / proporcion);
  if (hh > meta.height) {
    hh = meta.height;
    w = Math.round(hh * proporcion);
  }
  const left = Math.round((meta.width - w) / 2);
  const top = Math.round((meta.height - hh) / 2);
  return { left, top, width: w, height: hh, dpi: (w / hueco.w) * 72 };
}

async function prepararFoto(foto, hueco) {
  const meta = await medir(foto.archivo);
  const r = recorte(meta, hueco);
  const anchoSalida = Math.min(r.width, Math.round((hueco.w / 72) * DPI_SALIDA));
  const altoSalida = Math.round(anchoSalida * (hueco.h / hueco.w));
  const buffer = await sharp(meta.ruta)
    .extract({ left: r.left, top: r.top, width: r.width, height: r.height })
    .resize(anchoSalida, altoSalida)
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return { data: buffer, format: "jpg" };
}

async function elegirFotos(p) {
  const validas = [];
  for (const foto of p.fotos) {
    if (foto.ilustrativa || foto.ficha === false) continue;
    validas.push({ foto, meta: await medir(foto.archivo) });
  }
  const avisos = [];

  // Portada: la foto principal del inmueble si da la talla; si no, la de mayor resolución.
  const conDpi = validas.map((v) => ({ ...v, dpi: recorte(v.meta, HERO).dpi }));
  let hero = conDpi[0] && conDpi[0].dpi >= DPI_MIN_HERO * 1.25 ? conDpi[0] : undefined;
  hero ??= [...conDpi].sort((a, b) => b.dpi - a.dpi)[0];
  if (!hero) throw new Error(`${p.slug}: no tiene ninguna foto utilizable para la ficha`);
  if (hero.dpi < DPI_MIN_HERO) avisos.push(`portada a ${Math.round(hero.dpi)} ppp`);

  // Galería: fotos con resolución suficiente, primero las estancias principales y las horizontales.
  const nombre = (v) => path.basename(v.foto.archivo);
  const galeria = conDpi
    .filter((v) => v !== hero && recorte(v.meta, GALERIA).dpi >= DPI_MIN_GALERIA)
    .map((v, i) => ({
      v,
      orden: (SECUNDARIAS.test(nombre(v)) ? 2 : 0) + (v.meta.width < v.meta.height ? 1 : 0) + i / 100,
    }))
    .sort((a, b) => a.orden - b.orden)
    .slice(0, GALERIA_MAX)
    .map((x) => x.v);

  // Solo filas completas: 6 o 3 fotos en tercios; con 2 fotos, dos mitades si tienen resolución para ello.
  let enGaleria = galeria.length >= 3 ? galeria.slice(0, galeria.length >= 6 ? 6 : 3) : [];
  let hueco = GALERIA;
  if (galeria.length === 2) {
    const mitades = galeria.every((v) => recorte(v.meta, GALERIA_MITAD).dpi >= DPI_MIN_MITAD);
    enGaleria = galeria;
    hueco = mitades ? GALERIA_MITAD : GALERIA;
  }

  return {
    hero: await prepararFoto(hero.foto, HERO),
    galeria: await Promise.all(enGaleria.map((v) => prepararFoto(v.foto, hueco))),
    hueco,
    avisos,
  };
}

/* ---------- Estilos ---------- */
const s = StyleSheet.create({
  pagina: {
    backgroundColor: c.paper,
    color: c.ink,
    fontFamily: "Montserrat",
    fontSize: 9,
    fontWeight: 400,
    paddingTop: MARGEN,
    paddingBottom: MARGEN + 26,
    paddingHorizontal: MARGEN,
  },
  cabecera: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  logo: { alignItems: "center" },
  logoAlgi: { fontFamily: "Cormorant", fontWeight: 300, fontSize: 30, letterSpacing: 4.2, color: c.taupe, lineHeight: 1 },
  logoProperty: { fontSize: 5.6, letterSpacing: 2.6, color: c.taupe, marginTop: 3, textTransform: "uppercase" },
  cabeceraDerecha: { alignItems: "flex-end" },
  eyebrow: { fontSize: 6.5, fontWeight: 500, letterSpacing: 1.6, textTransform: "uppercase", color: c.brassDeep },
  cabeceraSub: { fontSize: 8, color: c.taupe, marginTop: 3 },
  filete: { borderBottomWidth: 0.6, borderBottomColor: c.line, marginTop: 14 },
  hero: { width: HERO.w, height: HERO.h, marginTop: 18, objectFit: "cover" },
  titular: { marginTop: 18 },
  nombre: { fontFamily: "Cormorant", fontWeight: 300, fontSize: 32, lineHeight: 1.05, color: c.ink, marginTop: 6 },
  ubicacion: { fontSize: 9, lineHeight: 1.4, color: c.taupe, marginTop: 6 },
  banda: {
    marginTop: 16,
    backgroundColor: c.night,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bandaEtiqueta: { fontSize: 6.5, fontWeight: 500, letterSpacing: 1.6, textTransform: "uppercase", color: c.mist },
  precio: { fontFamily: "Cormorant", fontWeight: 400, fontSize: 21, color: c.brassLight, marginTop: 2, lineHeight: 1.1 },
  chips: { flexDirection: "row", gap: 6 },
  chip: {
    fontSize: 6.5,
    fontWeight: 500,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: c.night,
    backgroundColor: c.cream,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  seccion: { fontFamily: "Cormorant", fontStyle: "italic", fontSize: 17, color: c.brassDeep, marginTop: 20 },
  datos: { flexDirection: "row", flexWrap: "wrap", columnGap: 24, marginTop: 6 },
  dato: {
    width: (ANCHO - 24) / 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: c.line,
    paddingVertical: 6.5,
  },
  datoEtiqueta: { fontSize: 8, lineHeight: 1.45, color: c.taupe, width: 92 },
  datoValor: { fontSize: 8.5, lineHeight: 1.45, fontWeight: 500, textAlign: "right", flex: 1 },
  // Página 2
  cabeceraMini: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logoMini: { fontFamily: "Cormorant", fontWeight: 300, fontSize: 16, letterSpacing: 2.4, color: c.taupe },
  nombreMini: { fontSize: 7.5, color: c.taupe, maxWidth: 330, textAlign: "right" },
  resumen: { fontFamily: "Cormorant", fontWeight: 400, fontSize: 15, lineHeight: 1.35, color: c.ink, marginTop: 8 },
  lista: { flexDirection: "row", flexWrap: "wrap", columnGap: 24, marginTop: 6 },
  item: { width: (ANCHO - 24) / 2, flexDirection: "row", gap: 7, paddingVertical: 3.5 },
  vineta: { width: 4, height: 4, backgroundColor: c.brass, marginTop: 4.5, flexShrink: 0 },
  itemTexto: { fontSize: 8.5, lineHeight: 1.5, flex: 1 },
  nota: { fontSize: 7.5, lineHeight: 1.5, color: c.taupe, marginTop: 10 },
  galeria: { flexDirection: "row", flexWrap: "wrap", gap: GALERIA_HUECO, marginTop: 8 },
  resumenPortada: { fontFamily: "Cormorant", fontWeight: 400, fontSize: 14, lineHeight: 1.35, color: c.ink, marginTop: 10, maxWidth: 470 },
  tarjeta: {
    marginTop: 22,
    backgroundColor: c.night,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  tarjetaTitulo: { fontFamily: "Cormorant", fontWeight: 300, fontSize: 24, color: c.cream, lineHeight: 1.1 },
  tarjetaTexto: { fontSize: 8.5, lineHeight: 1.5, color: c.mist, marginTop: 6, maxWidth: 290 },
  canales: { marginTop: 12, gap: 5 },
  canal: { flexDirection: "row", gap: 8, alignItems: "baseline" },
  canalEtiqueta: { fontSize: 6.5, fontWeight: 500, letterSpacing: 1.4, textTransform: "uppercase", color: c.brassLight, width: 58 },
  canalValor: { fontSize: 9, color: c.cream, textDecoration: "none" },
  qrCaja: { alignItems: "center", width: 104, textDecoration: "none" },
  qr: { width: 92, height: 92, backgroundColor: c.cream, padding: 6 },
  qrTexto: { fontSize: 6.5, lineHeight: 1.4, color: c.mist, textAlign: "center", marginTop: 6, textDecoration: "none" },
  pie: {
    position: "absolute",
    bottom: MARGEN - 8,
    left: MARGEN,
    right: MARGEN,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.6,
    borderTopColor: c.line,
    paddingTop: 8,
    fontSize: 6.8,
    color: c.taupe,
  },
});

/* ---------- Documento ---------- */
function Logo() {
  return h(View, { style: s.logo }, h(Text, { style: s.logoAlgi }, "ALGI"), h(Text, { style: s.logoProperty }, "Property"));
}

function Pie({ t, web }) {
  return h(
    View,
    { style: s.pie, fixed: true },
    h(Text, null, `ALGI Property · ${contacto.telefonoVisible.replace(/ /g, " ")} · ${web}`),
    h(Text, { render: ({ pageNumber, totalPages }) => t.pagina.replace("{n}", pageNumber).replace("{total}", totalPages) }),
  );
}

function Ficha({ p, idioma, fotos, qr, fecha, descEnPortada }) {
  const m = mensajes[idioma];
  const t = m.fichaPdf;
  const tipo = m.destacados.tipos[p.tipo];
  const operaciones = [p.operacion, p.tambienOperacion].filter(Boolean).map((o) => m.destacados.operaciones[o]);
  const precio = p.precio ? formatearPrecio(p.precio, idioma) : m.destacados.consultar;
  const ubicacion = [p.ubicacion.barrio[idioma], p.ubicacion.ciudad, p.ubicacion.detalle?.[idioma]].filter(Boolean).join(" · ");
  const urlFicha = `${urlSitio}/${idioma}/propiedades/${p.slug}`;
  const web = urlSitio.replace(/^https?:\/\//, "");
  const telefono = contacto.telefonoVisible.replace(/ /g, " ");

  return h(
    Document,
    {
      title: `${t.titulo} · ${p.nombre[idioma]} · ALGI Property`,
      author: "ALGI Property",
      subject: p.resumen[idioma],
      language: idioma,
      creator: "ALGI Property",
      producer: "ALGI Property",
    },
    // Página 1: portada con la foto principal, el precio y los datos clave.
    h(
      Page,
      { size: "A4", style: s.pagina },
      h(
        View,
        { style: s.cabecera },
        h(Logo),
        h(
          View,
          { style: s.cabeceraDerecha },
          h(Text, { style: s.eyebrow }, t.titulo),
          h(Text, { style: s.cabeceraSub }, `${p.ubicacion.ciudad}, ${t.pais}`),
        ),
      ),
      h(View, { style: s.filete }),
      h(Image, { style: s.hero, src: fotos.hero }),
      h(
        View,
        { style: s.titular },
        h(Text, { style: s.eyebrow }, `${tipo} · ${operaciones.join(t.y)}`),
        h(Text, { style: s.nombre }, p.nombre[idioma]),
        h(Text, { style: s.ubicacion }, ubicacion),
        descEnPortada && h(Text, { style: s.resumenPortada }, p.resumen[idioma]),
      ),
      h(
        View,
        { style: s.banda, wrap: false },
        h(View, null, h(Text, { style: s.bandaEtiqueta }, t.precio), h(Text, { style: s.precio }, precio)),
        h(View, { style: s.chips }, ...operaciones.map((o) => h(Text, { key: o, style: s.chip }, o))),
      ),
      h(Text, { style: s.seccion }, m.ficha.datos),
      h(
        View,
        { style: s.datos },
        ...p.datos.map((d) =>
          h(
            View,
            { key: d.etiqueta.es, style: s.dato, wrap: false },
            h(Text, { style: s.datoEtiqueta }, d.etiqueta[idioma]),
            h(Text, { style: s.datoValor }, d.valor[idioma]),
          ),
        ),
      ),
      h(Pie, { t, web }),
    ),
    // Página 2: descripción, características, galería y contacto.
    h(
      Page,
      { size: "A4", style: s.pagina },
      h(
        View,
        { style: s.cabeceraMini },
        h(Text, { style: s.logoMini }, "ALGI"),
        h(Text, { style: s.nombreMini }, `${t.titulo} · ${p.nombre[idioma]}`),
      ),
      h(View, { style: { ...s.filete, marginTop: 10 } }),
      !descEnPortada && h(Text, { style: { ...s.seccion, marginTop: 18 } }, t.descripcion),
      !descEnPortada && h(Text, { style: s.resumen }, p.resumen[idioma]),
      h(Text, { style: descEnPortada ? { ...s.seccion, marginTop: 18 } : s.seccion }, m.ficha.caracteristicas),
      h(
        View,
        { style: s.lista },
        ...p.caracteristicas.map((car) =>
          h(
            View,
            { key: car.es, style: s.item, wrap: false },
            h(View, { style: s.vineta }),
            h(Text, { style: s.itemTexto }, car[idioma]),
          ),
        ),
      ),
      p.nota && h(Text, { style: s.nota }, p.nota[idioma]),
      fotos.galeria.length > 0 && h(Text, { style: s.seccion }, t.galeria),
      fotos.galeria.length > 0 &&
        h(
          View,
          { style: s.galeria },
          ...fotos.galeria.map((f, i) =>
            h(Image, { key: i, style: { width: fotos.hueco.w, height: fotos.hueco.h, objectFit: "cover" }, src: f }),
          ),
        ),
      h(
        View,
        { style: s.tarjeta, wrap: false },
        h(
          View,
          { style: { flex: 1 } },
          h(Text, { style: s.tarjetaTitulo }, t.contactoTitulo),
          h(Text, { style: s.tarjetaTexto }, t.contactoTexto),
          h(
            View,
            { style: s.canales },
            h(
              View,
              { style: s.canal },
              h(Text, { style: s.canalEtiqueta }, "WhatsApp"),
              h(Link, { style: s.canalValor, src: `https://wa.me/${contacto.telefonoInternacional}` }, telefono),
            ),
            h(
              View,
              { style: s.canal },
              h(Text, { style: s.canalEtiqueta }, t.correo),
              h(Link, { style: s.canalValor, src: `mailto:${contacto.correo}` }, contacto.correo),
            ),
            h(
              View,
              { style: s.canal },
              h(Text, { style: s.canalEtiqueta }, t.web),
              h(Link, { style: s.canalValor, src: urlFicha }, web),
            ),
          ),
        ),
        h(
          Link,
          { src: urlFicha, style: s.qrCaja },
          h(Image, { style: s.qr, src: qr }),
          h(Text, { style: s.qrTexto }, t.qr),
        ),
      ),
      h(Text, { style: { ...s.nota, marginTop: 14 } }, t.aviso.replace("{fecha}", fecha)),
      h(Pie, { t, web }),
    ),
  );
}

/* ---------- Ejecución ---------- */
const contarPaginas = (pdf) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

const inicio = Date.now();
if (!process.env.FICHAS_SOLO) await fs.rm(SALIDA, { recursive: true, force: true });
let total = 0;
const avisos = [];

const solo = process.env.FICHAS_SOLO?.split(",");
for (const p of propiedades.filter((x) => !solo || solo.includes(x.slug))) {
  const fotos = await elegirFotos(p);
  if (fotos.avisos.length) avisos.push(`${p.slug}: ${fotos.avisos.join(", ")}`);
  for (const idioma of ["es", "en"]) {
    const urlFicha = `${urlSitio}/${idioma}/propiedades/${p.slug}`;
    const qr = await QRCode.toDataURL(urlFicha, {
      margin: 0,
      scale: 12,
      errorCorrectionLevel: "M",
      color: { dark: c.night, light: c.cream },
    });
    const fecha = new Intl.DateTimeFormat(idioma === "es" ? "es-CO" : "en-US", { dateStyle: "long", timeZone: "America/Bogota" }).format(new Date());
    // La ficha debe caber en dos páginas. Se prueba de la composición más completa a la más sobria:
    // descripción en la portada si cabe, y la galería pasa de 6 fotos a 3, y luego a ninguna.
    const tamanos = [fotos.galeria.length, 3, 0].filter((n, i, a) => n <= fotos.galeria.length && a.indexOf(n) === i);
    let pdf;
    probar: for (const n of tamanos) {
      for (const descEnPortada of [true, false]) {
        const galeria = fotos.galeria.slice(0, n);
        pdf = await renderToBuffer(h(Ficha, { p, idioma, fotos: { ...fotos, galeria }, qr, fecha, descEnPortada }));
        if (contarPaginas(pdf) <= 2) break probar;
      }
    }
    if (contarPaginas(pdf) > 2) avisos.push(`${p.slug} (${idioma}): ocupa ${contarPaginas(pdf)} páginas`);
    const destino = path.join(PUBLICO, rutaFichaPdf(idioma, p.slug));
    await fs.mkdir(path.dirname(destino), { recursive: true });
    await fs.writeFile(destino, pdf);
    total++;
  }
}

console.log(`Fichas PDF: ${total} archivos en public/fichas (${((Date.now() - inicio) / 1000).toFixed(1)} s)`);
for (const a of avisos) console.warn(`  Aviso de calidad · ${a}`);
