"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  Moon,
  X,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop" },
  {
    label: "Costumes",
    href: "/categories/costumes",
  },
  {
    label: "Decorations",
    href: "/categories/decorations",
  },
  { label: "Candy", href: "/categories/candy" },
  {
    label: "Party",
    href: "/categories/party-supplies",
  },
  {
    label: "Magic Accessories",
    href: "/categories/accessories",
  },
  { label: "Deals", href: "/deals" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { getTotalItems, toggleCart, isOpen: cartOpen } = useCartStore();
  const { getTotalItems: getWishlistCount } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cartCount = mounted ? getTotalItems() : 0;
  const wishlistCount = mounted ? getWishlistCount() : 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* PROMO BAR */}
      <div className="bg-castle-black border-b border-magic-gold/20 py-2 px-4 text-center">
        <p className="font-inter text-xs tracking-widest uppercase text-magic-gold">
          <span className="text-halloween-orange">🎃</span> Halloween Night
          Sale —{" "}
          <span className="text-bright-gold font-semibold">Up to 50% Off</span>{" "}
          Selected Items{" "}
          <span className="text-halloween-orange">🎃</span>
        </p>
      </div>

      {/* MAIN HEADER */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-castle-black/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.8)] border-b border-magic-gold/20"
            : "bg-castle-black border-b border-magic-gold/10"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Magical Halloween Shop — Home"
            >
              <div className="relative">
                <Moon
                  size={22}
                  className="text-magic-gold group-hover:text-bright-gold transition-colors duration-200"
                  aria-hidden="true"
                />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-halloween-orange" />
              </div>
              <span className="font-cinzel font-bold text-ivory uppercase tracking-wider text-sm lg:text-base group-hover:text-warm-white transition-colors duration-200 whitespace-nowrap">
                Hex & Hollow
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-xs uppercase tracking-widest text-parchment-brown hover:text-bright-gold transition-colors duration-150 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-magic-gold transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* SEARCH */}
              {searchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="hidden sm:flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Halloween products..."
                    autoFocus
                    className="bg-deep-black border border-magic-gold/40 text-ivory placeholder:text-parchment-brown/50 font-inter text-sm px-3 py-1.5 rounded-sm w-48 lg:w-64 focus:outline-none focus:border-magic-gold transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-parchment-brown hover:text-ivory transition-colors"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-parchment-brown hover:text-bright-gold transition-colors duration-150"
                  aria-label="Open search"
                >
                  <Search size={18} />
                </button>
              )}

              {/* WISHLIST */}
              <Link
                href="/wishlist"
                className="relative p-2 text-parchment-brown hover:text-bright-gold transition-colors duration-150"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-halloween-orange text-warm-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* CART */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-parchment-brown hover:text-bright-gold transition-colors duration-150"
                aria-label={`Cart (${cartCount} items)`}
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-halloween-orange text-warm-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-parchment-brown hover:text-bright-gold transition-colors duration-150"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH BAR (below header on mobile) */}
      {searchOpen && (
        <div className="sm:hidden bg-deep-black border-b border-magic-gold/20 px-4 py-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Halloween products..."
              autoFocus
              className="flex-1 bg-castle-black border border-magic-gold/40 text-ivory placeholder:text-parchment-brown/50 font-inter text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-magic-gold"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-parchment-brown hover:text-ivory transition-colors p-1"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </form>
        </div>
      )}

      {/* MOBILE NAV DRAWER */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* CART DRAWER */}
      <CartDrawer />
    </>
  );
}
