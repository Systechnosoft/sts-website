import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCard {
  icon: LucideIcon;
  title: string;
  bullets: string[];
}

interface CloudServicesCarouselProps {
  services: ServiceCard[];
}

export const CloudServicesCarousel = ({ services }: CloudServicesCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const trackRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionEndHandlerRef = useRef<(() => void) | null>(null);

  // Build infinite slides array with clones
  const buildInfiniteSlides = useCallback(() => {
    const cloneStart = services.slice(-slidesPerView);
    const cloneEnd = services.slice(0, slidesPerView);
    return [...cloneStart, ...services, ...cloneEnd];
  }, [services, slidesPerView]);

  const infiniteSlides = buildInfiniteSlides();

  // Update slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      const newPerView = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
      setSlidesPerView(newPerView);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  // Initialize starting position (show cards 2, 3, 4 on desktop)
  useEffect(() => {
    setCurrentIndex(slidesPerView);
  }, [slidesPerView]);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Apply transform
  const applyTransform = useCallback((index: number, animate: boolean) => {
    if (!trackRef.current || !viewportRef.current) return;

    const slideWidth = viewportRef.current.clientWidth / slidesPerView;
    const offset = -index * slideWidth;

    if (animate) {
      trackRef.current.style.transition = "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)";
      setIsTransitioning(true);
    } else {
      trackRef.current.style.transition = "none";
      setIsTransitioning(false);
    }

    trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
  }, [slidesPerView]);

  // Handle infinite loop wraparound
  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      const total = services.length;
      
      if (currentIndex >= total + slidesPerView) {
        // Wrapped to end clones, jump to real start
        setCurrentIndex(slidesPerView);
        setIsTransitioning(false);
        applyTransform(slidesPerView, false);
      } else if (currentIndex < slidesPerView) {
        // Wrapped to start clones, jump to real end
        setCurrentIndex(total);
        setIsTransitioning(false);
        applyTransform(total, false);
      } else {
        setIsTransitioning(false);
      }
    };

    transitionEndHandlerRef.current = handleTransitionEnd;

    if (trackRef.current) {
      trackRef.current.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        trackRef.current?.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [currentIndex, services.length, slidesPerView, isTransitioning, applyTransform]);

  // Apply transform when index changes
  useEffect(() => {
    applyTransform(currentIndex, isTransitioning);
  }, [currentIndex, applyTransform, isTransitioning]);

  // Auto-advance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion || isPaused || !isVisible) {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    autoplayTimerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isPaused, isVisible]);

  // Pause handlers
  const handlePause = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 10000);
  }, []);

  const handleResume = useCallback(() => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
  }, []);

  // Navigation
  const goToPrevious = useCallback(() => {
    handlePause();
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [handlePause]);

  const goToNext = useCallback(() => {
    handlePause();
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [handlePause]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  }, [goToPrevious, goToNext]);

  // Get real slide index for screen reader
  const getRealIndex = () => {
    let realIdx = currentIndex - slidesPerView;
    const total = services.length;
    realIdx = ((realIdx % total) + total) % total;
    return realIdx + 1;
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={sectionRef}
      className="cloud-services-carousel relative"
      data-cloud-carousel
    >
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        aria-label="Previous"
        aria-controls="carousel-track"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border-[#E6E6E6] shadow-md hover:bg-[#F7F7F7] focus-visible:outline-2 focus-visible:outline-[#E52629] -translate-x-1/2"
      >
        <ChevronLeft className="h-5 w-5 text-[#1C1C1C]" />
      </Button>

      {/* Viewport */}
      <div
        ref={viewportRef}
        className="carousel__viewport overflow-hidden"
        style={{ contain: "layout" }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        onPointerDown={handlePause}
        role="region"
        aria-roledescription="carousel"
        aria-label="Cloud services we deliver"
      >
        <ul
          ref={trackRef}
          id="carousel-track"
          className="carousel__track flex flex-nowrap"
          style={{
            willChange: "transform",
          }}
        >
          {infiniteSlides.map((service, idx) => {
            const Icon = service.icon;
            const isClone = idx < slidesPerView || idx >= slidesPerView + services.length;
            
            return (
              <li
                key={`slide-${idx}`}
                className="slide flex-shrink-0 px-3 py-2"
                style={{
                  flexBasis: `${100 / slidesPerView}%`,
                }}
                aria-hidden={isClone ? "true" : undefined}
                data-clone={isClone ? "" : undefined}
              >
                <Card className="h-full min-h-[200px] bg-white rounded-2xl p-6 md:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#E52629] transition-all duration-300 border-2 border-gray-200 hover:border-[#E52629]">
                  <CardHeader className="p-0 mb-4">
                    <Icon className="h-8 w-8 text-[#E52629] mb-3" />
                    <CardTitle className="text-lg font-montserrat text-[#1C1C1C]">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start text-sm text-[#3C3C3C]">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-[#007AFF]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        aria-label="Next"
        aria-controls="carousel-track"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white border-[#E6E6E6] shadow-md hover:bg-[#F7F7F7] focus-visible:outline-2 focus-visible:outline-[#E52629] translate-x-1/2"
      >
        <ChevronRight className="h-5 w-5 text-[#1C1C1C]" />
      </Button>

      {/* Status indicator - screen reader only */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        id="cloud-svcs-status"
      >
        Slide {getRealIndex()} of {services.length}
      </div>
    </div>
  );
};
