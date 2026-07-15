// ============================================================
// SERVICES DATA — Centralized source of truth for all 8 services
// ============================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  image: string;
  imageAlt: string;
  href: string;
  colorVariant: "blue" | "navy" | "gold" | "green" | "purple" | "orange";
}

export const SERVICES: ServiceItem[] = [
  {
    id: "household-shifting",
    title: "Household Shifting",
    description:
      "Professional packing and moving for your entire home. Safe, secure, and stress-free relocation with our trained Tamil staff using premium packing materials.",
    shortDescription: "Complete home relocation with expert packing & care.",
    icon: "Home",
    image:
      "/packersandmovers30.png",
    imageAlt: "Professional household shifting service",
    href: "/services#household-shifting",
    colorVariant: "blue",
  },
  {
    id: "local-shifting",
    title: "Local Shifting",
    description:
      "Quick and affordable within-city moves handled by our experienced local team. Perfect for apartments, villas, and offices within the same city or district.",
    shortDescription: "Fast, affordable within-city moves.",
    icon: "MapPin",
    image:
      "/packersandmovers6.png",
    imageAlt: "Local shifting service",
    href: "/services#local-shifting",
    colorVariant: "navy",
  },
  {
    id: "office-relocation",
    title: "Office Relocation",
    description:
      "Zero-downtime business moves handled over weekends. We relocate IT equipment, furniture, and servers with full protection and system reinstallation.",
    shortDescription: "Zero downtime business & IT relocation.",
    icon: "Briefcase",
    image:
      "/packersandmovers28.png",
    imageAlt: "Office relocation service",
    href: "/services#office-relocation",
    colorVariant: "navy",
  },
  {
    id: "packing-services",
    title: "Packing Services",
    description:
      "Multi-layer premium packing with bubble wrap, foam, and reinforced cartons. Every item packed to survive long-distance transit without damage.",
    shortDescription: "Multi-layer premium packing for all items.",
    icon: "Package",
    image:
      "/packersandmovers8.png",
    imageAlt: "Professional packing services",
    href: "/services#packing-services",
    colorVariant: "gold",
  },
  {
    id: "car-transportation",
    title: "Car Transportation",
    description:
      "GPS-tracked enclosed car carriers for safe long-distance vehicle transport. Door-to-door pickup and delivery across Tamil Nadu and India.",
    shortDescription: "GPS-tracked enclosed carriers, door-to-door.",
    icon: "Car",
    image:
      "/packersandmovers25.png",
    imageAlt: "Car transportation service",
    href: "/services#car-transportation",
    colorVariant: "blue",
  },
  {
    id: "bike-transportation",
    title: "Bike Transportation",
    description:
      "Safe two-wheeler transport in fully enclosed carriers. We handle scooters, motorcycles, and sports bikes with dedicated tie-down systems.",
    shortDescription: "Safe enclosed two-wheeler transport.",
    icon: "Bike",
    image:
      "/packersandmovers15.png",
    imageAlt: "Bike transportation service",
    href: "/services#bike-transportation",
    colorVariant: "orange",
  },
  {
    id: "ac-installation",
    title: "AC Installation & Uninstallation",
    description:
      "Professional AC uninstallation at your old home and installation at your new location. Certified technicians handle split ACs, window ACs, and cassette units.",
    shortDescription: "Certified AC uninstall & reinstall service.",
    icon: "Wind",
    image:
      "/packersandmovers27.jpeg",
    imageAlt: "AC installation and uninstallation service",
    href: "/services#ac-installation",
    colorVariant: "green",
  },
  {
    id: "warehousing",
    title: "Warehousing",
    description:
      "24/7 CCTV-monitored secure storage facilities for short-term and long-term needs. Ideal during renovation, transit gaps, or business inventory management.",
    shortDescription: "24/7 CCTV-monitored secure storage.",
    icon: "Warehouse",
    image:
      "/packersandmovers18.png",
    imageAlt: "Secure warehousing service",
    href: "/services#warehousing",
    colorVariant: "purple",
  },
];

// Convenience export for service dropdown (id + label pairs)
export const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
}));
