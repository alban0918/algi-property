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
  type Categoria,
  type Operacion,
  type TipoComercial,
} from "@/data/propiedades";
import { cn } from "@/lib/cn";

type FiltroOperacion = Operacion | "todas";
type FiltroCategoria = Categoria | "todos";
type FiltroTipo = TipoComercial | "todos";

const operaciones: FiltroOperacion[] = ["todas", "venta", "alquiler"];
const categorias: FiltroCategoria[] = ["todos", "residencial", "comercial"];
const tipos: FiltroTipo[] = ["todos", ...tiposComerciales];

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
 * Catálogo con filtros por operación, categoría (residencial o comercial) y, dentro de comercial, por tipo.
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
  // El tipo solo existe dentro de la categoría comercial.
  const tipo: FiltroTipo = categoria === "comercial" && tipos.includes(ti as FiltroTipo) ? (ti as FiltroTipo) : "todos";

  function filtrar(nuevo: { operacion?: FiltroOperacion; categoria?: FiltroCategoria; tipo?: FiltroTipo }) {
    const o = nuevo.operacion ?? operacion;
    const c = nuevo.categoria ?? categoria;
    // Al cambiar de categoría se descarta el tipo; fuera de comercial no hay tipos.
    const x = c === "comercial" ? (nuevo.tipo ?? (nuevo.categoria ? "todos" : tipo)) : "todos";
    const query: Record<string, string> = {};
    if (o !== "todas") query.operacion = o;
    if (c !== "todos") query.categoria = c;
    if (x !== "todos") query.tipo = x;
    router.replace({ pathname, query }, { scroll: false });
  }

  const visibles = propiedades.filter(
    (p) =>
      (operacion === "todas" || p.operacion === operacion) &&
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
                {o === "todas" ? t("todas") : td(`operaciones.${o}`)}
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
          <AnimatePresence initial={false}>
            {categoria === "comercial" && (
              <motion.fieldset
                key="tipos-comerciales"
                className="flex flex-wrap items-center gap-2"
                initial={sinMovimiento ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={sinMovimiento ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <legend className="sr-only">{t("filtroComercial")}</legend>
                {tipos.map((x) => (
                  <Chip key={x} activo={tipo === x} onClick={() => filtrar({ tipo: x })}>
                    {x === "todos" ? t("todos") : t(`tiposComercial.${x}`)}
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
