import { NextRequest, NextResponse } from "next/server";

// Nombre de la cookie httpOnly que guarda tu token de refresco (se envía automáticamente en cada petición al servidor)
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken"; 
// Nombre opcional de la cookie de accessToken si también la guardas en cookies
const ACCESS_TOKEN_COOKIE_NAME = "accessToken"; 

// Rutas que requieren autenticación
const PROTECTED_ROUTES = [
  "/dashboard",
  "/admin",
  "/cms",
  // Agrega aquí otras rutas que desees proteger
];

// Rutas exclusivas para usuarios NO autenticados (como login)
const AUTH_ROUTES = [
  "/login",
];

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  // Como el refreshToken vive en una cookie httpOnly, el navegador la envía al servidor automáticamente en cada navegación.
  // Next.js proxy (al ejecutarse en el servidor) sí puede leer las cookies httpOnly sin problemas.
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  // const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  // Si existe cualquiera de los dos, consideramos al usuario autenticado (sin hacer consultas a la BD/API)
  const isAuthenticated = !!(refreshToken);
  
  if (isAuthenticated &&  path === "/cms") {
    const homeUrl = new URL("/cms/home", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 1. Si la ruta es protegida y el usuario NO está autenticado, lo redirigimos a /login
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => path.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Guardamos la ruta de origen por si queremos redirigir de vuelta tras el login exitoso
    loginUrl.searchParams.set("callbackUrl", path); 
    return NextResponse.redirect(loginUrl);
  }

  // 2. Si el usuario YA está autenticado e intenta acceder a rutas de login, lo redirigimos al inicio
  const isAuthRoute = AUTH_ROUTES.some((route) => path.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Si pasa las validaciones, permitimos continuar
  return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'
    ]
}