import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        brand: data.brand,
        description: data.description,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity, 10),
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId,
      }
    });

    // Also update the primary image if provided
    if (data.imageUrl) {
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: id, isPrimary: true }
      });
      if (existingImage) {
        await prisma.productImage.update({
          where: { id: existingImage.id },
          data: { imageUrl: data.imageUrl }
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId: id,
            imageUrl: data.imageUrl,
            isPrimary: true,
            sortOrder: 0
          }
        });
      }
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("[admin_update_product]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Delete product. (Prisma cascade will handle deleting productImages if configured, but let's be safe).
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[admin_delete_product]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
