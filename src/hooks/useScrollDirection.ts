import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  isVisible: boolean;
  scrollY: number;
}

const SCROLL_THRESHOLD = 40;

export function useScrollDirection(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isVisible: true,
    scrollY: 0,
  });
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      // Show ribbon when at top or scrolling up
      // Hide when scrolling down past threshold
      const isVisible = currentScrollY < SCROLL_THRESHOLD || currentScrollY < lastScrollY.current;

      setScrollState({
        isVisible,
        scrollY: currentScrollY,
      });
      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollState;
}
