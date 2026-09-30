import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import {
  DealsSection,
  TrendingSection,
  NewArrivalsSection,
} from "@/components/home/ProductSections";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ShopByMood } from "@/components/home/ShopByMood";
import { LimitedDeals } from "@/components/home/LimitedDeals";

export const metadata: Metadata = {
  title: "Halloween Costumes, Decorations & More — Hex & Hollow",
  description:
    "Shop premium Halloween costumes, gothic decorations, candy and magical accessories at Hex & Hollow. The most enchanting Halloween collection of the season.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Categories */}
      <CategorySection />

      {/* 3. Deals */}
      <DealsSection />

      {/* 4. Trending */}
      <TrendingSection />

      {/* 5. Large promo banner */}
      <PromoBanner />

      {/* 6. Shop by Mood */}
      <ShopByMood />

      {/* 7. New Arrivals */}
      <NewArrivalsSection />

      {/* 8. Limited Time Deals */}
      <LimitedDeals />
    </>
  );
}
