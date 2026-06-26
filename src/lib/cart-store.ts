import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  qty: number;
};

type CartCtx = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQty: (id: string, size: string | undefined, qty: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  isWished: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

const CART_KEY = "hype.cart.v1";
const WISH_KEY = "hype.wishlist.v1";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Start empty on server and first client render to avoid hydration mismatch.
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load<CartLine[]>(CART_KEY, []));
    setWishlist(load<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated && typeof window !== "undefined") window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback<CartCtx["addToCart"]>((line) => {
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.id === line.id && l.size === line.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + (line.qty ?? 1) };
        return next;
      }
      return [...prev, { ...line, qty: line.qty ?? 1 }];
    });
  }, []);

  const removeFromCart = useCallback<CartCtx["removeFromCart"]>((id, size) => {
    setCart((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
  }, []);

  const updateQty = useCallback<CartCtx["updateQty"]>((id, size, qty) => {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback<CartCtx["toggleWish"]>((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((s, l) => s + l.qty * l.price, 0), [cart]);

  const value: CartCtx = {
    cart, wishlist, addToCart, removeFromCart, updateQty, clearCart,
    toggleWish, isWished, cartCount, cartSubtotal,
  };
  return createElement(Ctx.Provider, { value }, children);
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
