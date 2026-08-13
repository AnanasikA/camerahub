"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { Product } from "@/lib/types";

function CartThumbnail({ product }: { product: Product }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="viewfinder relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg text-fg/40">
      {!broken ? (
        <Image
          src={`/produkty/${product.slug}.jpg`}
          alt={product.name}
          fill
          sizes="80px"
          className="object-contain p-2"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="ph-block absolute inset-0" />
      )}
    </div>
  );
}

export default function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-fg/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Koszyk"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-lg">Twój koszyk</h2>
              <button
                aria-label="Zamknij koszyk"
                onClick={closeCart}
                className="text-fg/70 hover:text-fg"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={28} strokeWidth={1.3} className="text-muted" />
                <p className="text-sm text-muted">Twój koszyk jest pusty.</p>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-fg px-5 py-2.5 text-sm text-bg hover:bg-accent transition-colors"
                >
                  Kontynuuj zakupy
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="flex flex-col gap-5">
                    {lines.map(({ product, quantity }) => (
                      <li key={product.id} className="flex gap-4">
                        <CartThumbnail product={product} />
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-muted">
                                {product.brand}
                              </p>
                              <p className="text-sm font-medium">{product.name}</p>
                            </div>
                            <button
                              aria-label={`Usuń ${product.name}`}
                              onClick={() => removeItem(product.id)}
                              className="text-muted hover:text-fg"
                            >
                              <X size={15} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                              <button
                                aria-label="Zmniejsz ilość"
                                onClick={() => setQuantity(product.id, quantity - 1)}
                                className="text-fg/70 hover:text-fg"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center text-xs">{quantity}</span>
                              <button
                                aria-label="Zwiększ ilość"
                                onClick={() => setQuantity(product.id, quantity + 1)}
                                className="text-fg/70 hover:text-fg"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-medium">
                              {formatPrice(product.price * quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-muted">Suma częściowa</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center rounded-full bg-fg py-3.5 text-sm text-bg hover:bg-accent transition-colors"
                  >
                    Przejdź do kasy
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted">
                    Koszty dostawy i podatki naliczane przy kasie.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}