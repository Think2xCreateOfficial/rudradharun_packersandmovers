import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { BUSINESS } from "@/data/business";
import { NAV_ITEMS } from "@/data/navigation";
import { buildMovingWhatsAppLink, formatTelLink } from "@/lib/utils";

// Official WhatsApp SVG
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Facebook icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

// Instagram icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// YouTube icon
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// Column heading component
function FooterColumnHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`mb-3 text-sm font-bold uppercase tracking-wider text-white${className ? ` ${className}` : ""}`}>
      {children}
    </h3>
  );
}



export function Footer() {
  const whatsappLink = buildMovingWhatsAppLink(BUSINESS.whatsapp);
  const callLink = formatTelLink(BUSINESS.phone);

  const socialLinks = [
    { href: BUSINESS.social.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: BUSINESS.social.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: BUSINESS.social.youtube, icon: YouTubeIcon, label: "YouTube" },
    { href: whatsappLink, icon: WhatsAppIcon, label: "WhatsApp" },
  ].filter((s) => s.href); // Only show configured links

  return (
    <footer className="bg-brand-navy text-blue-100" role="contentinfo">
      {/* Main footer content */}
      <div className="border-b border-white/8">
        <Container className="py-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {/* Column 1: Company */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* Logo + Brand */}
              <Link href="/" className="mb-5 inline-flex items-center gap-3" aria-label="Rudra Dharun Packers and Movers">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  <Image
                    src="/Rudra_Dhrun_logo.png"
                    alt="Rudra Dharun Packers and Movers logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-white leading-tight">Rudra Dharun</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-300 leading-tight">
                    Packers &amp; Movers
                  </span>
                </div>
              </Link>

              <p className="text-sm text-blue-200 leading-relaxed max-w-xs">
                Professional relocation services across Tamil Nadu. Trusted by 500+ families and Customers.
              </p>

              {/* Trust badges */}
              {/* <div className="mt-5 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
                  <div className="flex text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white">5.0</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
                  <span className="text-xs font-semibold text-white">{BUSINESS.trust.yearsOfExperience} Years</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5">
                  <span className="text-xs font-semibold text-white">{BUSINESS.trust.movesCompleted} Moves</span>
                </div>
              </div> */}

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="mt-2 flex gap-3">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-blue-200 transition-all hover:bg-brand-blue hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <FooterColumnHeading>Quick Links</FooterColumnHeading>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-blue-200 transition-colors hover:text-white"
                    >
                      <span className="h-1 w-1 rounded-full bg-brand-blue transition-all group-hover:w-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Services sub-list */}
              {/* <FooterColumnHeading className="mt-7">Our Services</FooterColumnHeading>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-2 text-sm text-blue-200 transition-colors hover:text-white"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand-blue/50 transition-all group-hover:bg-brand-blue group-hover:w-2.5" />
                      <span className="truncate">{service.title}</span>
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>

            {/* Column 3: Contact */}
            <div>
              <FooterColumnHeading>Contact Us</FooterColumnHeading>
              <ul className="space-y-4">
                {/* Phone */}
                <li>
                  <Link
                    href={callLink}
                    className="group flex items-start gap-3 transition-colors hover:text-white"
                    aria-label={`Call us: ${BUSINESS.phone}`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Call Us</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{BUSINESS.phone}</p>
                    </div>
                  </Link>
                </li>

                {/* WhatsApp */}
                <li>
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 transition-colors hover:text-white"
                    aria-label="Chat with us on WhatsApp"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">WhatsApp</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{BUSINESS.whatsapp}</p>
                    </div>
                  </Link>
                </li>

                {/* Email */}
                {BUSINESS.email && (
                  <li>
                    <Link
                      href={`mailto:${BUSINESS.email}`}
                      className="group flex items-start gap-3 transition-colors hover:text-white"
                      aria-label={`Email us: ${BUSINESS.email}`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-blue-400 group-hover:bg-brand-blue group-hover:text-white transition-all">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Email</p>
                        <p className="mt-0.5 text-sm text-blue-200 break-all">{BUSINESS.email}</p>
                      </div>
                    </Link>
                  </li>
                )}

                {/* Address */}
                <li>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-blue-400">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Address</p>
                      <p className="mt-0.5 text-sm text-blue-200 leading-relaxed">
                        {BUSINESS.address.street},<br />
                        {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                      </p>
                    </div>
                  </div>
                </li>

                {/* Working Hours */}
                {/* <li>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-blue-400">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Hours</p>
                      <p className="mt-0.5 text-sm text-blue-200">{BUSINESS.workingHours.display}</p>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>

            {/* Column 4: Map */}
            <div>
              <FooterColumnHeading>Company</FooterColumnHeading>
              <p className="text-sm text-blue-200 leading-relaxed">
                Based in {BUSINESS.address.city}, we serve all districts of Tamil Nadu and provide pan-India moving services.
              </p>
              {/* <LocationMapPlaceholder /> */}

              {/* CTA in footer */}
              <div className="mt-6 space-y-2.5">
                <Link
                  href={callLink}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-blue py-3 text-sm font-bold text-white transition-all hover:bg-brand-blue/90"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Link>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 py-3 text-sm font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="py-4">
        <Container>
          <div className="flex flex-col items-center justify-center gap-3 text-xs text-blue-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </p>
            {/* <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <span className="text-blue-600">·</span>
              <span>
                Crafted with care in Tamil Nadu
              </span>
            </div> */}
          </div>
        </Container>
      </div>
    </footer>
  );
}
