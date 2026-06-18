import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop",
  description: "The full SIMPLY SOLID collection — every piece, every solid color.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <section className="mx-auto max-w-[1200px] px-[6vw] pt-36 pb-32">
      <header className="mb-14">
        <p className="eyebrow mb-3">The Collection</p>
        <h1 className="font-display text-[clamp(2rem,6vw,4rem)] font-extrabold tracking-tight">
          Everything, in solid.
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
