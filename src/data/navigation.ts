// ============================================================
// NAVIGATION DATA
// ============================================================

import type { NavItem, NavCTA } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
];

export const NAV_CTAS: NavCTA[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919XXXXXXXXX",
    variant: "whatsapp",
    icon: "MessageCircle",
  },
  {
    label: "Call Now",
    href: "tel:+9344717841",
    variant: "call",
    icon: "Phone",
  },
];

export const MOBILE_NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];
