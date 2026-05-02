import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

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

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      nav(`/products?q=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setQ("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-6">
        <Link to="/" className="flex items-center shrink-0">
          <Logo className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-smooth hover:text-primary relative py-2 ${
                  isActive ? "text-primary" : "text-foreground"
                } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all ${
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
            className="p-2.5 rounded-full hover:bg-muted transition-smooth"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="p-2.5 rounded-full hover:bg-muted transition-smooth relative"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2.5 rounded-full hover:bg-muted transition-smooth"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background animate-fade-in-up">
          <form onSubmit={onSearch} className="container mx-auto px-4 py-4 flex gap-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search phones, chocolates, shoes, cosmetics..."
              className="flex-1 bg-muted rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" variant="hero">Search</Button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-elegant p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <Logo className="h-10 w-auto" />
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
