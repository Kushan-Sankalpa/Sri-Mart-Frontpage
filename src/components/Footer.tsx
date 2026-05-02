import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-16 grid gap-12 lg:grid-cols-4 md:grid-cols-2">
        <div>
          <Logo className="h-14 w-auto mb-5" variant="white" />
          <p className="text-sm text-secondary-foreground/70 leading-relaxed">
            Egmart by Yazz brings phones, chocolates, shoes, and cosmetics together in one stylish shopping experience.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-smooth"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-base">Quick Links</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li><Link to="/" className="hover:text-primary transition-smooth">Home</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-smooth">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-primary transition-smooth">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-base">Categories</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li><Link to="/category/mobile-phones" className="hover:text-primary transition-smooth">Mobile Phones</Link></li>
            <li><Link to="/category/chocolates" className="hover:text-primary transition-smooth">Chocolates</Link></li>
            <li><Link to="/category/shoes" className="hover:text-primary transition-smooth">Shoes</Link></li>
            <li><Link to="/category/cosmetics" className="hover:text-primary transition-smooth">Cosmetics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-base">Contact</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Colombo, Sri Lanka</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary shrink-0" /> +94 77 123 4567</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary shrink-0" /> hello@egmart.lk</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-secondary-foreground/60">
          © {new Date().getFullYear()} Egmart by Yazz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
