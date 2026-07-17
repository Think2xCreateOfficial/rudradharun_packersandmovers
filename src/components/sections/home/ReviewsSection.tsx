"use client";

// =============================================================
// ReviewsSection — Premium Customer Testimonials
//
// Architecture decisions:
// • Senior-Level UI/UX: Premium glassmorphism design.
// • Cards use background blur, inner borders, and glowing
//   accents on hover to feel like high-end floating elements.
// • Typography: Elegant sans-serif layout with strong hierarchy.
// • All cards are strictly fixed at 400px tall.
// • Reads > 180 chars get a sleek modal.
// =============================================================

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote, X, ArrowRight } from "lucide-react";
import { REVIEWS } from "@/data/testimonials";
import { reviewsHeading } from "@/data/home";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const LONG_REVIEW_THRESHOLD = 180; // characters

// ─────────────────────────────────────────────────────────────
// Logistics-Themed Background Illustrations & Glowing Orbs
// ─────────────────────────────────────────────────────────────
function BackgroundIllustrations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Route dashed lines */}
      <svg className="absolute top-1/2 left-0 right-0 h-32 w-full text-white/[0.02]" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path d="M0 50 Q250 20 500 50 Q750 80 1000 50" stroke="currentColor" strokeWidth="2" strokeDasharray="12 8" fill="none" />
      </svg>

      {/* Premium Gradient Orbs */}
      <div className="absolute -top-[20%] -right-[10%] h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-blue/20 blur-[100px] opacity-60 mix-blend-screen" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[50vw] w-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-blue/15 blur-[120px] opacity-60 mix-blend-screen" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sleek Premium Modal
// ─────────────────────────────────────────────────────────────
interface ModalProps {
  review: typeof REVIEWS[number];
  avatarBg: string;
  initials: string;
  onClose: () => void;
}

