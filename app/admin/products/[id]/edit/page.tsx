import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: true }
    }),
    prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true }
    })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-deep-black py-20 px-4">
      <ProductForm initialData={product} categories={categories} />
    </main>
  );
}
