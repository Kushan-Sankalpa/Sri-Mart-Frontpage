import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product, formatLKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { add } = useCart();
  const [fav, setFav] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <article className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-smooth hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-smooth duration-500"
        />
        {product.condition && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              product.condition === "Brand New"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {product.condition}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setFav((f) => !f);
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
          aria-label="Wishlist"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : ""}`} />
        </button>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm md:text-[15px] mt-1 line-clamp-2 hover:text-primary transition-smooth min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">· {outOfStock ? "Out of stock" : `${product.stock} in stock`}</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2 pt-3 border-t border-border mt-auto">
          <div>
            <p className="font-bold text-base text-secondary leading-tight">{formatLKR(product.price)}</p>
          </div>
          <button
            disabled={outOfStock}
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success("Added to cart", { description: product.name });
            }}
            className="h-10 w-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center hover:shadow-glow transition-smooth disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
