import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { products, formatLKR } from "@/data/products";

const links = [
  { to: "/", label: "Home" },
  { to: "/category/mobile-phones", label: "Mobile Phones" },
  { to: "/category/chocolates", label: "Chocolates" },
  { to: "/category/shoes", label: "Shoes" },
  { to: "/category/cosmetics", label: "Cosmetics" },
  { to: "/products", label: "All Products" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];

    return products
      .filter((product) =>
        `${product.name} ${product.brand}`.toLowerCase().includes(query),
      )
      .slice(0, 6);
  }, [q]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQ("");
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      nav(`/products?q=${encodeURIComponent(query)}`);
      closeSearch();
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-soft backdrop-blur-md">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-16 w-auto max-w-[160px] sm:h-20 sm:max-w-[210px]" />
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition-smooth hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground"
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted transition-smooth"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted transition-smooth"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted transition-smooth xl:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background animate-fade-in-up">
          <form onSubmit={onSearch} className="container relative mx-auto flex gap-2 px-4 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by product name or brand..."
                className="w-full rounded-full bg-muted py-3 pl-11 pr-5 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[70] overflow-hidden rounded-lg border border-border bg-background shadow-card">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 hover:bg-muted"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white">
                        <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain p-1.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{product.name}</span>
                        <span className="block text-xs text-muted-foreground">{product.brand} - {formatLKR(product.price)}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" variant="hero">Search</Button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] xl:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col overflow-y-auto bg-background p-5 shadow-elegant animate-slide-in">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <Logo className="h-16 w-auto max-w-[170px]" />
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSearch} className="relative mt-5">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full bg-muted py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </form>

            {suggestions.length > 0 && (
              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background shadow-soft">
                {suggestions.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={() => {
                      closeSearch();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 hover:bg-muted"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white">
                      <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain p-1.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{product.name}</span>
                      <span className="block text-xs text-muted-foreground">{product.brand}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            <nav className="mt-6 flex flex-col gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base font-semibold transition-smooth ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/70 text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-between rounded-lg bg-secondary px-4 py-4 font-semibold text-secondary-foreground"
            >
              <span className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> View Cart</span>
              <span>{count}</span>
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
