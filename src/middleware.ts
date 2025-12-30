import { NextRequest, NextResponse } from "next/server";

export const config = {
  // 1. Added "/" to the matcher so the middleware triggers on the home page
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isAuthenticated = accessToken || refreshToken;

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname.startsWith("/dashboard");
  const isRoot = pathname === "/";

  if (isAuthenticated && (isAuthPage || isRoot)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && (isDashboard || isRoot)) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  return NextResponse.next();
}
