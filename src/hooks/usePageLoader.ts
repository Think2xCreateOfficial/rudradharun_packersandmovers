"use client";

// =============================================================
// usePageLoader — hooks/usePageLoader.ts
// Drives global loader state for initial load + route changes
// =============================================================

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INITIAL_HOLD_MS = 1600; // Enough to draw the brand text animation once
const ROUTE_HOLD_MS = 900;    // Brief but visible for route transitions

export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  const pathname = usePathname();

  // ---- Initial page load ----
  useEffect(() => {
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      const timer = setTimeout(() => {
        if (!cancelled) setIsLoading(false);
      }, INITIAL_HOLD_MS);
      return timer;
    };

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (typeof window !== "undefined") {
      // Wait for fonts so there's no FOUT when loader exits
      const fontPromise =
        "fonts" in document ? document.fonts.ready : Promise.resolve();

      fontPromise.then(() => {
        if (document.readyState === "complete") {
          timer = finish();
        } else {
          const onLoad = () => {
            timer = finish();
          };
          window.addEventListener("load", onLoad, { once: true });
        }
      });
    }

    return () => {
      cancelled = true;
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  // ---- Route change transitions ----
  useEffect(() => {
    // Skip the very first pathname trigger — initial load handles it
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), ROUTE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  return { isLoading, setIsLoading };
}
