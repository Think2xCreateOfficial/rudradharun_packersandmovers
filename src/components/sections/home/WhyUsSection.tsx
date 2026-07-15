"use client";

import React from "react";
import { 
  ShieldCheck, Users, Banknote, MapPin, 
  Home, Warehouse, Clock, PhoneCall 
} from "lucide-react";
import { whyUsFeatures, whyUsHeading } from "@/data/home";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Users, Banknote, MapPin, 
  Home, Warehouse, Clock, PhoneCall
};

export function WhyUsSection() {
  return (
    <Section id="why-us" background="white" className="py-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-96 w-96 rounded-full bg-gold-400/5 blur-3xl" />

      <Container className="relative z-10">
        <AnimatedSection variant="fadeInUp" className="mb-6 text-center">
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {whyUsHeading.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            {whyUsHeading.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection 
          variant="stagger" 
          isStaggerParent 
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6"
        >
          {whyUsFeatures.map((feature) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            
            return (
              <StaggerItem key={feature.id}>
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-blue/20"
                >
                  {/* Subtle Background Graphic */}
                  <div className="absolute -right-4 -top-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.05]">
                    <Icon className="h-32 w-32" />
                  </div>

                  {/* Icon Wrapper */}
                  <div className={cn(
                    "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl relative",
                    feature.color === 'blue' ? "bg-brand-blue/10 text-brand-blue" :
                    feature.color === 'navy' ? "bg-brand-navy/10 text-brand-navy" :
                    "bg-gold-500/10 text-gold-600"
                  )}>
                    <Icon className="h-6 w-6 relative z-10" />
                    
                    {/* Hover Accent Dot */}
                    <div className={cn(
                      "absolute -right-1 -top-1 h-3 w-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100",
                      feature.color === 'blue' ? "bg-brand-blue" :
                      feature.color === 'navy' ? "bg-brand-navy" :
                      "bg-gold-500"
                    )} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className={cn(
                    "absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full",
                    feature.color === 'blue' ? "bg-brand-blue" :
                    feature.color === 'navy' ? "bg-brand-navy" :
                    "bg-gold-500"
                  )} />
                </div>
              </StaggerItem>
            );
          })}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
