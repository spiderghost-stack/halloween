"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 9.99 : 0;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% off over $100
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-deep-black py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeader
            title="Your Haunted Cart"
            subtitle="It seems your cart is empty."
            className="mb-8"
          />
          <ShoppingBag size={64} className="mx-auto text-parchment-brown/30 mb-8" />
          <Button variant="primary" size="lg" asChild>
            <Link href="/shop">Explore Halloween</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} className="mb-8" />
        <SectionHeader title="Your Haunted Cart" align="left" className="mb-10" />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-magic-gold/20 font-cinzel text-xs text-magic-gold uppercase tracking-widest">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <ul className="divide-y divide-magic-gold/10">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  <div className="flex gap-4 col-span-6 w-full">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-ancient-wood/20 border border-magic-gold/20 rounded-sm overflow-hidden">
                      <Image
                        src={product.images[0] ?? "/images/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-wider mb-1">
                        {product.brand}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-inter text-sm sm:text-base text-ivory hover:text-bright-gold transition-colors mb-2 line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="font-inter text-sm text-parchment-brown mb-2">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-parchment-brown/50 hover:text-dark-red transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider w-fit"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-center w-full sm:w-auto">
                    <div className="flex items-center h-10 bg-castle-black border border-magic-gold/30 rounded-sm w-28">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex-1 flex items-center justify-center text-parchment-brown hover:text-ivory"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-inter text-ivory font-medium w-8 text-center text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex-1 flex items-center justify-center text-parchment-brown hover:text-ivory"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 text-right w-full sm:w-auto hidden sm:block">
                    <p className="font-cinzel text-lg text-bright-gold">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-center sm:hidden mt-2 border-t border-magic-gold/10 pt-4">
                     <span className="font-inter text-xs text-parchment-brown uppercase tracking-wider">Total</span>
                     <p className="font-cinzel text-lg text-bright-gold">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-castle-black border border-magic-gold/20 p-6 rounded-sm sticky top-24">
              <h2 className="font-cinzel text-xl text-ivory uppercase tracking-widest mb-6 border-b border-magic-gold/20 pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 font-inter text-sm mb-6">
                <div className="flex justify-between text-parchment-brown">
                  <span>Subtotal</span>
                  <span className="text-ivory">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-halloween-orange">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-parchment-brown">
                  <span>Shipping</span>
                  <span className="text-ivory">{formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="border-t border-magic-gold/20 pt-4 mb-8 flex justify-between items-end">
                <span className="font-inter text-base text-ivory uppercase tracking-wider">
                  Total
                </span>
                <span className="font-cinzel text-2xl font-bold text-bright-gold">
                  {formatPrice(total)}
                </span>
              </div>
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
