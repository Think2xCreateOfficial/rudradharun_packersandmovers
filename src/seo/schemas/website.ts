import { SITE_URL } from "@/lib/constants";
import { BUSINESS } from "@/data/business";

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: SITE_URL,
    description: "Premium and secure packers and movers services in Tamil Nadu.",
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Rudra_Dhrun_logo.png`,
      },
    },
  };
}
