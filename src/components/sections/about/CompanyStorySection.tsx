"use client";

import Image from "next/image";
import { companyStory } from "@/data/about";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function CompanyStorySection() {
  return (
    <Section id="story" background="white" className="py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Content */}
          <AnimatedSection variant="slideInLeft">
            <SectionHeading
              eyebrow={companyStory.eyebrow}
              title={companyStory.title}
              align="left"
              className="mb-6"
            />
            <div className="space-y-4">
              {companyStory.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-gray-600">
                  {p}
                </p>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-blue/15 bg-brand-blue/5 p-5">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-brand-blue">
                  Our Mission
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {companyStory.mission}
                </p>
              </div>
              <div className="rounded-2xl border border-gold-400/30 bg-gold-400/5 p-5">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-gold-600">
                  Our Vision
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {companyStory.vision}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-6 flex flex-wrap gap-3">
              {companyStory.values.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-blue" />
                  <span className="text-xs font-bold text-gray-800">{v.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Founder visual */}
          <AnimatedSection variant="slideInRight">
            <div className="relative">
              {/* Main image */}
              <div className="relative h-[480px] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-navy/10">
                <Image
                  src={companyStory.founderImage}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-top"
                  alt={`${companyStory.founderName} – ${companyStory.founderTitle}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                {/* Name card */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-xl bg-white/15 p-4 backdrop-blur-md border border-white/20">
                    <p className="font-bold text-white">{companyStory.founderName}</p>
                    <p className="text-sm font-bold text-gray-50">{companyStory.founderTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </Section>
  );
}
