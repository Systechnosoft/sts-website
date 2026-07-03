import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // If there's a hash, let the target component handle scrolling
    // This prevents interfering with anchor navigation
    if (hash) {
      return;
    }
    
    // Only scroll to top for regular navigation (no hash)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, hash]);

  return null;
}
