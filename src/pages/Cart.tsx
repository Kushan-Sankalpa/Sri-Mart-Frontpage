import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatLKR } from "@/data/products";
import { toast } from "sonner";

const Cart = () => {
  const { items, setQty, remove, total, clear } = useCart();

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="h-24 w-24 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Discover our latest products and start shopping.</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4 shadow-soft">
              <Link to={`/product/${product.slug}`} className="h-24 w-24 md:h-28 md:w-28 bg-white rounded-lg overflow-hidden shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-2" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-[11px] uppercase text-muted-foreground font-medium">{product.brand}</p>
                <Link to={`/product/${product.slug}`} className="font-semibold hover:text-primary line-clamp-2">{product.name}</Link>
                <p className="text-sm font-bold text-primary mt-1">{formatLKR(product.price)}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex items-center border border-border rounded-full overflow-hidden">
                    <button onClick={() => setQty(product.id, qty - 1)} className="h-9 w-9 flex items-center justify-center hover:bg-muted">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold">{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-muted">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => { remove(product.id); toast.success("Removed from cart"); }}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
              <div className="hidden md:block text-right shrink-0">
                <p className="text-xs text-muted-foreground">Subtotal</p>
                <p className="font-bold">{formatLKR(product.price * qty)}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-card border border-border rounded-lg p-6 h-fit shadow-card sticky top-28">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatLKR(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-base">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary text-xl">{formatLKR(total)}</span>
            </div>
          </div>
          <Button variant="hero" size="lg" className="w-full mt-6" onClick={() => toast.info("Checkout coming soon")}>
            Proceed to Checkout
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full mt-3 rounded-full">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-primary mt-4 uppercase font-bold">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
