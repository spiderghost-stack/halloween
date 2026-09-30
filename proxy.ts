import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes — must be ADMIN role
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if ((token as any).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect authenticated-only routes
  if (["/account", "/orders", "/checkout"].some((p) => pathname.startsWith(p))) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/orders/:path*", "/checkout/:path*"],
};
