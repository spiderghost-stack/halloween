// Types — Magical Halloween Shop

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  categorySlug: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  price: number;
  originalPrice: number | null;
  discount: number | null; // percentage
  badge: "SALE" | "NEW" | "HOT" | "LIMITED" | null;
  rating: number;
  reviewCount: number;
  stock: number; // 0 = out of stock
  isTrending: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  mood: MoodTag[];
  tags: string[];
}

export type MoodTag =
  | "dark-gothic"
  | "classic-halloween"
  | "cute-spooky"
  | "magical-night"
  | "horror-night";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  endsAt: string; // ISO date
  image: string;
  categorySlug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  minRating?: number;
  discount?: boolean;
  inStock?: boolean;
  mood?: MoodTag;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";
