import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="max-w-wrap mx-auto px-6 py-14 sm:py-20 md:px-10">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-medium tracking-tightest sm:text-3xl md:text-4xl">
          Polecane produkty
        </h2>
        <Link
          href="/produkty"
          className="hidden text-sm font-medium text-accent hover:underline sm:inline-flex sm:items-center sm:gap-1"
        >
          Zobacz wszystkie &rarr;
        </Link>
      </div>
      <Link
        href="/produkty"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline sm:hidden"
      >
        Zobacz wszystkie &rarr;
      </Link>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-10 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}