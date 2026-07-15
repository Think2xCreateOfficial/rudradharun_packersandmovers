"use client";

import Image from "next/image";
import { teamMembers } from "@/data/about";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";

export function TeamSection() {
  return (
    <Section id="team" background="light" className="py-16 lg:py-24">
      <Container>
        <AnimatedSection variant="fadeInUp" className="mb-12 text-center">
          <SectionHeading
            eyebrow="Meet Our Team"
            title="The People Behind Every Move"
            subtitle="Our dedicated professionals combine expertise with genuine care to make your relocation stress-free."
          />
        </AnimatedSection>

        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <StaggerItem key={member.id}>
              <div className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{member.bio}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
