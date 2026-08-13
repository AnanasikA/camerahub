import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/products";
import CategoryBrowser from "@/components/CategoryBrowser";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);

  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Sklep
        </Link>{" "}
        / {category.name}
      </p>
      <h1 className="mt-2 font-display text-3xl font-medium tracking-tightest md:text-4xl">
        {category.name}
      </h1>
      <p className="mt-2 max-w-[50ch] text-muted">
        {products.length} {products.length === 1 ? "produkt" : "produktów"}{" "}
        wybranych dla twórców, dla których liczą się detale.
      </p>
      <div className="mt-10">
        <CategoryBrowser products={products} />
      </div>
    </main>
  );
}