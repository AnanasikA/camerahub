import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import {
  PRODUCTS,
  formatPrice,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <ProductGallery slug={product.slug} name={product.name} />

        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tightest md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-fg/70">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <div className="flex text-fg">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  strokeWidth={0}
                  fill={i < Math.round(product.rating) ? "currentColor" : "#E6E6E9"}
                />
              ))}
            </div>
            <span>{product.rating.toFixed(1)} &middot; {product.reviewCount} opinii</span>
          </div>

          <p className="mt-6 text-2xl font-medium">{formatPrice(product.price)}</p>

          <AddToCartPanel product={product} />

          <p className="mt-4 text-xs text-muted">
            {product.inStock ? "Dostępny — wysyłka w 1–2 dni robocze." : "Obecnie niedostępny."}
          </p>

          <ProductTabs product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl font-medium tracking-tightest md:text-3xl">
            Może Cię też zainteresować
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}