import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items } = await request.json(); // local cart items array

    // 1. Get or create the user's active cart in DB
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id }
      });
    }

    // 2. Merge local items into DB items
    if (Array.isArray(items) && items.length > 0) {
      for (const localItem of items) {
        if (!localItem.productId || !localItem.quantity) continue;
        
        await prisma.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId: localItem.productId
            }
          },
          update: {
            quantity: localItem.quantity // or increment it, but replacing is safer for sync
          },
          create: {
            cartId: cart.id,
            productId: localItem.productId,
            quantity: localItem.quantity
          }
        });
      }
      
      // Delete any DB items that are no longer in the local cart
      const localProductIds = items.map((i: any) => i.productId);
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: { notIn: localProductIds }
        }
      });
    } else if (Array.isArray(items) && items.length === 0) {
      // If local cart is explicitly empty, clear the DB cart
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
    }

    // 3. Fetch the fully merged cart with product details
    const mergedCart = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: { include: { images: true } } }
    });

    // Format the result to match Zustand store structure
    const formattedItems = mergedCart.map(item => {
      const primaryImage = item.product.images?.find((i: any) => i.isPrimary)?.imageUrl 
                           ?? item.product.images?.[0]?.imageUrl 
                           ?? "/images/placeholder.jpg";
                           
      return {
        id: item.product.id,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: primaryImage,
        quantity: item.quantity
      };
    });

    return NextResponse.json({ items: formattedItems });
  } catch (error: any) {
    console.error("[cart_sync]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
