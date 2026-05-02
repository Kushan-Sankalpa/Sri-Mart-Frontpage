import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product, formatLKR } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { add } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-card">
      <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-white">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-smooth duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase text-primary">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 min-h-[42px] text-sm font-semibold leading-snug line-clamp-2 transition-smooth hover:text-primary md:text-[15px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 text-xs font-medium text-muted-foreground">
          {outOfStock ? "Out of stock" : `${product.stock} in stock`}
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <p className="text-base font-bold leading-tight text-secondary">{formatLKR(product.price)}</p>
          <button
            disabled={outOfStock}
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success("Added to cart", { description: product.name });
            }}
            className="mt-3 flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary-glow hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
