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
import { getByCategory } from "@/data/products";
import bannerChoc from "@/assets/images/banner-chocolate.jpg";
import bannerShoes from "@/assets/images/banner-shoes.jpg";
import bannerCosm from "@/assets/images/banner-cosmetics.jpg";

const SectionHeader = ({ title, subtitle, link }: { title: string; subtitle?: string; link?: { to: string; label: string } }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h2 className="text-3xl font-bold text-secondary md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-base text-muted-foreground">{subtitle}</p>}
    </div>
    {link && (
      <Link to={link.to} className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
        {link.label} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

const Home = () => {
  const featured = useMemo(() => {
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
  const cosmBrands = ["Maybelline", "L'Oreal", "Lakme", "Garnier"];
  const [cosmBrand, setCosmBrand] = useState(cosmBrands[0]);

  return (
    <div>
      <BannerSlider />

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container mx-auto grid items-stretch gap-6 px-4 lg:grid-cols-[330px_1fr] lg:gap-8">
          <div className="flex min-h-[320px] flex-col justify-between rounded-lg bg-secondary p-8 text-secondary-foreground shadow-card md:p-10">
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-primary">Best Sellers</p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">Most Selling Products</h2>
              <p className="mt-3 text-sm leading-6 text-secondary-foreground/75 md:text-base">
                Top picks loved by Egmart customers across phones, chocolates, shoes, and cosmetics.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="mt-8 self-start">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="min-w-0">
            <ProductSlider products={featured} />
          </div>
        </div>
      </section>

      <VideoSection />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeader title="Latest Mobile Phones" subtitle="Brand new flagships and certified used deals." link={{ to: "/category/mobile-phones", label: "View all" }} />
        <div className="mb-8">
          <CategoryTabs tabs={["Brand New", "Used"]} active={phoneTab} onChange={setPhoneTab} />
        </div>
        <ProductGrid products={(phoneTab === "Brand New" ? phonesNew : phonesUsed).slice(0, 8)} />
      </section>

      <PromoBanner
        image={bannerChoc}
        eyebrow="Sweet Moments"
        title="Premium Chocolates, Crafted to Delight."
        subtitle="Shop your favourite chocolate brands - delivered fresh."
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
        subtitle="From streetwear icons to performance runners - built for you."
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
