"use client";

// =============================================================
// LoaderBrand — Animated brand name, letter-by-letter draw.
// Each character animates independently (stroke-dashoffset),
// matching the exact timing / easing of the reference "YOU"
// animation. Text color: single brand-blue (#004690) only.
//
// LoaderSvgDefs: kept here — referenced by LoaderAnimation.tsx
// for the Y/O/U SVG paths. Do NOT remove.
// =============================================================

// ── Gradient defs consumed by LoaderAnimation's SVG paths ──────
export function LoaderSvgDefs() {
  return (
    <svg
      height="0"
      width="0"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {/* Primary gradient — Blue → Blue-light (for Y-shape) */}
        <linearGradient
          id="rdpm-grad-primary"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="62"
          x2="0"
          y2="2"
        >
          <stop stopColor="#004690" />
          <stop stopColor="#0066CC" offset="0.5" />
          <stop stopColor="#0057D9" offset="1" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
            keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
            keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
            dur="8s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* Secondary gradient — Blue shades (for U-shape) */}
        <linearGradient
          id="rdpm-grad-secondary"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="64"
          x2="0"
          y2="0"
        >
          <stop stopColor="#0057D9" />
          <stop stopColor="#004690" offset="1" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
            keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
            keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
            dur="8s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* Ring gradient — for the spinning O circle */}
        <linearGradient
          id="rdpm-grad-ring"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="64"
          x2="0"
          y2="0"
        >
          <stop stopColor="#004690" />
          <stop stopColor="#0066CC" offset="0.5" />
          <stop stopColor="#0057D9" offset="1" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
            keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
            keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
            dur="8s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Per-character animated letter ──────────────────────────────
// Each <tspan> inside SVG <text> gets its own stroke-dashoffset
// animation via an inline CSS animationDelay, exactly replicating
// the stagger behaviour of the original "Y", "O", "U" shapes.
interface AnimatedCharProps {
  char: string;
  delay: number; // seconds
}

function AnimatedChar({ char, delay }: AnimatedCharProps) {
  return (
    <tspan
      className="loader-char"
      style={{ animationDelay: `${delay.toFixed(2)}s` }}
    >
      {char}
    </tspan>
  );
}

// ── Brand component ─────────────────────────────────────────────
export function LoaderBrand() {
  // Line 1: "Rudra Dharun" — each character (including space) staggered
  const line1 = "Rudra Dharun";
  // Line 2: "Packers & Movers" — continues stagger after line 1
  const line2 = "Packers & Movers";

  // Timing constants matching the original "YOU" reference
  const CHAR_STAGGER = 0.07; // seconds between each character start
  const LINE2_OFFSET = line1.length * CHAR_STAGGER + 0.15; // gap between lines

  return (
    <div
      className="flex flex-col items-center gap-1 leading-none"
      aria-label="Rudra Dharun Packers and Movers"
    >
      {/* ── Line 1: Rudra Dharun ─────────────────────────────── */}
      <svg
        viewBox="0 0 300 50"
        aria-hidden="true"
        focusable="false"
        className="w-[200px] sm:w-[260px] lg:w-[300px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="50%"
          y="40"
          textAnchor="middle"
          fontFamily="var(--font-outfit), ui-serif, Georgia, serif"
          fontWeight="800"
          fontSize="36"
          letterSpacing="-0.5"
          fill="#004690"
          stroke="#004690"
          strokeWidth="0.4"
        >
          {line1.split("").map((char, i) => (
            <AnimatedChar
              key={i}
              char={char}
              delay={i * CHAR_STAGGER}
            />
          ))}
        </text>
      </svg>

      {/* ── Line 2: Packers & Movers ─────────────────────────── */}
      <svg
        viewBox="0 0 300 32"
        aria-hidden="true"
        focusable="false"
        className="w-[200px] sm:w-[260px] lg:w-[300px] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="50%"
          y="40"
          textAnchor="middle"
          fontFamily="var(--font-inter), ui-sans-serif, system-ui, sans-serif"
          fontWeight="700"
          fontSize="24"
          letterSpacing="3.5"
          fill="#004690"
          stroke="#004690"
          strokeWidth="0.3"
        >
          {line2.split("").map((char, i) => (
            <AnimatedChar
              key={i}
              char={char}
              delay={LINE2_OFFSET + i * CHAR_STAGGER}
            />
          ))}
        </text>
      </svg>
    </div>
  );
}
