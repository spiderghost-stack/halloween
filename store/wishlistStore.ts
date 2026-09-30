"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem, Product } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  setItems: (items: WishlistItem[]) => void;
  // Computed
  isInWishlist: (productId: string) => boolean;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().isInWishlist(product.id)) return;
        set((state) => ({
          items: [
            ...state.items,
            { product, addedAt: new Date().toISOString() },
          ],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      clearWishlist: () => set({ items: [] }),

      setItems: (items) => set({ items }),

      isInWishlist: (productId) =>
        get().items.some((i) => i.product.id === productId),

      getTotalItems: () => get().items.length,
    }),
    {
      name: "halloween-wishlist",
    }
  )
);
