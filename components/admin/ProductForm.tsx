"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  initialData?: any;
  categories: any[];
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    stockQuantity: initialData?.stockQuantity?.toString() || "10",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    isActive: initialData?.isActive ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    imageUrl: initialData?.images?.[0]?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products${initialData ? `/${initialData.id}` : ""}`, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-magic-gold/80 hover:text-magic-gold mb-8 font-inter text-sm transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <SectionHeader
        title={initialData ? "Edit Product" : "New Product"}
        subtitle="Forge a new item in your inventory."
        align="left"
        className="mb-10"
      />

      {error && (
        <div className="bg-red-950/50 border border-red-500/50 text-red-200 text-sm p-4 rounded-sm mb-8">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-haunted-dark/50 border border-magic-gold/10 p-8 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          <div>
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Brand</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          <div>
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          <div>
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Stock Quantity</label>
            <input
              type="number"
              required
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">Image URL (Unsplash)</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:border-magic-gold/60 outline-none"
            />
          </div>
          
          <div className="flex items-center gap-6 md:col-span-2 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 accent-magic-gold bg-deep-black/60 border-magic-gold/20"
              />
              <span className="font-inter text-sm text-ivory">Active in store</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-5 h-5 accent-magic-gold bg-deep-black/60 border-magic-gold/20"
              />
              <span className="font-inter text-sm text-ivory">Featured product</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-magic-gold/10 flex justify-end">
          <Button type="submit" variant="primary" disabled={loading} className="flex items-center gap-2">
            <Save size={16} /> {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
