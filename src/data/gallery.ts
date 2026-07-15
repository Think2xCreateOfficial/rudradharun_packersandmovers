// ============================================================
// GALLERY PAGE DATA — Single source of truth
// ============================================================

export type GalleryCategory =
  | "all"
  | "household"
  | "office"
  | "packing"
  | "loading"
  | "transport"
  | "vehicle"
  | "warehouse";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
  width: number;
  height: number;
}

// ---- SEO ----
export const gallerySEO = {
  title: "Gallery | Rudra Dharun Packers and Movers – See Our Work",
  description:
    "Browse our gallery of professional packing, loading, transport, and relocation projects across Tamil Nadu. 1200+ successful moves documented.",
  keywords: [
    "packers movers gallery Coimbatore",
    "moving photos Tamil Nadu",
    "relocation pictures",
    "packing gallery",
  ],
};

// ---- Hero ----
export const galleryHero = {
  eyebrow: "Our Work in Pictures",
  title: "Every Move Tells a Story",
  subtitle:
    "From careful packing to final delivery — see how we handle every relocation with precision, care, and professionalism.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
  ],
  image: "/packersandmovers5.png",
  imageAlt: "Professional packing and moving team",
};

// ---- Filter Tabs ----
export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "household", label: "Household Shifting" },
  { value: "office", label: "Office Relocation" },
  { value: "packing", label: "Packing" },
  { value: "loading", label: "Loading" },
  { value: "transport", label: "Transportation" },
  { value: "vehicle", label: "Vehicle Transport" },
  { value: "warehouse", label: "Warehouse" },
];

// ---- Images — mapped to existing public assets ----
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/packersandmovers14.png", alt: "Professional movers at work", category: "household", caption: "Household Shifting – Coimbatore", width: 800, height: 600 },
  { id: "g2", src: "/packersandmovers11.png", alt: "Expert packing team", category: "packing", caption: "Secure Packing with Bubble Wrap", width: 800, height: 600 },
  { id: "g3", src: "/packersandmovers5.png", alt: "Furniture loading into truck", category: "loading", caption: "Careful Loading Process", width: 800, height: 534 },
  { id: "g4", src: "/packersandmovers16.png", alt: "Moving truck transport", category: "transport", caption: "GPS-Tracked Fleet in Transit", width: 800, height: 600 },
  { id: "g5", src: "/packersandmovers17.png", alt: "Professional packers and movers", category: "household", caption: "2BHK Household Move – Salem", width: 800, height: 600 },
  { id: "g6", src: "/packersandmovers28.png", alt: "Office relocation setup", category: "office", caption: "IT Office Relocation Weekend", width: 800, height: 600 },
  { id: "g7", src: "/packersandmovers10.png", alt: "Large office move with equipment", category: "office", caption: "Corporate Office Move – Chennai", width: 800, height: 600 },
  { id: "g8", src: "/packersandmovers8.png", alt: "Careful packing of fragile items", category: "packing", caption: "Antique & Fragile Item Packing", width: 800, height: 600 },
  { id: "g9", src: "/packersandmovers25.png", alt: "Car transportation enclosed carrier", category: "vehicle", caption: "Enclosed Car Transport Service", width: 800, height: 600 },
  { id: "g10", src: "/packersandmovers15.png", alt: "Bike transportation service", category: "vehicle", caption: "Bike Transport – Coimbatore to Chennai", width: 800, height: 600 },
  { id: "g11", src: "/packersandmovers27.jpeg", alt: "AC uninstallation service", category: "household", caption: "AC Uninstall & Reinstall Service", width: 800, height: 600 },
  { id: "g12", src: "/packersandmovers18.png", alt: "Secure warehouse facility", category: "warehouse", caption: "24/7 CCTV Monitored Warehouse", width: 800, height: 600 },
  { id: "g13", src: "/packersandmovers13.png", alt: "Team loading boxes into truck", category: "loading", caption: "Systematic Loading by Expert Team", width: 800, height: 600 },
  { id: "g14", src: "/packersandmovers12.png", alt: "Long-distance transport", category: "transport", caption: "Long-Distance Transport to Bangalore", width: 800, height: 600 },
  { id: "g15", src: "/packersandmovers9.png", alt: "Packing materials used", category: "packing", caption: "Premium Packing Materials", width: 800, height: 600 },
  { id: "g16", src: "/packersandmovers7.png", alt: "Household shifting in progress", category: "household", caption: "Villa Move – Coimbatore", width: 800, height: 600 },
  { id: "g17", src: "/packersandmovers29.png", alt: "Moving team packing furniture", category: "packing", caption: "Furniture Wrapping & Protection", width: 800, height: 600 },
  { id: "g18", src: "/packersandmovers20.png", alt: "Office equipment relocation", category: "office", caption: "Commercial Furniture Relocation", width: 800, height: 600 },
  { id: "g19", src: "/packersandmovers6.png", alt: "Local household move", category: "household", caption: "Local Moving Services", width: 800, height: 600 },
  { id: "g20", src: "/packersandmovers19.png", alt: "Specialized vehicle carrier", category: "vehicle", caption: "Safe Bike & Car Transport", width: 800, height: 600 },
];

// ---- Working Process ----
export const workingProcess = [
  { id: "wp1", step: "01", title: "Site Inspection", description: "Our team visits your location for a thorough assessment.", image: "/packersandmovers29.png" },
  { id: "wp2", step: "02", title: "Expert Packing", description: "Multi-layer packing for every item, big or small.", image: "/packersandmovers10.png" },
  { id: "wp3", step: "03", title: "Safe Loading", description: "Systematic, furniture-safe loading techniques used.", image: "/packersandmovers13.png" },
  { id: "wp4", step: "04", title: "GPS Transport", description: "Real-time tracked transit with care and speed.", image: "/gps.jpg" },
  { id: "wp5", step: "05", title: "Delivery", description: "On-time delivery to your new home or office.", image: "/packersandmovers14.png" },
  { id: "wp6", step: "06", title: "Unpacking", description: "We unpack, arrange, and ensure you are settled in.", image: "/packersandmovers28.png" },
];
