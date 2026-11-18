import { expect, test } from "@playwright/test";
import { propiedades } from "../../src/data/propiedades";
import { rutaFichaPdf } from "../../src/lib/ficha-pdf";

/** Toda propiedad del catálogo, incluidas las que se añadan después, debe tener su ficha en PDF en ambos idiomas. */
test.describe("fichas técnicas en PDF", () => {
  for (const idioma of ["es", "en"] as const) {
    test(`existen y ocupan dos páginas (${idioma})`, async ({ request }) => {
      for (const p of propiedades) {
        const respuesta = await request.get(rutaFichaPdf(idioma, p.slug));
        expect(respuesta.status(), p.slug).toBe(200);
        expect(respuesta.headers()["content-type"], p.slug).toContain("application/pdf");
        const pdf = (await respuesta.body()).toString("latin1");
        expect(pdf.startsWith("%PDF"), p.slug).toBe(true);
        expect(pdf.match(/\/Type\s*\/Page[^s]/g)?.length, p.slug).toBe(2);
      }
    });
  }
});
