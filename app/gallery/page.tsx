import type { Metadata } from "next";
import { gallerySEO } from "@/data/seo";
import { galleryHero } from "@/data/gallery";
import { SITE_URL } from "@/lib/constants";
import { PageHero } from "@/components/shared/PageHero";
import dynamic from "next/dynamic";

const GalleryGrid = dynamic(() => import("@/components/sections/gallery/GalleryGrid").then(mod => mod.GalleryGrid));
const WorkingProcessSection = dynamic(() => import("@/components/sections/gallery/WorkingProcessSection").then(mod => mod.WorkingProcessSection));
const ContactSection = dynamic(() => import("@/components/sections/home/ContactSection").then(mod => mod.ContactSection));
const CTASection = dynamic(() => import("@/components/shared/cta/CTASection").then(mod => mod.CTASection));

export const metadata: Metadata = {
  title: gallerySEO.title,
  description: gallerySEO.description,
  keywords: gallerySEO.keywords,
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    title: gallerySEO.title,
    description: gallerySEO.description,
    url: `${SITE_URL}/gallery`,
    siteName: "Rudra Dharun Packers and Movers",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={galleryHero.eyebrow}
        title={galleryHero.title}
        subtitle={galleryHero.subtitle}
        breadcrumbs={galleryHero.breadcrumbs}
        image={galleryHero.image}
        imageAlt={galleryHero.imageAlt}
        align="center"
      />
      <GalleryGrid />
      <WorkingProcessSection />
      <ContactSection />
      <CTASection />
    </>
  );
}
