import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="max-w-wrap mx-auto px-6 py-20 md:px-10">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
          Polecane produkty
        </h2>
        <Link
  href="/produkty"
  className="hidden text-sm font-medium text-accent hover:underline sm:inline-flex sm:items-center sm:gap-1"
>
  Zobacz wszystkie &rarr;
</Link>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}