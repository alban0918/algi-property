import { defineConfig } from "@playwright/test";

const puerto = 3210;

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
    baseURL: `http://localhost:${puerto}`,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `npm run start -- -p ${puerto}`,
    url: `http://localhost:${puerto}/es`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
