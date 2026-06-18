import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="flex min-h-screen flex-col items-center justify-center px-[6vw] pt-32 pb-20 text-center">
        <p className="eyebrow mb-9">A New Standard · 2026</p>
        <h1 className="font-display text-[clamp(3rem,13vw,11rem)] font-extrabold leading-[0.92] tracking-tight">
          SIMPLY
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]">
            SOLID
          </span>
        </h1>
        <p className="mt-9 max-w-[520px] text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-muted">
          Fashion that flows through solid color — nothing more, nothing less.
          Enduring pieces, each dyed in one decisive tone.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="bg-ink px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-85"
          >
            Shop the collection
          </Link>
          <Link
            href="/coming-soon"
            className="border border-line px-8 py-4 font-display text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-ink"
          >
            The next drop
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1200px] px-[6vw] pb-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">The Collection</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-tight">
              Worn in solid.
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
