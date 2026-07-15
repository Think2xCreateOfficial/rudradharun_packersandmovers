import { SITE_URL } from "@/lib/constants";
import { BUSINESS } from "@/data/business";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/Rudra_Dhrun_logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "ta"],
    },
    sameAs: [
      // Add social links here if available
    ],
  };
}
