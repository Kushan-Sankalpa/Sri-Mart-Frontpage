import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Truck, RotateCcw, ShieldCheck, Phone } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import ProductSlider from "@/components/ProductSlider";
import { Button } from "@/components/ui/button";
import { getProductBySlug, products, formatLKR, categoryLabels } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/products" replace />;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);
  const outOfStock = product.stock === 0;
  const maxQty = Math.max(1, product.stock);

  return (
    <div className="container mx-auto px-4 py-10">
      <nav className="mb-6 flex flex-wrap gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-primary">
          {categoryLabels[product.category]}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs font-bold uppercase text-primary">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{outOfStock ? "Out of stock" : `${product.stock} in stock`}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">Brand: {product.brand}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">Category: {categoryLabels[product.category]}</span>
            {product.condition && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{product.condition}</span>
            )}
          </div>

          <div className="mt-6">
            <p className="text-4xl font-bold text-primary">{formatLKR(product.price)}</p>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          {product.sizes && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} className="rounded-lg border-2 border-border px-4 py-2 text-sm font-medium transition-smooth hover:border-primary hover:text-primary">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex w-max items-center overflow-hidden rounded-full border-2 border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-muted disabled:opacity-40"
                disabled={outOfStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-muted disabled:opacity-40"
                disabled={outOfStock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              disabled={outOfStock}
              onClick={() => {
                add(product, qty);
                toast.success("Added to cart", { description: `${qty} x ${product.name}` });
              }}
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <Button asChild variant="outline" size="lg" className="mt-3 w-full rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <Link to="/contact"><Phone className="h-4 w-4" /> Contact Us</Link>
          </Button>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Island-wide 1-3 days" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free" },
              { icon: ShieldCheck, title: "100% Authentic", desc: "Egmart guaranteed" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg bg-muted p-4">
                <item.icon className="mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-5 text-2xl font-bold">Specifications</h2>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specifications).map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? "bg-muted/40" : ""}>
                  <td className="w-1/3 px-5 py-3 font-semibold">{k}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">You May Also Like</h2>
          <ProductSlider products={related} />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
