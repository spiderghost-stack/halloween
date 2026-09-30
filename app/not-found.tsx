import Link from "next/link";
import { Skull } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-deep-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Skull */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-haunted-dark border border-magic-gold/20 flex items-center justify-center">
            <Skull size={36} className="text-magic-gold" />
          </div>
        </div>

        {/* Error code */}
        <p className="font-cinzel text-[120px] leading-none text-magic-gold/10 select-none">
          404
        </p>

        {/* Title */}
        <h1 className="font-cinzel text-3xl md:text-4xl text-ivory mt-4 mb-4">
          The Spell Failed
        </h1>

        {/* Message */}
        <p className="font-inter text-parchment-brown mb-2">
          This page has disappeared into the fog.
        </p>
        <p className="font-inter text-parchment-brown/50 text-sm mb-10">
          Perhaps it was cursed, or perhaps it never existed at all.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-halloween-orange text-warm-white font-inter font-medium uppercase text-sm tracking-widest rounded-sm hover:bg-orange-700 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 border border-magic-gold/30 text-ivory font-inter font-medium uppercase text-sm tracking-widest rounded-sm hover:border-magic-gold/60 hover:text-magic-gold transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
