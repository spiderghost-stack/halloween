import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items } = await request.json(); // local wishlist items array (Product[])

    // Merge local items into DB items
    if (Array.isArray(items) && items.length > 0) {
      for (const localProduct of items) {
        if (!localProduct.id) continue;
        
        // Wishlist items are just associations, no quantity
        await prisma.wishlistItem.upsert({
          where: {
            userId_productId: {
              userId: session.user.id,
              productId: localProduct.id
            }
          },
          update: {},
          create: {
            userId: session.user.id,
            productId: localProduct.id
          }
        });
      }
      
      // Delete any DB items that are no longer in the local wishlist
      const localProductIds = items.map((i: any) => i.id);
      await prisma.wishlistItem.deleteMany({
        where: {
          userId: session.user.id,
          productId: { notIn: localProductIds }
        }
      });
    } else if (Array.isArray(items) && items.length === 0) {
      await prisma.wishlistItem.deleteMany({
        where: { userId: session.user.id }
      });
    }

    // Fetch the fully merged wishlist with product details
    const mergedWishlist = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: { product: { include: { images: true } } }
    });

    // Format the result to match Zustand store structure
    const formattedItems = mergedWishlist.map(item => {
      const primaryImage = item.product.images?.find((i: any) => i.isPrimary)?.imageUrl 
                           ?? item.product.images?.[0]?.imageUrl 
                           ?? "/images/placeholder.jpg";
                           
      return {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        images: [primaryImage],
        slug: item.product.slug,
        categorySlug: "unknown" // simplified
      };
    });

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    console.error("[wishlist_sync]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
