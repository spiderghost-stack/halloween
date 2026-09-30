import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

// Next.js 16 requires the proxy function to be a named export called "proxy"
export async function proxy(request: any) {
  return auth(request);
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/orders/:path*", "/checkout/:path*"],
};
