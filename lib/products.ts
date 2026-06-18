// ============================================================
// SIMPLY SOLID — product catalog (mock data)
//
// This is the single source of truth for products today. The UI
// reads through the helper functions below, NOT the array directly,
// so when we swap in a real backend (Shopify Storefront API, Stripe,
// a DB, etc.) we only change this file — pages stay untouched.
// ============================================================

export type ColorOption = {
  /** display name, e.g. "Cobalt" */
  name: string;
  /** solid color hex — also used as the product's "image" */
  hex: string;
};

export type Product = {
  /** url slug, e.g. "the-solid-tee" */
  slug: string;
  name: string;
  /** short tagline shown on cards */
  tagline: string;
  /** long description for the product page */
  description: string;
  /** price in whole currency units (e.g. dollars) */
  price: number;
  /** product family, used for filtering later */
  category: "Tops" | "Outerwear" | "Bottoms" | "Accessories";
  /** available solid colors; first is the default/hero color */
  colors: ColorOption[];
  /** available sizes */
  sizes: string[];
  /** show on the homepage featured grid */
  featured: boolean;
};

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

const PRODUCTS: Product[] = [
  {
    slug: "the-solid-tee",
    name: "The Solid Tee",
    tagline: "One clean color. Nothing else.",
    description:
      "The foundation of the collection. Heavyweight organic cotton, cut boxy, dyed in a single uninterrupted color. No logos, no seams you'll notice, no compromise.",
    price: 48,
    category: "Tops",
    colors: [
      { name: "Bone", hex: "#e8e3d8" },
      { name: "Cobalt", hex: "#3457d5" },
      { name: "Crimson", hex: "#e23a45" },
      { name: "Ink", hex: "#0a0a0a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    slug: "essential-hoodie",
    name: "Essential Hoodie",
    tagline: "Weight you can feel. Color you can't ignore.",
    description:
      "A 480gsm loopback fleece hoodie that holds its shape and its color. Built to be the only hoodie you reach for, season after season.",
    price: 118,
    category: "Outerwear",
    colors: [
      { name: "Emerald", hex: "#1f9d6b" },
      { name: "Saffron", hex: "#f2a93b" },
      { name: "Ink", hex: "#0a0a0a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    slug: "flow-trousers",
    name: "Flow Trousers",
    tagline: "Movement, in a single tone.",
    description:
      "A relaxed wide-leg trouser in a fluid technical crepe. Drapes like it's pouring. One solid color, head to floor.",
    price: 138,
    category: "Bottoms",
    colors: [
      { name: "Terracotta", hex: "#d96c4a" },
      { name: "Ink Teal", hex: "#1f8a99" },
      { name: "Bone", hex: "#e8e3d8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    slug: "monolith-overshirt",
    name: "Monolith Overshirt",
    tagline: "A solid block, worn open or closed.",
    description:
      "Structured cotton twill overshirt that works as a shirt or a light jacket. Boxy, intentional, and saturated in one decisive color.",
    price: 158,
    category: "Outerwear",
    colors: [
      { name: "Violet", hex: "#8a5cf0" },
      { name: "Cobalt", hex: "#3457d5" },
      { name: "Bone", hex: "#e8e3d8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    slug: "solid-knit-beanie",
    name: "Solid Knit Beanie",
    tagline: "The final note of color.",
    description:
      "Fine merino rib-knit beanie. Small, but it finishes the look — a single solid color to top everything off.",
    price: 38,
    category: "Accessories",
    colors: [
      { name: "Crimson", hex: "#e23a45" },
      { name: "Emerald", hex: "#1f9d6b" },
      { name: "Saffron", hex: "#f2a93b" },
      { name: "Ink", hex: "#0a0a0a" },
    ],
    sizes: ["One Size"],
    featured: false,
  },
  {
    slug: "column-tank",
    name: "Column Tank",
    tagline: "Stripped further still.",
    description:
      "A ribbed cotton tank in a clean column cut. The most essential layer in the collection, in your choice of solid color.",
    price: 42,
    category: "Tops",
    colors: [
      { name: "Bone", hex: "#e8e3d8" },
      { name: "Ink", hex: "#0a0a0a" },
      { name: "Teal", hex: "#1f8a99" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
];

// ---- read API (swap the internals for a real backend later) ----

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
