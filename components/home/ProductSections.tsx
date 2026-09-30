import Link from "next/link";
import { getDeals, getTrendingProducts, getNewArrivals } from "@/lib/services/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

// ── DEALS SECTION ──────────────────────────────────────────────────────────

export async function DealsSection() {
  const deals = await getDeals(4);
  return (
    <section className="py-16 md:py-20 bg-castle-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <SectionHeader
            title="Spooky Deals"
            subtitle="The darkest prices of the season."
            align="left"
          />
          <Button variant="secondary" size="sm" asChild>
            <Link href="/deals">View All Deals</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TRENDING SECTION ────────────────────────────────────────────────────────

export async function TrendingSection() {
  const trending = await getTrendingProducts(4);
  return (
    <section className="py-16 md:py-20 bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What's Haunting Everyone"
          subtitle="The most popular finds this Halloween season."
          className="mb-10 md:mb-14"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="secondary" size="md" asChild>
            <Link href="/shop?sort=trending">See All Trending</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── NEW ARRIVALS SECTION ────────────────────────────────────────────────────

export async function NewArrivalsSection() {
  const newItems = await getNewArrivals(4);
  return (
    <section className="py-16 md:py-20 bg-castle-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Fresh From the Spellbook"
          subtitle="Just arrived — claim them before they vanish."
          className="mb-10 md:mb-14"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {newItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="secondary" size="md" asChild>
            <Link href="/shop?sort=newest">Shop New Arrivals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
