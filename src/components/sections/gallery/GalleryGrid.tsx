"use client";

// =============================================================
// GalleryGrid — Filter tabs + masonry-style responsive grid
// with lightbox support
// =============================================================

import { useState, useCallback } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import {
  galleryImages,
  galleryCategories,
  type GalleryCategory,
  type GalleryImage,
} from "@/data/gallery";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("./GalleryLightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});


function GalleryCard({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm aspect-square animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      <Image
        src={image.src}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        alt={image.alt}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-300 group-hover:bg-brand-navy/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ZoomIn className="h-8 w-8 text-white mb-2" />
        {image.caption && (
          <p className="max-w-[80%] text-center text-xs font-medium text-white">{image.caption}</p>
        )}
      </div>
    </div>
  );
}

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  return (
    <Section id="gallery-grid" background="light" className="py-6 lg:py-10">
      <Container>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Gallery categories">
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                activeCategory === cat.value
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-brand-blue/30 hover:text-brand-blue"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((image, i) => (
            <GalleryCard key={image.id} image={image} index={i} onClick={() => openLightbox(i)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-gray-400">No images in this category yet.</p>
        )}
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </Section>
  );
}
