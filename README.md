# SIMPLY SOLID

Fashion that flows through solid color. Storefront for **simplysolid.shop**.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens live in [`app/globals.css`](app/globals.css) (`@theme` block)
- **Mock data** for products + a **client-side cart** (localStorage). No backend yet — by design.
- Hosting: **Vercel** (DNS in [`simplysolid.shop.zone`](simplysolid.shop.zone))

## Getting started

> Requires [Node.js](https://nodejs.org) 18.18+ (LTS recommended).

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Structure

```
app/
  layout.tsx              Root layout — fonts, cart provider, nav, footer
  page.tsx                Homepage storefront (hero + featured grid)
  globals.css             Tailwind + design tokens (colors, fonts)
  not-found.tsx           404 page
  products/
    page.tsx              Shop — all products
    [slug]/page.tsx       Product detail (+ add to cart)
  cart/page.tsx           Cart
  checkout/page.tsx       Checkout (mock — no payment taken)

components/
  cart-provider.tsx       Client cart context + localStorage persistence
  site-nav.tsx            Top navigation (shows live cart count)
  site-footer.tsx         Footer
  product-card.tsx        Product tile (solid color = the imagery)
  add-to-cart.tsx         Color/size pickers + add button

lib/
  products.ts             Product types + mock catalog + read helpers
  format.ts               Currency formatting

public/
  coming-soon.html        Preserved launch/teaser page → served at /coming-soon
```

## Design language

The brand idea — *fashion that flows only through solid colors* — is baked in:
solid color hexes double as product imagery, and the palette lives as tokens
(`--color-flow-*`) in `globals.css`. Fonts: **Syne** (display) + **Inter** (body),
on a near-black canvas.

## Swapping mock data for a real backend

Everything reads through helpers in [`lib/products.ts`](lib/products.ts)
(`getAllProducts`, `getProductBySlug`, …) and the cart's `clear()` at checkout.
To go live with real commerce, change the internals of those two files
(e.g. Shopify Storefront API or Stripe) — the pages don't need to change.

## Roadmap (vibe-coding backlog)

- [ ] Real product images / lookbook photography
- [ ] Search + category filtering on `/products`
- [ ] Slide-out cart drawer (in addition to the cart page)
- [ ] Real checkout: Stripe or Shopify
- [ ] Wire the email capture on `/coming-soon` to a real list
- [ ] Port `/coming-soon` to a React route if it needs shared chrome
```
