"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/products";

function CategoryCard({ category }: { category: Category }) {
  const [broken, setBroken] = useState(false);

  return (
    <Link
      href={`/kategoria/${category.slug}`}
      className="viewfinder group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card text-fg/40"
    >
      {!broken ? (
        <Image
          src={`/kategorie/${category.slug}.jpg`}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="ph-block absolute inset-0" />
      )}
      <div className="relative z-10 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent px-4 pb-4 pt-10">
        <p className="text-sm font-medium text-fg">{category.name}</p>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <section className="max-w-wrap mx-auto px-6 py-20 md:px-10">
      <h2 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
        Kupuj według kategorii
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}