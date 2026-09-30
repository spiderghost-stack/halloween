import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Total Products", value: productCount, icon: Package },
    { label: "Total Orders", value: orderCount, icon: ShoppingCart },
    { label: "Registered Users", value: userCount, icon: Users },
    { label: "Revenue", value: "$0.00", icon: DollarSign }, // Placeholder until orders have real revenue
  ];

  return (
    <main className="min-h-screen bg-deep-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Coven Command Center"
          subtitle={`Welcome back, ${session.user?.name || "Admin"}.`}
          align="left"
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-magic-gold/10 flex items-center justify-center shrink-0">
                <Icon size={24} className="text-magic-gold" />
              </div>
              <div>
                <p className="font-inter text-parchment-brown/70 text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="font-cinzel text-ivory text-2xl">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-6">
          <h2 className="font-cinzel text-magic-gold text-lg mb-4">Quick Actions</h2>
          <p className="font-inter text-parchment-brown text-sm mb-6">
            The full CRUD interface for products and orders will be connected here in Phase 9.
          </p>
          <div className="flex gap-4">
            <Link href="/admin/products" className="px-6 py-2 bg-halloween-orange/80 hover:bg-halloween-orange text-warm-white font-inter text-sm uppercase tracking-widest rounded-sm transition-colors">
              Manage Products
            </Link>
            <Link href="/admin/orders" className="px-6 py-2 border border-magic-gold/30 hover:border-magic-gold text-magic-gold font-inter text-sm uppercase tracking-widest rounded-sm transition-colors">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
