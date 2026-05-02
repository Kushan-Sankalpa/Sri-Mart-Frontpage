// Sample product catalog for Egmart
import phone1 from "@/assets/images/products/phone-1.jpg";
import phone2 from "@/assets/images/products/phone-2.jpg";
import phone3 from "@/assets/images/products/phone-3.jpg";
import phone4 from "@/assets/images/products/phone-4.jpg";
import choc1 from "@/assets/images/products/choc-1.jpg";
import choc2 from "@/assets/images/products/choc-2.jpg";
import choc3 from "@/assets/images/products/choc-3.jpg";
import choc4 from "@/assets/images/products/choc-4.jpg";
import shoe1 from "@/assets/images/products/shoe-1.jpg";
import shoe2 from "@/assets/images/products/shoe-2.jpg";
import shoe3 from "@/assets/images/products/shoe-3.jpg";
import shoe4 from "@/assets/images/products/shoe-4.jpg";
import cosm1 from "@/assets/images/products/cosm-1.jpg";
import cosm2 from "@/assets/images/products/cosm-2.jpg";
import cosm3 from "@/assets/images/products/cosm-3.jpg";
import cosm4 from "@/assets/images/products/cosm-4.jpg";

export type Condition = "Brand New" | "Used";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "mobile-phones" | "chocolates" | "shoes" | "cosmetics";
  brand: string;
  condition?: Condition;
  price: number;
  stock: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  sizes?: string[];
}

const phoneImgs = [phone1, phone2, phone3, phone4];
const chocImgs = [choc1, choc2, choc3, choc4];
const shoeImgs = [shoe1, shoe2, shoe3, shoe4];
const cosmImgs = [cosm1, cosm2, cosm3, cosm4];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const phoneSeed: Array<{ name: string; brand: string; price: number; condition: Condition }> = [
  { name: "iPhone 15 Pro Max 256GB", brand: "Apple", price: 485000, condition: "Brand New" },
  { name: "iPhone 15 128GB", brand: "Apple", price: 320000, condition: "Brand New" },
  { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 410000, condition: "Brand New" },
  { name: "Samsung Galaxy A55 5G", brand: "Samsung", price: 145000, condition: "Brand New" },
  { name: "Google Pixel 8 Pro", brand: "Google Pixel", price: 295000, condition: "Brand New" },
  { name: "Redmi Note 13 Pro+", brand: "Redmi", price: 98500, condition: "Brand New" },
  { name: "Oppo Reno 11 Pro 5G", brand: "Oppo", price: 132000, condition: "Brand New" },
  { name: "Vivo V30 Pro", brand: "Vivo", price: 158000, condition: "Brand New" },
  { name: "iPhone 13 Pro 128GB", brand: "Apple", price: 215000, condition: "Used" },
  { name: "iPhone 12 64GB", brand: "Apple", price: 145000, condition: "Used" },
  { name: "Samsung Galaxy S22 Ultra", brand: "Samsung", price: 185000, condition: "Used" },
  { name: "Samsung Galaxy Note 20", brand: "Samsung", price: 110000, condition: "Used" },
  { name: "Google Pixel 7", brand: "Google Pixel", price: 125000, condition: "Used" },
  { name: "Redmi Note 11 Pro", brand: "Redmi", price: 52000, condition: "Used" },
  { name: "Oppo Find X5", brand: "Oppo", price: 95000, condition: "Used" },
  { name: "Vivo X80", brand: "Vivo", price: 89000, condition: "Used" },
];

