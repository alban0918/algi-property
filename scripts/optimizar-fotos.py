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
