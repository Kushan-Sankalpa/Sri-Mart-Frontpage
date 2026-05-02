import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No products match your filters.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
