"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS } from "@/data/business";
import { NAV_ITEMS, MOBILE_NAV_LINKS } from "@/data/navigation";
import { Container } from "@/components/shared/Container";
import { useScrollY } from "@/hooks/useScrollY";
import { cn, formatTelLink, buildMovingWhatsAppLink } from "@/lib/utils";
import { mobileMenuVariants } from "@/animations/variants";

// Official WhatsApp SVG icon — replaces MessageCircle
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollY();
  const pathname = usePathname();

  const isScrolled = scrollY > 20;

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const whatsappLink = buildMovingWhatsAppLink(BUSINESS.whatsapp);
  const callLink = formatTelLink(BUSINESS.phone);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-sm backdrop-blur-md py-2"
            : "bg-white shadow-sm backdrop-blur-md py-2.5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Left: Hamburger (mobile) + Brand */}
            <div className="flex items-center gap-2">
              {/* Mobile: Hamburger */}
              <button
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
                aria-label="Open main menu"
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Brand Logo & Name */}
              <Link
                href="/"
                className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4"
                aria-label="Rudra Dharun Packers and Movers - Home"
              >
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-navy shadow-sm">
                  <Image
                    src="/Rudra_Dhrun_logo.png"
                    alt="Rudra Dharun logo"
                    width={44}
                    height={44}
                    className="h-11 w-11 object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-brand-blue tracking-tight sm:text-base leading-tight">
                    Rudra Dharun
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-blue/70 sm:text-[11px] leading-tight">
                    Packers &amp; Movers
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop: Center Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-8" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative text-sm font-semibold transition-colors hover:text-brand-blue",
                      "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-blue after:transition-transform hover:after:scale-x-100",
                      isActive
                        ? "text-brand-blue after:scale-x-100"
                        : "text-gray-700"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Desktop: Pill Buttons */}
              <div className="hidden items-center gap-3 lg:flex">
                {/* WhatsApp button with official SVG icon */}
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-md"
                  aria-label="Chat with us on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366] transition-colors group-hover:text-white" />
                  WhatsApp
                </Link>

                {/* Call Now button */}
                <Link
                  href={callLink}
                  className="flex items-center gap-2 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/30"
                  aria-label={`Call us at ${BUSINESS.phoneDisplay}`}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Now
                </Link>
              </div>

              {/* Mobile: Right Call Icon Button */}
              <Link
                href={callLink}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white shadow-sm transition-transform hover:scale-105 active:scale-95 lg:hidden"
                aria-label={`Call us at ${BUSINESS.phoneDisplay}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-gray-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-[70] flex w-4/5 max-w-[320px] flex-col bg-white shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Drawer Header — Company Logo + Brand + Close */}
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                  aria-label="Rudra Dharun Packers and Movers"
                >
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-brand-navy shadow-sm">
                    <Image
                      src="/Rudra_Dhrun_logo.png"
                      alt="Rudra Dharun Packers and Movers"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-brand-blue leading-tight">
                      Rudra Dharun
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-blue/70 leading-tight">
                      Packers &amp; Movers
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {MOBILE_NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold transition-colors",
                            isActive
                              ? "bg-brand-blue/5 text-brand-blue"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isActive ? "bg-brand-blue" : "bg-gray-300"
                            )}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer Footer CTAs */}
              <div className="border-t border-gray-100 p-5 space-y-3">
                {/* WhatsApp */}
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#25D366] bg-white py-3 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat on WhatsApp
                </Link>
                {/* Call */}
                <Link
                  href={callLink}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-blue py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-blue/90"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
