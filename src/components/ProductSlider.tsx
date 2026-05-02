import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductSlider = ({ products }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const getStep = useCallback(() => {
    const track = ref.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return 260;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }, []);

  const scroll = useCallback((dir: 1 | -1) => {
    const track = ref.current;
    if (!track) return;

    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const nearEnd = track.scrollLeft >= maxScroll - step / 2;
    const nextLeft = dir === 1 && nearEnd ? 0 : Math.max(0, track.scrollLeft + dir * step);

    track.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, [getStep]);

  useEffect(() => {
    if (paused || products.length <= 1) return undefined;

    const id = window.setInterval(() => scroll(1), 3200);
    return () => window.clearInterval(id);
  }, [paused, products.length, scroll]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide md:gap-5"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[225px] shrink-0 snap-start md:w-[260px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-card transition-smooth hover:bg-primary hover:text-primary-foreground md:flex"
        aria-label="Previous products"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-card transition-smooth hover:bg-primary hover:text-primary-foreground md:flex"
        aria-label="Next products"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSlider;
