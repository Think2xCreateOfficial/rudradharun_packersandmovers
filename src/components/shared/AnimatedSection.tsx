"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Map our variant names to the new tailwind utility classes
const variantClasses = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  scaleIn: "animate-scale-in",
  stagger: "animate-fade-in", // For the parent stagger container, we just fade it in
};

type VariantName = keyof typeof variantClasses;

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: VariantName;
  className?: string;
  isStaggerParent?: boolean;
}

export function AnimatedSection({ children, variant = "fadeInUp", className, isStaggerParent }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const actualVariant = isStaggerParent ? "stagger" : variant;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once it has animated in, we can disconnect the observer
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        // Equivalent to viewport={{ margin: "-10%" }} from framer-motion, 
        // but 0px prevents layout hiding bugs on initial paint when height is not calculated.
        rootMargin: "0px", 
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Before it's in view, we keep it revealed visually in SSR (via lack of JS), 
  // but JS hydrates it to reveal-hidden, which has visibility: hidden.
  // Then when it intersects, we add the animate class.
  const animationClass = isInView ? variantClasses[actualVariant] : "reveal-hidden";

  return (
    <div
      ref={ref}
      className={cn(className, animationClass)}
    >
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  // To simulate stagger, we'd ideally use animation-delay, but for simplicity we will just treat
  // individual items as fadeInUp with their own observer. 
  // If true staggering is strictly needed, we can implement CSS children indexing.
  return (
    <AnimatedSection variant="fadeInUp" className={className}>
      {children}
    </AnimatedSection>
  );
}
