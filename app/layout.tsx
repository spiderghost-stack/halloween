import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Hex & Hollow — Magical Halloween Shop",
    template: "%s | Hex & Hollow",
  },
  description:
    "Premium Halloween costumes, decorations, candy and magical accessories. Shop the most enchanted Halloween collection.",
  keywords: [
    "halloween",
    "costumes",
    "decorations",
    "halloween shop",
    "spooky",
    "gothic",
    "magical",
  ],
  openGraph: {
    title: "Hex & Hollow — Magical Halloween Shop",
    description:
      "Premium Halloween costumes, decorations, candy and magical accessories.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C8A45D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-deep-black text-ivory font-inter antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
