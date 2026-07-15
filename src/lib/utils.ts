import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTelLink(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

const defaultWhatsAppMessage = `Hi Rudra Dharun Packers and Movers,

I need a quotation for moving services.

Please share:
• Pricing
• Services included
• Availability

Thank you.`;

export function buildMovingWhatsAppLink(phone: string, text: string = defaultWhatsAppMessage) {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
