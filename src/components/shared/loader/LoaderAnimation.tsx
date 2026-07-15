"use client";

// =============================================================
// LoaderAnimation — The exact Uiverse SVG loader, branded
// Preserves: circular ring spin, Y-shape dash, U-shape dash
// Replaces: original gradients → brand Blue/Gold palette
// =============================================================


export function LoaderAnimation() {
  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-hidden="true"
    >
      {/* ── SVG 1: Y-shape (Rudra) ── */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height="64"
        width="64"
        className="inline-block w-12 h-12 sm:w-16 sm:h-16"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="8"
          stroke="url(#rdpm-grad-primary)"
          /* Exact path from Uiverse "y" shape */
          d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
          className="loader-dash"
          pathLength="360"
        />
      </svg>

      {/* ── SVG 2: Circle ring (spinning) ── */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height="64"
        width="64"
        className="inline-block w-12 h-12 sm:w-16 sm:h-16"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="10"
          stroke="url(#rdpm-grad-ring)"
          /* Exact circle path from Uiverse "o" shape */
          d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
          className="loader-spin"
          pathLength="360"
        />
      </svg>

      {/* ── Spacer ── */}
      <div className="w-1 sm:w-2" />

      {/* ── SVG 3: U-shape (Movers) ── */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        height="64"
        width="64"
        className="inline-block w-12 h-12 sm:w-16 sm:h-16"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="8"
          stroke="url(#rdpm-grad-secondary)"
          /* Exact path from Uiverse "u" shape */
          d="M 4,4 h 4.6230469 v 25.919922 c -0.00276,11.916203 9.8364941,21.550422 21.7500001,21.296875 11.616666,-0.240651 21.014356,-9.63894 21.253906,-21.25586 a 2.0002,2.0002 0 0 0 0,-0.04102 V 4 H 56.25 v 25.919922 c 0,14.33873 -11.581192,25.919922 -25.919922,25.919922 a 2.0002,2.0002 0 0 0 -0.0293,0 C 15.812309,56.052941 3.998433,44.409961 4,29.919922 Z"
          className="loader-dash"
          pathLength="360"
        />
      </svg>
       

    </div>
  );
}
