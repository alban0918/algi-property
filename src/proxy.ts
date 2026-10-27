import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { propiedades } from "./data/propiedades";

const intl = createMiddleware(routing);
const slugsValidos = new Set(propiedades.map((p) => p.slug));

export default function proxy(request: NextRequest) {
  // Con cacheComponents una ficha inexistente se transmite con estado 200. Para devolver un 404 real,
  // se reescribe hacia una ruta desconocida, que sí responde 404 con el diseño del sitio.
  const ficha = request.nextUrl.pathname.match(/^\/(es|en)\/propiedades\/([^/]+)\/?$/);
  if (ficha && !slugsValidos.has(ficha[2])) {
    const url = request.nextUrl.clone();
    url.pathname = `/${ficha[1]}/no-encontrada`;
    return NextResponse.rewrite(url);
  }
  return intl(request);
}

export const config = {
  // Todo excepto API, archivos internos de Next y archivos estáticos (cualquier ruta con punto).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
