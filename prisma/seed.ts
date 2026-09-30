import { PrismaClient, DiscountType, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Halloween database...");

  // ── CLEAN UP ────────────────────────────────────────────────────────────────
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.promotionProduct.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.sitePage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // ── ADMIN USER ──────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@2025!", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@magicalhalloween.shop",
      password: adminHash,
      role: Role.ADMIN,
      profile: {
        create: { firstName: "Admin", lastName: "User" },
      },
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ── CATEGORIES ──────────────────────────────────────────────────────────────
  const categories = await prisma.$transaction([
    prisma.category.create({ data: { name: "Costumes", slug: "costumes", description: "Full costumes, capes, and character sets for adults and kids.", sortOrder: 1 } }),
    prisma.category.create({ data: { name: "Decorations", slug: "decorations", description: "Indoor and outdoor Halloween decorations to haunt your home.", sortOrder: 2 } }),
    prisma.category.create({ data: { name: "Candy & Treats", slug: "candy", description: "Halloween sweets, trick-or-treat candy and seasonal confections.", sortOrder: 3 } }),
    prisma.category.create({ data: { name: "Makeup & FX", slug: "makeup", description: "Special effects makeup, face paint, prosthetics and accessories.", sortOrder: 4 } }),
    prisma.category.create({ data: { name: "Party Supplies", slug: "party", description: "Tableware, banners, balloons and party kits for Halloween gatherings.", sortOrder: 5 } }),
    prisma.category.create({ data: { name: "Accessories", slug: "accessories", description: "Hats, wands, masks, gloves and all the finishing touches.", sortOrder: 6 } }),
    prisma.category.create({ data: { name: "Home Décor", slug: "home-decor", description: "Candles, lanterns, wall art and atmospheric home décor.", sortOrder: 7 } }),
    prisma.category.create({ data: { name: "Kids", slug: "kids", description: "Safe, fun and spooky-cute Halloween products for little ones.", sortOrder: 8 } }),
  ]);

  const [catCostumes, catDecor, catCandy, catMakeup, catParty, catAccessories, catHomeDecor, catKids] = categories;
  console.log("✅ 8 categories created");

  // ── PRODUCTS ─────────────────────────────────────────────────────────────────
  const productsData = [
    // COSTUMES
    { categoryId: catCostumes.id, name: "Midnight Witch Cape", slug: "midnight-witch-cape", brand: "NIGHTFALL", description: "A dramatic floor-length cape crafted from velvet-touch fabric. Deep midnight black with subtle shimmer. Ideal for any dark enchantress.", price: 39.99, oldPrice: 59.99, discountPercentage: 33, stockQuantity: 18, sku: "NF-CAPE-001", badge: "SALE", isFeatured: true, isTrending: true },
    { categoryId: catCostumes.id, name: "Vintage Witch Hat", slug: "vintage-witch-hat", brand: "NIGHTFALL", description: "An authentic-looking witch hat with aged buckle detail and wide brim. Pairs perfectly with any Halloween outfit.", price: 24.99, oldPrice: null, discountPercentage: 0, stockQuantity: 35, sku: "NF-HAT-001", badge: null, isFeatured: false, isTrending: true },
    { categoryId: catCostumes.id, name: "Shadow Raven Cloak", slug: "shadow-raven-cloak", brand: "DARKWING", description: "A hooded cloak with raven feather-effect detailing along the neckline. Full-length, unisex. Theatre-quality stitching.", price: 54.99, oldPrice: 79.99, discountPercentage: 31, stockQuantity: 12, sku: "DW-CLOAK-001", badge: "SALE", isFeatured: true, isTrending: false },
    { categoryId: catCostumes.id, name: "Phantom Ball Gown", slug: "phantom-ball-gown", brand: "DARKWING", description: "An ethereal ball gown with flowing black and midnight purple layers. Perfect for elegant Halloween events.", price: 89.99, oldPrice: 129.99, discountPercentage: 31, stockQuantity: 8, sku: "DW-GOWN-001", badge: "LIMITED", isFeatured: true, isTrending: true },
    { categoryId: catCostumes.id, name: "Gothic Undertaker Suit", slug: "gothic-undertaker-suit", brand: "NIGHTFALL", description: "A tailored three-piece suit with Victorian gothic detailing. Includes jacket, waistcoat, and cravat.", price: 74.99, oldPrice: null, discountPercentage: 0, stockQuantity: 20, sku: "NF-SUIT-001", badge: "NEW", isFeatured: false, isTrending: false },
    { categoryId: catCostumes.id, name: "Crimson Vampire Cape", slug: "crimson-vampire-cape", brand: "NIGHTFALL", description: "Dramatic blood-red satin lining meets midnight exterior. Turn any vampire costume into a statement.", price: 34.99, oldPrice: 44.99, discountPercentage: 22, stockQuantity: 25, sku: "NF-VCAPE-001", badge: "SALE", isFeatured: false, isTrending: true },

    // DECORATIONS
    { categoryId: catDecor.id, name: "Haunted Manor Candle Set", slug: "haunted-manor-candle-set", brand: "MYSTIC FLAME", description: "A set of 5 pillar candles in varying heights, charcoal black, unscented. Creates instant gothic atmosphere.", price: 28.99, oldPrice: null, discountPercentage: 0, stockQuantity: 42, sku: "MF-CSET-001", badge: null, isFeatured: true, isTrending: true },
    { categoryId: catDecor.id, name: "Dark Forest Lantern", slug: "dark-forest-lantern", brand: "MYSTIC FLAME", description: "Wrought-iron style lantern with amber glass panels. Battery-operated flickering flame effect. Indoor/outdoor.", price: 34.99, oldPrice: 49.99, discountPercentage: 30, stockQuantity: 30, sku: "MF-LANT-001", badge: "SALE", isFeatured: false, isTrending: false },
    { categoryId: catDecor.id, name: "Pumpkin Cauldron", slug: "pumpkin-cauldron", brand: "GRIM & CO", description: "A beautifully detailed ceramic cauldron with carved pumpkin faces. Perfect as a candy bowl or décor centrepiece.", price: 22.99, oldPrice: null, discountPercentage: 0, stockQuantity: 55, sku: "GC-CAUL-001", badge: null, isFeatured: false, isTrending: false },
    { categoryId: catDecor.id, name: "Mystic Skull Decor Set", slug: "mystic-skull-decor", brand: "GRIM & CO", description: "Set of 3 hand-painted resin skulls with gold and black detail. Display-grade quality.", price: 19.99, oldPrice: 29.99, discountPercentage: 33, stockQuantity: 38, sku: "GC-SKULL-001", badge: "DEAL", isFeatured: true, isTrending: false },
    { categoryId: catDecor.id, name: "Moonlit Potion Bottles", slug: "moonlit-potion-bottles", brand: "MYSTIC FLAME", description: "Set of 6 decorative glass bottles with vintage labels. Fill with coloured water for a magical apothecary look.", price: 16.99, oldPrice: null, discountPercentage: 0, stockQuantity: 60, sku: "MF-POT-001", badge: "NEW", isFeatured: false, isTrending: true },
    { categoryId: catDecor.id, name: "Haunted Portrait Set", slug: "haunted-portrait-set", brand: "GRIM & CO", description: "Set of 3 lenticular portraits that change expression as you walk past. Perfect for spooky hallways.", price: 44.99, oldPrice: 64.99, discountPercentage: 31, stockQuantity: 14, sku: "GC-PORT-001", badge: "LIMITED", isFeatured: true, isTrending: true },

    // CANDY
    { categoryId: catCandy.id, name: "Spellbound Gummy Collection", slug: "spellbound-gummy-collection", brand: "CAULDRON SWEETS", description: "500g assorted gummy skulls, spiders, worms and bats. Natural flavours, no artificial colours.", price: 9.99, oldPrice: null, discountPercentage: 0, stockQuantity: 100, sku: "CS-GUMM-001", badge: null, isFeatured: false, isTrending: false },
    { categoryId: catCandy.id, name: "Witch's Cauldron Mix", slug: "witchs-cauldron-mix", brand: "CAULDRON SWEETS", description: "1kg mixed Halloween candy bundle. Individually wrapped. Perfect for trick-or-treating.", price: 14.99, oldPrice: 19.99, discountPercentage: 25, stockQuantity: 80, sku: "CS-MIX-001", badge: "DEAL", isFeatured: true, isTrending: false },
    { categoryId: catCandy.id, name: "Dark Chocolate Skulls", slug: "dark-chocolate-skulls", brand: "NOIR CONFECTIONS", description: "6 premium dark chocolate skulls, 70% cacao, individually boxed. Perfect as Halloween gifts.", price: 18.99, oldPrice: null, discountPercentage: 0, stockQuantity: 45, sku: "NC-CHOC-001", badge: "NEW", isFeatured: false, isTrending: false },

    // MAKEUP
    { categoryId: catMakeup.id, name: "Twilight Face Paint Kit", slug: "twilight-face-paint-kit", brand: "SHADOW FX", description: "Professional-grade water-activated face paint. 12 colours including metallics. Skin-safe formula.", price: 22.99, oldPrice: 32.99, discountPercentage: 30, stockQuantity: 50, sku: "SFX-FPKT-001", badge: "SALE", isFeatured: true, isTrending: true },
    { categoryId: catMakeup.id, name: "Vampire Blood FX Gel", slug: "vampire-blood-fx-gel", brand: "SHADOW FX", description: "Realistic dripping blood effect gel. Non-staining formula. Safe for skin and costumes.", price: 8.99, oldPrice: null, discountPercentage: 0, stockQuantity: 75, sku: "SFX-BLDG-001", badge: null, isFeatured: false, isTrending: false },
    { categoryId: catMakeup.id, name: "Scar & Wound Prosthetic Kit", slug: "scar-wound-prosthetic-kit", brand: "SHADOW FX", description: "Includes 8 silicone prosthetic pieces, spirit gum, and removal solution. Cinema-quality SFX.", price: 34.99, oldPrice: 49.99, discountPercentage: 30, stockQuantity: 28, sku: "SFX-SCAR-001", badge: "SALE", isFeatured: false, isTrending: false },

    // PARTY
    { categoryId: catParty.id, name: "Graveyard Party Bundle", slug: "graveyard-party-bundle", brand: "SPOOK & CO", description: "Complete party kit for 20 guests: plates, cups, napkins, tablecloth and hanging decorations. Black and gold.", price: 29.99, oldPrice: 44.99, discountPercentage: 33, stockQuantity: 35, sku: "SC-PTYB-001", badge: "DEAL", isFeatured: true, isTrending: false },
    { categoryId: catParty.id, name: "Witch Hat Balloons Set", slug: "witch-hat-balloons-set", brand: "SPOOK & CO", description: "Set of 20 latex balloons in black, orange and purple. Includes mini witch hat toppers.", price: 12.99, oldPrice: null, discountPercentage: 0, stockQuantity: 90, sku: "SC-BALL-001", badge: null, isFeatured: false, isTrending: false },

    // ACCESSORIES
    { categoryId: catAccessories.id, name: "Enchanted Wand Collection", slug: "enchanted-wand-collection", brand: "NIGHTFALL", description: "Set of 3 artisan-style wands in different woods and crystal tips. Display-quality props.", price: 27.99, oldPrice: 39.99, discountPercentage: 30, stockQuantity: 22, sku: "NF-WAND-001", badge: "SALE", isFeatured: false, isTrending: true },
    { categoryId: catAccessories.id, name: "Raven Feather Mask", slug: "raven-feather-mask", brand: "DARKWING", description: "Half-face masquerade mask with genuine raven feather plumes. Adjustable satin ribbon tie.", price: 31.99, oldPrice: null, discountPercentage: 0, stockQuantity: 18, sku: "DW-MASK-001", badge: "NEW", isFeatured: false, isTrending: false },
    { categoryId: catAccessories.id, name: "Crystal Orb Stand", slug: "crystal-orb-stand", brand: "MYSTIC FLAME", description: "Clear crystal glass orb with ornate blackened metal stand. Perfect desk or shelf accessory.", price: 42.99, oldPrice: 59.99, discountPercentage: 28, stockQuantity: 15, sku: "MF-ORB-001", badge: "LIMITED", isFeatured: true, isTrending: true },

    // HOME DECOR
    { categoryId: catHomeDecor.id, name: "Gothic Raven Candle", slug: "gothic-raven-candle", brand: "MYSTIC FLAME", description: "Large hand-poured soy candle in a raven-relief ceramic vessel. Smoky cedar and black amber scent. 60-hour burn.", price: 38.99, oldPrice: null, discountPercentage: 0, stockQuantity: 30, sku: "MF-RAVN-001", badge: "NEW", isFeatured: true, isTrending: false },
    { categoryId: catHomeDecor.id, name: "Haunted House Door Hanger", slug: "haunted-door-hanger", brand: "GRIM & CO", description: "Large decorative door hanger with illuminated haunted house silhouette. Weather-resistant. Includes 3 AA batteries.", price: 18.99, oldPrice: 25.99, discountPercentage: 27, stockQuantity: 40, sku: "GC-DOOR-001", badge: "SALE", isFeatured: false, isTrending: false },
    { categoryId: catHomeDecor.id, name: "Magic Spell Book Decor", slug: "magic-spell-book-decor", brand: "GRIM & CO", description: "Aged leather-look decorative book with embossed cover. Hollow interior for storage. Sold as set of 2.", price: 32.99, oldPrice: null, discountPercentage: 0, stockQuantity: 25, sku: "GC-BOOK-001", badge: null, isFeatured: false, isTrending: false },

    // KIDS
    { categoryId: catKids.id, name: "Little Witch Costume Set", slug: "little-witch-costume-set", brand: "SPOOK & CO", description: "Complete kids witch costume: dress, hat and cape. Soft fabric, no sharp edges. Ages 3–10. Machine washable.", price: 26.99, oldPrice: 36.99, discountPercentage: 27, stockQuantity: 45, sku: "SC-KWTCH-001", badge: "SALE", isFeatured: true, isTrending: true },
    { categoryId: catKids.id, name: "Pumpkin Trick-or-Treat Bucket", slug: "pumpkin-trick-or-treat-bucket", brand: "SPOOK & CO", description: "Classic plastic pumpkin bucket with handle. BPA-free. Holds up to 2kg of candy.", price: 7.99, oldPrice: null, discountPercentage: 0, stockQuantity: 120, sku: "SC-BUCK-001", badge: null, isFeatured: false, isTrending: false },
    { categoryId: catKids.id, name: "Glow-in-the-Dark Spider Kit", slug: "glow-spider-kit", brand: "SPOOK & CO", description: "12 glow-in-the-dark plastic spiders of varying sizes. Non-toxic paint. Safe for ages 3+.", price: 5.99, oldPrice: 8.99, discountPercentage: 33, stockQuantity: 85, sku: "SC-SPIDR-001", badge: "DEAL", isFeatured: false, isTrending: false },
  ];

  const createdProducts: Array<{ id: string; slug: string }> = [];
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        ...p,
        images: {
          create: [{ imageUrl: `/images/products/${p.slug}-1.jpg`, altText: p.name, sortOrder: 0, isPrimary: true }],
        },
      },
    });
    createdProducts.push({ id: product.id, slug: product.slug });
  }
  console.log(`✅ ${createdProducts.length} products created`);

  // ── PROMOTIONS ───────────────────────────────────────────────────────────────
  const halloweenSale = await prisma.promotion.create({
    data: {
      name: "Halloween Night Sale",
      code: "HALLOWEEN25",
      description: "25% off sitewide for Halloween season",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 25,
      startDate: new Date("2025-10-15T00:00:00Z"),
      endDate: new Date("2025-11-01T00:00:00Z"),
      isActive: true,
    },
  });

  await prisma.promotion.create({
    data: {
      name: "Spooky Deals",
      code: "SPOOKY10",
      description: "$10 off orders over $50",
      discountType: DiscountType.FIXED,
      discountValue: 10,
      startDate: new Date("2025-10-20T00:00:00Z"),
      endDate: new Date("2025-10-31T23:59:59Z"),
      isActive: true,
    },
  });

  await prisma.promotion.create({
    data: {
      name: "Haunted House Collection",
      code: "HAUNTED15",
      description: "15% off all decorations",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 15,
      startDate: new Date("2025-10-01T00:00:00Z"),
      endDate: new Date("2025-11-01T00:00:00Z"),
      isActive: true,
    },
  });

  await prisma.promotion.create({
    data: {
      name: "Last Minute Halloween",
      code: "LASTMIN30",
      description: "30% off for last-minute shoppers",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 30,
      startDate: new Date("2025-10-28T00:00:00Z"),
      endDate: new Date("2025-10-31T23:59:59Z"),
      isActive: false,
    },
  });
  console.log("✅ 4 promotions created");

  // ── FAQ ──────────────────────────────────────────────────────────────────────
  const faqItems = [
    { question: "How do I place an order?", answer: "Browse our collections, add items to your cart, and proceed to checkout.", category: "Orders", sortOrder: 1 },
    { question: "Can I cancel my order?", answer: "Orders can be cancelled within 24 hours of placement. Contact our team via the Contact page.", category: "Orders", sortOrder: 2 },
    { question: "How can I track my order?", answer: "Once shipped, you'll receive a confirmation email with your tracking number.", category: "Orders", sortOrder: 3 },
    { question: "How long does shipping take?", answer: "Standard shipping takes 5–7 business days. Express shipping is 2–3 business days.", category: "Shipping", sortOrder: 1 },
    { question: "Do you ship internationally?", answer: "Yes! We ship to most countries worldwide. International delivery typically takes 10–15 business days.", category: "Shipping", sortOrder: 2 },
    { question: "What is your return policy?", answer: "We accept returns within 30 days of delivery for items in their original condition.", category: "Returns", sortOrder: 1 },
    { question: "What payment methods do you accept?", answer: "We accept major credit/debit cards and digital payment options. All payments are processed securely.", category: "Payments", sortOrder: 1 },
    { question: "Do I need an account to purchase?", answer: "No, you can check out as a guest. However, an account lets you track orders and save your wishlist.", category: "Account", sortOrder: 1 },
    { question: "I forgot my password. What do I do?", answer: "Click 'Forgot Password' on the login page. We'll send a reset link to your email.", category: "Account", sortOrder: 2 },
    { question: "Are the costumes true to size?", answer: "Each product page includes a detailed size guide. When in doubt, size up for layered costumes.", category: "Products", sortOrder: 1 },
  ];

  await prisma.faqItem.createMany({ data: faqItems });
  console.log("✅ FAQ items created");

  // ── SITE PAGES ───────────────────────────────────────────────────────────────
  await prisma.sitePage.createMany({
    data: [
      { slug: "about", title: "About Us", content: "Our story content managed via admin.", isPublished: true },
      { slug: "shipping", title: "Shipping Information", content: "Shipping policy content managed via admin.", isPublished: true },
      { slug: "returns", title: "Returns & Refunds", content: "Returns policy content managed via admin.", isPublished: true },
      { slug: "privacy", title: "Privacy Policy", content: "Privacy policy content managed via admin.", isPublished: true },
      { slug: "terms", title: "Terms & Conditions", content: "Terms and conditions content managed via admin.", isPublished: true },
    ],
  });
  console.log("✅ Site pages created");

  console.log("\n🎃 Seed complete! Database is ready for Halloween.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
