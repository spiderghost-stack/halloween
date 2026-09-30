/**
 * Lightweight auth config for use in the Edge Runtime (proxy.ts).
 * No Prisma adapter here — adapters don't work in the Edge Runtime.
 * The full config with the adapter is in auth.ts.
 */
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // Credentials provider is listed here but authorize logic runs only in auth.ts
    // We just need it registered so the JWT shape is known
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // This runs in auth.ts — never in the proxy
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      const pathname = nextUrl.pathname;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl));
        if (role !== "ADMIN") return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      if (["/account", "/orders", "/checkout"].some(p => pathname.startsWith(p))) {
        if (!isLoggedIn) {
          return Response.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl)
          );
        }
      }

      return true;
    },
  },
};
