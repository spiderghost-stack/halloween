import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  return (
    <section className="py-16 md:py-24 bg-ancient-wood/20 border-y border-magic-gold/15 relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-castle-black via-castle-black/90 to-castle-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-magic-gold" />
            <span className="font-inter text-[10px] uppercase tracking-[0.25em] text-magic-gold/80">
              Featured Collection
            </span>
          </div>

          <h2 className="font-cinzel font-bold text-3xl md:text-4xl lg:text-5xl text-ivory uppercase leading-tight tracking-wide mb-4">
            The Haunted House
            <br />
            <span className="text-magic-gold">Collection</span>
          </h2>

          <p className="font-inter text-sm md:text-base text-parchment-brown/80 leading-relaxed mb-8 max-w-md">
            Transform your home into a haunted manor. Candelabras, spell jars,
            gothic frames and atmospheric lighting — everything to set the scene.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/categories/home-decor">Shop Decorations</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/shop">Browse All</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
