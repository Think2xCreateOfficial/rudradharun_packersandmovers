"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, ShieldCheck, MapPin, Truck, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { LocationAutocomplete } from "@/components/shared/LocationAutocomplete";
import { cn, buildMovingWhatsAppLink, formatTelLink } from "@/lib/utils";
import { BUSINESS } from "@/data/business";
import { SERVICE_OPTIONS } from "@/data/services";
import Link from "next/link";
import Image from "next/image";

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
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Logistics background for left panel
function LeftPanelIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/packersandmovers5.png"
        alt="Moving Staff"
        fill
        className="object-cover opacity-30 mix-blend-luminosity"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="absolute inset-0 bg-brand-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-transparent" />

      {/* Gradient blobs */}
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-blue/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold-400/5 blur-3xl" />
    </div>
  );
}

// ---- Form schema ----
const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  pickup: z.string().min(2, "Pickup location required"),
  drop: z.string().min(2, "Drop location required"),
  date: z.string().regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "Please enter a valid date"
  ),
  serviceType: z.string().min(1, "Service type required"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20";
const inputError = "border-red-400 focus:border-red-400 focus:ring-red-400/20 bg-white";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // today in YYYY-MM-DD for native date input min attribute
  const todayIso = new Date().toISOString().split("T")[0];
  const whatsappLink = buildMovingWhatsAppLink(BUSINESS.whatsapp);
  const callLink = formatTelLink(BUSINESS.phone);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      // Format the WhatsApp message
      const message = `
*New Service Inquiry*
━━━━━━━━━━━━━━━━━━━━━
*Name:* ${data.name}
*Phone:* ${data.phone}
*Service:* ${SERVICE_OPTIONS.find(s => s.value === data.serviceType)?.label || data.serviceType}
*Pickup:* ${data.pickup}
*Drop:* ${data.drop}
*Moving Date:* ${data.date}
${data.message ? `*Message:* ${data.message}` : ""}
━━━━━━━━━━━━━━━━━━━━━
Requested: ${new Date().toLocaleString()}
      `.trim();

      const number = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Section id="contact" background="white" className="py-8 relative">
      <Container>
        <AnimatedSection variant="fadeInUp" className="mb-4 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
            Get In Touch
          </p>
          <h2 className="font-serif text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get Your{" "}
            <span className="text-brand-blue">Free Quote</span> Today
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-gray-500 leading-relaxed">
            No hidden charges. No last-minute surprises. Just professional moving at transparent prices.
          </p>
        </AnimatedSection>

        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* Left Side: Trust Panel */}
            <div className="hidden lg:block relative overflow-hidden bg-brand-navy p-8 text-white lg:col-span-2 lg:p-10">
              <LeftPanelIllustration />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl font-extrabold sm:text-3xl leading-tight">
                  Guaranteed <span className="text-gold-400">Fixed Quote</span>
                </h3>
                <p className="mt-3 text-blue-100 leading-relaxed text-sm">
                  Our pricing is completely transparent. What we quote is what you pay.
                </p>

                {/* Trust Points */}
                <ul className="mt-8 space-y-4">
                  {[
                    { icon: ShieldCheck, text: "100% Transit Insurance Available" },
                    { icon: MapPin, text: "Covering All Tamil Nadu Districts" },
                    { icon: Truck, text: "Dedicated GPS-Enabled Fleet" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-white">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* WhatsApp CTA */}
                <div className="mt-8 border-t border-white/10 pt-7">
                  <p className="mb-3 text-sm font-medium text-blue-200">Need instant assistance?</p>
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#20BD5C] hover:shadow-lg hover:shadow-[#25D366]/20"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </Link>
                </div>

                {/* Call */}
                <div className="mt-4">
                  <Link
                    href={callLink}
                    className="inline-flex items-center gap-2.5 rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
                  >
                    <Phone className="h-4 w-4" />
                    {BUSINESS.phoneDisplay}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white p-8 lg:col-span-3 lg:p-10">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Request a Call Back</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in your details and our expert will call you within 30 minutes.
                </p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50 border border-green-100 py-16 text-center px-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                  <h4 className="mt-4 text-lg font-bold text-gray-900">Request Received!</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Our representative will contact you shortly to provide the quote.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                  aria-label="Contact form for moving quote"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-gray-600">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        autoComplete="name"
                        className={cn(inputBase, errors.name && inputError)}
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-phone" className="mb-1 block text-xs font-semibold text-gray-600">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        autoComplete="tel"
                        className={cn(inputBase, errors.phone && inputError)}
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    {/* Pickup Location — Shared LocationAutocomplete */}
                    <div>
                      <label htmlFor="contact-pickup" className="mb-1 block text-xs font-semibold text-gray-600">
                        Pickup Location *
                      </label>
                      <Controller
                        name="pickup"
                        control={control}
                        render={({ field }) => (
                          <LocationAutocomplete
                            id="contact-pickup"
                            name={field.name}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Moving from..."
                            hasError={!!errors.pickup}
                          />
                        )}
                      />
                      {errors.pickup && <p className="mt-1 text-xs text-red-500">{errors.pickup.message}</p>}
                    </div>

                    {/* Drop Location — Shared LocationAutocomplete */}
                    <div>
                      <label htmlFor="contact-drop" className="mb-1 block text-xs font-semibold text-gray-600">
                        Drop Location *
                      </label>
                      <Controller
                        name="drop"
                        control={control}
                        render={({ field }) => (
                          <LocationAutocomplete
                            id="contact-drop"
                            name={field.name}
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Moving to..."
                            hasError={!!errors.drop}
                          />
                        )}
                      />
                      {errors.drop && <p className="mt-1 text-xs text-red-500">{errors.drop.message}</p>}
                    </div>

                    {/* Moving Date — calendar stays, value stored as DD/MM/YYYY */}
                    <div>
                      <label htmlFor="contact-date" className="mb-1 block text-xs font-semibold text-gray-600">
                        Moving Date *
                      </label>
                      <div className="relative">
                        <Controller
                          name="date"
                          control={control}
                          render={({ field }) => (
                            <input
                              id="contact-date"
                              type="date"
                              min={todayIso}
                              value={displayToIso(field.value)}
                              onChange={(e) => {
                                field.onChange(isoToDisplay(e.target.value));
                              }}
                              className={cn(inputBase, "cursor-pointer", errors.date && inputError)}
                              aria-invalid={!!errors.date}
                              aria-describedby={errors.date ? "contact-date-error" : undefined}
                            />
                          )}
                        />
                      </div>
                      {errors.date && (
                        <p id="contact-date-error" className="mt-1 text-xs text-red-500">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    {/* Service Type — All 8 services from centralized data */}
                    <div>
                      <label htmlFor="contact-service" className="mb-1 block text-xs font-semibold text-gray-600">
                        Service Type *
                      </label>
                      <select
                        id="contact-service"
                        className={cn(inputBase, "cursor-pointer", errors.serviceType && inputError)}
                        {...register("serviceType")}
                        aria-invalid={!!errors.serviceType}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.serviceType && <p className="mt-1 text-xs text-red-500">{errors.serviceType.message}</p>}
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold text-gray-600">
                        Additional Details
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Anything specific about your move? (Optional)"
                        rows={3}
                        className={cn(inputBase, "resize-none")}
                        {...register("message")}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-4 text-base font-bold text-white shadow-md transition-all hover:bg-brand-blue/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:opacity-70"
                  >
                    {isSubmitting || status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Request "
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting you agree to our terms. Your information is 100% secure.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
