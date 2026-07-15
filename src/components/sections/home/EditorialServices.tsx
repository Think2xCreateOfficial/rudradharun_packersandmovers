"use client";

import { Home, MapPin, Briefcase, Package, Car, Bike, Wind, Warehouse } from "lucide-react";
import Image from "next/image";
import { SERVICES, type ServiceItem } from "@/data/services";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnimatedSection, StaggerItem } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=";

// Map service icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  MapPin,
  Briefcase,
  Package,
  Car,
  Bike,
  Wind,
  Warehouse,
};

// Color configurations for compact cards
const compactColorMap: Record<ServiceItem["colorVariant"], { bg: string; icon: string; badge: string }> = {
  blue:   { bg: "bg-brand-blue/8",  icon: "text-brand-blue",  badge: "bg-brand-blue/10 text-brand-blue" },
  navy:   { bg: "bg-brand-navy/8",  icon: "text-brand-navy",  badge: "bg-brand-navy/10 text-brand-navy" },
  gold:   { bg: "bg-gold-500/10",   icon: "text-gold-600",    badge: "bg-gold-400/15 text-gold-600" },
  green:  { bg: "bg-emerald-50",    icon: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700" },
  purple: { bg: "bg-violet-50",     icon: "text-violet-600",  badge: "bg-violet-50 text-violet-700" },
  orange: { bg: "bg-orange-50",     icon: "text-orange-600",  badge: "bg-orange-50 text-orange-700" },
};

// ---- Featured Card (Large) ----
function FeaturedServiceCard({ service }: { service: ServiceItem }) {

  return (
    <div
      className="group relative h-[380px] w-full overflow-hidden rounded-[2rem] bg-gray-900 shadow-sm sm:h-[460px] lg:h-full lg:min-h-[500px] transition-transform duration-300 hover:scale-[1.005]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover opacity-75"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Badge */}
      {/* <div className="absolute top-6 left-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white">
          <Icon className="h-3 w-3" />
          Featured Service
        </span>
      </div> */}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 lg:p-12">
        <h3 className="mb-3 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {service.title}
        </h3>
        <p className="mb-6 max-w-lg text-sm text-gray-300 sm:text-base leading-relaxed">
          {service.description}
        </p>
        {/* <Link
          href={service.href}
          className="inline-flex items-center gap-3 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-blue/90 hover:gap-4"
        >
          Get Free Quote
          <ArrowRight className="h-4 w-4" />
        </Link> */}
      </div>
    </div>
  );
}

// ---- Medium Card ----
function MediumServiceCard({ service, isDark = false }: { service: ServiceItem; isDark?: boolean }) {
  const Icon = iconMap[service.icon] || Package;

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[220px] overflow-hidden rounded-[2rem] shadow-sm sm:min-h-[240px] transition-transform duration-200 hover:-translate-y-1",
        isDark ? "bg-[#1E3A5F]" : "bg-gray-50 border border-gray-100"
      )}
    >
      {/* Text side */}
      <div className={cn("flex w-3/5 flex-col justify-center p-6 sm:p-8 z-20", isDark ? "text-white" : "text-gray-900")}>
        <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-full", isDark ? "bg-white/10 text-white" : "bg-white shadow-sm border border-gray-100 text-brand-blue")}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className={cn("font-serif text-xl font-bold sm:text-2xl mb-2", isDark ? "" : "text-gray-900")}>
          {service.title}
        </h3>
        <p className={cn("text-xs mb-5 leading-relaxed", isDark ? "text-blue-100/80" : "text-gray-500")}>
          {service.shortDescription}
        </p>
        {/* <Link
          href={service.href}
          className={cn("mt-auto transition-colors group-hover:translate-x-1 inline-block", isDark ? "text-blue-300 hover:text-white" : "text-gray-400 hover:text-brand-blue")}
          aria-label={`Learn more about ${service.title}`}
        >
          <ArrowRight className="h-5 w-5" />
        </Link> */}
      </div>

      {/* Image side — diagonal cut */}
      <div className={cn("absolute inset-y-0 right-0 w-2/5 overflow-hidden rounded-l-[4rem] z-10", isDark ? "border-l-4 border-[#1E3A5F]" : "border-l-4 border-white")}>
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className={cn("object-cover", isDark && "opacity-90 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500")}
          sizes="25vw"
        />
      </div>
    </div>
  );
}

// ---- Compact Card ----
function CompactServiceCard({ service }: { service: ServiceItem }) {
  const Icon = iconMap[service.icon] || Package;
  const colors = compactColorMap[service.colorVariant];

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-blue/20 hover:shadow-md hover:-translate-y-1 h-full"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-50">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover opacity-[.8] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.25] mix-blend-luminosity"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/60 to-transparent transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm border border-white/50 backdrop-blur-sm", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>

        <h3 className="mb-1.5 text-base font-bold text-gray-900 leading-tight group-hover:text-brand-blue transition-colors duration-300">{service.title}</h3>
        <p className="flex-1 text-xs text-gray-600 leading-relaxed font-medium">{service.shortDescription}</p>
      </div>
    </div>
  );
}

// ---- Main Section ----
export function EditorialServices() {
  // Services array: [0] featured, [1] medium-light, [2] medium-dark, [3-7] compact
  const [featured, mediumLight, mediumDark, ...compactServices] = SERVICES;

  return (
    <Section id="services" background="white" className="py-12">
      <Container>
        {/* Section Header */}
        <AnimatedSection variant="fadeInUp" className="mb-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
                What We Offer
              </p>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Our Packers Movers Services
              </h2>
            </div>
            <p className="max-w-sm text-sm text-gray-500 leading-relaxed lg:text-right">
              Professional relocation solutions across Tamil Nadu — from single items to full office moves.
            </p>
          </div>
        </AnimatedSection>

        {/* Primary Grid: Featured (left) + 2 Medium (right) */}
        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-5 mb-5"
        >
          {/* Featured — takes 7/12 columns */}
          <StaggerItem className="lg:col-span-7 xl:col-span-7">
            <FeaturedServiceCard service={featured} />
          </StaggerItem>

          {/* Two medium cards stacked — takes 5/12 columns */}
          <div className="flex flex-col gap-5 lg:col-span-5 xl:col-span-5">
            <StaggerItem className="flex-1">
              <MediumServiceCard service={mediumLight} isDark={false} />
            </StaggerItem>
            <StaggerItem className="flex-1">
              <MediumServiceCard service={mediumDark} isDark={true} />
            </StaggerItem>
          </div>
        </AnimatedSection>

        {/* Compact Cards Row — remaining 5 services */}
        <AnimatedSection
          variant="stagger"
          isStaggerParent
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {compactServices.map((service) => (
            <StaggerItem key={service.id}>
              <CompactServiceCard service={service} />
            </StaggerItem>
          ))}
        </AnimatedSection>

        {/* View All Services CTA */}
        {/* <AnimatedSection variant="fadeInUp" className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection> */}
      </Container>
    </Section>
  );
}
