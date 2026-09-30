"use client";

import { SessionProvider } from "next-auth/react";
import { StoreSync } from "./StoreSync";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <StoreSync />
      {children}
    </SessionProvider>
  );
}
