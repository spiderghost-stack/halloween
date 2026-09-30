import { NextRequest, NextResponse } from "next/server";
import { getShopProducts } from "@/lib/services/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  
  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
  const discount = searchParams.get("discount") === "true";
  const inStock = searchParams.get("inStock") === "true";
  const sort = searchParams.get("sort") || undefined;
  
  const { products, total } = await getShopProducts({
    category,
    brand,
    minPrice,
    maxPrice,
    discount,
    inStock,
    sort,
    page: 1,
    limit: 100 // Loading everything for now to match the existing UI
  });

  return NextResponse.json({ products, total });
}
