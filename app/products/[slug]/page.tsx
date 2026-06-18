import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllSlugs,
  getProductBySlug,
} from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/add-to-cart";

type Params = { slug: string };

// pre-render every product page at build time
export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const hero = product.colors[0];

  return (
    <section className="mx-auto max-w-[1200px] px-[6vw] pt-32 pb-32">
      <Link
        href="/products"
        className="eyebrow mb-10 inline-block transition-colors hover:text-ink"
      >
        ← Back to shop
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        {/* visual: the solid color */}
        <div
          className="aspect-[4/5] w-full rounded-sm"
          style={{ backgroundColor: hero.hex }}
        />

        {/* details */}
        <div className="flex flex-col">
          <p className="eyebrow mb-4">{product.category}</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-tight tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>
          <p className="mt-6 text-xl">{formatPrice(product.price)}</p>

          <p className="mt-8 max-w-prose leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-10">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
