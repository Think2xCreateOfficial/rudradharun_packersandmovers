import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "white" | "light" | "navy";
}

export function Section({ children, id, className, background = "white" }: SectionProps) {
  const bgColors = {
    white: "bg-white",
    light: "bg-gray-50",
    navy: "bg-brand-navy",
  };

  return (
    <section id={id} className={cn(bgColors[background], className)}>
      {children}
    </section>
  );
}
