"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[580px] max-h-[900px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="A magical Halloween boutique on a misty gothic street at night"
        fill
        priority
        className="object-cover object-center blur-[3px] scale-105"
        sizes="100vw"
      />

      {/* Multi-layer overlay for cinematic feel + slight blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-castle-black/90 via-castle-black/60 to-castle-black/30 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-castle-black via-transparent to-castle-black/40" />

      {/* Subtle animated fog at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-magic-gold" />
              <div className="flex items-center gap-1.5 text-magic-gold">
                <Sparkles size={12} aria-hidden="true" />
                <span className="font-inter text-[11px] uppercase tracking-[0.25em] text-magic-gold/90">
                  The Haunted Season Begins
                </span>
              </div>
            </div>

            {/* Main title */}
            <h1 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-warm-white uppercase leading-[1.05] tracking-wide mb-6">
              Halloween
              <br />
              <span className="text-magic-gold">Has Arrived</span>
            </h1>

            {/* Subtitle */}
            <p className="font-inter text-sm sm:text-base text-ivory/80 leading-relaxed mb-8 max-w-md">
              Costumes, decorations and mysterious treasures
              <br className="hidden sm:block" />
              for the most magical night of the year.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button variant="primary" size="lg" asChild>
                <Link href="/shop">Shop Halloween</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/categories/decorations">Explore the Collection</Link>
              </Button>
            </div>

            {/* Countdown */}
            <Countdown />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
