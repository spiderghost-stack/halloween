"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getTotalItems } =
    useCartStore();

  useEffect(() => setMounted(true), []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-deep-black border-l border-magic-gold/20 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-magic-gold/20">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-magic-gold" aria-hidden="true" />
            <span className="font-cinzel text-sm text-ivory uppercase tracking-wider">
              Your Cart
            </span>
            {totalItems > 0 && (
              <span className="bg-halloween-orange text-warm-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-parchment-brown hover:text-ivory transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-parchment-brown/30" />
              <p className="font-cinzel text-parchment-brown/60 uppercase tracking-wider text-sm">
                Your cart is empty
              </p>
              <Button variant="secondary" size="sm" onClick={closeCart} asChild>
                <Link href="/shop">Explore Halloween</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 pb-4 border-b border-magic-gold/10"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-ancient-wood/30">
                    <Image
                      src={product.images[0] ?? "/images/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-xs text-parchment-brown uppercase tracking-wider mb-0.5">
                      {product.brand}
                    </p>
                    <p className="font-inter text-sm text-ivory truncate leading-tight mb-2">
                      {product.name}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-magic-gold/30 text-parchment-brown hover:text-ivory hover:border-magic-gold transition-colors rounded-sm"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-inter text-sm text-ivory w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-magic-gold/30 text-parchment-brown hover:text-ivory hover:border-magic-gold transition-colors rounded-sm"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <p className="font-cinzel text-sm text-bright-gold">
                      {formatPrice(product.price * quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-parchment-brown/50 hover:text-dark-red transition-colors"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-magic-gold/20 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-inter text-sm text-parchment-brown uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-cinzel text-lg text-bright-gold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="font-inter text-xs text-parchment-brown/60 text-center">
              Shipping & taxes calculated at checkout
            </p>
            <div className="space-y-2">
              <Button variant="secondary" fullWidth onClick={closeCart} asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
              <Button variant="primary" fullWidth asChild>
                <Link href="/cart">Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
