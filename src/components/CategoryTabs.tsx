interface Props {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}

const CategoryTabs = ({ tabs, active, onChange }: Props) => (
  <div className="flex gap-2 flex-wrap justify-center md:justify-start">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-smooth ${
          active === t
            ? "bg-primary text-primary-foreground border-primary shadow-elegant"
            : "bg-background text-secondary border-border hover:border-primary hover:text-primary"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
