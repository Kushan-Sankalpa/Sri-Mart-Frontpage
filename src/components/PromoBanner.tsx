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
  <section className="relative h-[340px] w-full overflow-hidden md:h-[400px]">
    <img src={image} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    <div
      className={`absolute inset-0 ${
        align === "right"
          ? "bg-gradient-to-l from-white/95 via-white/65 to-transparent"
          : "bg-gradient-to-r from-secondary/95 via-secondary/55 to-transparent"
      }`}
    />
    <div className="container relative mx-auto flex h-full items-center px-6">
      <div className={`max-w-lg ${align === "right" ? "ml-auto text-right text-secondary" : "text-secondary-foreground"}`}>
        <div className={`mb-4 flex items-center gap-3 ${align === "right" ? "justify-end" : ""}`}>
          <Logo className="h-10 w-auto max-w-[120px]" variant={align === "right" ? "default" : "white"} />
          <span className="text-[11px] font-bold uppercase text-primary">{eyebrow}</span>
        </div>
        <h2 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
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
