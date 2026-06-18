import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

// On-brand "imagery": the product's solid colors ARE the visual.
export function ProductCard({ product }: { product: Product }) {
  const hero = product.colors[0];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[0.985]"
        style={{ backgroundColor: hero.hex }}
      >
        {/* color swatches available for this product */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-full ring-1 ring-black/20"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold tracking-tight">
          {product.name}
        </h3>
        <span className="text-sm text-muted">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>
    </Link>
  );
}
