import { expect, test } from "@playwright/test";

test.describe("selector de idioma", () => {
  test("cambia a inglés y vuelve conservando la página", async ({ page }) => {
    await page.goto("/es/propiedades/edificio-granada");
    await page.getByRole("button", { name: "EN" }).click();
    await expect(page).toHaveURL(/\/en\/propiedades\/edificio-granada$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Granada Building");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.getByRole("button", { name: "ES" }).click();
    await expect(page).toHaveURL(/\/es\/propiedades\/edificio-granada$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Edificio Granada");
  });

  test("el botón marca el idioma activo con aria-pressed", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "ES" })).toHaveAttribute("aria-pressed", "false");
  });
});

test.describe("catálogo de propiedades", () => {
  test("filtra por operación y tipo, y lo refleja en la URL", async ({ page }) => {
    await page.goto("/es/propiedades");
    await expect(page.getByText("3 propiedades")).toBeVisible();

    await page.getByRole("button", { name: "Venta" }).click();
    await expect(page).toHaveURL(/operacion=venta/);
    await expect(page.getByText("2 propiedades")).toBeVisible();

    await page.getByRole("button", { name: "Industrial" }).click();
    await expect(page.getByText("No hay propiedades con esos filtros.")).toBeVisible();

    await page.getByRole("button", { name: "Quitar filtros" }).click();
    await expect(page.getByText("3 propiedades")).toBeVisible();
    await expect(page).not.toHaveURL(/operacion=/);
  });

  test("una URL con filtros muestra el resultado filtrado", async ({ page }) => {
    await page.goto("/en/propiedades?tipo=residencial");
    await expect(page.getByText("1 property")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Los Álamos House" })).toBeVisible();
  });
});

test.describe("ficha de inmueble", () => {
  test("la galería se amplía, navega con el teclado y se cierra con Escape", async ({ page }) => {
    await page.goto("/es/propiedades/edificio-granada");
    await page.getByRole("button", { name: /Ampliar foto/ }).click();
    const dialogo = page.locator("dialog");
    await expect(dialogo).toBeVisible();
    await expect(dialogo.getByText("Foto 1 de 5")).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialogo.getByText("Foto 2 de 5")).toBeVisible();
    // La segunda foto es un render: debe rotularse como ilustrativa.
    await expect(dialogo.getByText("Imagen ilustrativa")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialogo).toBeHidden();
  });

  test("el botón de WhatsApp lleva el nombre del inmueble", async ({ page }) => {
    await page.goto("/es/propiedades/casa-los-alamos");
    const enlace = page.getByRole("link", { name: "Consultar por WhatsApp" });
    const href = (await enlace.getAttribute("href")) ?? "";
    expect(href).toContain("https://wa.me/573160438862");
    expect(decodeURIComponent(href)).toContain("Casa Los Álamos");
  });
});

test.describe("formulario de contacto", () => {
  test("avisa de los campos obligatorios y enfoca el primero", async ({ page }) => {
    await page.goto("/es/contacto");
    await page.getByRole("button", { name: "Enviar por WhatsApp" }).click();
    await expect(page.getByText("Escribe tu nombre para poder responderte.")).toBeVisible();
    await expect(page.getByText("Cuéntanos brevemente en qué podemos ayudarte.")).toBeVisible();
    await expect(page.locator("#nombre")).toBeFocused();
  });

  test("compone el mensaje y abre WhatsApp con el número de la empresa", async ({ page }) => {
    await page.goto("/es/contacto");
    await page.evaluate(() => {
      (window as unknown as { __url: string }).__url = "";
      window.open = (u?: string | URL) => {
        (window as unknown as { __url: string }).__url = String(u);
        return null;
      };
    });
    await page.locator("#nombre").fill("Ana");
    await page.locator("#interes").selectOption("vender");
    await page.locator("#mensaje").fill("Quiero vender mi casa");
    await page.getByRole("button", { name: "Enviar por WhatsApp" }).click();

    const url = decodeURIComponent(await page.evaluate(() => (window as unknown as { __url: string }).__url));
    expect(url).toContain("https://wa.me/573160438862?text=");
    expect(url).toContain("Hola, soy Ana.");
    expect(url).toContain("Vender una propiedad");
    expect(url).toContain("Quiero vender mi casa");
  });
});

test.describe("menú móvil", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("abre, muestra los enlaces y cierra con Escape", async ({ page }) => {
    await page.goto("/es");
    const abrir = page.getByRole("button", { name: "Abrir menú" });
    await abrir.click();
    await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#menu-movil").getByRole("link", { name: "Servicios" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#menu-movil")).toBeHidden();
  });

  test("navegar desde el menú lo cierra", async ({ page }) => {
    await page.goto("/es");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.locator("#menu-movil").getByRole("link", { name: "Florida" }).click();
    await expect(page).toHaveURL(/\/es\/florida$/);
    await expect(page.locator("#menu-movil")).toBeHidden();
  });
});

test("con 'reducir movimiento' el titular de la portada queda visible sin animar", async ({ browser }) => {
  const contexto = await browser.newContext({ reducedMotion: "reduce" });
  const page = await contexto.newPage();
  await page.goto("http://localhost:3210/es");
  const transform = await page.locator("h1 span.rise").first().evaluate((el) => getComputedStyle(el).transform);
  expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
  await contexto.close();
});
