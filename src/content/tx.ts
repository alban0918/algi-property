import type { Texto } from "@/data/propiedades";

export type { Texto };

/** Crea un texto bilingüe: tx("hola", "hello"). */
export const tx = (es: string, en: string): Texto => ({ es, en });
