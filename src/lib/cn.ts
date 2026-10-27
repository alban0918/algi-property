/** Une nombres de clase omitiendo valores vacíos. */
export function cn(...partes: (string | false | null | undefined)[]): string {
  return partes.filter(Boolean).join(" ");
}
