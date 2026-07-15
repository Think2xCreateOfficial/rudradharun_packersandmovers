"use client";

// =============================================================
// AppLoader — Top-level loader component, assembled from parts
// This is the only file consumers need to render.
// =============================================================

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { LoaderOverlay } from "./LoaderOverlay";
import { LoaderLogo } from "./LoaderLogo";
import { LoaderSvgDefs } from "./LoaderBrand";
import { LoaderBrandLetters } from "./LoaderBrandLetters";

interface AppLoaderProps {
  isLoading: boolean;
}

export function AppLoader({ isLoading }: AppLoaderProps) {
  return (
    <>
      {/* Gradient defs referenced by LoaderAnimation SVG paths — must stay in DOM */}
      <LoaderSvgDefs />

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoaderOverlay key="loader-overlay">
            {/* Logo mark */}
            <LoaderLogo />

            {/* Brand name — individual letter path-draw animation */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4"
            >
              <LoaderBrandLetters />
            </motion.div>

            {/* SVG Loader (Y · O · U shapes — Uiverse reference) */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 sm:mt-8"
            >
              <LoaderAnimation />
            </motion.div> */}

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 sm:mt-6 sm:text-sm"
              aria-hidden="true"
            >
              Safe &bull; Secure &bull; Reliable
            </motion.p>
          </LoaderOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
