import type { Metadata } from "next";
import Link from "next/link";
import { Skull, Star, Sparkles, Heart, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Magical Halloween Shop",
  description:
    "Discover the story behind Magical Halloween Shop — a boutique born from a love of all things dark, enchanting and wonderfully spooky.",
};

const values = [
  {
    icon: Skull,
    title: "Born from the Dark",
    body: "We didn't just open a shop — we built a sanctuary. Every candle, every cape, every creak-worthy decoration is handpicked to honour the spirit of Halloween in its truest form.",
  },
  {
    icon: Star,
    title: "Quality, Always",
    body: "We believe that Halloween deserves more than cheap plastic. Our collections are curated for durability, atmosphere and genuine magic — because you deserve the real thing.",
  },
  {
    icon: Sparkles,
    title: "The Experience",
    body: "Shopping here should feel like stepping through a fog-covered gate into a world between worlds. That's the standard we hold ourselves to every single day.",
  },
  {
    icon: Heart,
    title: "Community",
    body: "We are witches, wanderers, midnight readers and pumpkin-carvers. We built this shop for people exactly like us — for people who feel most alive when October arrives.",
  },
  {
    icon: Leaf,
    title: "Our Commitment",
    body: "We source responsibly and work with artisans who share our passion. If something carries our name, it means we are proud to put it in your hands.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-haunted-dark/60 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-4">
            Our Story
          </p>
          <h1 className="font-cinzel text-4xl md:text-6xl text-ivory leading-tight mb-6">
            Where Halloween
            <br />
            <span className="text-magic-gold">Never Ends</span>
          </h1>
          <p className="font-inter text-parchment-brown text-lg leading-relaxed">
            We are a boutique born from a simple, obsessive love: the belief
            that Halloween is not just one night — it's a way of seeing the
            world. Gothic architecture, the smell of woodsmoke, fog rolling over
            cobblestones, the flicker of a distant lantern. We live here.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-magic-gold/20 my-4" />
      </div>

      {/* Story block */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-6 font-inter text-parchment-brown text-base leading-relaxed">
          <p>
            It started with a witch hat found at the back of a market stall on a
            rainy October morning. The kind of hat with a real brim, real felt,
            a real presence. We couldn't understand why something so simple was
            so hard to find. Most of what was out there was hollow, flimsy and
            forgotten by November 1st.
          </p>
          <p>
            So we decided to change that. We reached out to artisans, we
            travelled to suppliers, we tested materials, burned candles, hung
            decorations, broke a few things. We spent a long time understanding
            what makes a Halloween product{" "}
            <em className="text-ivory">feel right</em>.
          </p>
          <p>
            The result is what you're browsing right now. A carefully assembled
            collection of costumes, décor, candles, candy and accessories —
            chosen not for their price point, but for their soul.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 text-center mb-12">
          What We Stand For
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-6 hover:border-magic-gold/30 transition-colors"
            >
              <Icon size={22} className="text-magic-gold mb-4" />
              <h3 className="font-cinzel text-ivory text-sm mb-2">{title}</h3>
              <p className="font-inter text-parchment-brown/80 text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-xl mx-auto text-center px-4 pt-16">
        <p className="font-inter text-parchment-brown mb-6">
          Ready to explore the collection?
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-halloween-orange text-warm-white font-inter font-medium uppercase text-sm tracking-widest rounded-sm hover:bg-orange-700 transition-colors"
        >
          Enter the Shop
        </Link>
      </section>
    </main>
  );
}
