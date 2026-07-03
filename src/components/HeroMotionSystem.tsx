import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface HeroCard {
  icon: string;
  title: string;
  benefit: string;
}

interface HeroMotionSystemProps {
  cards: HeroCard[];
  className?: string;
  ariaLabel?: string;
}

export function HeroMotionSystem({ cards, className = "", ariaLabel = "Service highlights" }: HeroMotionSystemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const pauseTimeoutRef = useRef<NodeJS.Timeout>();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, cards.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  const handleFocus = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  const handleBlur = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div
      className={`hero-rotating-cards w-full max-w-[360px] lg:max-w-[360px] md:max-w-[300px] sm:max-w-[280px] mx-auto ${className}`}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div 
        className="relative bg-white border border-[#E6E6E6] rounded-lg shadow-lg overflow-hidden"
        style={{ 
          width: '100%',
          maxWidth: '360px',
          height: '210px',
          perspective: '1000px'
        }}
      >
        <motion.div
          key={currentIndex}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0.85, rotateY: -8 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.35, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute inset-0 p-6 flex flex-col justify-between"
          aria-live="polite"
        >
          <div>
            <div className="text-4xl mb-4">{currentCard.icon}</div>
            <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 font-montserrat">
              {currentCard.title}
            </h3>
          </div>
          <p className="text-sm text-[#3C3C3C] font-inter">
            {currentCard.benefit}
          </p>
        </motion.div>
      </div>
      
      <div className="mt-4 text-center text-xs text-[#3C3C3C]" aria-live="polite" aria-atomic="true">
        <span className="sr-only">Card {currentIndex + 1} of {cards.length}</span>
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
}

interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function HeroBackground({ children, className = "", fullHeight = false }: HeroBackgroundProps) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div 
      className={`relative isolate overflow-visible bg-white ${fullHeight ? 'min-h-screen flex items-center' : ''} ${className}`}
      style={{ contain: 'paint' }}
    >
      {/* Animated background - Framer Motion optimized */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,38,41,0.1),transparent)]" />
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent, hsl(var(--primary)), transparent)`,
              backgroundSize: "400px 400px"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
      
      {/* Bottom edge guard */}
      <div 
        className="absolute inset-x-0 bottom-0 h-12 z-[1] bg-gradient-to-b from-white/0 to-white pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
