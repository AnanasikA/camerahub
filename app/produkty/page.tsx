import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import CategoryBrowser from "@/components/CategoryBrowser";

export default function AllProductsPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Sklep
        </Link>{" "}
        / Wszystkie produkty
      </p>
      <h1 className="mt-2 font-display text-3xl font-medium tracking-tightest md:text-4xl">
        Wszystkie produkty
      </h1>
      <p className="mt-2 max-w-[50ch] text-muted">
        {PRODUCTS.length} produktów w całej ofercie CameraHub.
      </p>
      <div className="mt-10">
        <CategoryBrowser products={PRODUCTS} />
      </div>
    </main>
  );
}