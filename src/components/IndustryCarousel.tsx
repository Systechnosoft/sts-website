import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Building2, Zap, Plane } from "lucide-react";
import { Link } from "react-router-dom";

interface IndustryCard {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  problems: string;
  solutions: string;
  outcomes: string;
  cta?: {
    text: string;
    href: string;
  };
}

const industryCards: IndustryCard[] = [
  {
    title: "BFSI",
    icon: Building2,
    problems: "Legacy F2B workflows; fragmented risk/compliance; manual approvals.",
    solutions: "Appian workflows & records; exception/audit; IAM/SSO; HA/DR infra.",
    outcomes: "40% faster trading lifecycle; stronger compliance tracking; portfolio visibility.",
    cta: {
      text: "Explore BFSI Use-Cases",
      href: "/case-studies?industry=bfsi"
    }
  },
  {
    title: "Oil & Gas",
    icon: Zap,
    problems: "Field compliance; manual scheduling; siloed data.",
    solutions: "Workforce compliance tracking; transport workflows with checklists; real-time dashboards.",
    outcomes: "30% ops efficiency; enhanced safety & compliance; real-time insights.",
    cta: {
      text: "Explore O&G Use-Cases",
      href: "/case-studies?industry=oil-gas"
    }
  },
  {
    title: "Aviation",
    icon: Plane,
    problems: "Multi-airport content changes; manual updates; regulatory complexity; multilingual needs.",
    solutions: "Role-based CMS for airport news/content; audit/versioning; localization; SLA-based workflows.",
    outcomes: "Faster content turnaround; consistent compliance; multi-airport governance.",
    cta: {
      text: "Explore Aviation Use-Cases",
      href: "/case-studies?industry=aviation"
    }
  }
];

export default function IndustryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasPointerDown, setHasPointerDown] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % industryCards.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.hasAttribute('data-slide-index')) {
        const index = parseInt(target.getAttribute('data-slide-index') || '0');
        goToSlide(index);
      }
    }
  }, [goToSlide]);

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

  const currentCard = industryCards[currentSlide];
  const IconComponent = currentCard.icon;

  return (
    <div 
      className="relative w-full h-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries"
      aria-live="polite"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onPointerDown={() => setHasPointerDown(true)}
      onPointerUp={() => setHasPointerDown(false)}
    >
      <div 
        className="h-full min-h-[380px] max-h-[380px] lg:min-h-[380px] lg:max-h-[380px] md:min-h-auto bg-white border-2 border-gray-200 hover:border-[#E52629] transition-colors duration-300 rounded-2xl p-5 sm:p-6 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col hover:translate-y-[-2px]"
      >
        <div className="text-center pb-4">
          <div className="w-16 h-16 bg-[#F7F7F7] border border-[#E6E6E6] rounded-full flex items-center justify-center mx-auto mb-4">
            <IconComponent 
              className="h-8 w-8 text-[#E52629]" 
              aria-hidden="true"
            />
          </div>
          <h3 className="text-xl font-montserrat font-bold text-[#1C1C1C]">
            {currentCard.title}
          </h3>
        </div>
        
        <div className="grid gap-4 flex-1 content-start pb-2">
          <div className="min-h-[60px]">
            <h4 className="text-sm font-medium text-[#E52629] mb-1">Problems</h4>
            <p className="text-sm text-[#3C3C3C]">{currentCard.problems}</p>
          </div>
          
          <div className="min-h-[80px]">
            <h4 className="text-sm font-medium text-[#E52629] mb-1">Solutions</h4>
            <p className="text-sm text-[#3C3C3C]">{currentCard.solutions}</p>
          </div>
          
          <div className="min-h-[60px]">
            <h4 className="text-sm font-medium text-[#E52629] mb-1">Outcomes</h4>
            <p className="text-sm text-[#3C3C3C]">{currentCard.outcomes}</p>
          </div>
        </div>
      </div>

    </div>
  );
}