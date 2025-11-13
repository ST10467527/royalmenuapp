// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dish } from "../data/dishes";

interface CartItem extends Dish {
  quantity: number;
  customNotes?: string;
}

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  addToCart: (dish: Dish, options?: { notes?: string }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish, options?: { notes?: string }) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === dish.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...dish, quantity: 1, customNotes: options?.notes }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.15).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <CartContext.Provider value={{ items, subtotal, tax, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
