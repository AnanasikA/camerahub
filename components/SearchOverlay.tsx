"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";

const POPULAR_SEARCHES = [
  "Pełna klatka bezlusterkowy",
  "Obiektyw stałoogniskowy",
  "Wideo 8K",
  "Leica",
  "Drony",
];

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    return PRODUCTS.filter((p) => {
      const category = CATEGORIES.find((c) => c.slug === p.category);
      const haystack = [
        p.name,
        p.brand,
        category?.name ?? p.category,
        p.tagline,
        p.cameraType,
        p.sensor,
        p.videoResolution ? `wideo ${p.videoResolution}` : "",
      ]
        .join(" ")
        .toLowerCase();

      return words.every((word) => haystack.includes(word));
    }).slice(0, 6);
  }, [query]);

  return (
    <>
      {/* Niewidzialna warstwa łapiąca kliknięcia poza panelem — bez przyciemniania strony */}
      <motion.div
        className="fixed inset-0 top-20 z-[998]"
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="fixed inset-x-0 top-20 z-[999] border-b border-border bg-bg shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Szukaj produktów"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-wrap mx-auto px-6 py-6 sm:py-8 md:px-10">
          <div className="flex items-center gap-3 border-b border-fg/20 pb-4">
            <Search size={18} strokeWidth={1.6} className="text-muted sm:hidden" />
            <Search size={20} strokeWidth={1.6} className="hidden text-muted sm:block" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Szukaj aparatów, obiektywów, marek…"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted sm:text-xl"
            />
            <button
              aria-label="Zamknij wyszukiwanie"
              onClick={onClose}
              className="text-muted hover:text-fg"
            >
              <X size={18} strokeWidth={1.6} className="sm:hidden" />
              <X size={20} strokeWidth={1.6} className="hidden sm:block" />
            </button>
          </div>

          {!query.trim() ? (
            <div className="grid grid-cols-1 gap-6 pt-6 sm:gap-10 sm:pt-8 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Popularne wyszukiwania
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-fg/80 hover:border-fg/40 hover:text-fg sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Kategorie
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-col sm:gap-3">
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/kategoria/${category.slug}`}
                        onClick={onClose}
                        className="text-sm hover:text-accent"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto pt-5 sm:pt-6">
              {results.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm text-muted">
                  Brak wyników dla &bdquo;{query}&rdquo;.
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/produkt/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface sm:gap-4 sm:px-3 sm:py-2.5"
                      >
                        <div className="viewfinder relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg text-fg/40 sm:h-12 sm:w-12">
                          <Image
                            src={`/produkty/${product.slug}.jpg`}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] uppercase tracking-wide text-muted sm:text-xs">
                            {product.brand}
                          </p>
                          <p className="truncate text-sm font-medium">{product.name}</p>
                        </div>
                        <span className="flex-shrink-0 text-xs text-muted sm:text-sm">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}