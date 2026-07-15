"use client";

import { Home, Package, IndianRupee, Clock, Users, Truck, HeartHandshake, ShieldCheck } from "lucide-react";
import { trustFactors } from "@/data/about";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Package,
  IndianRupee,
  Clock,
  Users,
  Truck,
  HeartHandshake,
  ShieldCheck,
};

// =============================================================
// TrustFullBackground — Full-section logistics illustration.
// Covers the entire section with a rich, warm-toned SVG scene:
//   • Large delivery truck driving left-to-right
//   • Stacked cargo boxes on both sides
//   • Warehouse silhouette in the middle-bottom
//   • GPS network connecting city nodes
//   • Repeating cargo-rail dashes along the bottom
// All groups at very low opacity. The background tint of the
// section (#F8FAFC / bg-slate-50) keeps cards always legible.
// =============================================================
function TrustFullBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 500"
    >
      <defs>
        {/* Very subtle brand-blue tint across the whole bg */}
        <linearGradient id="tbg-tint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.4" />
        </linearGradient>

        {/* Vignette — fade edges so SVG blends with bg-light */}
        <radialGradient id="tbg-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="30%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      {/* ── Subtle background wash ── */}
      <rect width="1200" height="500" fill="url(#tbg-tint)" />

      {/* ── All decorative elements — very low opacity ── */}
      <g opacity="0.065">

        {/* ════ LARGE DELIVERY TRUCK (left → centre) ════ */}
        <g transform="translate(50, 160)">
          {/* Trailer */}
          <rect x="0" y="0" width="260" height="130" rx="6" fill="#004690" fillOpacity="0.08" stroke="#004690" strokeWidth="2" />
          {/* Cab */}
          <rect x="260" y="20" width="110" height="110" rx="6" fill="#004690" fillOpacity="0.06" stroke="#004690" strokeWidth="2" />
          {/* Windscreen */}
          <rect x="268" y="28" width="70" height="54" rx="4" fill="none" stroke="#004690" strokeWidth="1.5" />
          {/* Side mirror */}
          <rect x="368" y="28" width="10" height="18" rx="2" fill="none" stroke="#004690" strokeWidth="1" />
          {/* Exhaust pipe */}
          <rect x="370" y="14" width="8" height="20" rx="4" fill="none" stroke="#004690" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="50" cy="130" r="32" fill="none" stroke="#004690" strokeWidth="2.5" />
          <circle cx="50" cy="130" r="16" fill="none" stroke="#004690" strokeWidth="1" />
          <circle cx="180" cy="130" r="32" fill="none" stroke="#004690" strokeWidth="2.5" />
          <circle cx="180" cy="130" r="16" fill="none" stroke="#004690" strokeWidth="1" />
          <circle cx="318" cy="130" r="28" fill="none" stroke="#004690" strokeWidth="2.5" />
          <circle cx="318" cy="130" r="14" fill="none" stroke="#004690" strokeWidth="1" />
          {/* Trailer cargo lines */}
          <line x1="65" y1="0" x2="65" y2="130" stroke="#004690" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="130" y1="0" x2="130" y2="130" stroke="#004690" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="195" y1="0" x2="195" y2="130" stroke="#004690" strokeWidth="1" strokeOpacity="0.4" />
          {/* Speed lines */}
          <line x1="-20" y1="50" x2="-70" y2="50" stroke="#004690" strokeWidth="2" strokeLinecap="round" />
          <line x1="-20" y1="66" x2="-80" y2="66" stroke="#004690" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-20" y1="80" x2="-60" y2="80" stroke="#004690" strokeWidth="1" strokeLinecap="round" />
          {/* Company logo box on trailer */}
          <rect x="80" y="24" width="90" height="60" rx="4" fill="none" stroke="#004690" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="125" y1="24" x2="125" y2="84" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="80" y1="54" x2="170" y2="54" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
        </g>

        {/* ════ STACKED BOXES — top-right ════ */}
        <g transform="translate(920, 60)">
          {/* Bottom box — large */}
          <rect x="0" y="80" width="130" height="100" rx="4" fill="#004690" fillOpacity="0.05" stroke="#004690" strokeWidth="2" />
          <line x1="65" y1="80" x2="65" y2="180" stroke="#004690" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="0" y1="130" x2="130" y2="130" stroke="#004690" strokeWidth="1" strokeOpacity="0.35" />
          {/* Tape strap bottom box */}
          <path d="M0 120 Q65 112 130 120" fill="none" stroke="#004690" strokeWidth="2" strokeOpacity="0.5" />
          {/* Middle box */}
          <rect x="14" y="30" width="102" height="52" rx="4" fill="#004690" fillOpacity="0.05" stroke="#004690" strokeWidth="2" />
          <line x1="65" y1="30" x2="65" y2="82" stroke="#004690" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="14" y1="56" x2="116" y2="56" stroke="#004690" strokeWidth="1" strokeOpacity="0.35" />
          {/* Tape strap middle box */}
          <path d="M14 50 Q65 44 116 50" fill="none" stroke="#004690" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Top box — small */}
          <rect x="30" y="0" width="70" height="32" rx="4" fill="#004690" fillOpacity="0.05" stroke="#004690" strokeWidth="1.5" />
          <line x1="65" y1="0" x2="65" y2="32" stroke="#004690" strokeWidth="1" strokeOpacity="0.3" />
        </g>

        {/* ════ SMALL PACKAGE CLUSTER — bottom-left ════ */}
        <g transform="translate(500, 330)">
          <rect x="0" y="30" width="64" height="54" rx="3" fill="none" stroke="#004690" strokeWidth="1.5" />
          <polyline points="0,30 32,0 64,30" fill="none" stroke="#004690" strokeWidth="1.5" />
          <line x1="32" y1="0" x2="32" y2="30" stroke="#004690" strokeWidth="1" />
          <line x1="16" y1="42" x2="48" y2="42" stroke="#004690" strokeWidth="1" />
          {/* Small box beside */}
          <rect x="72" y="46" width="44" height="38" rx="3" fill="none" stroke="#004690" strokeWidth="1.5" />
          <polyline points="72,46 94,28 116,46" fill="none" stroke="#004690" strokeWidth="1.5" />
        </g>

        {/* ════ WAREHOUSE SILHOUETTE — centre-bottom ════ */}
        <g transform="translate(490, 290)">
          {/* Building */}
          <rect x="0" y="60" width="220" height="160" fill="#004690" fillOpacity="0.04" stroke="#004690" strokeWidth="2" />
          {/* Gabled roof */}
          <polyline points="-16,60 110,8 236,60" fill="none" stroke="#004690" strokeWidth="2" />
          {/* Large roller door */}
          <rect x="70" y="120" width="80" height="100" rx="2" fill="none" stroke="#004690" strokeWidth="1.5" />
          <line x1="70" y1="140" x2="150" y2="140" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="70" y1="158" x2="150" y2="158" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="70" y1="176" x2="150" y2="176" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="70" y1="194" x2="150" y2="194" stroke="#004690" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Windows */}
          <rect x="14" y="82" width="40" height="28" rx="2" fill="none" stroke="#004690" strokeWidth="1" />
          <rect x="166" y="82" width="40" height="28" rx="2" fill="none" stroke="#004690" strokeWidth="1" />
          {/* Chimney / vent */}
          <rect x="155" y="28" width="14" height="34" rx="2" fill="none" stroke="#004690" strokeWidth="1" />
        </g>

        {/* ════ GPS CITY NODES + NETWORK ════ */}
        {([
          [120, 80],
          [380, 50],
          [640, 90],
          [880, 70],
          [1100, 100],
          [200, 420],
          [720, 440],
          [1050, 410],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="6" fill="none" stroke="#004690" strokeWidth="1.2" />
            <circle r="2.5" fill="#004690" />
            <circle r="11" fill="none" stroke="#004690" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="0" y1="6" x2="0" y2="17" stroke="#004690" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        ))}

        {/* Network lines between nodes */}
        <path d="M 120 80 Q 250 40 380 50" fill="none" stroke="#004690" strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.35" />
        <path d="M 380 50 Q 510 70 640 90" fill="none" stroke="#004690" strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.35" />
        <path d="M 640 90 Q 760 70 880 70" fill="none" stroke="#004690" strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.35" />
        <path d="M 880 70 Q 990 85 1100 100" fill="none" stroke="#004690" strokeWidth="0.8" strokeDasharray="6 5" strokeOpacity="0.35" />

        {/* ════ ROAD / CARGO RAIL LINES AT BOTTOM ════ */}
        <line x1="0" y1="470" x2="1200" y2="470" stroke="#004690" strokeWidth="2" strokeOpacity="0.3" />
        <line x1="0" y1="478" x2="1200" y2="478" stroke="#004690" strokeWidth="1" strokeOpacity="0.15" />
        {/* Dashed centre-line */}
        <line x1="0" y1="474" x2="1200" y2="474" stroke="#004690" strokeWidth="1.5" strokeDasharray="20 15" strokeOpacity="0.25" />

        {/* ════ FAINT DOT GRID OVERLAY ════ */}
        {([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as number[]).map((col) =>
          ([0, 1, 2, 3, 4] as number[]).map((row) => (
            <circle
              key={`tg-${col}-${row}`}
              cx={col * 130 + 40}
              cy={row * 100 + 30}
              r="1.5"
              fill="#004690"
              fillOpacity="0.2"
            />
          ))
        )}
      </g>

      {/* ── Vignette overlay — keeps card area visible ── */}
      <rect width="1200" height="500" fill="url(#tbg-vignette)" />
    </svg>
  );
}

export function TrustSection() {
  return (
    <Section id="trust" background="light" className="relative py-12 lg:py-16 overflow-hidden">
      {/* Full-section logistics background illustration */}
      <TrustFullBackground />

      <Container className="relative z-10">
        <AnimatedSection variant="fadeInUp" className="mb-12 text-center">
          <SectionHeading
            eyebrow="Why Customers Trust Us"
            title="Our Commitment to Excellence"
            subtitle="We provide reliable, safe, and transparent relocation services across South India."
          />
        </AnimatedSection>

        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 h-full"
        >
          {trustFactors.map((factor) => {
            const Icon = iconMap[factor.icon] || ShieldCheck;
            return (
              <StaggerItem key={factor.id} className="h-full">
                <div className="group flex h-full flex-col items-start gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-blue/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 group-hover:from-brand-blue/20 group-hover:to-brand-blue/10 transition-colors">
                    <Icon className="h-7 w-7 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900 text-base">{factor.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{factor.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
