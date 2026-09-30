import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <main className="min-h-screen bg-deep-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-magic-gold/80 hover:text-magic-gold mb-8 font-inter text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="flex justify-between items-end mb-10">
          <SectionHeader
            title="Product Grimoire"
            subtitle="Manage your inventory and magical artifacts."
            align="left"
            className="mb-0"
          />
          <Link href="/admin/products/new" className="px-4 py-2 bg-magic-gold text-deep-black font-inter text-sm uppercase tracking-widest rounded-sm hover:bg-ivory transition-colors flex items-center gap-2">
            <Plus size={16} /> New Product
          </Link>
        </div>

        <div className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm overflow-hidden">
          <table className="w-full text-left font-inter text-sm">
            <thead className="bg-castle-black border-b border-magic-gold/10 text-parchment-brown/80 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-6 py-4 font-normal">Name</th>
                <th className="px-6 py-4 font-normal">Category</th>
                <th className="px-6 py-4 font-normal">Price</th>
                <th className="px-6 py-4 font-normal">Stock</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-magic-gold/5 text-ivory">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-magic-gold/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-parchment-brown">{product.category.name}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {product.stockQuantity > 0 ? (
                      <span>{product.stockQuantity}</span>
                    ) : (
                      <span className="text-red-400">Out of stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-magic-gold/60 hover:text-magic-gold transition-colors">
                        <Edit size={16} />
                      </Link>
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