function ReviewModal({ review, avatarBg, initials, onClose }: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  // Auto-focus close button on mount & set mounted for Portal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Slight delay to ensure portal is rendered
    setTimeout(() => {
      closeRef.current?.focus();
    }, 50);
  }, []);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent scroll on body robustly
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
    >
      {/* Deep Blur Backdrop */}
      <div
        className="absolute inset-0 bg-[#060c17]/80 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Premium Modal Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-[95vw] md:w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-3xl animate-fade-in-up"
      >
        {/* Glow behind modal */}
        <div className="absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-b from-brand-blue/20 to-transparent opacity-20 blur-xl" />

        {/* Close Button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          aria-label="Close review"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Rating */}
        <div className="mb-6 flex items-center gap-3" id={titleId}>
          <div className="flex text-amber-400 drop-shadow-sm" aria-label={`${review.rating} out of 5 stars`}>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
          </div>
          {review.verified && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {reviewsHeading.verifiedLabel}
            </span>
          )}
        </div>

        {/* Full review text */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[15px] leading-relaxed text-gray-200 sm:text-[17px] font-medium tracking-wide">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>

        {/* Author Footer */}
        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 text-sm font-bold text-white shadow-lg"
              style={{ backgroundColor: avatarBg }}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div>
              <p className="text-base font-bold text-white tracking-wide">{review.author}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-medium text-brand-blue tracking-wider uppercase">
                  {review.serviceUsed}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────
// Premium Glassmorphism Card
// ─────────────────────────────────────────────────────────────
function TestimonialCard({ review }: { review: typeof REVIEWS[number] }) {
  const [modalOpen, setModalOpen] = useState(false);

  const initials = review.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Generate a rich, saturated color for the avatar
  const hue = review.author.charCodeAt(0) * 45;
  const avatarBg = `hsl(${hue}, 70%, 45%)`;

  const isLong = review.text.length > LONG_REVIEW_THRESHOLD;

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/*
        Card: fixed 400px height.
        Uses a pseudo-element (before) for the subtle gradient border.
      */}
      <div
        className="group relative flex h-[400px] w-[85vw] sm:w-[380px] flex-col rounded-3xl bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1"
        aria-label={`Review by ${review.author}`}
      >
        {/* Gradient Border Illusion */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 transition-colors duration-300 group-hover:border-white/20 pointer-events-none" />
        
        {/* Subtle inner top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Decorative giant quote mark */}
        <Quote
          className="absolute right-6 top-6 h-16 w-16 text-white/[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:text-white/[0.05]"
          aria-hidden="true"
        />

        {/* ── Zone 1: Header ── */}
        <div className="mb-6 flex shrink-0 items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400 drop-shadow-sm">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <span className="text-xs font-bold text-white/60">
              {review.rating}.0
            </span>
          </div>
          {review.verified && (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.05)] border border-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {reviewsHeading.verifiedLabel}
            </div>
          )}
        </div>

        {/* ── Zone 2: Review Text ── */}
        <div className="flex flex-1 flex-col overflow-hidden z-10">
          <p className="line-clamp-5 text-[15px] leading-relaxed text-gray-300 sm:text-base font-medium">
            &ldquo;{review.text}&rdquo;
          </p>

          {isLong && (
            <button
              onClick={openModal}
              className="mt-1 self-start text-xs font-bold uppercase border-b border-transparent hover:border-brand-blue tracking-wider text-white transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:rounded pb-0.5"
              aria-label={`Read full review by ${review.author}`}
            >
              Read Full Story <ArrowRight className="inline-block w-4 h-4 ml-1 mb-0.5" />
            </button>
          )}
        </div>

        {/* ── Zone 3: Footer ── */}
        <div className="mt-4 shrink-0 pt-5 z-10 flex items-center h-[72px]">
          <div className="flex items-center gap-4 w-full">
            {/* Avatar */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg border border-white/20 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: avatarBg }}
              aria-hidden="true"
            >
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold tracking-wide text-white">
                {review.author}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[11px] font-semibold text-brand-blue uppercase tracking-wider">
                  {review.serviceUsed}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal portal */}
      {modalOpen && (
        <ReviewModal
          review={review}
          avatarBg={avatarBg}
          initials={initials}
          onClose={closeModal}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Reviews Section
// ─────────────────────────────────────────────────────────────
export function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Smooth Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // If reached the end, scroll back to start, else scroll right by 1 card
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Assume ~340px scroll amount per card
          container.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 3500); // Auto slide every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <Section id="reviews" background="navy" className="relative overflow-hidden py-6 lg:py-12">
      {/* Premium Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#020813]">
        <Image
          src="/packersandmovers24.jpg"
          fill
          className="object-cover opacity-[0.07] mix-blend-screen grayscale"
          alt="Reviews Background"
        />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020813_100%)] opacity-80" />
      </div>
      <BackgroundIllustrations />

      <Container className="relative z-10">
        {/* Header */}
        <AnimatedSection
          variant="fadeInUp"
          className="mb-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-blue drop-shadow-sm">
              {reviewsHeading.badge}
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Trusted by Families <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">
                Across Tamil Nadu
              </span>
            </h2>
          </div>
          
          {/* Navigation Controls (Desktop aligned with header) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-blue bg-brand-blue text-white shadow-[0_0_15px_rgba(1,118,211,0.4)] transition-all hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          onTouchStart={() => (isHovered.current = true)}
          onTouchEnd={() => {
            // Slight delay before resuming auto-scroll after touch
            setTimeout(() => (isHovered.current = false), 2000);
          }}
          role="list"
          aria-label="Customer testimonials"
          className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden  "
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              role="listitem"
              className="shrink-0 snap-center"
            >
              <TestimonialCard review={review} />
            </div>
          ))}
        </div>

        {/* Navigation Controls (Mobile aligned at bottom) */}
        <div className="mt-2 flex items-center justify-between sm:hidden">
          <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">
            Swipe to see more
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue bg-brand-blue text-white shadow-lg transition-all hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
