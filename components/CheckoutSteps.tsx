"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";

const STEPS = ["Dostawa", "Płatność", "Podsumowanie"] as const;
type Step = (typeof STEPS)[number];

export default function CheckoutSteps() {
  const { lines, subtotal } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState(false);
  const step: Step = STEPS[stepIndex];

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (lines.length === 0 && !placed) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">Twój koszyk jest pusty.</p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-full bg-fg px-6 py-3 text-sm text-bg transition-colors hover:bg-accent"
        >
          Kontynuuj zakupy
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-fg"
        >
          <Check size={26} strokeWidth={2} />
        </motion.div>
        <h2 className="mt-6 font-display text-2xl font-medium tracking-tightest">
          Zamówienie potwierdzone
        </h2>
        <p className="mt-2 text-muted">
          To wersja demo portfolio — nie złożono ani nie opłacono żadnego
          prawdziwego zamówienia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-fg px-6 py-3 text-sm text-bg transition-colors hover:bg-accent"
        >
          Wróć do strony głównej
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <ol className="flex items-center">
          {STEPS.map((s, i) => (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    i < stepIndex
                      ? "bg-fg text-bg"
                      : i === stepIndex
                        ? "bg-accent text-accent-fg"
                        : "bg-surface text-muted"
                  }`}
                >
                  {i < stepIndex ? <Check size={13} strokeWidth={2.4} /> : i + 1}
                </span>
                <span
                  className={`hidden text-sm sm:inline ${
                    i === stepIndex ? "text-fg" : "text-muted"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className={`mx-3 h-px flex-1 transition-colors ${
                    i < stepIndex ? "bg-fg" : "bg-border"
                  }`}
                />
              )}
            </li>
          ))}
        </ol>

        <form
          className="mt-10 overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            if (stepIndex < STEPS.length - 1) {
              setStepIndex((i) => i + 1);
            } else {
              setPlaced(true);
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "Dostawa" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Imię i nazwisko" placeholder="Anna Kowalska" />
                  <Field label="E-mail" type="email" placeholder="anna@example.com" />
                  <Field label="Adres" placeholder="ul. Przykładowa 12" full />
                  <Field label="Miasto" placeholder="Wrocław" />
                  <Field label="Kod pocztowy" placeholder="50-001" />
                </div>
              )}

              {step === "Płatność" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Numer karty" placeholder="4242 4242 4242 4242" full />
                  <Field label="Data ważności" placeholder="MM/RR" />
                  <Field label="CVC" placeholder="123" />
                </div>
              )}

              {step === "Podsumowanie" && (
                <ul className="flex flex-col divide-y divide-border">
                  {lines.map(({ product, quantity }) => (
                    <li key={product.id} className="flex items-center justify-between py-3 text-sm">
                      <span>
                        {product.name} <span className="text-muted">&times; {quantity}</span>
                      </span>
                      <span className="font-medium">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setStepIndex((i) => i - 1)}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                &larr; Wstecz
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              {step === "Podsumowanie" ? "Złóż zamówienie" : "Dalej"}
            </button>
          </div>
        </form>
      </div>

      <aside className="viewfinder relative h-fit rounded-card border border-border p-6 text-fg/30">
        <h2 className="font-display text-lg tracking-tightest">
          Podsumowanie zamówienia
        </h2>
        <ul className="mt-5 flex flex-col gap-3">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="flex justify-between text-sm">
              <span className="text-fg/80">
                {product.name} &times; {quantity}
              </span>
              <span>{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted">Dostawa</span>
          <span>Gratis</span>
        </div>
        <div className="mt-2 flex justify-between text-base font-medium">
          <span>Razem</span>
          <span>{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  full,
}: {
  label: string;
  placeholder: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="rounded-lg border border-border px-3.5 py-2.5 outline-none transition-colors focus:border-fg"
      />
    </label>
  );
}