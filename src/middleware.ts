import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/verify/:path*", "/"],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/verify") ||
    pathname === "/";

  const isDashboard = pathname.startsWith("/dashboard");

  // ✅ logged-in users shouldn't see login/signup/home/verify
  if ((accessToken || refreshToken) && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // ✅ not logged-in users cannot access dashboard
  if (!accessToken && !refreshToken && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
