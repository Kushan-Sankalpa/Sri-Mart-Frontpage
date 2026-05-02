import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

const ProductGallery = ({ images, alt }: Props) => {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4">
      <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
        <img src={images[active]} alt={alt} className="w-full h-full object-contain p-6" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-square rounded-xl overflow-hidden bg-muted border-2 transition-smooth ${
              i === active ? "border-primary shadow-elegant" : "border-border hover:border-primary/50"
            }`}
          >
            <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
