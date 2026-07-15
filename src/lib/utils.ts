import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTelLink(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function buildMovingWhatsAppLink(phone: string, text: string = "Hi, I need a quotation for moving services.") {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
