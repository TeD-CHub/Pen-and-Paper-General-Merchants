"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function assertPositiveQuantity(quantity: number): void {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError("Cart quantity must be a positive whole number.");
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, quantity = 1) => {
        assertPositiveQuantity(quantity);
        set((state) => {
          const currentItem = state.items.find((item) => item.productId === productId);

          if (!currentItem) {
            return { items: [...state.items, { productId, quantity }] };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          };
        });
      },
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      setQuantity: (productId, quantity) => {
        if (quantity === 0) {
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
          }));
          return;
        }

        assertPositiveQuantity(quantity);
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "pen-and-paper-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
