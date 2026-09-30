"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function StoreSync() {
  const { data: session, status } = useSession();
  
  // Cart
  const { items: cartItems, setItems: setCartItems } = useCartStore();
  const isCartFirstLoad = useRef(true);

  // Wishlist
  const { items: wishlistItems, setItems: setWishlistItems } = useWishlistStore();
  const isWishlistFirstLoad = useRef(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    // Cart Sync
    const cartTimer = setTimeout(async () => {
      try {
        const payload = cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }));

        const res = await fetch("/api/user/cart/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payload })
        });

        if (res.ok) {
          const data = await res.json();
          if (isCartFirstLoad.current && data.items) {
            const mergedCart = data.items.map((i: any) => ({
              product: {
                id: i.productId,
                name: i.name,
                price: i.price,
                images: [i.image],
                slug: "",
              },
              quantity: i.quantity
            }));
            
            setCartItems(mergedCart);
            isCartFirstLoad.current = false;
          }
        }
      } catch (error) {
        console.error("Failed to sync cart:", error);
      }
    }, 1000);

    return () => clearTimeout(cartTimer);
  }, [cartItems, status, setCartItems]);

  useEffect(() => {
    if (status !== "authenticated") return;

    // Wishlist Sync
    const wishlistTimer = setTimeout(async () => {
      try {
        const payload = wishlistItems.map(item => ({
          id: item.product.id,
        }));

        const res = await fetch("/api/user/wishlist/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: payload })
        });

        if (res.ok) {
          const data = await res.json();
          if (isWishlistFirstLoad.current && data.items) {
            const mergedWishlist = data.items.map((i: any) => ({
              product: {
                id: i.id,
                name: i.name,
                price: i.price,
                images: i.images,
                slug: i.slug,
                categorySlug: i.categorySlug,
              },
              addedAt: new Date().toISOString()
            }));
            
            setWishlistItems(mergedWishlist);
            isWishlistFirstLoad.current = false;
          }
        }
      } catch (error) {
        console.error("Failed to sync wishlist:", error);
      }
    }, 1000);

    return () => clearTimeout(wishlistTimer);
  }, [wishlistItems, status, setWishlistItems]);

  return null;
}
