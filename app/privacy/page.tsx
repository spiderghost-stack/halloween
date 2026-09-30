import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Magical Halloween Shop",
  description:
    "Read the Magical Halloween Shop Privacy Policy to understand how we collect, use and protect your personal data.",
};

const sections = [
  {
    title: "1. What Data We Collect",
    content: `When you create an account, place an order, or contact us, we may collect: your name, email address, shipping address, phone number, and payment information (handled securely by our payment processor — we never store full card details). We also collect standard web usage data such as IP addresses, browser type, and pages visited via cookies.`,
  },
  {
    title: "2. How We Use Your Data",
    content: `We use your data to process and fulfil your orders, send order confirmation and shipping notifications, manage your account, respond to support requests, send promotional emails (only if you opt in), and improve our website and services.`,
  },
  {
    title: "3. Your Account",
    content: `Information you add to your account (addresses, wishlist, order history) is stored securely and only accessible by you and our internal team for order management purposes. You can request deletion of your account and associated data at any time.`,
  },
  {
    title: "4. Orders",
    content: `Order data (products purchased, amounts, addresses) is retained for accounting and legal purposes for a minimum of 7 years as required by applicable law, even if your account is deleted. This data is not used for marketing purposes.`,
  },
  {
    title: "5. Cookies",
    content: `We use essential cookies to operate the website (sessions, shopping cart). We may also use analytics cookies to understand how visitors use our site. You can control cookie preferences through your browser settings or the cookie banner on your first visit.`,
  },
  {
    title: "6. Newsletter",
    content: `If you subscribe to our newsletter, we store your email address and use it to send you Halloween collections, promotions and news. You can unsubscribe at any time by clicking the link in any of our emails. We do not sell or share your email with third parties.`,
  },
  {
    title: "7. Your Rights",
    content: `Depending on your jurisdiction, you may have the right to: access the personal data we hold about you, request corrections, request deletion ("right to be forgotten"), object to certain processing, and request data portability. To exercise these rights, contact us at privacy@magicalhalloween.shop.`,
  },
  {
    title: "8. Data Security",
    content: `We take security seriously. Our site uses HTTPS encryption for all data transmission. Passwords are hashed and never stored in plain text. Access to production systems is restricted to authorised personnel only.`,
  },
  {
    title: "9. Third Parties",
    content: `We may share necessary data with service providers who help us operate our business (shipping carriers, payment processors, email delivery services). These providers are bound by data processing agreements and may not use your data for their own purposes.`,
  },
  {
    title: "10. Contact",
    content: `For any privacy-related questions or requests, contact us at: privacy@magicalhalloween.shop or through our Contact page. We aim to respond within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Legal
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">
            Privacy Policy
          </h1>
          <p className="mt-4 font-inter text-parchment-brown/70 text-sm">
            Last updated: October 2025
          </p>
        </div>

        <div className="space-y-8">
          {sections.map(({ title, content }) => (
            <section key={title}>
              <h2 className="font-cinzel text-ivory text-base mb-3">{title}</h2>
              <p className="font-inter text-parchment-brown text-sm leading-relaxed">
                {content}
              </p>
            </section>
          ))}
        </div>

        <div className="border-t border-magic-gold/10 mt-12 pt-8 text-center">
          <p className="font-inter text-parchment-brown/60 text-xs">
            By using this website, you agree to this Privacy Policy. We reserve
            the right to update it at any time. Changes will be posted on this
            page.
          </p>
        </div>
      </div>
    </main>
  );
}
