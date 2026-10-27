# Design system: ALGI Property

Fuente de verdad visual del sitio. Los tokens viven en `src/app/globals.css`.

## Concepto

Una web cinematográfica y sobria, heredada del logo: serif de alto contraste en marrón topo sobre fondo claro. Las portadas y secciones de impacto van en oscuro con fotografía a pantalla completa y titulares gigantes; el resto se lee sobre papel cálido. El latón es el único acento. La confianza se transmite con espacio, orden y calma, y el movimiento refuerza esa calma en lugar de competir con ella.

## Color

| Token | Hex | Uso |
|---|---|---|
| `paper` | #F7F5F2 | Fondo principal |
| `paper-2` | #EFEBE6 | Bloques alternos |
| `line` | #D9D2CB | Filetes y bordes |
| `ink` | #2A2220 | Texto y botones |
| `taupe` | #6B5A55 | Texto secundario, color del logo |
| `brass` | #A98254 | Detalles y texto grande (3,2:1 sobre papel) |
| `brass-deep` | #7A5C34 | Texto pequeño sobre claro (5,7:1 sobre papel, 5,2:1 sobre papel 2) |
| `brass-light` | #D2AE7C | Acento sobre oscuro (8,6:1 sobre noche) |
| `pine` | #1D3532 | Bloques de contraste |
| `night` | #0E1A18 | Portada, fotos y secciones oscuras |
| `cream` | #F3EEE6 | Texto sobre oscuro (15,4:1 sobre noche) |
| `mist` | #B9B2A6 | Texto secundario sobre oscuro (8,5:1) |

Reglas: nunca texto pequeño en `brass` sobre claro. Sobre fotos siempre un velo `night` degradado para sostener el contraste.

## Tipografía

- **Títulos:** Cormorant Garamond (300, 400, 500, 600 y cursiva). Titulares gigantes en peso 300 y mayúsculas; el segundo renglón en cursiva con `brass-light` o `brass-deep`.
- **Texto:** Montserrat (300 a 600), misma familia que "Property" en el logo.
- **Etiquetas (`.eyebrow`):** 11 px, mayúsculas, interletraje 0,22 em, peso 500.
- **Escala:** `text-body` 15 px, `text-lead` 18 px, `text-title` 32 a 52 px, `text-headline` 44 a 96 px, `text-display` 48 a 152 px (fluidas con `clamp`). Cuerpo de texto a unos 65 caracteres de ancho.
- Títulos con `text-wrap: balance`. Cifras alineadas con `.tabular`.

## Componentes base

- `Logo` (`src/components/ui/logo.tsx`): wordmark reconstruido en texto, variantes `light` y `dark`.
- `Button` (`src/components/ui/button.tsx`): variantes `solido`, `contorno` y `enlace`, cada una para superficie `claro` u `oscuro`. Alto táctil mínimo de 44 px. Se renderiza como enlace.
- Tarjeta de inmueble: foto, etiqueta (operación y ciudad), nombre en Cormorant, resumen, precio con cifras tabulares y enlace "Ver ficha".

## Movimiento

- **Curvas:** `--ease-out-expo` para entradas y hovers, `--ease-in-out-expo` para transiciones de página.
- **Duraciones:** 200 a 400 ms en interacciones; 700 a 1200 ms en revelados de titulares; 500 a 800 ms en transiciones de página.
- **Patrones previstos:** scroll suave (Lenis), titulares que suben desde una máscara, zoom lento de la foto de portada, parallax en imágenes, transición de la foto del inmueble a su ficha (GSAP Flip con `data-flip-id`), filtros que reordenan tarjetas, tramo horizontal para Florida.
- Solo se animan `transform` y `opacity`. Todo respeta `prefers-reduced-motion` (regla global ya definida).

## Fotografía

- **Inmuebles:** fotos reales de las fichas, optimizadas a WebP (`public/images/propiedades/`). Las del render del Edificio Granada se rotulan "imagen ilustrativa".
- **Ambientación (Unsplash License):** casa al atardecer para la portada, skyline de Miami al ocaso para Florida y vista aérea de Miami Beach como alternativa (`public/images/stock/`). Créditos en `src/data/creditos.ts`.
- Aún no hay foto de stock confirmada de Cali.

## Accesibilidad

WCAG 2.2 AA. Foco visible (anillo `brass-deep` sobre claro, `brass-light` sobre oscuro), enlace "saltar al contenido" (`.skip-link`), jerarquía de encabezados secuencial, alt descriptivo en cada foto, objetivos táctiles de 44 px mínimo.
