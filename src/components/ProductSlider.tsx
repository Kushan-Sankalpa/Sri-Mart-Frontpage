import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductSlider = ({ products }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * (ref.current.offsetWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[230px] md:w-[260px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background shadow-card items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth z-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background shadow-card items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth z-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ProductSlider;
