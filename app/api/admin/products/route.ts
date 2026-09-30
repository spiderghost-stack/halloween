import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        sku: `SKU-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        brand: data.brand,
        description: data.description,
        price: parseFloat(data.price),
        stockQuantity: parseInt(data.stockQuantity, 10),
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId,
        images: {
          create: {
            imageUrl: data.imageUrl,
            isPrimary: true,
            sortOrder: 0
          }
        }
      }
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("[admin_create_product]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
