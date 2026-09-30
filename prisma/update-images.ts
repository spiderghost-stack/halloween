import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const REAL_IMAGES = [
  "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1604145958742-0fbc4a3c3c72?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572804013309-8c985075677d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572402235948-4cd73ed6473f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1476829774643-98282bdce7e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534062483863-127e2202613d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1603504176461-9f939eecdfa7?auto=format&fit=crop&w=800&q=80"
];

async function updateImages() {
  const images = await prisma.productImage.findMany();
  
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const realImageUrl = REAL_IMAGES[i % REAL_IMAGES.length];
    
    await prisma.productImage.update({
      where: { id: img.id },
      data: { imageUrl: realImageUrl }
    });
  }
  
  console.log(`✅ Updated ${images.length} product images with real Unsplash images.`);
}

updateImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
