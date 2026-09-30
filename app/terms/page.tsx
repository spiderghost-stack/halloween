import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Magical Halloween Shop",
  description:
    "Read the Magical Halloween Shop Terms & Conditions governing your use of our website and services.",
};

const sections = [
  {
    title: "1. Introduction",
    content: `By accessing or purchasing from Magical Halloween Shop ("we", "us", "our"), you agree to be bound by these Terms & Conditions. Please read them carefully. If you do not agree, you should not use our website.`,
  },
  {
    title: "2. Account",
    content: `To place an order, you may create an account or checkout as a guest. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must be at least 18 years old to create an account or make a purchase.`,
  },
  {
    title: "3. Products",
    content: `All products are subject to availability. We reserve the right to limit quantities, discontinue products, or modify product descriptions at any time. Product images are for illustrative purposes and may vary slightly from the delivered item.`,
  },
  {
    title: "4. Prices",
    content: `All prices are displayed in USD and are exclusive of applicable taxes and shipping fees unless stated otherwise. We reserve the right to change prices at any time. The price applicable to your order is the price displayed at the time you place it.`,
  },
  {
    title: "5. Orders",
    content: `Once you place an order, you'll receive an order confirmation email. This confirmation does not constitute acceptance of your order. We reserve the right to cancel or refuse any order for any reason, including but not limited to: product unavailability, pricing errors, or suspected fraud.`,
  },
  {
    title: "6. Payments",
    content: `Payment is required at the time of checkout. We accept major credit/debit cards and other payment methods as displayed at checkout. All transactions are processed securely. We do not store your full card details.`,
  },
  {
    title: "7. Shipping",
    content: `We will make every effort to dispatch your order within the stated processing time. Delivery times are estimates and are not guaranteed. We are not liable for delays caused by shipping carriers, customs, or other factors outside our control. See our Shipping page for full details.`,
  },
  {
    title: "8. Returns",
    content: `Returns are subject to our Return Policy available on the Returns page. Items must be returned in their original condition within 30 days of delivery. Non-returnable items are listed on our Returns page.`,
  },
  {
    title: "9. User Responsibilities",
    content: `You agree not to use our website for any unlawful purpose, to submit false or misleading information, to attempt to gain unauthorised access to our systems, or to engage in any conduct that could harm our website, business, or other users.`,
  },
  {
    title: "10. Intellectual Property",
    content: `All content on this website — including but not limited to text, images, logos, and design — is the property of Magical Halloween Shop and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use our content without our prior written permission.`,
  },
  {
    title: "11. Limitation of Liability",
    content: `To the extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products, including loss of data, loss of profits, or business interruption.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.`,
  },
  {
    title: "13. Contact",
    content: `For any questions about these Terms & Conditions, please contact us at: legal@magicalhalloween.shop or through our Contact page.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Legal
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">
            Terms & Conditions
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
            These Terms & Conditions were last reviewed in October 2025 and are
            governed by applicable law.
          </p>
        </div>
      </div>
    </main>
  );
}
