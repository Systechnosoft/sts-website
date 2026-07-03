import { useEffect, useRef, useState } from "react";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  startSeed?: number;
}

export function CountUpNumber({ 
  end, 
  duration = 1200, 
  suffix = "", 
  className = "",
  startSeed = 10
}: CountUpNumberProps) {
  const [count, setCount] = useState(startSeed);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const animDuration = prefersReducedMotion ? 0 : duration;
            
            if (animDuration === 0) {
              setCount(end);
              return;
            }

            const startTime = performance.now();
            const startValue = startSeed;
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / animDuration, 1);
              
              // Ease-out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.round(startValue + (end - startValue) * easeProgress);
              
              setCount(currentCount);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration, hasAnimated, startSeed]);

  return (
    <span ref={elementRef} className={className}>
      {count}{suffix}
    </span>
  );
}
