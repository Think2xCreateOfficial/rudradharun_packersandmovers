"use client";

// =============================================================
// LoaderBrandLetters — SVG path letter-by-letter draw animation
// Uses getTotalLength() + CSS transition for exact stroke-draw
// matching the Y / O / U reference animation style.
// Each character path draws independently with a 60ms stagger.
// Color: single brand-blue #004690 throughout.
// =============================================================

import { useEffect, useRef } from "react";

// ── Accurate SVG paths per glyph ────────────────────────────────
// Paths are drawn in a 0 0 32 40 viewBox (width × height).
// Each glyph is stroked — no fill needed during animation.
const GLYPH: Record<string, { d: string; w: number; vw: number }> = {
  R: {
    d: "M6 4 L6 36 M6 4 Q20 4 20 14 Q20 24 6 24 L20 36",
    w: 24, vw: 28,
  },
  u: {
    d: "M6 10 L6 28 Q6 36 16 36 Q26 36 26 28 L26 10",
    w: 22, vw: 32,
  },
  d: {
    d: "M24 4 L24 36 M24 4 Q24 4 18 4 Q6 4 6 20 Q6 36 18 36 Q24 36 24 36",
    w: 22, vw: 30,
  },
  r: {
    d: "M6 10 L6 36 M6 16 Q6 10 14 10 Q20 10 20 16",
    w: 18, vw: 26,
  },
  a: {
    d: "M20 10 Q20 10 14 10 Q6 10 6 22 Q6 36 14 36 Q22 36 22 28 L22 10 L22 36",
    w: 20, vw: 28,
  },
  " ": { d: "", w: 10, vw: 10 },
  D: {
    d: "M6 4 L6 36 M6 4 Q22 4 22 20 Q22 36 6 36",
    w: 22, vw: 28,
  },
  h: {
    d: "M6 4 L6 36 M6 18 Q6 10 16 10 Q26 10 26 20 L26 36",
    w: 22, vw: 32,
  },
  n: {
    d: "M6 10 L6 36 M6 18 Q6 10 16 10 Q26 10 26 20 L26 36",
    w: 22, vw: 32,
  },
  P: {
    d: "M6 4 L6 36 M6 4 Q22 4 22 14 Q22 24 6 24",
    w: 22, vw: 28,
  },
  c: {
    d: "M24 12 Q18 8 12 10 Q6 14 6 22 Q6 30 12 34 Q18 38 24 34",
    w: 20, vw: 30,
  },
  k: {
    d: "M6 4 L6 36 M6 20 L22 10 M6 20 L24 36",
    w: 20, vw: 30,
  },
  e: {
    d: "M6 22 L24 22 Q24 10 14 10 Q6 10 6 22 Q6 34 14 36 Q22 36 24 32",
    w: 20, vw: 30,
  },
  s: {
    d: "M22 10 Q14 8 10 12 Q6 16 10 22 Q16 26 20 28 Q26 32 22 36 Q16 40 10 36",
    w: 20, vw: 30,
  },
  "&": {
    d: "M20 10 Q10 6 8 12 Q6 18 14 22 Q22 26 20 32 Q18 38 12 38 Q6 38 6 32 Q6 28 12 24 L22 38",
    w: 22, vw: 30,
  },
  M: {
    d: "M4 36 L4 4 L16 24 L28 4 L28 36",
    w: 28, vw: 34,
  },
  o: {
    d: "M14 10 Q6 10 6 22 Q6 36 14 36 Q22 36 22 22 Q22 10 14 10",
    w: 20, vw: 28,
  },
  v: {
    d: "M6 10 L14 36 L22 10",
    w: 18, vw: 28,
  },
  i: {
    d: "M12 10 L12 36 M12 5 L12 6",
    w: 10, vw: 20,
  },
  g: {
    d: "M22 10 Q14 8 8 12 Q4 16 4 22 Q4 30 10 34 Q16 38 22 34 L22 42 Q22 48 14 48",
    w: 20, vw: 28,
  },
  t: {
    d: "M14 4 L14 36 M8 10 L20 10",
    w: 14, vw: 24,
  },
  p: {
    d: "M6 10 L6 44 M6 10 Q22 8 22 20 Q22 32 6 30",
    w: 20, vw: 28,
  },
  l: {
    d: "M10 4 L10 36",
    w: 10, vw: 20,
  },
  f: {
    d: "M18 4 Q22 4 22 8 L22 36 M14 18 L26 18",
    w: 16, vw: 28,
  },
  // Fallback
  "?": { d: "M4 10 Q4 4 14 4 Q24 4 24 14 Q24 20 14 24 L14 30 M14 34 L14 36", w: 18, vw: 28 },
};

function getGlyph(char: string) {
  return GLYPH[char] ?? GLYPH["?"];
}

// ── A single animated letter ─────────────────────────────────────
interface AnimatedLetterProps {
  char: string;
  delayMs: number;
}

function AnimatedLetter({ char, delayMs }: AnimatedLetterProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const glyph = getGlyph(char);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !glyph.d) return;

    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      length = 120; // SSR safe fallback
    }

    // Start hidden
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.opacity = "0";

    const raf = requestAnimationFrame(() => {
      // Small tick so the initial hidden state is painted first
      const timer = setTimeout(() => {
        path.style.transition = `stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms,
                                  opacity 0.1s ease ${delayMs}ms`;
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      }, 50);
      return () => clearTimeout(timer);
    });

    return () => cancelAnimationFrame(raf);
  }, [glyph.d, delayMs]);

  // Spaces are just inline gaps
  if (!glyph.d) {
    return <span className="inline-block" style={{ width: glyph.w }} aria-hidden="true" />;
  }

  return (
    <span className="inline-block" style={{ width: glyph.w }} aria-hidden="true">
      <svg
        viewBox={`0 0 ${glyph.vw} 40`}
        width={glyph.w}
        height={32}
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={glyph.d}
          fill="none"
          stroke="#004690"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ── Word row helper ──────────────────────────────────────────────
interface WordRowProps {
  text: string;
  baseDelayMs: number;
  charStaggerMs: number;
  className?: string;
}

function WordRow({ text, baseDelayMs, charStaggerMs, className }: WordRowProps) {
  return (
    <div
      className={`flex flex-wrap justify-center items-end leading-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {text.split("").map((char, i) => (
        <AnimatedLetter
          key={`${char}-${i}`}
          char={char}
          delayMs={baseDelayMs + i * charStaggerMs}
        />
      ))}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────
export function LoaderBrandLetters() {
  const STAGGER = 60; // ms between each character
  const line1 = "Rudra Dharun";
  const line2 = "Packers & Movers";
  const line2Start = line1.length * STAGGER + 150; // gap before line 2

  return (
    <div
      className="flex flex-col items-center gap-2"
      aria-label="Rudra Dharun Packers and Movers"
      role="img"
    >
      {/* Line 1 */}
      <WordRow
        text={line1}
        baseDelayMs={0}
        charStaggerMs={STAGGER}
        className="gap-0.5"
      />
      {/* Line 2 — smaller, uppercase feel via letter-spacing */}
      <div
        className="flex flex-wrap justify-center items-end leading-none gap-0.5"
        aria-hidden="true"
        style={{ transform: "scale(0.75)", transformOrigin: "center top" }}
      >
        {line2.split("").map((char, i) => (
          <AnimatedLetter
            key={`l2-${char}-${i}`}
            char={char}
            delayMs={line2Start + i * STAGGER}
          />
        ))}
      </div>
    </div>
  );
}
