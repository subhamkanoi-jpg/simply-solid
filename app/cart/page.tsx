"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <section className="mx-auto max-w-[900px] px-[6vw] pt-36 pb-32">
      <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-extrabold tracking-tight">
        Your bag
      </h1>

      {items.length === 0 ? (
        <div className="mt-10 text-muted">
          <p>Your bag is empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-block border border-line px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {items.map((item) => {
              const product = getProductBySlug(item.slug);
              if (!product) return null;
              const swatch =
                product.colors.find((c) => c.name === item.color) ??
                product.colors[0];

              return (
                <li
                  key={`${item.slug}-${item.color}-${item.size}`}
                  className="flex items-center gap-4 py-6"
                >
                  <div
                    className="h-20 w-16 shrink-0 rounded-sm"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="flex-1">
                    <div className="font-display font-bold">{product.name}</div>
                    <div className="mt-1 text-sm text-muted">
                      {item.color} · {item.size}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.slug, item.color, item.size)
                      }
                      className="mt-2 text-xs uppercase tracking-[0.15em] text-muted underline-offset-4 hover:text-ink hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        updateQuantity(
                          item.slug,
                          item.color,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="px-3 py-2 text-muted hover:text-ink"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(
                          item.slug,
                          item.color,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="px-3 py-2 text-muted hover:text-ink"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right tabular-nums">
                    {formatPrice(product.price * item.quantity)}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <span className="eyebrow">Subtotal</span>
            <span className="font-display text-2xl font-bold tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-2 text-right text-sm text-muted">
            Shipping & taxes calculated at checkout.
          </p>

          <Link
            href="/checkout"
            className="mt-8 block w-full bg-ink py-4 text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
          >
            Checkout
          </Link>
        </>
      )}
    </section>
  );
}
