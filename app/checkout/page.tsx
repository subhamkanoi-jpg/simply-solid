"use client";

// Mock checkout. No payment is taken — submitting just confirms the
// order locally and clears the bag. This is the seam where a real
// payment provider (Stripe, Shopify checkout, etc.) plugs in later.

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <section className="mx-auto max-w-[640px] px-[6vw] pt-40 pb-32 text-center">
        <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-extrabold tracking-tight">
          Order confirmed.
        </h1>
        <p className="mt-4 text-muted">
          Thank you — this is a demo checkout, so no payment was taken. Your
          solid future is on its way.
        </p>
        <Link
          href="/products"
          className="mt-10 inline-block bg-ink px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
        >
          Keep shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-[640px] px-[6vw] pt-40 pb-32 text-center">
        <h1 className="font-display text-2xl font-bold">Your bag is empty.</h1>
        <Link
          href="/products"
          className="mt-8 inline-block border border-line px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-ink"
        >
          Browse the collection
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[900px] px-[6vw] pt-36 pb-32">
      <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] font-extrabold tracking-tight">
        Checkout
      </h1>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_320px]">
        {/* contact / shipping form (mock) */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Field label="Email" type="email" name="email" required />
          <Field label="Full name" name="name" required />
          <Field label="Address" name="address" required />
          <div className="grid grid-cols-2 gap-5">
            <Field label="City" name="city" required />
            <Field label="Postal code" name="zip" required />
          </div>
          <button
            type="submit"
            className="mt-4 bg-ink py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
          >
            Place order — {formatPrice(subtotal)}
          </button>
          <p className="text-center text-xs text-muted">
            Demo only · no payment is processed
          </p>
        </form>

        {/* summary */}
        <aside className="border border-line p-6">
          <div className="eyebrow mb-4">Summary</div>
          <ul className="space-y-3 text-sm">
            {items.map((i) => (
              <li
                key={`${i.slug}-${i.color}-${i.size}`}
                className="flex justify-between gap-4 text-muted"
              >
                <span>
                  {i.color} · {i.size} × {i.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-line pt-4">
            <span className="eyebrow">Subtotal</span>
            <span className="font-display font-bold tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      <input
        {...props}
        className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
