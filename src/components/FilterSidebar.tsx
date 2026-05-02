import { Product, categoryLabels } from "@/data/products";

export interface Filters {
  brands: string[];
  conditions: string[]; // Brand New / Used (mobiles)
  inStockOnly: boolean;
  priceMax: number;
  category?: Product["category"];
}

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  brandsAvailable: string[];
  showCondition?: boolean;
  maxPriceCap: number;
}

const FilterSidebar = ({ filters, setFilters, brandsAvailable, showCondition, maxPriceCap }: Props) => {
  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  return (
    <aside className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-7">
      <div>
        <h3 className="font-bold text-base mb-3">Category</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
            <input
              type="radio"
              name="cat"
              checked={!filters.category}
              onChange={() => setFilters({ ...filters, category: undefined })}
              className="accent-primary"
            />
            All
          </label>
          {(Object.keys(categoryLabels) as Product["category"][]).map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <input
                type="radio"
                name="cat"
                checked={filters.category === c}
                onChange={() => setFilters({ ...filters, category: c })}
                className="accent-primary"
              />
              {categoryLabels[c]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-base mb-3">Brand</h3>
        <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
          {brandsAvailable.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-primary">
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() => setFilters({ ...filters, brands: toggle(filters.brands, b) })}
                className="accent-primary"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {showCondition && (
        <div>
          <h3 className="font-bold text-base mb-3">Condition</h3>
          <div className="space-y-2 text-sm">
            {["Brand New", "Used"].map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes(c)}
                  onChange={() => setFilters({ ...filters, conditions: toggle(filters.conditions, c) })}
                  className="accent-primary"
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-bold text-base mb-3">Price (LKR)</h3>
        <input
          type="range"
          min={0}
          max={maxPriceCap}
          step={1000}
          value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">Up to LKR {filters.priceMax.toLocaleString("en-LK")}</p>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
            className="accent-primary"
          />
          In stock only
        </label>
      </div>

      <button
        onClick={() => setFilters({ brands: [], conditions: [], inStockOnly: false, priceMax: maxPriceCap, category: filters.category })}
        className="text-xs uppercase tracking-wider text-primary font-bold hover:underline"
      >
        Clear filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
