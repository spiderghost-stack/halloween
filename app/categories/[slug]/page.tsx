import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug } from "@/lib/services/categories";
import { getProductsByCategory } from "@/lib/services/products";
import { CategoryClient } from "./CategoryClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cats = await getAllCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Halloween Shop`,
    description: category.description ?? `Shop all ${category.name} at Halloween Shop`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug, 20);

  // Map to the shape CategoryClient expects
  const categoryForClient = {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description ?? "",
    image: category.imageUrl ?? `/images/categories/${slug}.jpg`,
    productCount: products.length,
    featured: true,
  };

  return <CategoryClient category={categoryForClient} products={products} />;
}
