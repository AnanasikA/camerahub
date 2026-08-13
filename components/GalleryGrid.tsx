"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const ITEMS = [
  { slug: "portret-leica-sl3", label: "Portret, zdjęcie z Leica SL3" },
  { slug: "krajobraz-sony-a7x", label: "Krajobraz, Sony A7X" },
  { slug: "ulica-fujifilm-xt6", label: "Ulica, Fujifilm X-T6" },
  { slug: "studio-nikon-z9", label: "Studio, Nikon Z9" },
  { slug: "z-powietrza-skyframe-aero-4", label: "Z powietrza, SkyFrame Aero 4" },
];

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="max-w-wrap mx-auto px-6 py-20 md:px-10">
      <h2 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
        Zrobione z CameraHub
      </h2>
      <p className="mt-2 text-muted">
        Bliższe spojrzenie na świat przez nasz sprzęt.
      </p>

      {/* Bento: ręcznie zaprojektowana siatka (nie masonry) — przy tylko
          5 zdjęciach automatyczne kolumny CSS potrafią zostawić puste
          miejsca, bo same decydują, które zdjęcie trafia do której
          kolumny. Stała siatka gwarantuje brak dziur. */}
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:[grid-auto-rows:260px]">
        {ITEMS.map((item, index) => (
          <GalleryTile
            key={item.slug}
            item={item}
            className={index === 0 ? "row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-[4/3] lg:aspect-auto"}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            items={ITEMS}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryTile({
  item,
  className,
  onOpen,
}: {
  item: { slug: string; label: string };
  className: string;
  onOpen: () => void;
}) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Powiększ: ${item.label}`}
        className={`ph-block block w-full overflow-hidden rounded-card text-left ${className}`}
      >
        <span className="ph-label flex h-full items-center justify-center text-center">
          {item.label}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Powiększ: ${item.label}`}
      className={`group relative block w-full overflow-hidden rounded-card ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/galeria/${item.slug}.jpg`}
        alt={item.label}
        loading="lazy"
        onError={() => setBroken(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-fg/0 opacity-0 transition-all duration-300 group-hover:bg-fg/20 group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bg/90 text-fg">
          <ZoomIn size={18} strokeWidth={1.6} />
        </span>
      </div>
    </button>
  );
}

function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: { slug: string; label: string }[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = items[activeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length, onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.96)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        aria-label="Zamknij podgląd"
        onClick={onClose}
        className="absolute right-6 top-6 z-10 text-white/80 hover:text-white"
      >
        <X size={26} strokeWidth={1.6} />
      </button>

      <button
        aria-label="Poprzednie zdjęcie"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + items.length) % items.length);
        }}
        className="absolute left-4 z-10 text-white/80 hover:text-white md:left-8"
      >
        <ChevronLeft size={32} strokeWidth={1.4} />
      </button>

      <motion.img
        key={item.slug}
        src={`/galeria/${item.slug}.jpg`}
        alt={item.label}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[85vh] max-w-[92vw] object-contain"
      />

      <button
        aria-label="Następne zdjęcie"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % items.length);
        }}
        className="absolute right-4 z-10 text-white/80 hover:text-white md:right-8"
      >
        <ChevronRight size={32} strokeWidth={1.4} />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
        <p className="text-sm text-white/70">{item.label}</p>
        <p className="text-xs text-white/40">
          {activeIndex + 1} / {items.length}
        </p>
      </div>
    </motion.div>
  );
}