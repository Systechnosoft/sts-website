import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, Users, Shield, CheckCircle, Code, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    icon: TrendingUp,
    title: "Outcome-first delivery",
    description: "Speed, cost, and compliance gains—planned up front and measured post-go-live.",
    proof: "40% faster trading; 30% O&G efficiency; 50% faster intercompany."
  },
  {
    icon: Users,
    title: "India-first, global standards",
    description: "Agile India teams with enterprise SLAs and governance.",
    proof: "Playbooks for BFSI, Oil & Gas, Aviation."
  },
  {
    icon: Shield,
    title: "Security & governance by design",
    description: "Zero-trust, IAM/SSO, DLP, audit trails, least-privilege.",
    proof: "DPDP-aware forms, consent & logging."
  },
  {
    icon: CheckCircle,
    title: "Scalable engagement models",
    description: "Discover→Pilot→Scale→CoE. T&M, managed, or fixed scope.",
    proof: "Device-based pricing options for Infra."
  },
  {
    icon: Code,
    title: "Platform expertise",
    description: "Appian & Salesforce; Entra ID for infra; SDK/Make/Zapier.",
    proof: "Integrations via REST/SOAP/JDBC; data fabric patterns."
  },
  {
    icon: Bot,
    title: "Evidence-backed results",
    description: "We publish anonymized case studies—not vague promises.",
    proof: "Banking AU 40%; O&G US +30%; UK FS 50%."
  }
];

export default function WhyFeatureSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasPointerDown, setHasPointerDown] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featureCards.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featureCards.length) % featureCards.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Autoplay logic
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const shouldPause = isHovered || isFocused || hasPointerDown;
    if (shouldPause) return;

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isFocused, hasPointerDown, nextSlide]);

  // Resume autoplay after 10s of inactivity
  useEffect(() => {
    if (!isHovered && !isFocused && !hasPointerDown) return;

    const timeout = setTimeout(() => {
      setIsHovered(false);
      setIsFocused(false);
      setHasPointerDown(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isHovered, isFocused, hasPointerDown]);

  const currentCard = featureCards[currentSlide];

  return (
    <div 
      className="relative" 
      onKeyDown={handleKeyDown} 
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Systechnosoft strengths"
      aria-live="polite"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerDown={() => setHasPointerDown(true)}
      onPointerUp={() => setHasPointerDown(false)}
    >
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white min-h-[360px] shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-white/30">
              <currentCard.icon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            
            <h3 className="text-xl font-montserrat font-bold mb-3">
              {currentCard.title}
            </h3>
            
            <p className="text-white/90 mb-4 flex-grow">
              {currentCard.description}
            </p>
            
            <div className="text-sm text-white/70 border-t border-white/20 pt-3">
              <span className="font-medium">Proof: </span>
              {currentCard.proof}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2"
          aria-label="Previous feature"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {featureCards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2 ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2"
          aria-label="Next feature"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Screen Reader Live Region */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        Feature {currentSlide + 1} of {featureCards.length}: {currentCard.title}
      </div>
    </div>
  );
}