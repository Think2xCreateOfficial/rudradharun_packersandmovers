"use client";

import React from "react";
import { journeyHeading } from "@/data/home";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

// ---- Inline SVG Illustrations for each step ----
// Consistent line-art style, optimized for small sizes, logistics-themed

function IllustrationPhone() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="14" y="4" width="20" height="34" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="33" r="2" fill="currentColor" />
      <line x1="20" y1="9" x2="28" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Signal waves */}
      <path d="M30 18 Q35 18 35 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M32 14 Q40 14 40 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2" />
    </svg>
  );
}

function IllustrationInspection() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Magnifying glass */}
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
      <line x1="29" y1="29" x2="40" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* House inside glass */}
      <path d="M14 22 L20 16 L26 22 L26 27 L14 27 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="18" y="23" width="4" height="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IllustrationQuote() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="8" y="6" width="32" height="38" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle cx="34" cy="34" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
      <path d="M30 34 L33 37 L38 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllustrationPacking() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Box */}
      <rect x="8" y="18" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.5" />
      {/* Box lid open */}
      <path d="M8 18 L8 12 L40 12 L40 18" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Tape strip */}
      <rect x="19" y="12" width="10" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Packing tape on box */}
      <line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Bubble wrap pattern */}
      <circle cx="16" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="36" r="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Stars above */}
      <path d="M24 4 L25 7 L28 7 L25.5 9 L26.5 12 L24 10 L21.5 12 L22.5 9 L20 7 L23 7 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IllustrationLoading() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Truck body */}
      <rect x="4" y="20" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="2.5" />
      {/* Cab */}
      <path d="M32 30 L32 38 L44 38 L44 28 L38 20 L32 20 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Wheels */}
      <circle cx="12" cy="40" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="36" cy="40" r="5" stroke="currentColor" strokeWidth="2" />
      {/* Ramp */}
      <path d="M4 20 L0 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Box on ramp */}
      <rect x="-4" y="20" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" transform="rotate(-20 4 24)" />
      {/* Arrow going up ramp */}
      <path d="M6 16 L10 12 L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllustrationTransport() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Truck */}
      <rect x="2" y="18" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
      <path d="M28 26 L28 34 L42 34 L42 24 L36 18 L28 18 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="10" cy="36" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="36" r="5" stroke="currentColor" strokeWidth="2" />
      {/* GPS pin on top */}
      <path d="M24 6 Q24 2, 28 2 Q32 2, 32 6 Q32 10, 28 14 Q24 10, 24 6 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="6" r="2" fill="currentColor" fillOpacity="0.3" />
      {/* Signal dot */}
      <circle cx="28" cy="6" r="1" fill="currentColor" />
      {/* Road dashes */}
      <line x1="0" y1="43" x2="6" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="43" x2="16" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="43" x2="26" y2="43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IllustrationDelivery() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* House */}
      <path d="M8 24 L24 10 L40 24 L40 42 L8 42 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Door */}
      <rect x="19" y="30" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="2" />
      {/* Window */}
      <rect x="12" y="26" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Checkmark badge */}
      <circle cx="38" cy="14" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
      <path d="M34 14 L37 17 L42 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IllustrationSatisfaction() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Star */}
      <path d="M24 4 L28 16 L42 16 L31 24 L35 36 L24 28 L13 36 L17 24 L6 16 L20 16 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Inner star fill */}
      <path d="M24 10 L27 18 L36 18 L29 23 L32 31 L24 26 L16 31 L19 23 L12 18 L21 18 Z" fill="currentColor" fillOpacity="0.15" />
      {/* Thumbs up */}
      <path d="M18 40 Q18 44 22 44 L32 44 Q36 44 36 40 L36 36 Q36 34 34 34 L26 34 L26 28 Q26 26 24 26 Q22 26 22 28 L22 34 L18 34 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const STEP_ILLUSTRATIONS = [
  IllustrationPhone,
  IllustrationInspection,
  IllustrationQuote,
  IllustrationPacking,
  IllustrationLoading,
  IllustrationTransport,
  IllustrationDelivery,
  IllustrationSatisfaction,
];

