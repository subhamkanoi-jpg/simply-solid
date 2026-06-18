import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: {
    default: "SIMPLY SOLID — Fashion that flows through solid color",
    template: "%s — SIMPLY SOLID",
  },
  description:
    "Fashion stripped to its essence. SIMPLY SOLID makes enduring pieces that flow through one solid color at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <CartProvider>
          <SiteNav />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
