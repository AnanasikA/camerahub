export type CategorySlug =
  | "mirrorless"
  | "dslr"
  | "cinema"
  | "lenses"
  | "drones"
  | "lighting"
  | "audio"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  photoLabel: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  badge?: "Bestseller" | "Limitowana edycja" | "Nowość";
  rating: number;
  reviewCount: number;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  images: string[]; // placeholder labels
  reviews: Review[];
  inStock: boolean;
  // Poniższe pola dotyczą tylko kamer/aparatów (mirrorless, dslr, cinema) —
  // pozostałe kategorie (obiektywy, drony, oświetlenie...) ich nie mają,
  // więc odpowiednie filtry po prostu się dla nich nie pokazują.
  cameraType?: "Bezlusterkowy" | "Lustrzanka" | "Kompaktowy" | "Kinowy";
  sensor?: "Pełna klatka" | "APS-C" | "Micro 4/3";
  videoResolution?: "4K" | "6K" | "8K";
}