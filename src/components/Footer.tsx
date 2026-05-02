import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Logo className="mb-5 h-20 w-auto max-w-[220px]" variant="white" />
          <p className="max-w-sm text-sm leading-6 text-secondary-foreground/70">
            Egmart brings phones, chocolates, shoes, and cosmetics together in one smooth shopping experience.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-smooth hover:border-primary hover:bg-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-base font-bold">Quick Links</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li><Link to="/" className="transition-smooth hover:text-primary">Home</Link></li>
            <li><Link to="/products" className="transition-smooth hover:text-primary">All Products</Link></li>
            <li><Link to="/cart" className="transition-smooth hover:text-primary">Cart</Link></li>
            <li><Link to="/contact" className="transition-smooth hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-base font-bold">Categories</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li><Link to="/category/mobile-phones" className="transition-smooth hover:text-primary">Mobile Phones</Link></li>
            <li><Link to="/category/chocolates" className="transition-smooth hover:text-primary">Chocolates</Link></li>
            <li><Link to="/category/shoes" className="transition-smooth hover:text-primary">Shoes</Link></li>
            <li><Link to="/category/cosmetics" className="transition-smooth hover:text-primary">Cosmetics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-base font-bold">Contact</h4>
          <ul className="space-y-4 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Colombo, Sri Lanka</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-primary" /> +94 77 123 4567</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-primary" /> hello@egmart.lk</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-secondary-foreground/60">
          Copyright {new Date().getFullYear()} Egmart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
