"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Heart, Moon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Costumes", href: "/categories/costumes" },
  { label: "Decorations", href: "/categories/decorations" },
  { label: "Candy", href: "/categories/candy" },
  { label: "Party Supplies", href: "/categories/party-supplies" },
  { label: "Magic Accessories", href: "/categories/accessories" },
  { label: "Home Decor", href: "/categories/home-decor" },
  { label: "Kids", href: "/categories/kids" },
];

const discoverLinks = [
  { label: "Trending", href: "/shop?sort=trending" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Halloween Deals", href: "/deals" },
];

const accountLinks = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-xs z-[70] bg-deep-black border-l border-magic-gold/20 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-magic-gold/20">
          <div className="flex items-center gap-2">
            <Moon size={18} className="text-magic-gold" aria-hidden="true" />
            <span translate="no" className="font-cinzel text-sm text-ivory uppercase tracking-wider">
              Hex & Hollow
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-parchment-brown hover:text-ivory transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav content */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* SHOP */}
          <div>
            <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-4">
              Shop
            </p>
            <ul className="space-y-1">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 text-sm font-inter text-parchment-brown hover:text-bright-gold transition-colors duration-150 border-b border-magic-gold/10"
                  >
                    {link.label}
                    <ChevronRight size={14} className="text-magic-gold/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DISCOVER */}
          <div>
            <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-4">
              Discover
            </p>
            <ul className="space-y-1">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 text-sm font-inter text-parchment-brown hover:text-bright-gold transition-colors duration-150 border-b border-magic-gold/10"
                  >
                    {link.label}
                    <ChevronRight size={14} className="text-magic-gold/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-4">
              Account
            </p>
            <ul className="space-y-1">
              {accountLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 text-sm font-inter text-parchment-brown hover:text-bright-gold transition-colors duration-150"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-magic-gold/20">
          <p className="font-inter text-[10px] text-parchment-brown/50 uppercase tracking-widest text-center">
            © 2026 <span translate="no">Hex & Hollow</span>
          </p>
        </div>
      </div>
    </>
  );
}
