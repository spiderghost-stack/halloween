import type { Metadata } from "next";
import { Package, Clock, Globe, Truck, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Information — Magical Halloween Shop",
  description:
    "Everything you need to know about shipping, delivery times, and tracking your Magical Halloween Shop order.",
};

const methods = [
  {
    icon: Package,
    name: "Standard Shipping",
    time: "5–7 business days",
    price: "$5.99 (Free over $75)",
    note: "Most orders are dispatched within 1–2 business days.",
  },
  {
    icon: Truck,
    name: "Express Shipping",
    time: "2–3 business days",
    price: "$12.99",
    note: "Orders placed before 12pm EST ship the same day.",
  },
  {
    icon: Globe,
    name: "International Shipping",
    time: "10–15 business days",
    price: "From $19.99",
    note: "Import duties and taxes may apply depending on your country.",
  },
];

const cutoffs = [
  { label: "Standard", cutoff: "October 24" },
  { label: "Express", cutoff: "October 27" },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Delivery
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">
            Shipping Information
          </h1>
          <p className="mt-4 font-inter text-parchment-brown">
            We want your spooky order to arrive before the night begins.
          </p>
        </div>

        {/* Shipping Methods */}
        <section className="mb-12">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-6">
            Shipping Methods
          </h2>
          <div className="space-y-4">
            {methods.map(({ icon: Icon, name, time, price, note }) => (
              <div
                key={name}
                className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-sm bg-magic-gold/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-magic-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-cinzel text-ivory text-sm">{name}</span>
                    <span className="font-inter text-halloween-orange text-sm font-medium">
                      {price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock size={12} className="text-magic-gold/60" />
                    <span className="font-inter text-magic-gold/80 text-xs">
                      {time}
                    </span>
                  </div>
                  <p className="font-inter text-parchment-brown/70 text-xs">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Halloween order cutoffs */}
        <section className="mb-12 bg-halloween-orange/10 border border-halloween-orange/30 rounded-sm p-6">
          <h2 className="font-cinzel text-halloween-orange text-sm uppercase tracking-widest mb-4">
            🎃 Halloween Order Deadlines
          </h2>
          <p className="font-inter text-parchment-brown text-sm mb-4">
            To guarantee delivery before October 31st (US & Canada):
          </p>
          <div className="space-y-2">
            {cutoffs.map(({ label, cutoff }) => (
              <div key={label} className="flex justify-between font-inter text-sm">
                <span className="text-parchment-brown">{label}</span>
                <span className="text-ivory font-medium">Order by {cutoff}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Order tracking */}
        <section className="mb-12">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-4">
            Order Tracking
          </h2>
          <div className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-5 flex gap-4">
            <Search size={20} className="text-magic-gold shrink-0 mt-0.5" />
            <div className="font-inter text-parchment-brown text-sm leading-relaxed">
              <p>
                Once your order ships, you'll receive an email with your
                tracking number. You can use it on the carrier's website to
                follow your package every step of the way.
              </p>
              <p className="mt-2">
                Tracking updates may take up to 24 hours to appear after your
                order is dispatched.
              </p>
            </div>
          </div>
        </section>

        {/* Processing time */}
        <section className="mb-12">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-4">
            Processing Time
          </h2>
          <p className="font-inter text-parchment-brown text-sm leading-relaxed">
            All orders are processed within 1–2 business days (Monday–Friday,
            excluding public holidays). Orders placed on weekends are processed
            the following Monday. During peak Halloween season (October 15–31),
            processing may take up to 3 business days.
          </p>
        </section>

        {/* Questions */}
        <div className="text-center border-t border-magic-gold/10 pt-10">
          <p className="font-inter text-parchment-brown text-sm">
            Questions about your delivery?{" "}
            <a href="/contact" className="text-magic-gold hover:underline">
              Contact our team
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
