import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("egmart_cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("egmart_cart_v1", JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (p, qty = 1) =>
    setItems((curr) => {
      const ex = curr.find((c) => c.product.id === p.id);
      if (ex) return curr.map((c) => (c.product.id === p.id ? { ...c, qty: c.qty + qty } : c));
      return [...curr, { product: p, qty }];
    });
  const remove: CartCtx["remove"] = (id) => setItems((c) => c.filter((i) => i.product.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((c) => c.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
