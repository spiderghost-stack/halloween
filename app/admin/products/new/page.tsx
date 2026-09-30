import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true }
  });

  return (
    <main className="min-h-screen bg-deep-black py-20 px-4">
      <ProductForm categories={categories} />
    </main>
  );
}
