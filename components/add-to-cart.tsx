"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./cart-provider";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ slug: product.slug, color, size, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-7">
      {/* color */}
      <div>
        <div className="eyebrow mb-3">Color — {color}</div>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              title={c.name}
              aria-pressed={color === c.name}
              className={`h-9 w-9 rounded-full ring-1 ring-line transition-transform hover:scale-110 ${
                color === c.name ? "outline outline-2 outline-offset-2 outline-ink" : ""
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* size */}
      <div>
        <div className="eyebrow mb-3">Size</div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`min-w-12 border px-4 py-2 text-sm tracking-wide transition-colors ${
                size === s
                  ? "border-ink bg-ink text-bg"
                  : "border-line text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 w-full bg-ink py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
      >
        {added ? "Added to bag ✓" : "Add to bag"}
      </button>
    </div>
  );
}
