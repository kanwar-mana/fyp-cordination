import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PAGES = ["/auth/login", "/auth/signup"];
const PROTECTED_PREFIXES = ["/dashboard"]; // add more: "/student", "/supervisor", "/admin"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware - Requested Pathname:", pathname);

  // ignore next internal + assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|css|js|map)$/)
  )
    return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  // logged in user should not visit login/register
  if (isAuthPage && (accessToken || refreshToken)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // not logged in user tries protected route
  if (isProtected && !accessToken && !refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
