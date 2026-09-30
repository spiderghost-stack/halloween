"use client";

import Link from "next/link";
import { getDeals } from "@/data/products";
import { promotions } from "@/data/promotions";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function DealsPage() {
  const deals = getDeals();

  return (
    <div className="min-h-screen bg-deep-black py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Halloween Deals" }]}
          className="mb-8"
        />

        {/* Promotions Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {promotions.slice(0, 2).map((promo) => (
            <div
              key={promo.id}
              className="bg-castle-black border border-magic-gold/20 p-6 sm:p-8 rounded-sm relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-castle-black/90 to-castle-black/60 z-10" />
              <div className="relative z-20">
                <p className="font-cinzel text-xs text-halloween-orange uppercase tracking-[0.2em] mb-2 font-bold">
                  Code: {promo.code}
                </p>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-ivory uppercase tracking-widest mb-3 leading-tight">
                  {promo.title}
                </h3>
                <p className="font-inter text-sm text-parchment-brown/90 mb-6 max-w-sm">
                  {promo.description}
                </p>
                <Button variant="primary" size="md" asChild>
                  <Link href={`/categories/${promo.categorySlug ?? "costumes"}`}>
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <SectionHeader
          title="All Spooky Deals"
          subtitle="Explore all discounted items for the season."
          align="left"
          className="mb-10"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
