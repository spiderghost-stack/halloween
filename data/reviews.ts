import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prod-5",
    author: "Roesnay",
    rating: 5,
    title: "Absolutely stunning candles",
    body: "These candles transformed my living room into something out of a gothic fantasy. The scent is incredible — warm amber with a hint of dark woods. Absolutely worth every penny.",
    date: "2026-09-15",
    verified: true,
  },
  {
    id: "rev-2",
    productId: "prod-5",
    author: "M. Castellan",
    rating: 5,
    title: "Perfect Halloween centrepiece",
    body: "I bought three sets for my Halloween dinner party and the guests were absolutely enchanted. The rune carvings glow beautifully when lit.",
    date: "2026-09-20",
    verified: true,
  },
  {
    id: "rev-3",
    productId: "prod-1",
    author: "Roesnay",
    rating: 5,
    title: "The most dramatic costume piece I own",
    body: "The velvet-touch fabric is phenomenal. I wore it to three events and received compliments every single time. The gold trim on the hood is a beautiful detail.",
    date: "2026-09-18",
    verified: true,
  },
  {
    id: "rev-4",
    productId: "prod-10",
    author: "P. Morvaux",
    rating: 5,
    title: "Worth every cent",
    body: "When lit, this raven candle creates the most dramatic amber glow I have ever seen from a candle. It is a piece of art as much as a functional candle.",
    date: "2026-09-22",
    verified: true,
  },
  {
    id: "rev-5",
    productId: "prod-9",
    author: "Roesnay",
    rating: 4,
    title: "Excellent decoration set",
    body: "The potion bottles look incredibly realistic. The iridescent liquid effect is beautiful on a shelf with warm lighting behind them. Losing one star only because two labels were slightly smudged.",
    date: "2026-09-10",
    verified: true,
  },
  {
    id: "rev-6",
    productId: "prod-12",
    author: "H. Devereux",
    rating: 5,
    title: "An heirloom piece",
    body: "The craftsmanship of this spell book is extraordinary. The parchment-feel pages are thick and luxurious. The brass clasp is solid and the leather cover has a beautiful aged texture.",
    date: "2026-09-25",
    verified: true,
  },
  {
    id: "rev-7",
    productId: "prod-25",
    author: "Roesnay",
    rating: 5,
    title: "My daughter refused to take it off",
    body: "The quality is exceptional for a children's costume. The fabric is soft against sensitive skin, the hat stays on perfectly, and the mini broom is adorable. We will use this for years.",
    date: "2026-09-21",
    verified: true,
  },
  {
    id: "rev-8",
    productId: "prod-6",
    author: "S. Nightingale",
    rating: 5,
    title: "Sets the perfect atmosphere",
    body: "I placed two of these on either side of my fireplace for Halloween. The aged iron finish is beautiful in person — much richer than the photos suggest.",
    date: "2026-09-17",
    verified: true,
  },
  {
    id: "rev-9",
    productId: "prod-18",
    author: "Roesnay",
    rating: 4,
    title: "Professional quality at a great price",
    body: "As a professional makeup artist I am very picky about face paints. These are genuinely impressive — pigmented, easy to apply, and they last all evening without cracking.",
    date: "2026-09-19",
    verified: true,
  },
  {
    id: "rev-10",
    productId: "prod-22",
    author: "A. Blackmore",
    rating: 5,
    title: "Absolutely breathtaking",
    body: "This candelabra is a statement piece. It dominates a room in the best possible way. The aged wrought iron finish looks authentic and it holds the candles perfectly steady.",
    date: "2026-09-23",
    verified: true,
  },
];

export const getReviewsByProduct = (productId: string) =>
  reviews.filter((r) => r.productId === productId);

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProduct(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};
