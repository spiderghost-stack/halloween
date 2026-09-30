"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { SortOption, SearchFilters, MoodTag, Product, Category } from "@/types";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "discount", label: "Biggest Discount" },
];

const PRICE_RANGES = [
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 – $25", min: 10, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50+", min: 50, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialSort = (searchParams.get("sort") as SortOption) ?? "featured";
  const initialMood = searchParams.get("mood") as MoodTag | null;

  const [sort, setSort] = useState<SortOption>(initialSort);
  const [filters, setFilters] = useState<SearchFilters>({
    mood: initialMood ?? undefined,
  });
  const [showFilters, setShowFilters] = useState(false);

  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(data => setCategories(data.categories || []));
  }, []);

  // Fetch products when filters or sort change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice !== undefined) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.discount) params.set("discount", "true");
    if (filters.inStock) params.set("inStock", "true");
    if (sort) params.set("sort", sort);

    fetch(`/api/shop?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setFiltered(data.products || []))
      .finally(() => setLoading(false));
  }, [filters, sort]);


  const FilterSidebar = (
    <aside className="w-full lg:w-56 flex-shrink-0 space-y-6">
      {/* Category */}
      <div>
        <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-3">
          Category
        </p>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setFilters((f) => ({ ...f, category: undefined }))}
              className={cn(
                "font-inter text-xs uppercase tracking-wider transition-colors duration-150",
                !filters.category ? "text-bright-gold" : "text-parchment-brown hover:text-ivory"
              )}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, category: cat.slug }))
                }
                className={cn(
                  "font-inter text-xs uppercase tracking-wider transition-colors duration-150",
                  filters.category === cat.slug
                    ? "text-bright-gold"
                    : "text-parchment-brown hover:text-ivory"
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-3">
          Price
        </p>
        <ul className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <li key={range.label}>
              <button
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    minPrice: range.min,
                    maxPrice: range.max === Infinity ? undefined : range.max,
                  }))
                }
                className={cn(
                  "font-inter text-xs uppercase tracking-wider transition-colors duration-150",
                  filters.minPrice === range.min
                    ? "text-bright-gold"
                    : "text-parchment-brown hover:text-ivory"
                )}
              >
                {range.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  minPrice: undefined,
                  maxPrice: undefined,
                }))
              }
              className="font-inter text-xs uppercase tracking-wider text-parchment-brown/50 hover:text-parchment-brown transition-colors"
            >
              Clear price
            </button>
          </li>
        </ul>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.discount ?? false}
            onChange={(e) =>
              setFilters((f) => ({ ...f, discount: e.target.checked || undefined }))
            }
            className="accent-halloween-orange w-3.5 h-3.5"
          />
          <span className="font-inter text-xs text-parchment-brown uppercase tracking-wider">
            On Sale
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock ?? false}
            onChange={(e) =>
              setFilters((f) => ({ ...f, inStock: e.target.checked || undefined }))
            }
            className="accent-halloween-orange w-3.5 h-3.5"
          />
          <span className="font-inter text-xs text-parchment-brown uppercase tracking-wider">
            In Stock
          </span>
        </label>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
          className="mb-6"
        />

        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-cinzel text-2xl md:text-3xl text-ivory uppercase tracking-widest mb-1">
            Halloween Collection
          </h1>
          <p className="font-inter text-sm text-parchment-brown">
            {filtered.length} products found
          </p>
        </div>

        {/* Mobile filter bar */}
        <div className="lg:hidden flex items-center gap-3 mb-6 sticky top-[4.5rem] z-20 bg-deep-black/95 py-3 -mx-4 px-4 border-b border-magic-gold/10">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 font-inter text-xs uppercase tracking-widest text-parchment-brown border border-magic-gold/30 px-4 py-2.5 rounded-sm hover:border-magic-gold/60 hover:text-ivory transition-all"
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="flex-1 bg-castle-black border border-magic-gold/30 text-ivory font-inter text-xs px-3 py-2.5 rounded-sm focus:outline-none focus:border-magic-gold"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile filters drawer */}
        {showFilters && (
          <div className="lg:hidden bg-castle-black border border-magic-gold/20 rounded-sm p-5 mb-6">
            {FilterSidebar}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">{FilterSidebar}</div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Desktop sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="font-inter text-xs text-parchment-brown/60">
                {filtered.length} results
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown size={13} className="text-parchment-brown" aria-hidden="true" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="bg-castle-black border border-magic-gold/30 text-ivory font-inter text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-magic-gold"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <span className="inline-block w-8 h-8 border-2 border-magic-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-cinzel text-ivory/50 uppercase tracking-widest text-lg mb-2">
                  No results found
                </p>
                <p className="font-inter text-sm text-parchment-brown/50">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-black" />}>
      <ShopContent />
    </Suspense>
  );
}
