import { useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Filter, X, Search } from "lucide-react";
import FilterSidebar, { Filters } from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { products, categoryLabels, Product } from "@/data/products";

const ProductListing = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const cat = (category as Product["category"] | undefined) || undefined;
  const maxPriceCap = useMemo(() => Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000, []);

  const [filters, setFilters] = useState<Filters>({
    brands: [],
    conditions: [],
    inStockOnly: false,
    priceMax: maxPriceCap,
    category: cat,
  });
  const [sort, setSort] = useState("relevance");
  const [search, setSearch] = useState(initialQ);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: cat }));
  }, [cat]);

  useEffect(() => {
    setSearch(initialQ);
  }, [initialQ]);

  const list = useMemo(() => {
    let r = products.slice();
    if (filters.category) r = r.filter((p) => p.category === filters.category);
    if (filters.brands.length) r = r.filter((p) => filters.brands.includes(p.brand));
    if (filters.conditions.length) r = r.filter((p) => p.condition && filters.conditions.includes(p.condition));
    if (filters.inStockOnly) r = r.filter((p) => p.stock > 0);
    r = r.filter((p) => p.price <= filters.priceMax);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    return r;
  }, [filters, sort, search]);

  const brandsAvailable = useMemo(() => {
    const base = filters.category ? products.filter((p) => p.category === filters.category) : products;
    return Array.from(new Set(base.map((p) => p.brand))).sort();
  }, [filters.category]);

  const showCondition = filters.category === "mobile-phones" || !filters.category;

  const title = cat ? categoryLabels[cat] : "All Products";
  const subtitle = cat
    ? `Shop the latest ${categoryLabels[cat].toLowerCase()} curated by Egmart.`
    : "Browse our complete catalogue across every category.";

  return (
    <div>
      <section className="bg-secondary text-secondary-foreground py-14 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-xs uppercase text-primary font-bold mb-3">Egmart Catalogue</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
          <p className="mt-4 text-secondary-foreground/70 max-w-xl">{subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name or brand..."
              className="w-full bg-muted rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-muted rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={() => setDrawer(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-secondary text-secondary-foreground rounded-full px-5 py-3 text-sm font-semibold"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
          <Button asChild variant="hero" className="rounded-full">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              brandsAvailable={brandsAvailable}
              showCondition={showCondition}
              maxPriceCap={maxPriceCap}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-4">{list.length} products</p>
            <ProductGrid products={list} />
          </div>
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 h-full w-[88vw] max-w-sm bg-background overflow-y-auto p-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setDrawer(false)} className="p-2 hover:bg-muted rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              brandsAvailable={brandsAvailable}
              showCondition={showCondition}
              maxPriceCap={maxPriceCap}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
