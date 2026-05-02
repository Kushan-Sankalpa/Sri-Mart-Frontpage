import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

interface Props {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  align?: "left" | "right";
}

const PromoBanner = ({ image, eyebrow, title, subtitle, cta, link, align = "left" }: Props) => (
  <section className="relative w-full h-[340px] md:h-[400px] overflow-hidden">
    <img src={image} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div
      className={`absolute inset-0 ${
        align === "right"
          ? "bg-gradient-to-l from-white/90 via-white/60 to-transparent"
          : "bg-gradient-to-r from-secondary/90 via-secondary/50 to-transparent"
      }`}
    />
    <div className="relative h-full container mx-auto px-6 flex items-center">
      <div className={`max-w-lg ${align === "right" ? "ml-auto text-right text-secondary" : "text-secondary-foreground"}`}>
        <div className={`flex items-center gap-3 mb-4 ${align === "right" ? "justify-end" : ""}`}>
          <Logo className="h-8 w-auto" variant={align === "right" ? "default" : "white"} />
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary">{eyebrow}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
        <p className={`mt-4 text-base md:text-lg ${align === "right" ? "text-secondary/70" : "text-secondary-foreground/80"}`}>
          {subtitle}
        </p>
        <div className={`mt-6 ${align === "right" ? "flex justify-end" : ""}`}>
          <Button asChild variant="hero" size="lg">
            <Link to={link}>{cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
