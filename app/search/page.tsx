"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((data) => setResults(data.products ?? []))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen bg-deep-black py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Search Results" }]}
          className="mb-8"
        />

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="inline-block w-8 h-8 border-2 border-magic-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : results.length === 0 && query ? (
          <div className="max-w-3xl mx-auto text-center py-16">
            <SectionHeader
              title="The Spell Didn't Work"
              subtitle={`We couldn't find anything matching "${query}".`}
              className="mb-8"
            />
            <Search size={64} className="mx-auto text-parchment-brown/30 mb-8" />
            <p className="font-inter text-parchment-brown/80 mb-8">
              Try another spell, or browse our collections.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" asChild>
                <Link href="/shop">Browse Shop</Link>
              </Button>
              <Button variant="primary" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        ) : results.length > 0 ? (
          <>
            <SectionHeader
              title={`Search Results for "${query}"`}
              align="left"
              className="mb-10"
            />
            <p className="font-inter text-sm text-parchment-brown mb-8">
              {results.length} products found
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 font-inter text-parchment-brown/50">
            Enter a search term to find products.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-black" />}>
      <SearchContent />
    </Suspense>
  );
}
