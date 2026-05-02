import { Play, X } from "lucide-react";
import { useState } from "react";
import poster from "@/assets/images/video-poster.jpg";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[520px]">
      <img src={poster} alt="Egmart deals video" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/65 to-secondary/35" />
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 text-center text-secondary-foreground">
        <button
          onClick={() => setPlaying(true)}
          className="group relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-smooth hover:scale-105 md:h-24 md:w-24"
          aria-label="Play video"
        >
          <Play className="ml-1 h-9 w-9 fill-current md:h-10 md:w-10" />
          <span className="absolute inset-0 rounded-full border-2 border-primary opacity-30 animate-ping" />
        </button>
        <p className="mb-4 text-xs font-bold uppercase text-primary md:text-sm">Watch - Discover - Shop</p>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">Discover Egmart Deals</h2>
        <p className="mt-4 max-w-xl text-base text-secondary-foreground/80 md:text-lg">
          Phones, chocolates, shoes, and cosmetics in one place.
        </p>
      </div>
      {playing && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/95 p-4" onClick={() => setPlaying(false)}>
          <div className="relative w-full max-w-3xl rounded-lg border border-white/10 bg-white/5 p-8 text-center text-white">
            <button
              onClick={() => setPlaying(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="mb-2 text-sm font-bold uppercase text-primary">Video placeholder</p>
            <p className="text-lg">Add your video file here.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