const JOURNEY_STEPS = [
  { step: "01", title: "Customer Contact", description: "Reach us via phone or WhatsApp. Our team responds within minutes to understand your requirements.", color: "blue" },
  { step: "02", title: "Free Inspection", description: "Our expert visits your location to assess the volume and plan the move with complete accuracy.", color: "navy" },
  { step: "03", title: "Quotation", description: "Receive a transparent, itemized quote with zero hidden charges — guaranteed.", color: "blue" },
  { step: "04", title: "Packing", description: "Multi-layer premium packing using bubble wrap, foam sheets, and sturdy cartons to protect every item.", color: "navy" },
  { step: "05", title: "Loading", description: "Trained crew carefully loads all items using proper equipment, ensuring no scrapes or damage during loading.", color: "blue" },
  { step: "06", title: "Transportation", description: "GPS-tracked fleet transports your goods safely. Live tracking keeps you informed throughout transit.", color: "navy" },
  { step: "07", title: "Safe Delivery", description: "Your belongings arrive safely at your new location. Our team unloads and unpacks everything.", color: "blue" },
  { step: "08", title: "Customer Satisfaction", description: "100% satisfaction guaranteed. We don't leave until you're completely happy with the delivery.", color: "navy" },
];

const STEP_COLORS = {
  blue: { circle: "bg-brand-blue/10 border-brand-blue/30", icon: "text-brand-blue", dot: "bg-brand-blue", badge: "bg-brand-blue text-white" },
  navy: { circle: "bg-brand-navy/8 border-brand-navy/20", icon: "text-brand-navy", dot: "bg-brand-navy", badge: "bg-brand-navy text-white" },
};

export function RelocationJourney() {
  return (
    <Section id="journey" background="light" className="py-12 overflow-hidden">
      <Container>
        {/* Header */}
        <AnimatedSection variant="fadeInDown" className="mb-6 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            {journeyHeading.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {journeyHeading.title}
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-sm text-gray-500 leading-relaxed">
            A seamless 8-step process designed to make your move stress-free from the very first call.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Central vertical line — desktop */}
          <div className="absolute left-1/2 top-8 bottom-8 hidden w-px -translate-x-px bg-gradient-to-b from-brand-blue via-brand-blue/40 to-brand-blue sm:block z-4" />
          {/* Left-side line — mobile */}
          <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-brand-blue/60 to-brand-blue/10 sm:hidden" />

          <AnimatedSection variant="stagger" isStaggerParent className="flex flex-col gap-10 sm:gap-12">
            {JOURNEY_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const IllustrationSVG = STEP_ILLUSTRATIONS[index];
              const colors = STEP_COLORS[step.color as keyof typeof STEP_COLORS];

              return (
                <StaggerItem key={step.step}>
                  {/* ---- Mobile Layout (always left-aligned) ---- */}
                  <div className="flex items-start gap-5 sm:hidden">
                    {/* Icon Node */}
                    <div className="relative shrink-0 z-10">
                      <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl border-2 bg-white shadow-sm", colors.circle, colors.icon)}>
                        <IllustrationSVG />
                      </div>
                      {/* Step badge */}
                      <div className={cn("absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black", colors.badge)}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                      <p className={cn("mb-1 text-xs font-bold uppercase tracking-widest", colors.icon)}>Step {step.step}</p>
                      <h3 className="mb-2 text-base font-bold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* ---- Desktop Layout (alternating sides) ---- */}
                  <div className={cn("relative hidden items-center sm:flex", isEven ? "flex-row-reverse" : "flex-row")}>
                    {/* Content card (50% width on each side) */}
                    <div className={cn("w-[calc(50%-52px)] flex-shrink-0", isEven ? "pl-8 text-left" : "pr-8 text-right")}>
                      <div
                        className="group rounded-2xl bg-white p-7 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,70,144,0.12)]"
                      >
                        <p className={cn("mb-2 text-xs font-bold uppercase tracking-widest", colors.icon)}>
                          Step {step.step}
                        </p>
                        <h3 className="mb-2 text-lg font-bold text-gray-900 font-serif">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Central Icon Node */}
                    <div className="relative z-10 mx-4 flex-shrink-0">
                      {/* Connector dot on line */}
                      <div className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-4 ring-white", colors.dot)} />

                      <div className={cn("relative flex h-[88px] w-[88px] items-center justify-center rounded-2xl border-2 bg-white shadow-md p-4", colors.circle, colors.icon)}>
                        <IllustrationSVG />
                        {/* Step badge */}
                        <div className={cn("absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black shadow-sm", colors.badge)}>
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Empty spacer on opposite side */}
                    <div className="w-[calc(50%-52px)] flex-shrink-0" />
                  </div>
                </StaggerItem>
              );
            })}
          </AnimatedSection>

          {/* End marker */}
          <AnimatedSection variant="scaleIn" className="mt-12 flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue shadow-lg shadow-brand-blue/30">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Move Complete!</p>
              <p className="text-xs text-gray-400">Delivered safely to your new home</p>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
