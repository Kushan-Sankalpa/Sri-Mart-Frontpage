import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/images/hero-1.jpg";
import hero2 from "@/assets/images/hero-2.jpg";
import hero3 from "@/assets/images/hero-3.jpg";
import hero4 from "@/assets/images/hero-4.jpg";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  textSide?: "left" | "right";
}

const slides: Slide[] = [
  {
    image: hero1,
    eyebrow: "Egmart Mega Sale",
    title: "Everything You Love. One Stylish Mart.",
    subtitle: "Phones, chocolates, shoes and cosmetics - handpicked at sharp prices.",
    ctaText: "Shop All Products",
    ctaLink: "/products",
  },
  {
    image: hero2,
    eyebrow: "Smartphone Deals",
    title: "Flagship Phones, Unbeatable Prices.",
    subtitle: "iPhone, Samsung, Pixel and more - brand new and certified used.",
    ctaText: "Explore Phones",
    ctaLink: "/category/mobile-phones",
  },
  {
    image: hero3,
    eyebrow: "Sweet Indulgence",
    title: "Premium Chocolates & Gift Treats.",
    subtitle: "KitKat, Kinder, Cadbury and Toblerone for every moment.",
    ctaText: "Shop Chocolates",
    ctaLink: "/category/chocolates",
  },
  {
    image: hero4,
    eyebrow: "Lifestyle Essentials",
    title: "Step Up Your Style. Glow Every Day.",
    subtitle: "Trending shoes and beauty cosmetics for a sharper everyday look.",
    ctaText: "Discover More",
    ctaLink: "/category/shoes",
    textSide: "right",
  },
];

const BannerSlider = () => {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => setI((x) => (x + 1) % slides.length), 5500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="relative h-[470px] md:h-[560px] lg:h-[620px]">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          >
            <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
            <div
              className={`absolute inset-0 ${
                s.textSide === "right"
                  ? "bg-gradient-to-l from-white/95 via-white/75 to-white/10"
                  : "bg-gradient-to-r from-white/95 via-white/75 to-white/10"
              }`}
            />
            <div className="container relative mx-auto flex h-full items-center px-6">
              <div
                className={`max-w-xl ${s.textSide === "right" ? "ml-auto text-right" : ""} ${
                  idx === i ? "animate-fade-in-up" : ""
                }`}
              >
                <div className={`mb-5 flex items-center gap-3 ${s.textSide === "right" ? "justify-end" : ""}`}>
                  <Logo className="h-10 w-auto max-w-[120px]" />
                  <span className="text-[11px] font-bold uppercase text-primary">{s.eyebrow}</span>
                </div>
                <h1 className="text-4xl font-bold leading-[1.05] text-secondary md:text-5xl lg:text-6xl">
                  {s.title}
                </h1>
                <p className={`mt-5 text-base text-secondary/80 md:text-lg ${s.textSide === "right" ? "ml-auto" : ""} max-w-md`}>
                  {s.subtitle}
                </p>
                <div className={`mt-8 flex flex-wrap gap-3 ${s.textSide === "right" ? "justify-end" : ""}`}>
                  <Button asChild variant="hero" size="lg">
                    <Link to={s.ctaLink}>{s.ctaText}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => go(i - 1)}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-card backdrop-blur transition-smooth hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(i + 1)}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-card backdrop-blur transition-smooth hover:bg-primary hover:text-primary-foreground md:h-12 md:w-12"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            className={`h-2 rounded-full transition-smooth ${idx === i ? "w-8 bg-primary" : "w-2 bg-secondary/40 hover:bg-secondary"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
