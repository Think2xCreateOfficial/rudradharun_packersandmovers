"use client";

// =============================================================
// LoaderLogo — Renders the Rudra Dharun logo (PNG via next/image)
// =============================================================

import Image from "next/image";
import { motion } from "framer-motion";

export function LoaderLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-5 flex items-center justify-center"
      aria-hidden="true"
    >
      <Image
        src="/Rudra_Dhrun_logo.png"
        alt="Rudra Dharun Packers & Movers"
        width={88}
        height={88}
        priority
        className="h-[72px] w-[72px] rounded-2xl object-contain drop-shadow-lg sm:h-[88px] sm:w-[88px]"
      />
    </motion.div>
  );
}
