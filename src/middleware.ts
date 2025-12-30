import { NextRequest, NextResponse } from "next/server";

export const config = {
  // IMPORTANT: Added "/" to this list so the middleware sees the home page request
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isAuthenticated = accessToken || refreshToken;

  // 1. Handle the Root Path "/"
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      // This changes the URL from "localhost:3000/" to "localhost:3000/login"
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Prevent logged-in users from accessing Login/Signup pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Prevent unauthenticated users from accessing Dashboard
  const isDashboard = pathname.startsWith("/dashboard");
  if (!isAuthenticated && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
