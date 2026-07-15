"use client";

// =============================================================
// PageHero — Reusable inner-page hero (About, Gallery, Services)
// =============================================================

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  imageAlt,
  cta,
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-navy pt-24 pb-16 sm:pb-20 lg:pt-28 lg:pb-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover opacity-40 mix-blend-luminosity"
          alt={imageAlt}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 animate-fade-in">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i === 0 && <Home className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />}
              {i < breadcrumbs.length - 1 ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-xs font-medium text-blue-300 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-blue-400/60" aria-hidden="true" />
                </>
              ) : (
                <span className="text-xs font-semibold text-white" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-400 animate-fade-in-up">
            {eyebrow}
          </p>

          <h1 className="font-serif text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1] animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              {subtitle}
            </p>
          )}

          {cta && (
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-brand-navy shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
