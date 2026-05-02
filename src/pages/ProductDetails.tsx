import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star, Truck, RotateCcw, ShieldCheck, Phone } from "lucide-react";
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

  return (
    <div className="container mx-auto px-4 py-10">
      <nav className="text-xs text-muted-foreground mb-6 flex flex-wrap gap-1">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-primary">
          {categoryLabels[product.category]}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">· {product.stock} in stock</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-bold text-primary">{formatLKR(product.price)}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-muted font-medium">Category: {categoryLabels[product.category]}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-muted font-medium">Brand: {product.brand}</span>
            {product.condition && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">{product.condition}</span>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.sizes && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button key={s} className="px-4 py-2 border-2 border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-smooth">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border-2 border-border rounded-full overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 flex items-center justify-center hover:bg-muted">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 flex items-center justify-center hover:bg-muted">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={() => {
                add(product, qty);
                toast.success("Added to cart", { description: `${qty} × ${product.name}` });
              }}
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>
          <Button asChild variant="outline" size="lg" className="mt-3 w-full rounded-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <Link to="/contact"><Phone className="h-4 w-4" /> Contact Us</Link>
          </Button>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Island-wide 1-3 days" },
              { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free" },
              { icon: ShieldCheck, title: "100% Authentic", desc: "Egmart guaranteed" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-muted">
                <item.icon className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-5">Specifications</h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specifications).map(([k, v], i) => (
                <tr key={k} className={i % 2 === 0 ? "bg-muted/40" : ""}>
                  <td className="px-5 py-3 font-semibold w-1/3">{k}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">You May Also Like</h2>
          <ProductSlider products={related} />
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
