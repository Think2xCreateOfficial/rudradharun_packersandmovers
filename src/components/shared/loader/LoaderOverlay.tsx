"use client";

// =============================================================
// LoaderOverlay — Full-screen light background with logistics pattern
// Clean, minimal, premium light aesthetic
// =============================================================

import { motion } from "framer-motion";

// Subtle logistics-inspired background pattern (SVG-based, inline)
function LogisticsPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="logistics-grid"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Dots at grid intersections */}
          <circle cx="0" cy="0" r="1.5" fill="#004690" />
          <circle cx="60" cy="0" r="1.5" fill="#004690" />
          <circle cx="0" cy="60" r="1.5" fill="#004690" />
          <circle cx="60" cy="60" r="1.5" fill="#004690" />
          <circle cx="30" cy="30" r="1" fill="#004690" />
          {/* Route lines */}
          <line x1="0" y1="30" x2="60" y2="30" stroke="#004690" strokeWidth="0.5" strokeDasharray="3 6" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="#004690" strokeWidth="0.5" strokeDasharray="3 6" />
        </pattern>

        {/* Radial gradient to fade pattern at edges */}
        <radialGradient id="pattern-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopOpacity="0" />
          <stop offset="60%" stopOpacity="1" />
          <stop offset="100%" stopOpacity="1" />
        </radialGradient>
        <mask id="fade-mask">
          <rect width="100%" height="100%" fill="url(#pattern-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#logistics-grid)"
        mask="url(#fade-mask)"
      />
    </svg>
  );
}

interface LoaderOverlayProps {
  children: React.ReactNode;
}

export function LoaderOverlay({ children }: LoaderOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      aria-busy="true"
      aria-label="Loading Rudra Dharun Packers and Movers"
      role="status"
    >
      {/* Subtle background brand accent — top-left */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl"
        aria-hidden="true"
      />
      {/* Bottom-right gold accent */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"
        aria-hidden="true"
      />

      <LogisticsPattern />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {children}
      </div>

      {/* Screen-reader announcement */}
      <span className="sr-only">
        Loading Rudra Dharun Packers and Movers, please wait…
      </span>
    </motion.div>
  );
}
