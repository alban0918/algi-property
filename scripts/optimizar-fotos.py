"""Optimiza las fotos extraidas de las fichas tecnicas (carpeta _fuente) a WebP
para la web. Uso: python scripts/optimizar-fotos.py
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "_fuente" / "fotos"
SALIDA = RAIZ / "public" / "images" / "propiedades"
MAX_LADO = 1600
CALIDAD = 80

# slug de inmueble -> [(archivo origen, nombre final, recorte inferior en % para quitar sellos de camara)]
FOTOS = {
    "bodega-acopi-850": [
        ("bodega-acopi-850-p1-2-1280x720.png", "01-fachada", 0),
        ("bodega-acopi-850-p1-3-1600x900.png", "02-interior-mezzanine", 0),
        ("bodega-acopi-850-p2-2-900x1600.png", "03-nave-interior", 0),
        ("bodega-acopi-850-p1-4-1600x900.png", "04-muelle", 0),
        ("bodega-acopi-850-p2-3-1600x900.png", "05-fachada-lateral", 0),
        ("bodega-acopi-850-p2-4-1600x900.png", "06-acceso-carga", 0),
    ],
    "casa-los-alamos": [
        ("casa-los-alamos-p1-5-1500x2000.png", "01-fachada", 0),
        ("casa-los-alamos-p1-8-900x1200.png", "02-patio", 0),
        ("casa-los-alamos-p1-2-764x764.png", "03-comedor", 0),
        ("casa-los-alamos-p1-3-764x764.png", "04-patio-interior", 0),
        ("casa-los-alamos-p1-4-800x600.png", "05-cocina", 0),
        ("casa-los-alamos-p1-6-800x603.png", "06-sala", 0),
        ("casa-los-alamos-p1-7-764x764.png", "07-sala-estar", 0),
        ("casa-los-alamos-p2-8-1000x753.png", "08-sala-comedor", 0),
        ("casa-los-alamos-p2-2-917x917.png", "09-habitacion-principal", 0),
        ("casa-los-alamos-p2-9-1000x750.png", "10-habitacion", 0),
        ("casa-los-alamos-p2-5-900x1200.png", "11-bano", 0),
        ("casa-los-alamos-p2-4-1000x750.png", "12-corredor", 0),
    ],
    "edificio-granada": [
        ("edificio-granada-p1-5-960x723.png", "01-fachada-actual", 8),
        ("edificio-granada-p1-7-480x362.png", "02-vista-avenida", 8),
        ("edificio-granada-p1-8-480x362.png", "03-vista-lateral", 8),
        ("edificio-granada-p2-4-1076x717.png", "04-render-ilustrativo-comercial", 0),
        ("edificio-granada-p2-3-715x538.png", "05-render-ilustrativo-residencial", 0),
    ],
}


# Fotos de las fichas nuevas (carpeta _fuente/fotos-nuevas).
# Cada foto: (archivo origen, nombre final) o (archivo, nombre, caja de recorte (izq, arriba, der, abajo)).
NUEVAS = "_fuente/fotos-nuevas"
B = "Ficha_Bodega_y_Oficinas_en_Bogotá"
S = "Ficha_Técnica_Algi_-_Locales_Spirito-1"
G = "Ficha_Técnica_Algi_Property_-_Apartament"
T = "Ficha_Técnica_Algi_Property_-_Apto._Sant"
P = "Ficha_Técnica_Algi_Property_-_Locales_Pa"
FOTOS_NUEVAS = {
    "bodega-oficinas-bogota": [
        (f"{B}-p1-1-3543x4168.png", "01-fachada"),
        (f"{B}-p2-1-3840x2160.png", "02-vista-aerea"),
        (f"{B}-p3-1-3300x2400.png", "03-bodega"),
        (f"{B}-p5-3-1320x960.png", "04-bodega-operacion"),
        (f"{B}-p5-4-1320x960.png", "05-recepcion"),
        (f"{B}-p5-5-2000x1125.png", "06-auditorio"),
        (f"{B}-p5-6-2333x1313.png", "07-oficinas-pasillo"),
        (f"{B}-p5-7-1320x960.png", "08-sala"),
        (f"{B}-p5-8-1320x960.png", "09-comedor"),
    ],
    "locales-spirito": [
        (f"{S}-p1-1-1600x1204.png", "01-entorno"),
        (f"{S}-p1-2-1280x964.png", "02-fachada-locales"),
        (f"{S}-p1-3-1280x964.png", "03-acceso-peatonal"),
        (f"{S}-p1-5-1280x964.png", "04-local-interior"),
        (f"{S}-p2-1-1280x964.png", "05-local-fondo"),
        (f"{S}-p2-3-1280x964.png", "06-local-columna"),
        (f"{S}-p2-4-1280x964.png", "07-local-amplio"),
    ],
    "apartaestudio-bellavista": [
        (f"{G}-p2-2-1600x1204.png", "01-vista"),
        (f"{G}-p1-2-1280x964.png", "02-sala"),
        (f"{G}-p1-3-640x482.png", "03-ambiente"),
        (f"{G}-p1-6-640x482.png", "04-habitacion"),
        (f"{G}-p1-4-482x640.png", "05-cocina"),
        (f"{G}-p2-4-482x640.png", "06-bano"),
        (f"{G}-p2-6-482x640.png", "07-parqueadero"),
        (f"{G}-p2-7-602x800.png", "08-zona-verde"),
    ],
    "apartamento-santa-teresita": [
        (f"{T}-p1-6-960x720.png", "01-sala-comedor"),
        (f"{T}-p1-8-480x360.png", "02-alcoba-principal"),
        (f"{T}-p1-2-360x480.png", "03-alcoba"),
        (f"{T}-p1-7-480x360.png", "04-estudio"),
        (f"{T}-p2-3-960x720.png", "05-cocina"),
        (f"{T}-p1-3-480x360.png", "06-bano-principal"),
        (f"{T}-p1-5-480x360.png", "07-bano-social"),
        (f"{T}-p2-5-960x720.png", "08-hall"),
        (f"{T}-p2-6-360x480.png", "09-pasillo"),
        (f"{T}-p2-4-480x360.png", "10-recepcion-edificio"),
    ],
    "locales-pacific-mall": [
        (f"{P}-p2-6-2121x1080.png", "01-fachada"),
        (f"{P}-p2-2-1909x972.png", "02-vista-aerea"),
        (f"{P}-p1-2-784x552.png", "03-edificio"),
        (f"{P}-p2-3-756x1344.png", "04-atrio"),
        (f"{P}-p2-4-756x400.png", "05-niveles-comerciales"),
        (f"{P}-p1-3-1280x963.png", "06-pasillo-local"),
    ],
}

# Segunda tanda de fichas (carpeta _fuente/fotos-nuevas2).
NUEVAS2 = "_fuente/fotos-nuevas2"
FOTOS_NUEVAS2 = {
    "lotes-jamundi": [
        ("jamundi-p2-1-962x521.png", "01-vista-aerea"),
        ("jamundi-p2-2-1177x492.png", "02-delimitacion"),
        ("jamundi-p1-1-1078x574.png", "03-entorno"),
        ("jamundi-p3-1-474x283.png", "04-glorieta"),
    ],
    "local-centenario": [
        ("centenario-p1-2-838x630.png", "01-fachada"),
        ("centenario-p2-5-845x576.png", "02-edificio-esquina"),
        ("centenario-p1-6-576x433.png", "03-vista-lateral"),
        ("centenario-p1-1-576x433.png", "04-local-interior"),
        ("centenario-p2-4-595x433.png", "05-local-pasillo"),
        ("centenario-p2-8-576x433.png", "06-local-gondolas"),
        ("centenario-p1-3-576x433.png", "07-calle"),
        ("centenario-p2-3-947x518.png", "08-vista-satelital"),
    ],
    "lote-palmira-las-mercedes": [
        ("palmira-p1-2-1031x563.png", "01-lote"),
        ("palmira-p1-4-991x556.png", "02-delimitacion"),
        ("palmira-p1-1-888x559.png", "03-entorno"),
        ("palmira-p2-2-774x533.png", "04-plan-parcial"),
    ],
    "locales-g-sur": [
        ("gsur-ficha.png", "01-fachada-locales", (55, 482, 691, 905)),
        ("gsur-ficha.png", "02-vista-calle", (55, 915, 691, 1338)),
        ("gsur-ficha.png", "03-plano", (55, 1362, 691, 1786)),
    ],
    "edificio-fatima": [
        ("fatima-ficha.jpeg", "01-fachada", (0, 0, 745, 490)),
        ("fatima-ficha.jpeg", "02-vista-frontal", (22, 822, 330, 1008)),
        ("fatima-ficha.jpeg", "03-vista-lateral", (22, 1020, 330, 1232)),
    ],
}


def procesar_nuevas(fotos_por_slug=FOTOS_NUEVAS, carpeta=NUEVAS) -> None:
    for slug, fotos in fotos_por_slug.items():
        destino = SALIDA / slug
        destino.mkdir(parents=True, exist_ok=True)
        for foto in fotos:
            origen, nombre = foto[0], foto[1]
            img = Image.open(RAIZ / carpeta / origen).convert("RGB")
            if len(foto) > 2:
                img = img.crop(foto[2])
            img.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
            ruta = destino / f"{nombre}.webp"
            img.save(ruta, "WEBP", quality=CALIDAD, method=6)
            print(f"{slug}/{nombre}.webp  {img.width}x{img.height}  {ruta.stat().st_size // 1024} KB")


def procesar() -> None:
    for slug, fotos in FOTOS.items():
        destino = SALIDA / slug
        destino.mkdir(parents=True, exist_ok=True)
        for origen, nombre, recorte in fotos:
            img = Image.open(FUENTE / origen).convert("RGB")
            if recorte:
                img = img.crop((0, 0, img.width, int(img.height * (1 - recorte / 100))))
            img.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)
            ruta = destino / f"{nombre}.webp"
            img.save(ruta, "WEBP", quality=CALIDAD, method=6)
            print(f"{slug}/{nombre}.webp  {img.width}x{img.height}  {ruta.stat().st_size // 1024} KB")


if __name__ == "__main__":
    procesar()
    procesar_nuevas()
    procesar_nuevas(FOTOS_NUEVAS2, NUEVAS2)
