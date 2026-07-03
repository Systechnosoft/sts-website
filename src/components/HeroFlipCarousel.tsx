import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface HeroCard {
  id?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

interface HeroFlipCarouselProps {
  cards: HeroCard[];
  autoRotateDelay?: number;
  pauseDuration?: number;
  className?: string;
  renderCard?: (card: HeroCard, index: number) => React.ReactNode;
}

/**
 * Shared 3D Flip Carousel Component for Hero Sections
 * Features:
 * - Auto-rotation with configurable delay
 * - Pause on hover/focus
 * - Keyboard navigation (Arrow Left/Right)
 * - Reduced motion support
 * - Accessibility (ARIA labels, screen reader support)
 */
export function HeroFlipCarousel({ 
  cards, 
  autoRotateDelay = 3000,
  pauseDuration = 10000,
  className = "",
  renderCard
}: HeroFlipCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    if (shouldReduceMotion || isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, autoRotateDelay);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isCarouselPaused, cards.length, autoRotateDelay]);

  // Handle carousel pause
  const handleCarouselPause = () => {
    setIsCarouselPaused(true);
    setTimeout(() => setIsCarouselPaused(false), pauseDuration);
  };

  // Default card renderer
  const defaultRenderCard = (card: HeroCard) => (
    <Card className="w-full h-full bg-card/90 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          {card.icon && <card.icon className="h-6 w-6 text-primary flex-shrink-0" />}
          <span>{card.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {card.description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative h-80 flex items-center justify-center ${className}`}
      onMouseEnter={handleCarouselPause}
      onFocus={handleCarouselPause}
      role="region"
      aria-label="Service Highlights Carousel"
      aria-live="polite"
    >
      <div 
        className="relative w-80 h-64"
        style={{ perspective: '1000px' }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
            handleCarouselPause();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setCurrentCardIndex((prev) => (prev + 1) % cards.length);
            handleCarouselPause();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${cards[currentCardIndex].title} card ${currentCardIndex + 1} of ${cards.length}. Use arrow keys to navigate.`}
      >
        {cards.map((card, index) => {
          const isActive = index === currentCardIndex;
          
          return (
            <motion.div
              key={card.id || index}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ 
                rotateY: isActive ? 0 : 180,
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
              }}
              transition={{ 
                duration: shouldReduceMotion ? 0.2 : 0.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                backfaceVisibility: 'hidden'
              }}
            >
              {renderCard ? renderCard(card, index) : defaultRenderCard(card)}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
