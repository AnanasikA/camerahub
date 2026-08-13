import Link from "next/link";
import { BRANDS } from "@/lib/products";

export default function BrandsStrip() {
  return (
    <section className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <h2 className="text-center font-display text-2xl font-medium tracking-tightest md:text-3xl">
        Popularne marki
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
        {BRANDS.map((brand) => (
          <Link
            key={brand}
            href={`/produkty?marka=${encodeURIComponent(brand)}`}
            className="flex h-20 items-center justify-center rounded-2xl border border-border text-sm text-fg/70 transition-colors hover:border-fg/40 hover:text-fg"
          >
            {brand}
          </Link>
        ))}
      </div>
    </section>
  );
}