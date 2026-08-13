import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandsStrip from "@/components/BrandsStrip";
import GalleryGrid from "@/components/GalleryGrid";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandsStrip />
      <GalleryGrid />
    </main>
  );
}
