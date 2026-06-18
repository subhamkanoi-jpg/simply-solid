import { CURRENCY } from "./products";

/** Format a numeric amount as a currency string, e.g. 499 -> "₹499". */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}
