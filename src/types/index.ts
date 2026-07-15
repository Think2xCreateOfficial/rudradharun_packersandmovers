// ============================================================
// RUDRA DHARUN PACKERS & MOVERS — Centralized Type Definitions
// ============================================================

// --------------- Navigation ---------------
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface NavCTA {
  label: string;
  href: string;
  variant: "whatsapp" | "call";
  icon?: string;
}

// --------------- Business ---------------
export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  workingHours: {
    weekdays: string;
    weekends: string;
    display: string;
  };
  mapEmbed: string;
  mapLink: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  ratings: {
    google: number;
    count: string;
    reviewCount: number;
  };
  founded: number;
  gst?: string;
  certifications: string[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

// --------------- Services ---------------
export type ServiceCategory =
  | "household"
  | "vehicle"
  | "office"
  | "warehouse"
  | "local"
  | "intercity";

export interface Service {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  imageAlt: string;
  features: string[];
  cta: string;
  href: string;
  badge?: string;
  isHighlighted?: boolean;
}

// --------------- Hero ---------------
export interface HeroData {
  headline: string;
  headlineParts: {
    normal: string;
    highlight: string;
    end: string;
  };
  subtext: string;
  googleBadge: {
    rating: number;
    label: string;
  };
  primaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  trustBadge: {
    count: string;
    label: string;
    sublabel: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
}

// --------------- Quote Form ---------------
export interface QuoteFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "date" | "textarea";
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface QuoteFormData {
  title: string;
  subtitle?: string;
  fields: QuoteFormField[];
  submitLabel: string;
  successMessage: string;
  disclaimer: string;
  disclaimerLink: string;
}

// --------------- Trust Strip ---------------
export interface TrustPartner {
  id: string;
  name: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
}

// --------------- Timeline ---------------
export interface TimelineStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  imageAlt?: string;
}

export interface HeritageTimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
  position: "top" | "bottom";
}

// --------------- Statistics / Why Us ---------------
export interface StatItem {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  color?: "navy" | "blue" | "gold" | "gray";
}

// --------------- Reviews ---------------
export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  source: "google" | "facebook" | "direct";
  verified?: boolean;
}

// --------------- Gallery ---------------
export type GalleryCategory =
  | "residential"
  | "corporate"
  | "vehicle"
  | "packing"
  | "warehouse";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  caption?: string;
  featured?: boolean;
}

export interface GalleryFilter {
  id: GalleryCategory | "all";
  label: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  description?: string;
}

// --------------- Team ---------------
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  bio?: string;
}

// --------------- Certifications ---------------
export interface Certification {
  id: string;
  name: string;
  shortName: string;
  description: string;
  logo: string;
  logoAlt: string;
}

// --------------- FAQ ---------------
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// --------------- Footer ---------------
export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

// --------------- SEO ---------------
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard: "summary" | "summary_large_image";
  noIndex?: boolean;
}

// --------------- Animation ---------------
export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "stagger";

export interface AnimationProps {
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

// --------------- Forms ---------------
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  moveType: string;
  movingFrom: string;
  movingTo: string;
  movingDate: string;
  message: string;
}

export interface QuoteRequestData {
  name: string;
  email: string;
  moveType: string;
  movingDate: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

// --------------- Button ---------------
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp"
  | "call"
  | "gold";

export type ButtonSize = "sm" | "md" | "lg";