const chocSeed: Array<{ name: string; brand: string; price: number }> = [
  { name: "KitKat Chunky Milk", brand: "KitKat", price: 850 },
  { name: "KitKat 4-Finger Dark", brand: "KitKat", price: 720 },
  { name: "KitKat Cookies & Cream", brand: "KitKat", price: 950 },
  { name: "KitKat Senses Pralines", brand: "KitKat", price: 2200 },
  { name: "Kinder Bueno Classic", brand: "Kinder", price: 680 },
  { name: "Kinder Chocolate Bars 8pk", brand: "Kinder", price: 1450 },
  { name: "Kinder Surprise Egg", brand: "Kinder", price: 520 },
  { name: "Kinder Happy Hippo", brand: "Kinder", price: 780 },
  { name: "Cadbury Dairy Milk Silk", brand: "Cadbury", price: 1280 },
  { name: "Cadbury Bournville Dark", brand: "Cadbury", price: 1150 },
  { name: "Cadbury Roses Tin 600g", brand: "Cadbury", price: 4850 },
  { name: "Cadbury Fruit & Nut", brand: "Cadbury", price: 980 },
  { name: "Toblerone Milk 360g", brand: "Toblerone", price: 2480 },
  { name: "Toblerone Dark 100g", brand: "Toblerone", price: 950 },
  { name: "Toblerone White 100g", brand: "Toblerone", price: 980 },
  { name: "Toblerone Tiny Pouch", brand: "Toblerone", price: 1750 },
];

const shoeSeed: Array<{ name: string; brand: string; price: number }> = [
  { name: "Nike Air Max 270", brand: "Nike", price: 38500 },
  { name: "Nike Pegasus 40", brand: "Nike", price: 42000 },
  { name: "Nike Dunk Low Retro", brand: "Nike", price: 36000 },
  { name: "Nike Revolution 7", brand: "Nike", price: 22500 },
  { name: "Adidas Ultraboost 22", brand: "Adidas", price: 48500 },
  { name: "Adidas Samba OG", brand: "Adidas", price: 32000 },
  { name: "Adidas Stan Smith", brand: "Adidas", price: 28500 },
  { name: "Adidas Forum Low", brand: "Adidas", price: 26000 },
  { name: "Puma RS-X Reinvent", brand: "Puma", price: 24500 },
  { name: "Puma Suede Classic", brand: "Puma", price: 19500 },
  { name: "Puma Future Rider", brand: "Puma", price: 21500 },
  { name: "Puma Cali Star", brand: "Puma", price: 23000 },
  { name: "Converse Chuck 70 High", brand: "Converse", price: 18500 },
  { name: "Converse All Star Low", brand: "Converse", price: 14500 },
  { name: "Converse Run Star Hike", brand: "Converse", price: 26500 },
  { name: "Converse One Star Pro", brand: "Converse", price: 19800 },
];

const cosmSeed: Array<{ name: string; brand: string; price: number }> = [
  { name: "Maybelline SuperStay Matte Ink", brand: "Maybelline", price: 3850 },
  { name: "Maybelline Fit Me Foundation", brand: "Maybelline", price: 4250 },
  { name: "Maybelline Lash Sensational Mascara", brand: "Maybelline", price: 3450 },
  { name: "Maybelline Master Chrome Highlighter", brand: "Maybelline", price: 2950 },
  { name: "L'Oreal Infallible 24H Foundation", brand: "L'Oreal", price: 5850 },
  { name: "L'Oreal Color Riche Lipstick", brand: "L'Oreal", price: 3650 },
  { name: "L'Oreal Voluminous Mascara", brand: "L'Oreal", price: 3950 },
  { name: "L'Oreal La Palette Nude", brand: "L'Oreal", price: 6850 },
  { name: "Lakme Absolute Perfect Radiance", brand: "Lakme", price: 2950 },
  { name: "Lakme 9 to 5 Lipstick", brand: "Lakme", price: 1850 },
  { name: "Lakme Eyeconic Kajal", brand: "Lakme", price: 950 },
  { name: "Lakme Sun Expert SPF 50", brand: "Lakme", price: 1750 },
  { name: "Garnier BB Cream Miracle Skin", brand: "Garnier", price: 2450 },
  { name: "Garnier Micellar Cleansing Water", brand: "Garnier", price: 1950 },
  { name: "Garnier Skin Naturals Serum", brand: "Garnier", price: 2850 },
  { name: "Garnier Fructis Hair Mask", brand: "Garnier", price: 1450 },
];

