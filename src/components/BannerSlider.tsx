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
    subtitle: "Phones, chocolates, shoes & cosmetics — handpicked at the best prices.",
    ctaText: "Shop All Products",
    ctaLink: "/products",
  },
  {
    image: hero2,
    eyebrow: "Smartphone Deals",
    title: "Flagship Phones, Unbeatable Prices.",
    subtitle: "iPhone, Samsung, Pixel & more — Brand new & certified used.",
    ctaText: "Explore Phones",
    ctaLink: "/category/mobile-phones",
  },
  {
    image: hero3,
    eyebrow: "Sweet Indulgence",
    title: "Premium Chocolates & Gift Treats.",
    subtitle: "KitKat · Kinder · Cadbury · Toblerone — perfect for every moment.",
    ctaText: "Shop Chocolates",
    ctaLink: "/category/chocolates",
  },
  {
    image: hero4,
    eyebrow: "Lifestyle Essentials",
    title: "Step Up Your Style. Glow Every Day.",
    subtitle: "Trending shoes & beauty cosmetics for the bold and beautiful.",
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
      <div className="relative h-[480px] md:h-[560px] lg:h-[640px]">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            <div
              className={`absolute inset-0 ${
                s.textSide === "right"
                  ? "bg-gradient-to-l from-white/95 via-white/70 to-transparent"
                  : "bg-gradient-to-r from-white/95 via-white/70 to-transparent"
              }`}
            />
            <div className="relative h-full container mx-auto px-6 flex items-center">
              <div
                className={`max-w-xl ${s.textSide === "right" ? "ml-auto text-right" : ""} ${
                  idx === i ? "animate-fade-in-up" : ""
                }`}
              >
                <div className={`flex items-center gap-3 mb-5 ${s.textSide === "right" ? "justify-end" : ""}`}>
                  <Logo className="h-8 w-auto" />
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary">{s.eyebrow}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-[1.05] tracking-tight">
                  {s.title}
                </h1>
                <p className="mt-5 text-base md:text-lg text-secondary/80 max-w-md">{s.subtitle}</p>
                <div className={`mt-8 flex gap-3 ${s.textSide === "right" ? "justify-end" : ""}`}>
                  <Button asChild variant="hero" size="lg">
                    <Link to={s.ctaLink}>{s.ctaText}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 md:h-12 md:w-12 rounded-full bg-background/90 backdrop-blur shadow-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(i + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 md:h-12 md:w-12 rounded-full bg-background/90 backdrop-blur shadow-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
