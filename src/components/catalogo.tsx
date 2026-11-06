"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TarjetaPropiedad } from "@/components/tarjeta-propiedad";
import {
  categoriaDe,
  propiedades,
  tiposComerciales,
  tiposResidenciales,
  type Categoria,
  type Operacion,
  type TipoInmueble,
} from "@/data/propiedades";
import { cn } from "@/lib/cn";

/** "inversion" agrupa los inmuebles que generan renta, sin importar si están en venta o alquiler. */
type FiltroOperacion = Operacion | "inversion" | "todas";
type FiltroCategoria = Categoria | "todos";
type FiltroTipo = TipoInmueble | "todos";

const operaciones: FiltroOperacion[] = ["todas", "venta", "alquiler", "inversion"];
const categorias: FiltroCategoria[] = ["todos", "residencial", "comercial"];

/** Tipos que se pueden elegir dentro de cada categoría. */
function tiposDe(categoria: FiltroCategoria): readonly TipoInmueble[] {
  if (categoria === "residencial") return tiposResidenciales;
  if (categoria === "comercial") return tiposComerciales;
  return [];
}

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={cn(
        "eyebrow min-h-11 cursor-pointer border px-5 transition-colors duration-300",
        activo ? "border-ink bg-ink text-paper" : "border-line text-taupe hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Catálogo con filtros por operación (o inversión), categoría (residencial o comercial) y, dentro de cada categoría, por tipo.
 * Las tarjetas se reordenan con animación de layout.
 */
export function Catalogo() {
  const t = useTranslations("catalogo");
  const td = useTranslations("destacados");
  const sinMovimiento = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // El estado de los filtros vive en la URL (?operacion=venta&categoria=comercial&tipo=local) para poder compartirlo.
  const op = params.get("operacion");
  const ca = params.get("categoria");
  const ti = params.get("tipo");
  const operacion: FiltroOperacion = operaciones.includes(op as FiltroOperacion) ? (op as FiltroOperacion) : "todas";
  const categoria: FiltroCategoria = categorias.includes(ca as FiltroCategoria) ? (ca as FiltroCategoria) : "todos";
  // El tipo solo existe dentro de una categoría y debe pertenecer a ella.
  const tipo: FiltroTipo = tiposDe(categoria).includes(ti as TipoInmueble) ? (ti as TipoInmueble) : "todos";

  function filtrar(nuevo: { operacion?: FiltroOperacion; categoria?: FiltroCategoria; tipo?: FiltroTipo }) {
    const o = nuevo.operacion ?? operacion;
    const c = nuevo.categoria ?? categoria;
    // Al cambiar de categoría se descarta el tipo; sin categoría no hay tipos.
    const x = c !== "todos" ? (nuevo.tipo ?? (nuevo.categoria ? "todos" : tipo)) : "todos";
    const query: Record<string, string> = {};
    if (o !== "todas") query.operacion = o;
    if (c !== "todos") query.categoria = c;
    if (x !== "todos") query.tipo = x;
    router.replace({ pathname, query }, { scroll: false });
  }

  const visibles = propiedades.filter(
    (p) =>
      (operacion === "todas" || (operacion === "inversion" ? p.inversion : p.operacion === operacion)) &&
      (categoria === "todos" || categoriaDe(p.tipo) === categoria) &&
      (tipo === "todos" || p.tipo === tipo || p.tambien?.includes(tipo)),
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-6">
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">{t("operacion")}</legend>
            {operaciones.map((o) => (
              <Chip key={o} activo={operacion === o} onClick={() => filtrar({ operacion: o })}>
                {o === "todas" ? t("todas") : o === "inversion" ? t("inversion") : td(`operaciones.${o}`)}
              </Chip>
            ))}
          </fieldset>
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="sr-only">{t("categoria")}</legend>
            {categorias.map((c) => (
              <Chip key={c} activo={categoria === c} onClick={() => filtrar({ categoria: c })}>
                {c === "todos" ? t("todos") : t(c)}
              </Chip>
            ))}
          </fieldset>
          <AnimatePresence initial={false} mode="wait">
            {categoria !== "todos" && (
              <motion.fieldset
                key={`tipos-${categoria}`}
                className="flex flex-wrap items-center gap-2"
                initial={sinMovimiento ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={sinMovimiento ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <legend className="sr-only">{categoria === "comercial" ? t("filtroComercial") : t("filtroResidencial")}</legend>
                {(["todos", ...tiposDe(categoria)] as FiltroTipo[]).map((x) => (
                  <Chip key={x} activo={tipo === x} onClick={() => filtrar({ tipo: x })}>
                    {x === "todos"
                      ? t("todos")
                      : categoria === "comercial"
                        ? t(`tiposComercial.${x as (typeof tiposComerciales)[number]}`)
                        : t(`tiposResidencial.${x as (typeof tiposResidenciales)[number]}`)}
                  </Chip>
                ))}
              </motion.fieldset>
            )}
          </AnimatePresence>
        </div>
        <p aria-live="polite" className="font-display text-2xl text-taupe tabular">
          {t("resultados", { n: visibles.length })}
        </p>
      </div>

      {visibles.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl font-light">{t("vacioTitulo")}</p>
          <p className="mt-3 text-taupe">{t("vacioTexto")}</p>
          <button
            type="button"
            onClick={() => filtrar({ operacion: "todas", categoria: "todos", tipo: "todos" })}
            className="eyebrow mt-8 min-h-11 cursor-pointer border-b border-brass pb-2 text-ink hover:border-ink"
          >
            {t("limpiar")}
          </button>
        </div>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibles.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!sinMovimiento}
                initial={sinMovimiento ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={sinMovimiento ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <TarjetaPropiedad p={p} prioridad={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