const buildProducts = (): Product[] => {
  const out: Product[] = [];

  phoneSeed.forEach((p, i) => {
    const img = phoneImgs[i % 4];
    out.push({
      id: `phone-${i + 1}`,
      name: p.name,
      slug: slugify(p.name) + `-${i + 1}`,
      category: "mobile-phones",
      brand: p.brand,
      condition: p.condition,
      price: p.price,
      stock: 5 + ((i * 7) % 20),
      images: [img, phoneImgs[(i + 1) % 4], phoneImgs[(i + 2) % 4]],
      description: `Experience next-level performance with the ${p.name}. Stunning display, flagship cameras, and all-day battery life - backed by Egmart's authenticity guarantee.`,
      specifications: {
        Display: '6.7" OLED 120Hz',
        Storage: i % 2 === 0 ? "256GB" : "128GB",
        RAM: "8GB",
        Battery: "4500 mAh",
        Camera: "50MP Triple",
        Warranty: p.condition === "Brand New" ? "1 Year Official" : "3 Months Shop",
      },
    });
  });

  chocSeed.forEach((p, i) => {
    const img = chocImgs[i % 4];
    out.push({
      id: `choc-${i + 1}`,
      name: p.name,
      slug: slugify(p.name) + `-${i + 1}`,
      category: "chocolates",
      brand: p.brand,
      price: p.price,
      stock: 25 + ((i * 11) % 60),
      images: [img, chocImgs[(i + 1) % 4], chocImgs[(i + 2) % 4]],
      description: `Indulge in the rich, velvety taste of ${p.name}. Premium ingredients, perfect for gifting or treating yourself.`,
      specifications: { Brand: p.brand, Type: "Chocolate", Origin: "Imported", Storage: "Cool & Dry Place" },
    });
  });

  shoeSeed.forEach((p, i) => {
    const img = shoeImgs[i % 4];
    out.push({
      id: `shoe-${i + 1}`,
      name: p.name,
      slug: slugify(p.name) + `-${i + 1}`,
      category: "shoes",
      brand: p.brand,
      price: p.price,
      stock: 8 + ((i * 5) % 25),
      images: [img, shoeImgs[(i + 1) % 4], shoeImgs[(i + 2) % 4]],
      description: `Step out in style with the ${p.name}. Comfort-first cushioning, durable build, and a silhouette designed to turn heads.`,
      specifications: { Brand: p.brand, Material: "Mesh & Leather", Sole: "Rubber", Closure: "Lace-up" },
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    });
  });

  cosmSeed.forEach((p, i) => {
    const img = cosmImgs[i % 4];
    out.push({
      id: `cosm-${i + 1}`,
      name: p.name,
      slug: slugify(p.name) + `-${i + 1}`,
      category: "cosmetics",
      brand: p.brand,
      price: p.price,
      stock: 15 + ((i * 6) % 35),
      images: [img, cosmImgs[(i + 1) % 4], cosmImgs[(i + 2) % 4]],
      description: `Reveal your best look with ${p.name}. Long-wearing, skin-friendly, and crafted for everyday confidence.`,
      specifications: { Brand: p.brand, Type: "Cosmetic", Skin: "All Types", Cruelty: "Not on animals" },
    });
  });

  return out;
};

export const products: Product[] = buildProducts();

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getByCategory = (cat: Product["category"]) => products.filter((p) => p.category === cat);

export const formatLKR = (n: number) => `LKR ${n.toLocaleString("en-LK")}`;

export const categoryLabels: Record<Product["category"], string> = {
  "mobile-phones": "Mobile Phones",
  "chocolates": "Chocolates",
  "shoes": "Shoes",
  "cosmetics": "Cosmetics",
};
