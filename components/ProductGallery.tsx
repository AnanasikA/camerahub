"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="viewfinder relative aspect-square overflow-hidden rounded-card text-fg/40">
      {!broken ? (
        <Image
          src={`/produkty/${slug}.jpg`}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-10"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="ph-block absolute inset-0" />
      )}
    </div>
  );
}