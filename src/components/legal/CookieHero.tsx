import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CookieHeroProps {
  title: string;
  description: string;
  lastUpdated: string;
}

export function CookieHero({ title, description, lastUpdated }: CookieHeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPlaying(false);
    }
  }, [prefersReducedMotion]);

  return (
    <section 
      className="relative min-h-[60vh] flex items-center overflow-hidden bg-white py-24"
      aria-labelledby="cookie-hero-title"
    >
      {/* Animated background - CSS optimized */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
        {isPlaying && !prefersReducedMotion && (
          <div
            className="absolute inset-0 hero-conic-rotate"
            style={{
              backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
              backgroundSize: "400px 400px"
            }}
          />
        )}
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl space-y-6"
        >
          <h1 
            id="cookie-hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-semibold font-montserrat tracking-tight text-[#1C1C1C]"
          >
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-[#3C3C3C] leading-relaxed max-w-prose font-inter">
            {description}
          </p>

          {/* Last updated chip matching cloud services style */}
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-sm text-neutral-600 backdrop-blur">
            Last updated: <time dateTime={lastUpdated} className="ml-1 font-medium">{lastUpdated}</time>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
