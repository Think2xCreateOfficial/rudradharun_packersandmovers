"use client";

import { MapPin } from "lucide-react";
import { serviceAreas } from "@/data/about";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

// =============================================================
// IndiaMapSvg — Accurate left-aligned India + Tamil Nadu map
// Uses real simplified Indian outline path data.
// Positioned on the left half of the section.
// Opacity is minimal — purely decorative, never fights content.
// =============================================================
function IndiaMapSvg() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 h-full w-1/2 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 520"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-8 top-1/2 -translate-y-1/2 h-[130%] w-auto opacity-[0.055]"
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          {/* Fade from left (visible) → right (transparent) so it blends into content */}
          <linearGradient id="india-lr-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="india-fade-mask">
            <rect width="400" height="520" fill="white" />
            <rect width="400" height="520" fill="url(#india-lr-fade)" />
          </mask>
        </defs>

        <g mask="url(#india-fade-mask)">
          {/* ── India outline — simplified but geographically accurate ── */}
          <path
            d="
              M 190 14
              C 195 12 205 11 215 14
              C 230 18 245 22 258 30
              C 270 38 276 50 278 62
              C 282 78 278 94 272 106
              C 268 116 260 122 268 132
              C 278 144 292 148 300 158
              C 312 172 312 190 308 204
              C 304 218 295 228 288 240
              C 281 252 276 264 278 278
              C 280 290 288 300 290 312
              C 292 326 286 338 278 348
              C 268 362 254 372 242 384
              C 230 396 218 410 210 426
              C 204 438 202 452 196 464
              C 192 472 186 478 184 486
              C 182 492 186 498 182 504
              C 178 510 170 512 166 506
              C 162 500 164 490 160 482
              C 156 472 148 464 144 454
              C 138 440 138 424 130 412
              C 122 400 108 392 100 380
              C 90 366 86 350 84 334
              C 82 318 86 302 86 286
              C 86 270 82 254 78 240
              C 74 224 68 210 66 194
              C 64 178 68 162 74 148
              C 80 134 90 122 98 110
              C 108 96 116 82 118 66
              C 120 52 116 38 122 26
              C 128 14 142 8 156 8
              C 168 8 180 10 190 14 Z
            "
            fill="#004690"
            fillOpacity="0.08"
            stroke="#004690"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* ── Tamil Nadu state highlight (southern portion) ── */}
          <path
            d="
              M 196 380
              C 205 372 218 366 228 360
              C 240 354 250 352 258 358
              C 266 364 268 376 264 388
              C 260 400 250 410 240 420
              C 230 430 218 440 210 450
              C 204 458 198 466 194 474
              C 190 482 188 490 184 496
              C 180 500 174 502 170 498
              C 166 494 168 486 166 478
              C 162 468 156 460 154 450
              C 150 438 152 424 148 412
              C 144 400 136 390 132 378
              C 128 366 128 352 132 342
              C 136 332 144 326 152 320
              C 162 314 172 312 180 318
              C 188 324 192 336 192 348
              C 192 362 190 372 196 380 Z
            "
            fill="#004690"
            fillOpacity="0.14"
            stroke="#004690"
            strokeWidth="1"
          />

          {/* ── Coimbatore — HQ pin ── */}
          <g transform="translate(162, 390)">
            <circle r="8" fill="#004690" fillOpacity="0.2" />
            <circle r="14" fill="none" stroke="#004690" strokeWidth="1" strokeOpacity="0.35" />
            <circle r="20" fill="none" stroke="#004690" strokeWidth="0.5" strokeOpacity="0.18" />
            <circle r="4" fill="#004690" />
            <line x1="0" y1="4" x2="0" y2="16" stroke="#004690" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* ── Chennai ── */}
          <g transform="translate(238, 318)">
            <circle r="5" fill="#004690" fillOpacity="0.2" />
            <circle r="9" fill="none" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle r="2.5" fill="#004690" />
            <line x1="0" y1="2.5" x2="0" y2="10" stroke="#004690" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* ── Madurai ── */}
          <g transform="translate(185, 428)">
            <circle r="4" fill="#004690" fillOpacity="0.2" />
            <circle r="2" fill="#004690" />
            <line x1="0" y1="2" x2="0" y2="8" stroke="#004690" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* ── Salem ── */}
          <g transform="translate(196, 364)">
            <circle r="3" fill="#004690" fillOpacity="0.2" />
            <circle r="1.5" fill="#004690" />
          </g>

          {/* ── Trichy ── */}
          <g transform="translate(204, 400)">
            <circle r="3" fill="#004690" fillOpacity="0.2" />
            <circle r="1.5" fill="#004690" />
          </g>

          {/* ── Bangalore (Karnataka border) ── */}
          <g transform="translate(130, 346)">
            <circle r="3.5" fill="#004690" fillOpacity="0.15" />
            <circle r="1.5" fill="#004690" fillOpacity="0.6" />
          </g>

          {/* ── Route lines between cities ── */}
          {/* Coimbatore → Chennai */}
          <path
            d="M 162 390 C 190 370 218 344 238 318"
            fill="none"
            stroke="#004690"
            strokeWidth="1.2"
            strokeDasharray="5 4"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          {/* Coimbatore → Madurai */}
          <path
            d="M 162 390 C 170 408 178 418 185 428"
            fill="none"
            stroke="#004690"
            strokeWidth="1.2"
            strokeDasharray="5 4"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          {/* Salem → Coimbatore */}
          <path
            d="M 196 364 C 182 374 170 382 162 390"
            fill="none"
            stroke="#004690"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          {/* Trichy → Madurai */}
          <path
            d="M 204 400 C 198 412 192 420 185 428"
            fill="none"
            stroke="#004690"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
          {/* Chennai → Trichy */}
          <path
            d="M 238 318 C 228 348 218 374 204 400"
            fill="none"
            stroke="#004690"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
          {/* Bangalore → Coimbatore */}
          <path
            d="M 130 346 C 140 364 150 376 162 390"
            fill="none"
            stroke="#004690"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export function ServiceAreasSection() {
  return (
    <Section id="service-areas" background="white" className="relative py-8 lg:py-12 overflow-hidden">
      {/* Left-aligned India / Tamil Nadu map SVG — decorative only */}
      <IndiaMapSvg />

      <Container className="relative z-10">
        <AnimatedSection variant="fadeInUp" className="mb-10 text-center">
          <SectionHeading
            eyebrow="Where We Operate"
            title="Serving Across Tamil Nadu & Beyond"
            subtitle="We cover all major districts in Tamil Nadu and extend our services to Bangalore, Hyderabad, and Kerala."
          />
        </AnimatedSection>

        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 h-full"
        >
          {serviceAreas.map((area) => (
            <StaggerItem key={area.id}>
              <div
                className={cn(
                  "group relative flex flex-col items-center gap-2.5 rounded-2xl border p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md h-full",
                  area.isHQ
                    ? "border-brand-blue/30 bg-brand-blue/5 shadow-sm"
                    : "border-gray-100 bg-white shadow-sm hover:border-brand-blue/20"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    area.isHQ
                      ? "bg-brand-blue text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors"
                  )}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-sm font-bold",
                    area.isHQ ? "text-brand-blue" : "text-gray-800"
                  )}
                >
                  {area.name}
                </span>
                {area.isHQ && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-blue/70">
                    HQ
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
