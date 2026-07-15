"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current vertical scroll position
 * Throttled via requestAnimationFrame for performance
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

/**
 * Returns true when the page has scrolled past the given threshold
 */
export function useScrolled(threshold = 80): boolean {
  const scrollY = useScrollY();
  return scrollY > threshold;
}
