"use client";

import { aboutStats } from "@/data/about";
import { useCounter } from "@/hooks/useCounter";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter({ end: value, duration: 2000 });

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="font-serif text-4xl font-black text-white sm:text-5xl"
      >
        {count.toLocaleString()}
        <span className="text-gold-400">{suffix}</span>
      </span>
      <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-200">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  return (
    <Section id="stats" background="navy" className="py-8 lg:py-12">
      <Container>
        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4"
        >
          {aboutStats.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCard value={stat.value} suffix={stat.suffix} label={stat.label} />
            </StaggerItem>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
