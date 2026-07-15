"use client";

// Re-export from shared component library for backward compatibility
// The canonical implementation lives in: src/components/shared/cta/CTASection.tsx
import { CTASection } from "@/components/shared/cta/CTASection";
import { homeCta } from "@/data/home";

export function CtaSection() {
  return (
    <CTASection
      title={homeCta.title}
      subtitle={homeCta.subtitle}
      description={homeCta.description}
      callLabel={homeCta.callLabel}
      whatsappLabel={homeCta.quoteLabel}
    />
  );
}
