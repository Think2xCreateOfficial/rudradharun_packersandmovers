"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight, Phone, Calendar } from "lucide-react";
import { homeHero, homeQuoteForm } from "@/data/home";
import { BUSINESS } from "@/data/business";
import { Container } from "@/components/shared/Container";
import { LocationAutocomplete } from "@/components/shared/LocationAutocomplete";
import { buildMovingWhatsAppLink, cn, formatTelLink } from "@/lib/utils";

// Convert YYYY-MM-DD (native date input) → DD/MM/YYYY (stored/sent format)
function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

// Convert DD/MM/YYYY → YYYY-MM-DD (for native date input value prop)
function displayToIso(display: string): string {
  if (!display) return "";
  const [d, m, y] = display.split("/");
  if (!d || !m || !y) return "";
  return `${y}-${m}-${d}`;
}

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

// ---- Form Schema ----
const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  movingFrom: z.string().min(2, "Moving From is required"),
  movingTo: z.string().min(2, "Moving To is required"),
  movingDate: z.string().regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "Please enter a valid date"
  ),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function HeroSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const whatsappLink = buildMovingWhatsAppLink(BUSINESS.whatsapp);
  const callLink = formatTelLink(BUSINESS.phone);
  // Today in YYYY-MM-DD for native date input min attribute
  const todayIso = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteFormValues) => {
    setStatus("loading");

    try {
      // Date is already stored as DD/MM/YYYY — use directly
      const message = `
*New Moving Quote Request*
━━━━━━━━━━━━━━━━━━━━━
*Name:* ${data.name}
*Phone:* ${data.phone}
*Moving From:* ${data.movingFrom}
*Moving To:* ${data.movingTo}
*Moving Date:* ${data.movingDate}
━━━━━━━━━━━━━━━━━━━━━
Requested: ${new Date().toLocaleString()}
      `.trim();

      // Get the WhatsApp number (remove any special characters)
      const number = BUSINESS.whatsapp.replace(/[^0-9]/g, '');

      // Create the WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Show success state
      setStatus("success");
      reset(); // Clear the form

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20";
  const inputError =
    "border-red-400 focus:border-red-400 focus:ring-red-400/20 bg-white";

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-white pt-24 pb-12 lg:pb-10 lg:pt-28">
      {/* Diagonal background (Desktop) */}
      <div
        className="absolute inset-0 z-0 hidden lg:block bg-brand-blue"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 100%)" }}
      >
        <Image
          src="/packersandmovers23.jpg"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover opacity-10 mix-blend-overlay"
          alt="Packers and Movers Background"
        />
      </div>

      {/* Mobile background */}
      <div className="absolute inset-0 z-0 block lg:hidden">
        <div className="relative h-2/3 w-full bg-brand-blue overflow-hidden">
          <Image
            src="/packersandmovers23.jpg"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover opacity-20 mix-blend-overlay"
            alt="Packers and Movers Background"
          />
        </div>
        <div className="h-1/3 w-full bg-white" />
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">

          {/* LEFT: Marketing Message */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Trust Label */}
            <div className="mb-2 flex items-center gap-2 text-blue-100">
              <span className="text-xs font-bold uppercase tracking-widest sm:text-sm">
                {homeHero.trustLabel}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:leading-[1.1]">
              {homeHero.headline}
            </h1>

            {/* Subtext */}
            <p className="mt-2 max-w-xl text-base text-blue-50 sm:text-md lg:text-lg lg:leading-relaxed">
              {homeHero.subtext}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-base font-bold text-brand-navy shadow-lg shadow-gold-500/20 transition-all hover:-translate-y-1 hover:bg-gold-400 hover:shadow-xl hover:shadow-gold-500/30"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {homeHero.whatsappCta}
              </Link>
              <Link
                href={callLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/30 bg-white/10 px-7 py-[14px] text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS.phoneDisplay}
              </Link>
            </div>

            {/* Bottom Stats */}
            <div className="mt-6 hidden grid-cols-3 gap-6 border-t border-white/10 pt-7 sm:grid">
              {homeHero.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Floating Quote Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 lg:pl-10"
          >
            <div className="relative rounded-2xl bg-white p-6 shadow-2xl shadow-brand-navy/10 sm:p-8 border border-gray-100">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">Request Sent!</h3>
                  <p className="mt-2 text-gray-600">{homeQuoteForm.successMessage}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                  aria-label="Get a free moving quote"
                >
                  <div className="text-center mb-5">
                    <h2 className="text-2xl font-bold text-gray-900">{homeQuoteForm.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{homeQuoteForm.subtitle}</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="hero-name" className="sr-only">Your Name</label>
                    <input
                      id="hero-name"
                      type="text"
                      placeholder="Your Name *"
                      autoComplete="name"
                      className={cn(inputBase, errors.name && inputError)}
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "hero-name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="hero-name-error" className="mt-1 text-xs text-red-500" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="hero-phone" className="sr-only">Phone Number</label>
                    <input
                      id="hero-phone"
                      type="tel"
                      placeholder="Phone Number *"
                      autoComplete="tel"
                      className={cn(inputBase, errors.phone && inputError)}
                      {...register("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "hero-phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="hero-phone-error" className="mt-1 text-xs text-red-500" role="alert">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Moving From & To — LocationAutocomplete */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="hero-moving-from" className="sr-only">Moving From</label>
                      <Controller
                        name="movingFrom"
                        control={control}
                        render={({ field }) => (
                          <LocationAutocomplete
                            id="hero-moving-from"
                            name={field.name}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Moving From *"
                            hasError={!!errors.movingFrom}
                            aria-describedby={errors.movingFrom ? "hero-from-error" : undefined}
                          />
                        )}
                      />
                      {errors.movingFrom && (
                        <p id="hero-from-error" className="mt-1 text-xs text-red-500" role="alert">
                          {errors.movingFrom.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="hero-moving-to" className="sr-only">Moving To</label>
                      <Controller
                        name="movingTo"
                        control={control}
                        render={({ field }) => (
                          <LocationAutocomplete
                            id="hero-moving-to"
                            name={field.name}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Moving To *"
                            hasError={!!errors.movingTo}
                            aria-describedby={errors.movingTo ? "hero-to-error" : undefined}
                          />
                        )}
                      />
                      {errors.movingTo && (
                        <p id="hero-to-error" className="mt-1 text-xs text-red-500" role="alert">
                          {errors.movingTo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Moving Date — calendar stays, value stored as DD/MM/YYYY */}
                  <div>
                    <label htmlFor="hero-date" className="sr-only">Moving Date</label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none"
                        aria-hidden="true"
                      />
                      <Controller
                        name="movingDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            id="hero-date"
                            type="date"
                            min={todayIso}
                            // Native date input stores YYYY-MM-DD; we convert on change
                            value={displayToIso(field.value)}
                            onChange={(e) => {
                              // Store as DD/MM/YYYY in form state
                              field.onChange(isoToDisplay(e.target.value));
                            }}
                            className={cn(
                              inputBase,
                              "cursor-pointer pl-10",
                              errors.movingDate && inputError
                            )}
                            aria-invalid={!!errors.movingDate}
                            aria-describedby={errors.movingDate ? "hero-date-error" : undefined}
                          />
                        )}
                      />
                    </div>
                    {errors.movingDate && (
                      <p id="hero-date-error" className="mt-1 text-xs text-red-500" role="alert">
                        {errors.movingDate.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || status === "loading"}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-4 text-base font-bold text-white shadow-md transition-all hover:bg-brand-blue/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:opacity-70"
                  >
                    {isSubmitting || status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {homeQuoteForm.submitLabel}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    100% free. No hidden charges. Response within minutes.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
