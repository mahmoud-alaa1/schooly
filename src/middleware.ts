import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES } from "./lib/constants";

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (token && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isAuthRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
