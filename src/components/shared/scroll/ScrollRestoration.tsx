"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top on every route change
    // This addresses the Next.js App Router bug where scroll position might be preserved
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    
    // Also reset body scroll just in case it's acting as the scrolling container
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
