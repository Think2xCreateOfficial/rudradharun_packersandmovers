"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  start?: number;
  /** Start counting only when element enters viewport */
  triggerOnView?: boolean;
}

export function useCounter({
  end,
  duration = 1800,
  start = 0,
  triggerOnView = true,
}: UseCounterOptions) {
  const [count, setCount] = useState(triggerOnView ? start : end);
  const [hasStarted, setHasStarted] = useState(!triggerOnView);
  const ref = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggerOnView) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const range = end - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + range * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [hasStarted, end, start, duration]);

  return { count, ref };
}
