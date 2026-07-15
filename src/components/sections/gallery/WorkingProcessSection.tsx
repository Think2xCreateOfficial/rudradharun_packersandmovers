"use client";

import Image from "next/image";

import { ClipboardCheck, PackageOpen, Truck, Map, Home, Box } from "lucide-react";
import { workingProcess } from "@/data/gallery";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const iconMap = [ClipboardCheck, PackageOpen, Truck, Map, Home, Box];

// Subtle logistics map pattern for the background
function MapPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="process-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="2.5" fill="#004690" />
          <path d="M 50 50 Q 80 20 100 50" fill="none" stroke="#004690" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M 0 50 Q 20 80 50 50" fill="none" stroke="#004690" strokeWidth="1" strokeDasharray="5 5" />
        </pattern>
        <radialGradient id="process-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopOpacity="1" />
          <stop offset="100%" stopOpacity="0" />
        </radialGradient>
        <mask id="process-mask">
          <rect width="100%" height="100%" fill="url(#process-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#process-pattern)" mask="url(#process-mask)" />
    </svg>
  );
}

export function WorkingProcessSection() {
  return (
    <Section id="process" background="white" className="relative py-6 lg:py-12 overflow-hidden">
      <MapPattern />
      <Container className="relative z-10">
        <AnimatedSection variant="fadeInUp" className="mb-14 text-center">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Relocation Journey"
            subtitle="A visual walkthrough of every step — from the first site inspection to your final settlement."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 relative">
          {/* Connector lines for desktop */}
          <div className="hidden lg:block absolute top-[25%] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -z-10" />
          <div className="hidden lg:block absolute top-[75%] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -z-10" />

          {workingProcess.map((step, i) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <div
                key={step.id}
                className="group relative flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-brand-blue/30 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Step Indicator & Icon */}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 group-hover:from-brand-blue/20 group-hover:to-brand-blue/10 transition-colors">
                  <Icon className="h-10 w-10 text-brand-blue" strokeWidth={1.5} />
                  <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-xs font-black text-brand-navy shadow-md ring-4 ring-white">
                    {step.step}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 mb-2">{step.description}</p>
                
                {/* Image snippet */}
                <div className="relative h-40 w-full mt-auto overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={step.image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={step.title}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
