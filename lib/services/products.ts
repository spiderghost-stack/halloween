/**
 * Product service — all Prisma queries for products.
 * Server-side only. Never import this from a Client Component.
 */
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types";

/** Convert a Prisma product row to the frontend Product type */
export function toProduct(p: any): Product {
  const primaryImage =
    p.images?.find((i: any) => i.isPrimary)?.imageUrl ??
    p.images?.[0]?.imageUrl ??
    "/images/placeholder.jpg";

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand ?? "",
    categoryId: p.categoryId,
    categorySlug: p.category?.slug ?? "",
    description: p.description ?? "",
    features: [],
    specifications: {},
    images: p.images?.map((i: any) => i.imageUrl) ?? ["/images/placeholder.jpg"],
    price: p.price,
    originalPrice: p.oldPrice ?? null,
    discount: p.discountPercentage ? Math.round(p.discountPercentage) : null,
    badge: (p.badge as any) ?? null,
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stockQuantity,
    isTrending: p.isTrending,
    isNewArrival: false, // determined by createdAt vs. mock flag
    isFeatured: p.isFeatured,
    mood: [],
    tags: [],
  };
}

const productInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
  category: { select: { slug: true, name: true } },
};

// ── FEATURED (homepage deals section) ────────────────────────────────────────
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

// ── DEALS (products with a discount) ─────────────────────────────────────────
export async function getDeals(limit = 8): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, discountPercentage: { gt: 0 } },
    include: productInclude,
    orderBy: { discountPercentage: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

// ── TRENDING ──────────────────────────────────────────────────────────────────
export async function getTrendingProducts(limit = 8): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, isTrending: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

// ── NEW ARRIVALS (most recently created) ──────────────────────────────────────
export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

// ── SINGLE PRODUCT BY SLUG ────────────────────────────────────────────────────
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: productInclude,
  });
  return p ? toProduct(p) : null;
}

// ── ALL PRODUCT SLUGS (for generateStaticParams) ──────────────────────────────
export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

// ── SHOP — filter + sort + paginate ──────────────────────────────────────────
export interface ShopQuery {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  discount?: boolean;
  inStock?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getShopProducts(q: ShopQuery = {}): Promise<{ products: Product[]; total: number }> {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    discount,
    inStock,
    sort = "featured",
    page = 1,
    limit = 20,
  } = q;

  const where: any = { isActive: true };

  if (category) {
    where.category = { slug: category };
  }
  if (brand) {
    where.brand = { equals: brand, mode: "insensitive" };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }
  if (discount) {
    where.discountPercentage = { gt: 0 };
  }
  if (inStock) {
    where.stockQuantity = { gt: 0 };
  }

  const orderBy: any =
    sort === "price-asc" ? { price: "asc" } :
    sort === "price-desc" ? { price: "desc" } :
    sort === "rating" ? { rating: "desc" } :
    sort === "newest" ? { createdAt: "desc" } :
    sort === "discount" ? { discountPercentage: "desc" } :
    { isFeatured: "desc" }; // featured (default)

  const [rows, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return { products: rows.map(toProduct), total };
}

// ── BY CATEGORY ───────────────────────────────────────────────────────────────
export async function getProductsByCategory(categorySlug: string, limit = 20): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, category: { slug: categorySlug } },
    include: productInclude,
    orderBy: { isFeatured: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

// ── SEARCH ───────────────────────────────────────────────────────────────────
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  if (!query.trim()) return [];
  const rows = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { name: { contains: query, mode: "insensitive" } } },
      ],
    },
    include: productInclude,
    take: limit,
  });
  return rows.map(toProduct);
}
