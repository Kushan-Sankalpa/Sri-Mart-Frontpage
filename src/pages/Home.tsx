import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BannerSlider from "@/components/BannerSlider";
import ProductSlider from "@/components/ProductSlider";
import CategoryTabs from "@/components/CategoryTabs";
import VideoSection from "@/components/VideoSection";
import PromoBanner from "@/components/PromoBanner";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { products, getByCategory } from "@/data/products";
import bannerChoc from "@/assets/images/banner-chocolate.jpg";
import bannerShoes from "@/assets/images/banner-shoes.jpg";
import bannerCosm from "@/assets/images/banner-cosmetics.jpg";

const SectionHeader = ({ title, subtitle, link }: { title: string; subtitle?: string; link?: { to: string; label: string } }) => (
  <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
    <div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-2 text-base">{subtitle}</p>}
    </div>
    {link && (
      <Link to={link.to} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
        {link.label} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

const Home = () => {
  const featured = useMemo(() => {
    // mix from all categories
    return [
      ...getByCategory("mobile-phones").slice(0, 3),
      ...getByCategory("chocolates").slice(0, 3),
      ...getByCategory("shoes").slice(0, 3),
      ...getByCategory("cosmetics").slice(0, 3),
    ];
  }, []);

  const phones = getByCategory("mobile-phones");
  const phonesNew = phones.filter((p) => p.condition === "Brand New");
  const phonesUsed = phones.filter((p) => p.condition === "Used");
  const [phoneTab, setPhoneTab] = useState("Brand New");

  const chocs = getByCategory("chocolates");
  const chocBrands = ["KitKat", "Kinder", "Cadbury", "Toblerone"];
  const [chocBrand, setChocBrand] = useState(chocBrands[0]);

  const shoes = getByCategory("shoes");
  const shoeBrands = ["Nike", "Adidas", "Puma", "Converse"];
  const [shoeBrand, setShoeBrand] = useState(shoeBrands[0]);

  const cosms = getByCategory("cosmetics");
  const cosmBrands = ["Maybelline", "L'Oréal", "Lakmé", "Garnier"];
  const [cosmBrand, setCosmBrand] = useState(cosmBrands[0]);

  return (
    <div>
      <BannerSlider />

      {/* Most selling */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-stretch">
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-8 md:p-10 text-primary-foreground flex flex-col justify-between min-h-[320px] shadow-elegant">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-bold opacity-80 mb-3">Best Sellers</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Most Selling Products</h2>
              <p className="mt-3 text-sm md:text-base opacity-90">Top picks loved by Egmart customers across every category.</p>
            </div>
            <Button asChild variant="dark" size="lg" className="self-start mt-8 rounded-full">
              <Link to="/products">Shop Now</Link>
            </Button>
            <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5" />
          </div>
          <div className="min-w-0">
            <ProductSlider products={featured} />
          </div>
        </div>
      </section>

      {/* Mobile phones */}
      <section className="container mx-auto px-4 py-12">
        <SectionHeader title="Latest Mobile Phones" subtitle="Brand new flagships and certified used deals." link={{ to: "/category/mobile-phones", label: "View all" }} />
        <div className="mb-8">
          <CategoryTabs tabs={["Brand New", "Used"]} active={phoneTab} onChange={setPhoneTab} />
        </div>
        <ProductGrid products={(phoneTab === "Brand New" ? phonesNew : phonesUsed).slice(0, 8)} />
      </section>

      <VideoSection />

      <PromoBanner
        image={bannerChoc}
        eyebrow="Sweet Moments"
        title="Premium Chocolates, Crafted to Delight."
        subtitle="Shop your favourite chocolate brands — delivered fresh."
        cta="Shop Chocolates"
        link="/category/chocolates"
      />

      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="Premium Chocolates" subtitle="Indulge in the world's most loved chocolate brands." link={{ to: "/category/chocolates", label: "View all" }} />
        <div className="mb-8">
          <CategoryTabs tabs={chocBrands} active={chocBrand} onChange={setChocBrand} />
        </div>
        <ProductGrid products={chocs.filter((p) => p.brand === chocBrand).slice(0, 4)} />
      </section>

      <PromoBanner
        image={bannerShoes}
        eyebrow="Step Into Style"
        title="Trending Shoes For Every Day."
        subtitle="From streetwear icons to performance runners — built for you."
        cta="Shop Shoes"
        link="/category/shoes"
        align="right"
      />

      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="Trending Shoes" subtitle="Iconic silhouettes and performance favourites." link={{ to: "/category/shoes", label: "View all" }} />
        <div className="mb-8">
          <CategoryTabs tabs={shoeBrands} active={shoeBrand} onChange={setShoeBrand} />
        </div>
        <ProductGrid products={shoes.filter((p) => p.brand === shoeBrand).slice(0, 4)} />
      </section>

      <PromoBanner
        image={bannerCosm}
        eyebrow="Glow With Confidence"
        title="Cosmetics Selected For Your Style."
        subtitle="Beauty essentials hand-picked from the world's top brands."
        cta="Shop Cosmetics"
        link="/category/cosmetics"
        align="right"
      />

      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="Beauty & Cosmetics" subtitle="Everyday essentials and luxury beauty in one place." link={{ to: "/category/cosmetics", label: "View all" }} />
        <div className="mb-8">
          <CategoryTabs tabs={cosmBrands} active={cosmBrand} onChange={setCosmBrand} />
        </div>
        <ProductGrid products={cosms.filter((p) => p.brand === cosmBrand).slice(0, 4)} />
      </section>
    </div>
  );
};

export default Home;
