"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-deep-black py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeader
            title="My Spellbook"
            subtitle="Your spellbook is currently empty."
            className="mb-8"
          />
          <BookOpen size={64} className="mx-auto text-parchment-brown/30 mb-8" />
          <p className="font-inter text-parchment-brown/80 mb-8">
            Start discovering magical finds to add them to your collection.
          </p>
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
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} className="mb-8" />
        <SectionHeader title="My Spellbook" align="left" className="mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
}
