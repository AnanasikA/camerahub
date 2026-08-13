"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useUIOverlay } from "./UIOverlayContext";

const CATEGORY_LINKS = [
  { href: "/kategoria/mirrorless", label: "Bezlusterkowe" },
  { href: "/kategoria/dslr", label: "Lustrzanki cyfrowe" },
  { href: "/kategoria/cinema", label: "Kamery kinowe" },
  { href: "/kategoria/lenses", label: "Obiektywy" },
  { href: "/kategoria/drones", label: "Drony" },
  { href: "/kategoria/lighting", label: "Oświetlenie" },
  { href: "/kategoria/audio", label: "Audio" },
  { href: "/kategoria/accessories", label: "Akcesoria" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { openSearch } = useUIOverlay();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-border">
      <div className="max-w-wrap mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tightest"
        >
          CameraHub
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm text-fg">
          <Link href="/" className="hover:text-accent transition-colors">
            Strona główna
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-accent transition-colors">
              Kategorie
              <ChevronDown size={14} strokeWidth={1.8} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-bg p-2 shadow-lg">
                {CATEGORY_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/produkty"
            className="hover:text-accent transition-colors"
          >
            Wszystkie produkty
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <button
            aria-label="Szukaj"
            onClick={openSearch}
            className="text-fg/80 hover:text-fg transition-colors"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>
          <Link
            href="/logowanie"
            aria-label="Konto"
            className="text-fg/80 hover:text-fg transition-colors hidden sm:block"
          >
            <User size={19} strokeWidth={1.6} />
          </Link>
          <button
            aria-label="Otwórz koszyk"
            onClick={openCart}
            className="relative text-fg/80 hover:text-fg transition-colors"
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-fg">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="text-fg/80 hover:text-fg transition-colors md:hidden"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="max-w-wrap mx-auto flex flex-col px-6 py-4 text-sm">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-fg"
              >
                Strona główna
              </Link>

              <button
                onClick={() => setCategoriesOpen((v) => !v)}
                className="flex items-center justify-between py-3 text-left text-fg"
              >
                Kategorie
                <ChevronDown
                  size={16}
                  strokeWidth={1.8}
                  className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-4"
                  >
                    {CATEGORY_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 text-fg/70"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/produkty"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-fg"
              >
                Wszystkie produkty
              </Link>

              <div className="mt-2 border-t border-border pt-2">
                <Link
                  href="/logowanie"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 py-3 text-fg"
                >
                  <User size={17} strokeWidth={1.6} />
                  Zaloguj się
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}