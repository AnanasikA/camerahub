"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [broken, setBroken] = useState(false);

  return (
    <div className="group flex flex-col">
      <Link
        href={`/produkt/${product.slug}`}
        className="viewfinder relative block aspect-[4/5] overflow-hidden rounded-card text-fg/40"
      >
        {!broken ? (
          <Image
            src={`/produkty/${product.slug}.jpg`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="ph-block absolute inset-0" />
        )}
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-fg px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-bg">
            {product.badge}
          </span>
        )}
        <button
          aria-label="Zapisz na później"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg/90 text-fg/70 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
        >
          <Heart size={15} strokeWidth={1.6} />
        </button>
      </Link>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <Link href={`/produkt/${product.slug}`}>
          <h3 className="mt-1 text-sm font-medium hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted">
          <div className="flex text-fg">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                strokeWidth={0}
                fill={i < Math.round(product.rating) ? "currentColor" : "#E6E6E9"}
              />
            ))}
          </div>
          <span>&middot; {product.reviewCount} opinii</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </span>
          <button
            onClick={() => addItem(product)}
            className="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-colors hover:bg-accent"
          >
            Do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}