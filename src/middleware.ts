import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && !req.nextUrl.pathname.startsWith("/auth")) {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  
  if (req.auth && req.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
