"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getDeals } from "@/data/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPrice, getTimeUntilHalloween } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

function MiniCountdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setMounted(true);
    setTime(getTimeUntilHalloween());
    const id = setInterval(() => setTime(getTimeUntilHalloween()), 1000);
    return () => clearInterval(id);
  }, []);
  
  if (!mounted) return <div className="h-4" />;
  
  return (
    <div className="flex items-center gap-1.5 font-inter text-xs text-parchment-brown">
      <span>Ends in</span>
      <span className="font-bold text-halloween-orange">
        {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}

export function LimitedDeals() {
  const deals = getDeals().filter((p) => p.badge === "LIMITED" || (p.discount ?? 0) >= 30).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-deep-black border-t border-magic-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Limited Time Spells"
          subtitle="These dark prices won't last long."
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((product) => (
            <div
              key={product.id}
              className="bg-castle-black border border-magic-gold/15 rounded-sm p-5 flex flex-col gap-4 hover:border-magic-gold/40 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-widest mb-1">
                    Only Today
                  </p>
                  <MiniCountdown />
                </div>
                <span className="font-cinzel text-2xl font-bold text-halloween-orange">
                  -{product.discount}%
                </span>
              </div>

              <div>
                <p className="font-inter text-[10px] text-parchment-brown/70 uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
                <p className="font-inter text-base text-ivory leading-snug mb-2">
                  {product.name}
                </p>
                <p className="font-cinzel text-xl text-bright-gold font-semibold">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="font-inter text-xs text-parchment-brown line-through mt-0.5">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
              </div>

              <Button variant="primary" size="sm" fullWidth asChild>
                <Link href={`/products/${product.slug}`}>Get the Deal</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
