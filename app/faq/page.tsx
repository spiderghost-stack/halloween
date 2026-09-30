"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our collections, add items to your cart, and proceed to checkout. You'll need to create an account or check out as a guest, enter your shipping address and payment details.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 24 hours of placement, before they enter the processing stage. Contact our team immediately via the Contact page.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you'll receive a confirmation email with your tracking number. You can also view your order history from your account dashboard.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5–7 business days. Express shipping (2–3 business days) is available at checkout for an additional fee.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to most countries worldwide. International delivery typically takes 10–15 business days. Import duties may apply depending on your location.",
      },
      {
        q: "Can I change my shipping address?",
        a: "You can update your shipping address within 24 hours of placing your order, as long as it hasn't been dispatched yet. Contact us immediately.",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery for items in their original, unworn condition. Costumes must be unworn and in original packaging.",
      },
      {
        q: "How do I return an item?",
        a: "Visit our Returns page to initiate a return request. Once approved, you'll receive a prepaid return label. Refunds are processed within 5–7 business days.",
      },
      {
        q: "Are there non-returnable items?",
        a: "Candy, edible products, and certain personalised items cannot be returned for hygiene and safety reasons.",
      },
    ],
  },
  {
    category: "Products",
    items: [
      {
        q: "Are the costumes true to size?",
        a: "Each product page includes a detailed size guide. We recommend consulting it before purchasing. When in doubt, size up for layered costumes.",
      },
      {
        q: "Are candles and products safe?",
        a: "All our products comply with relevant safety standards. Candles should never be left unattended and should be kept out of reach of children and pets.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit and debit cards (Visa, Mastercard, American Express), as well as digital payment options. All payments are processed securely.",
      },
      {
        q: "Is my payment information safe?",
        a: "Absolutely. We never store your full card details. All transactions are encrypted and processed by our secure payment provider.",
      },
    ],
  },
  {
    category: "Account",
    items: [
      {
        q: "Do I need an account to purchase?",
        a: "No, you can check out as a guest. However, creating an account lets you track orders, save your wishlist, and manage returns more easily.",
      },
      {
        q: "I forgot my password. What do I do?",
        a: "Click 'Forgot Password' on the login page. We'll send a reset link to your email address within a few minutes.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map(({ q, a }, i) => (
        <div
          key={i}
          className="border border-magic-gold/10 rounded-sm overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-magic-gold/5 transition-colors"
          >
            <span className="font-inter text-ivory text-sm">{q}</span>
            <ChevronDown
              size={16}
              className={cn(
                "text-magic-gold/60 shrink-0 transition-transform duration-200",
                open === i && "rotate-180"
              )}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 font-inter text-parchment-brown/80 text-sm leading-relaxed border-t border-magic-gold/10 pt-4">
              {a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Help Centre
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 font-inter text-parchment-brown">
            Can't find your answer? Visit our{" "}
            <a href="/contact" className="text-magic-gold hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map(({ category, items }) => (
            <section key={category}>
              <h2 className="font-cinzel text-magic-gold text-sm uppercase tracking-widest mb-4">
                {category}
              </h2>
              <FaqAccordion items={items} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
