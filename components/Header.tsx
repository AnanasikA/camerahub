"use client";

import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "./CartContext";
import { useUIOverlay } from "./UIOverlayContext";

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { openSearch } = useUIOverlay();

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
                <Link
                  href="/kategoria/mirrorless"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Bezlusterkowe
                </Link>
                <Link
                  href="/kategoria/dslr"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Lustrzanki cyfrowe
                </Link>
                <Link
                  href="/kategoria/cinema"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Kamery kinowe
                </Link>
                <Link
                  href="/kategoria/lenses"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Obiektywy
                </Link>
                <Link
                  href="/kategoria/drones"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Drony
                </Link>
                <Link
                  href="/kategoria/lighting"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Oświetlenie
                </Link>
                <Link
                  href="/kategoria/audio"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Audio
                </Link>
                <Link
                  href="/kategoria/accessories"
                  className="block rounded-xl px-4 py-2.5 text-sm hover:bg-surface"
                >
                  Akcesoria
                </Link>
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
        </div>
      </div>
    </header>
  );
}