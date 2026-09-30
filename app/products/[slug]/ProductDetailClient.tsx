"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import type { Product } from "@/types";
import { getReviewsByProduct, getAverageRating } from "@/data/reviews";
import { getProductsByCategory } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductBadge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"about" | "specs">("about");

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const reviews = getReviewsByProduct(product.id);
  const averageRating = getAverageRating(product.id);
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const wished = isInWishlist(product.id);
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (inStock) addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-deep-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.categorySlug, href: `/categories/${product.categorySlug}` },
            { label: product.name },
          ]}
          className="mb-8"
        />

        {/* Main Product Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 lg:self-start">
            {/* Thumbnails (vertical on md, horizontal on mobile) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-ancient-wood/20 border border-magic-gold/50 rounded-sm overflow-hidden"
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-[4/5] bg-ancient-wood/10 rounded-sm overflow-hidden border border-magic-gold/10">
              <Image
                src={product.images[0] ?? "/images/placeholder.jpg"}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <ProductBadge badge={product.badge} />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="font-cinzel text-xs text-magic-gold uppercase tracking-[0.2em] mb-2">
              {product.brand}
            </p>
            <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <Rating value={averageRating} count={reviews.length} size="md" />
              <span className="text-parchment-brown/50">|</span>
              <span
                className={cn(
                  "font-inter text-xs uppercase tracking-widest",
                  inStock ? "text-green-400" : "text-dark-red"
                )}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <Price
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="lg"
              className="mb-8"
            />

            <p className="font-inter text-sm md:text-base text-parchment-brown/90 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="bg-castle-black border border-magic-gold/20 p-5 md:p-6 rounded-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Qty */}
                <div className="flex items-center h-12 bg-deep-black border border-magic-gold/30 rounded-sm w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!inStock}
                    className="flex-1 flex items-center justify-center text-parchment-brown hover:text-ivory disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-inter text-ivory font-medium w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!inStock}
                    className="flex-1 flex items-center justify-center text-parchment-brown hover:text-ivory disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleItem(product)}
                  className={cn(
                    "h-12 w-12 sm:w-16 flex-shrink-0 flex items-center justify-center border rounded-sm transition-all duration-200",
                    wished
                      ? "bg-dark-red/20 border-dark-red text-dark-red"
                      : "bg-deep-black border-magic-gold/30 text-parchment-brown hover:border-magic-gold hover:text-bright-gold"
                  )}
                  aria-label="Wishlist"
                >
                  <Heart size={20} className={wished ? "fill-current" : ""} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex flex-col gap-3 pt-5 border-t border-magic-gold/10">
                <div className="flex items-center gap-3 text-parchment-brown text-sm font-inter">
                  <ShieldCheck size={16} className="text-magic-gold" />
                  <span>Secure spellbound checkout</span>
                </div>
                <div className="flex items-center gap-3 text-parchment-brown text-sm font-inter">
                  <Truck size={16} className="text-magic-gold" />
                  <span>Crows deliver within 3-5 nights</span>
                </div>
                <div className="flex items-center gap-3 text-parchment-brown text-sm font-inter">
                  <RotateCcw size={16} className="text-magic-gold" />
                  <span>Free returns before dawn</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-magic-gold/20 mb-6 flex gap-8">
              <button
                onClick={() => setActiveTab("about")}
                className={cn(
                  "pb-3 font-cinzel text-sm uppercase tracking-widest transition-colors relative",
                  activeTab === "about" ? "text-bright-gold" : "text-parchment-brown hover:text-ivory"
                )}
              >
                About this item
                {activeTab === "about" && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-bright-gold" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={cn(
                  "pb-3 font-cinzel text-sm uppercase tracking-widest transition-colors relative",
                  activeTab === "specs" ? "text-bright-gold" : "text-parchment-brown hover:text-ivory"
                )}
              >
                Specifications
                {activeTab === "specs" && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-bright-gold" />
                )}
              </button>
            </div>

            <div className="font-inter text-sm text-parchment-brown/80 leading-relaxed min-h-[150px]">
              {activeTab === "about" && (
                <ul className="list-disc pl-4 space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
              {activeTab === "specs" && (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex border-b border-magic-gold/10 pb-2">
                      <span className="w-1/3 text-ivory">{key}</span>
                      <span className="w-2/3">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="border-t border-magic-gold/15 pt-16 mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-cinzel text-2xl md:text-3xl text-ivory uppercase tracking-widest">
              Spellbook Reviews
            </h2>
            <div className="text-right">
              <Rating value={averageRating} size="md" showCount={false} className="justify-end mb-1" />
              <p className="font-inter text-sm text-parchment-brown">
                {averageRating} / 5 ({reviews.length} reviews)
              </p>
            </div>
          </div>

          {reviews.length === 0 ? (
            <p className="text-parchment-brown font-inter italic text-center py-8">
              No spells have been cast yet. Be the first to review.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-castle-black border border-magic-gold/10 p-6 rounded-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Rating value={review.rating} size="sm" showCount={false} />
                    <span className="font-inter text-xs text-parchment-brown/50">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-inter font-medium text-ivory mb-2">{review.title}</h4>
                  <p className="font-inter text-sm text-parchment-brown/80 mb-4 leading-relaxed">
                    "{review.body}"
                  </p>
                  <p className="font-cinzel text-xs text-magic-gold uppercase tracking-wider">
                    — {review.author}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-magic-gold/15 pt-16">
            <h2 className="font-cinzel text-2xl md:text-3xl text-ivory uppercase tracking-widest text-center mb-10">
              Complete the Spell
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
