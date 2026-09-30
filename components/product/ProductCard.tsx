"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductBadge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const wished = isInWishlist(product.id);
  const inStock = product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) addItem(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <article
      className={cn(
        "group relative bg-castle-black border border-magic-gold/10 rounded-sm overflow-hidden transition-all duration-250 hover:border-magic-gold/30 hover:shadow-card-hover",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ancient-wood/20">
          <Image
            src={product.images[0] ?? "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-250 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay on hover for "Add to Cart" */}
          <div className="absolute inset-0 bg-castle-black/0 group-hover:bg-castle-black/30 transition-colors duration-250" />

          {/* Add to cart button — appears on hover */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 font-inter font-medium text-xs uppercase tracking-widest rounded-sm transition-colors duration-150",
                inStock
                  ? "bg-halloween-orange text-warm-white hover:bg-orange-700"
                  : "bg-parchment-brown/20 text-parchment-brown/50 cursor-not-allowed"
              )}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={13} aria-hidden="true" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <ProductBadge badge={product.badge} />
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-sm border transition-all duration-150",
              wished
                ? "bg-dark-red/80 border-dark-red text-warm-white"
                : "bg-castle-black/60 border-magic-gold/20 text-parchment-brown hover:text-bright-gold hover:border-magic-gold/60"
            )}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart
              size={14}
              className={wished ? "fill-current" : ""}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Card body */}
        <div className="p-4">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-parchment-brown/70 mb-1.5">
            {product.brand}
          </p>
          <h3 className="font-inter text-sm text-ivory leading-snug mb-2 line-clamp-2 group-hover:text-warm-white transition-colors duration-150">
            {product.name}
          </h3>
          <Rating
            value={product.rating}
            count={product.reviewCount}
            size="sm"
            className="mb-3"
          />
          <Price
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />
        </div>
      </Link>
    </article>
  );
}
