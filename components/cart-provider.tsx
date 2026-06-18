"use client";

// ============================================================
// Client-side cart. State lives in React context and is mirrored
// to localStorage so it survives refreshes. When we add a real
// backend, the checkout step is where server logic plugs in —
// this provider can stay almost as-is.
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug } from "@/lib/products";

export type CartItem = {
  /** product slug */
  slug: string;
  color: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, color: string, size: string) => void;
  updateQuantity: (
    slug: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ss_cart";

function sameLine(a: CartItem, b: Omit<CartItem, "quantity">): boolean {
  return a.slug === b.slug && a.color === b.color && a.size === b.size;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // load once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // persist on change (after initial load)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartItem) =>
      setItems((prev) => {
        const existing = prev.find((p) => sameLine(p, item));
        if (existing) {
          return prev.map((p) =>
            sameLine(p, item)
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          );
        }
        return [...prev, item];
      });

    const removeItem = (slug: string, color: string, size: string) =>
      setItems((prev) =>
        prev.filter((p) => !sameLine(p, { slug, color, size }))
      );

    const updateQuantity = (
      slug: string,
      color: string,
      size: string,
      quantity: number
    ) =>
      setItems((prev) =>
        prev
          .map((p) =>
            sameLine(p, { slug, color, size })
              ? { ...p, quantity: Math.max(0, quantity) }
              : p
          )
          .filter((p) => p.quantity > 0)
      );

    const clear = () => setItems([]);

    const count = items.reduce((n, i) => n + i.quantity, 0);

    const subtotal = items.reduce((sum, i) => {
      const product = getProductBySlug(i.slug);
      return sum + (product ? product.price * i.quantity : 0);
    }, 0);

    return { items, addItem, removeItem, updateQuantity, clear, count, subtotal };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
