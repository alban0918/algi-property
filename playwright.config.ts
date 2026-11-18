import { defineConfig } from "@playwright/test";

const puerto = 3210;
// Con E2E_BASE_URL las pruebas apuntan a un sitio ya desplegado y no se levanta servidor local.
const externa = process.env.E2E_BASE_URL;
/** Secreto con el que las pruebas firman enlaces de descarga propios (vencidos, alterados). */
export const secretoPruebas = "secreto-solo-para-pruebas-e2e-0123456789";

/**
 * Pruebas de extremo a extremo sobre el build de producción.
 * Uso: npm run build && npm run test:e2e
 * Usa el Chrome instalado en el equipo (canal "chrome"); si no lo hay, ejecutar antes `npx playwright install chromium`
 * y quitar la línea `channel`.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: externa ?? `http://localhost:${puerto}`,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  webServer: externa
    ? undefined
    : {
        command: `npm run start -- -p ${puerto}`,
        url: `http://localhost:${puerto}/es`,
        reuseExistingServer: true,
        // Registro de interesados sin base de datos ni correo, con un secreto solo para pruebas.
        env: { LEADS_MODO: "prueba", FICHAS_SECRETO: secretoPruebas },
        timeout: 60_000,
      },
});
