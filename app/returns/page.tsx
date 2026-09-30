import type { Metadata } from "next";
import { RotateCcw, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Refunds — Magical Halloween Shop",
  description:
    "Learn about our 30-day return policy, eligible items, and how to initiate a return at Magical Halloween Shop.",
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Returns & Refunds
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">
            30-Day Return Policy
          </h1>
          <p className="mt-4 font-inter text-parchment-brown">
            If something isn't right, we'll make it right.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <div className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-6 flex gap-4">
            <RotateCcw size={22} className="text-magic-gold shrink-0 mt-0.5" />
            <p className="font-inter text-parchment-brown text-sm leading-relaxed">
              We accept returns within <strong className="text-ivory">30 days of delivery</strong>{" "}
              for most items in their original, unused condition. Once your
              return is received and inspected, we'll process your refund within
              5–7 business days.
            </p>
          </div>
        </section>

        {/* Eligible items */}
        <section className="mb-10">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-5">
            Eligible for Return
          </h2>
          <div className="space-y-3">
            {[
              "Costumes — unworn, in original packaging with all tags attached",
              "Decorations — unused, in original packaging",
              "Accessories — unused and in resalable condition",
              "Home décor items — unused, undamaged",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                <span className="font-inter text-parchment-brown text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Non-returnable */}
        <section className="mb-10">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-5">
            Non-Returnable Items
          </h2>
          <div className="space-y-3">
            {[
              "Candy, food and edible products",
              "Makeup and cosmetics that have been opened or used",
              "Personalised or custom-made items",
              "Items marked as Final Sale",
              "Worn or washed costumes",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <XCircle size={16} className="text-red-500/80 shrink-0 mt-0.5" />
                <span className="font-inter text-parchment-brown text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How to return */}
        <section className="mb-10">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-5">
            How to Return
          </h2>
          <ol className="space-y-4">
            {[
              "Contact our team via the Contact page within 30 days of receiving your order.",
              "Include your order number, the item(s) you wish to return, and the reason.",
              "Once approved, you'll receive a prepaid return shipping label by email.",
              "Pack the item securely in its original packaging and drop it off at your nearest carrier location.",
              "Your refund will be issued to your original payment method within 5–7 business days of us receiving the return.",
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="font-cinzel text-magic-gold text-sm w-6 shrink-0">
                  {i + 1}.
                </span>
                <span className="font-inter text-parchment-brown text-sm leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Damaged items */}
        <section className="mb-10">
          <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-4">
            Damaged or Defective Items
          </h2>
          <div className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-5 flex gap-4">
            <AlertTriangle size={18} className="text-halloween-orange shrink-0 mt-0.5" />
            <p className="font-inter text-parchment-brown text-sm leading-relaxed">
              If your item arrived damaged or is defective, please contact us
              within <strong className="text-ivory">7 days of delivery</strong> with a photo of the
              damage. We'll arrange a replacement or full refund immediately —
              no need to return the item.
            </p>
          </div>
        </section>

        <div className="text-center border-t border-magic-gold/10 pt-10">
          <p className="font-inter text-parchment-brown text-sm">
            Need to start a return?{" "}
            <a href="/contact" className="text-magic-gold hover:underline">
              Contact us here
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
