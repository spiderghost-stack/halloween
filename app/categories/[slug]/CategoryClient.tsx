"use client";

import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { Category, Product } from "@/types";

interface Props {
  category: Category;
  products: Product[];
}

export function CategoryClient({ category, products }: Props) {

  return (
    <div className="min-h-screen bg-deep-black">
      {/* Category Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-magic-gold/20">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-castle-black/95 via-castle-black/70 to-transparent backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: category.name },
              ]}
              className="mb-4"
            />
            <h1 className="font-cinzel text-3xl md:text-5xl text-ivory uppercase tracking-widest mb-3">
              {category.name}
            </h1>
            <p className="font-inter text-sm md:text-base text-parchment-brown max-w-md">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="font-inter text-sm text-parchment-brown/60">
            Showing {products.length} enchanting items
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cinzel text-ivory/50 uppercase tracking-widest text-lg mb-2">
              The shelves are empty
            </p>
            <p className="font-inter text-sm text-parchment-brown/50">
              Check back soon for new arrivals in {category.name}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
