import { Play } from "lucide-react";
import { useState } from "react";
import poster from "@/assets/images/video-poster.jpg";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
      <img src={poster} alt="Egmart deals video" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-secondary/40" />
      <div className="relative h-full container mx-auto px-6 flex flex-col items-center justify-center text-center text-secondary-foreground">
        <button
          onClick={() => setPlaying(true)}
          className="group h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-glow hover:scale-110 transition-smooth"
          aria-label="Play video"
        >
          <Play className="h-9 w-9 md:h-10 md:w-10 fill-current ml-1" />
          <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
        </button>
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Watch · Discover · Shop</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">Discover Egmart Deals</h2>
        <p className="mt-4 text-base md:text-lg text-secondary-foreground/80 max-w-xl">
          Phones, chocolates, shoes, and cosmetics in one place.
        </p>
      </div>
      {playing && (
        <div className="absolute inset-0 bg-black/95 z-30 flex items-center justify-center p-4" onClick={() => setPlaying(false)}>
          <div className="text-center text-white">
            <p className="text-sm mb-2 uppercase tracking-widest text-primary">Video placeholder</p>
            <p className="text-lg">Add your video file here.</p>
            <button onClick={() => setPlaying(false)} className="mt-6 px-6 py-2 rounded-full border border-white/30 hover:bg-white/10">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
