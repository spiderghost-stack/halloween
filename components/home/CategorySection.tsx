"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CategorySection() {
  const featured = categories.filter((c) => c.featured);

  return (
    <section className="py-16 md:py-20 bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Shop the Haunted Collection"
          subtitle="Every dark desire, every bewitching need — find it here."
          className="mb-10 md:mb-14"
        />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* First category — large on desktop */}
          {featured.slice(0, 1).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="relative col-span-2 row-span-2 overflow-hidden rounded-sm group aspect-[4/3] md:aspect-auto md:min-h-[340px]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-castle-black/90 via-castle-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <p className="font-cinzel text-xl md:text-2xl text-ivory uppercase tracking-wider mb-1">
                  {cat.name}
                </p>
                <p className="font-inter text-xs text-parchment-brown mb-3">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1.5 text-magic-gold text-xs font-inter uppercase tracking-widest group-hover:gap-2.5 transition-all duration-200">
                  <span>Explore</span>
                  <ArrowRight size={12} aria-hidden="true" />
                </div>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-magic-gold/0 group-hover:border-magic-gold/30 transition-colors duration-300 rounded-sm" />
            </Link>
          ))}

          {/* Remaining categories — small */}
          {featured.slice(1).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="relative overflow-hidden rounded-sm group aspect-square md:aspect-[4/3]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-castle-black/85 via-castle-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-cinzel text-sm md:text-base text-ivory uppercase tracking-wider mb-0.5">
                  {cat.name}
                </p>
                <div className="flex items-center gap-1 text-magic-gold text-[10px] font-inter uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Explore</span>
                  <ArrowRight size={10} aria-hidden="true" />
                </div>
              </div>
              <div className="absolute inset-0 border border-magic-gold/0 group-hover:border-magic-gold/30 transition-colors duration-300 rounded-sm" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
