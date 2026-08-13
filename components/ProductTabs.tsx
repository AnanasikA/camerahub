"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";

const TABS = ["Opis", "Specyfikacja", "Opinie"] as const;
type Tab = (typeof TABS)[number];

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Opis");

  return (
    <div className="mt-16">
      <div className="flex gap-8 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pb-4 text-sm transition-colors ${
              tab === t ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {t === "Opinie" ? `Opinie (${product.reviewCount})` : t}
            {tab === t && (
              <span className="absolute inset-x-0 -bottom-px h-[1.5px] bg-fg" />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-[70ch] py-8">
        {tab === "Opis" && (
          <p className="text-[15px] leading-relaxed text-fg/85">
            {product.description}
          </p>
        )}

        {tab === "Specyfikacja" && (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between border-b border-border pb-3 text-sm"
              >
                <dt className="text-muted">{spec.label}</dt>
                <dd className="font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "Opinie" && (
          <ul className="flex flex-col gap-8">
            {product.reviews.map((review) => (
              <li key={review.id} className="border-b border-border pb-8 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="flex text-fg">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        strokeWidth={0}
                        fill={i < review.rating ? "currentColor" : "#E6E6E9"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted">{review.date}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{review.title}</p>
                <p className="mt-1 text-sm text-fg/80">{review.body}</p>
                <p className="mt-2 text-xs text-muted">&mdash; {review.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}