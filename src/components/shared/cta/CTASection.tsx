"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { buildMovingWhatsAppLink, formatTelLink } from "@/lib/utils";

// Official WhatsApp SVG icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}


interface CTASectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  callLabel?: string;
  whatsappLabel?: string;
}

export function CTASection({
  title = "Ready to Move",
  subtitle = "Without Stress?",
  description = "Get professional packing, damage-free transit, and a fast quotation.",
  callLabel = "Call Now",
  whatsappLabel = "WhatsApp Us",
}: CTASectionProps) {
  const whatsappLink = buildMovingWhatsAppLink(BUSINESS.whatsapp);
  const callLink = formatTelLink(BUSINESS.phone);

  return (
    <section id="cta" className="relative overflow-hidden bg-white">
      <div className="relative overflow-hidden rounded-tr- rounded-tl- bg-brand-navy px-6 py-16 shadow-2xl">

        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/packersandmovers24.jpg"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            alt="Moving Services CTA Background"
          />
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gold-400/10 blur-3xl" />
          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Logistics illustration — low opacity background */}
        {/* <div className="pointer-events-none absolute bottom-0 right-0 w-80 text-white/5 lg:w-96" aria-hidden="true">
          <TruckIllustration />
        </div> */}
        <div className="pointer-events-none absolute -top-4 -left-8 w-48 rotate-12 text-white/5 opacity-60" aria-hidden="true">
          {/* Moving box outline */}
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="5" y="15" width="90" height="60" rx="3" stroke="currentColor" strokeWidth="3" />
            <path d="M5 38 L95 38" stroke="currentColor" strokeWidth="2" />
            <path d="M38 15 L38 38" stroke="currentColor" strokeWidth="2" />
            <path d="M62 15 L62 38" stroke="currentColor" strokeWidth="2" />
            {/* Tape strip */}
            <rect x="38" y="15" width="24" height="23" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <AnimatedSection variant="fadeInUp">
              <h2 className="font-serif text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                {title}{" "}
                <span className="text-blue-300">{subtitle}</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base text-blue-100 sm:text-lg leading-relaxed mx-auto">
                {description}
              </p>
            </AnimatedSection>

            <AnimatedSection
              variant="scaleIn"
              className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
            >
              <Link
                href={callLink}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-navy shadow-lg transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-xl sm:w-auto"
              >
                <Phone className="h-5 w-5 text-brand-blue transition-transform group-hover:scale-110" />
                {callLabel}
              </Link>

              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/20 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                {whatsappLabel}
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </div>
    </section>
  );
}
