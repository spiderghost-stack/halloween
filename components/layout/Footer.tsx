import Link from "next/link";
import { Moon, Camera, Globe } from "lucide-react";

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  Shop: [
    { label: "Costumes", href: "/categories/costumes" },
    { label: "Decorations", href: "/categories/decorations" },
    { label: "Candy", href: "/categories/candy" },
    { label: "Party", href: "/categories/party-supplies" },
    { label: "Deals", href: "/deals" },
  ],
  Help: [
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#", Icon: Camera },
  { label: "Facebook", href: "#", Icon: Globe },
];

export function Footer() {
  return (
    <footer className="bg-castle-black border-t border-magic-gold/20 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magic-gold/40 to-transparent" />

      {/* Newsletter */}
      <div className="border-b border-magic-gold/15 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-magic-gold/40" />
            <Moon size={16} className="text-magic-gold" aria-hidden="true" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-magic-gold/40" />
          </div>
          <h2 className="font-cinzel text-2xl md:text-3xl text-ivory uppercase tracking-widest">
            Join the Coven
          </h2>
          <p className="font-inter text-sm text-parchment-brown max-w-md mx-auto">
            Get early access to Halloween drops, secret deals and seasonal
            surprises.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Roesnay"
              className="flex-1 bg-deep-black border border-magic-gold/30 text-ivory placeholder:text-parchment-brown/40 font-inter text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-magic-gold transition-colors"
            />
            <input
              type="email"
              placeholder="roesnay@example.com"
              className="flex-1 bg-deep-black border border-magic-gold/30 text-ivory placeholder:text-parchment-brown/40 font-inter text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-magic-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-halloween-orange text-warm-white font-inter font-medium uppercase tracking-widest text-xs px-6 py-3 rounded-sm hover:bg-orange-700 transition-colors duration-150 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group w-fit"
              aria-label="Hex & Hollow Home"
            >
              <Moon
                size={20}
                className="text-magic-gold"
                aria-hidden="true"
              />
              <span className="font-cinzel font-bold text-ivory uppercase tracking-wider text-sm">
                Hex & Hollow
              </span>
            </Link>
            <p className="font-inter text-xs text-parchment-brown/70 leading-relaxed max-w-xs">
              A magical boutique for the most enchanted night of the year.
              Costumes, decorations and mysterious treasures.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-magic-gold/30 text-parchment-brown hover:text-bright-gold hover:border-magic-gold transition-all duration-150 rounded-sm"
                >
                  <Icon size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-cinzel text-[10px] text-magic-gold uppercase tracking-[0.2em] mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-xs text-parchment-brown/70 hover:text-bright-gold transition-colors duration-150 uppercase tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-magic-gold/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-inter text-[10px] text-parchment-brown/40 uppercase tracking-widest">
            © 2026 Hex & Hollow. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-0.5 h-0.5 rounded-full bg-magic-gold/40"
              />
            ))}
            <span className="font-inter text-[10px] text-parchment-brown/30 uppercase tracking-widest ml-1">
              Crafted for All Hallows&apos; Eve
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
