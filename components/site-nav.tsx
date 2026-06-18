"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function SiteNav() {
  const { count } = useCart();

  return (
    <nav className="fixed inset-x-0 top-0 z-100 flex items-center justify-between px-[6vw] py-6 mix-blend-difference">
      <Link
        href="/"
        className="font-display text-sm font-extrabold tracking-[0.32em]"
      >
        SIMPLY SOLID
      </Link>

      <div className="flex items-center gap-7 text-[11px] uppercase tracking-[0.28em]">
        <Link href="/products" className="transition-opacity hover:opacity-60">
          Shop
        </Link>
        <Link href="/coming-soon" className="transition-opacity hover:opacity-60">
          The Drop
        </Link>
        <Link href="/cart" className="transition-opacity hover:opacity-60">
          Cart{count > 0 ? ` (${count})` : ""}
        </Link>
      </div>
    </nav>
  );
}
