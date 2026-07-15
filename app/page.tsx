import type { Metadata } from "next";
import { homeSEO } from "@/data/seo";
import { SITE_URL } from "@/lib/constants";
import { HeroSection } from "@/components/sections/home/HeroSection";
import dynamic from "next/dynamic";

const EditorialServices = dynamic(() => import("@/components/sections/home/EditorialServices").then(mod => mod.EditorialServices));
const RelocationJourney = dynamic(() => import("@/components/sections/home/RelocationJourney").then(mod => mod.RelocationJourney));
const WhyUsSection = dynamic(() => import("@/components/sections/home/WhyUsSection").then(mod => mod.WhyUsSection));
const ReviewsSection = dynamic(() => import("@/components/sections/home/ReviewsSection").then(mod => mod.ReviewsSection));
const ContactSection = dynamic(() => import("@/components/sections/home/ContactSection").then(mod => mod.ContactSection));
const CtaSection = dynamic(() => import("@/components/sections/home/CtaSection").then(mod => mod.CtaSection));
import { JsonLd } from "@/seo/JsonLd";
import { getLocalBusinessSchema } from "@/seo/schemas/localBusiness";
import { getWebSiteSchema } from "@/seo/schemas/website";
import { getOrganizationSchema } from "@/seo/schemas/organization";

export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={getLocalBusinessSchema()} />
      <JsonLd schema={getWebSiteSchema()} />
      <JsonLd schema={getOrganizationSchema()} />
      <HeroSection />
      <EditorialServices />
      <RelocationJourney />
      <WhyUsSection />
      <ReviewsSection />
      <ContactSection />
      <CtaSection />
    </>
  );
}
