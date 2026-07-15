import type { Metadata } from "next";
import { aboutSEO } from "@/data/seo";
import { aboutHero } from "@/data/about";
import { SITE_URL } from "@/lib/constants";
import { PageHero } from "@/components/shared/PageHero";
import dynamic from "next/dynamic";

const CompanyStorySection = dynamic(() => import("@/components/sections/about/CompanyStorySection").then(mod => mod.CompanyStorySection));
const StatsSection = dynamic(() => import("@/components/sections/about/StatsSection").then(mod => mod.StatsSection));
const ServiceAreasSection = dynamic(() => import("@/components/sections/about/ServiceAreasSection").then(mod => mod.ServiceAreasSection));
const TrustSection = dynamic(() => import("@/components/sections/about/TrustSection").then(mod => mod.TrustSection));
const ContactSection = dynamic(() => import("@/components/sections/home/ContactSection").then(mod => mod.ContactSection));
const CTASection = dynamic(() => import("@/components/shared/cta/CTASection").then(mod => mod.CTASection));

export const metadata: Metadata = {
  title: aboutSEO.title,
  description: aboutSEO.description,
  keywords: aboutSEO.keywords,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: aboutSEO.title,
    description: aboutSEO.description,
    url: `${SITE_URL}/about`,
    siteName: "Rudra Dharun Packers and Movers",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        subtitle={aboutHero.subtitle}
        breadcrumbs={aboutHero.breadcrumbs}
        image={aboutHero.image}
        imageAlt={aboutHero.imageAlt}
        cta={aboutHero.cta}
      />
      <CompanyStorySection />
      <StatsSection />
      <ServiceAreasSection />
      {/* <TeamSection /> */}
      <TrustSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
