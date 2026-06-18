import { CURRENCY } from "./products";

/** Format a numeric amount as a currency string, e.g. 48 -> "$48.00". */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
  }).format(amount);
}
