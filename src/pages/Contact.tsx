import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs uppercase text-primary font-bold mb-3">Get in touch</p>
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>
          <p className="mt-4 max-w-xl mx-auto text-secondary-foreground/70">
            Questions about a product, an order, or a partnership? We're here to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[400px_1fr] gap-10">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Visit us", value: "123 Galle Road, Colombo 03, Sri Lanka" },
            { icon: Phone, title: "Call us", value: "+94 77 123 4567" },
            { icon: Mail, title: "Email us", value: "hello@egmart.lk" },
          ].map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-lg p-6 shadow-soft flex gap-4">
              <div className="h-12 w-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-bold">{c.title}</p>
                <p className="font-semibold mt-1">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="bg-card border border-border rounded-lg p-6 md:p-10 shadow-card space-y-5">
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold mb-2 block">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Subject</label>
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Message</label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <Button type="submit" variant="hero" size="lg">
            <Send className="h-4 w-4" /> Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
