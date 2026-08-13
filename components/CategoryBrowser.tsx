"use client";

import { Suspense, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, BRANDS } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const ALL_CAMERA_TYPES = ["Bezlusterkowy", "Lustrzanka", "Kompaktowy", "Kinowy"] as const;
const ALL_SENSORS = ["Pełna klatka", "APS-C", "Micro 4/3"] as const;
const ALL_VIDEO_RES = ["4K", "6K", "8K"] as const;

export default function CategoryBrowser({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={null}>
      <CategoryBrowserInner products={products} />
    </Suspense>
  );
}

function CategoryBrowserInner({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const brandFromUrl = searchParams.get("marka");

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 0),
    [products]
  );
  const minPrice = useMemo(
    () => Math.min(...products.map((p) => p.price), maxPrice),
    [products, maxPrice]
  );

  const brandCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const brand of BRANDS) {
      map.set(brand, products.filter((p) => p.brand === brand).length);
    }
    return map;
  }, [products]);

  const cameraTypeCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const type of ALL_CAMERA_TYPES) {
      map.set(type, products.filter((p) => p.cameraType === type).length);
    }
    return map;
  }, [products]);

  const sensorCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const sensor of ALL_SENSORS) {
      map.set(sensor, products.filter((p) => p.sensor === sensor).length);
    }
    return map;
  }, [products]);

  const videoResCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const res of ALL_VIDEO_RES) {
      map.set(res, products.filter((p) => p.videoResolution === res).length);
    }
    return map;
  }, [products]);

  const inStockCount = useMemo(() => products.filter((p) => p.inStock).length, [products]);
  const onSaleCount = useMemo(() => products.filter((p) => p.compareAtPrice).length, [products]);

  const [priceLimit, setPriceLimit] = useState(maxPrice);
  const [activeBrands, setActiveBrands] = useState<string[]>(
    brandFromUrl && BRANDS.includes(brandFromUrl) ? [brandFromUrl] : []
  );
  const [activeCameraTypes, setActiveCameraTypes] = useState<string[]>([]);
  const [activeSensors, setActiveSensors] = useState<string[]>([]);
  const [activeVideoRes, setActiveVideoRes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addItem } = useCart();

  const toggleIn = (
    setter: Dispatch<SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearAll = () => {
    setActiveBrands([]);
    setActiveCameraTypes([]);
    setActiveSensors([]);
    setActiveVideoRes([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setPriceLimit(maxPrice);
  };

  const activeFilterCount =
    activeBrands.length +
    activeCameraTypes.length +
    activeSensors.length +
    activeVideoRes.length +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0) +
    (priceLimit < maxPrice ? 1 : 0);

  const filtersActive = activeFilterCount > 0;

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.price <= priceLimit);

    if (activeBrands.length > 0) {
      result = result.filter((p) => activeBrands.includes(p.brand));
    }
    if (activeCameraTypes.length > 0) {
      result = result.filter((p) => p.cameraType && activeCameraTypes.includes(p.cameraType));
    }
    if (activeSensors.length > 0) {
      result = result.filter((p) => p.sensor && activeSensors.includes(p.sensor));
    }
    if (activeVideoRes.length > 0) {
      result = result.filter(
        (p) => p.videoResolution && activeVideoRes.includes(p.videoResolution)
      );
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    if (onSaleOnly) {
      result = result.filter((p) => p.compareAtPrice);
    }

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
      }
    });

    return result;
  }, [
    products,
    activeBrands,
    activeCameraTypes,
    activeSensors,
    activeVideoRes,
    inStockOnly,
    onSaleOnly,
    priceLimit,
    sort,
  ]);

  const filtersProps = {
    priceLimit,
    setPriceLimit,
    minPrice,
    maxPrice,
    activeBrands,
    setActiveBrands,
    activeCameraTypes,
    setActiveCameraTypes,
    activeSensors,
    setActiveSensors,
    activeVideoRes,
    setActiveVideoRes,
    inStockOnly,
    setInStockOnly,
    onSaleOnly,
    setOnSaleOnly,
    brandCounts,
    cameraTypeCounts,
    sensorCounts,
    videoResCounts,
    inStockCount,
    onSaleCount,
    filtersActive,
    clearAll,
    toggleIn,
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr]">
      {/* Desktop: panel filtrów zawsze widoczny w kolumnie po lewej */}
      <aside className="hidden md:block">
        <FiltersContent {...filtersProps} />
      </aside>

      {/* Mobile: przycisk otwierający wysuwany panel, żeby nie zajmować pół ekranu */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm md:hidden"
      >
        <SlidersHorizontal size={15} strokeWidth={1.8} />
        Filtry
        {activeFilterCount > 0 && (
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-fg px-1.5 text-[11px] text-bg">
            {activeFilterCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[998] bg-fg/40 md:hidden"
              onClick={() => setMobileFiltersOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[999] flex max-h-[85vh] flex-col rounded-t-2xl bg-bg md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Filtry"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <p className="font-display text-lg">Filtry</p>
                <button
                  aria-label="Zamknij filtry"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-muted hover:text-fg"
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-5">
                <FiltersContent {...filtersProps} />
              </div>
              <div className="border-t border-border px-6 py-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full rounded-full bg-fg py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  Pokaż {filtered.length}{" "}
                  {filtered.length === 1 ? "produkt" : "produktów"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div>
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {filtered.length} {filtered.length === 1 ? "produkt" : "produktów"}
          </p>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-bg px-3.5 py-1.5 text-xs outline-none"
              aria-label="Sortuj produkty"
            >
              <option value="featured">Polecane</option>
              <option value="price-asc">Cena: od najniższej</option>
              <option value="price-desc">Cena: od najwyższej</option>
              <option value="rating">Najwyżej oceniane</option>
            </select>
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                aria-label="Widok siatki"
                onClick={() => setView("grid")}
                className={`rounded-full p-1.5 ${view === "grid" ? "bg-fg text-bg" : "text-fg/60"}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                aria-label="Widok listy"
                onClick={() => setView("list")}
                className={`rounded-full p-1.5 ${view === "list" ? "bg-fg text-bg" : "text-fg/60"}`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ul className="mt-6 flex flex-col divide-y divide-border">
            {filtered.map((product) => (
              <ListRow key={product.id} product={product} onAdd={() => addItem(product)} />
            ))}
          </ul>
        )}

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            Żaden produkt nie pasuje do wybranych filtrów.
          </p>
        )}
      </div>
    </div>
  );
}

interface FiltersContentProps {
  priceLimit: number;
  setPriceLimit: (v: number) => void;
  minPrice: number;
  maxPrice: number;
  activeBrands: string[];
  setActiveBrands: Dispatch<SetStateAction<string[]>>;
  activeCameraTypes: string[];
  setActiveCameraTypes: Dispatch<SetStateAction<string[]>>;
  activeSensors: string[];
  setActiveSensors: Dispatch<SetStateAction<string[]>>;
  activeVideoRes: string[];
  setActiveVideoRes: Dispatch<SetStateAction<string[]>>;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (v: boolean) => void;
  brandCounts: Map<string, number>;
  cameraTypeCounts: Map<string, number>;
  sensorCounts: Map<string, number>;
  videoResCounts: Map<string, number>;
  inStockCount: number;
  onSaleCount: number;
  filtersActive: boolean;
  clearAll: () => void;
  toggleIn: (setter: Dispatch<SetStateAction<string[]>>, value: string) => void;
}

function FiltersContent({
  priceLimit,
  setPriceLimit,
  minPrice,
  maxPrice,
  activeBrands,
  setActiveBrands,
  activeCameraTypes,
  setActiveCameraTypes,
  activeSensors,
  setActiveSensors,
  activeVideoRes,
  setActiveVideoRes,
  inStockOnly,
  setInStockOnly,
  onSaleOnly,
  setOnSaleOnly,
  brandCounts,
  cameraTypeCounts,
  sensorCounts,
  videoResCounts,
  inStockCount,
  onSaleCount,
  filtersActive,
  clearAll,
  toggleIn,
}: FiltersContentProps) {
  return (
    <>
      <div className="hidden items-center justify-between md:flex">
        <p className="text-sm font-medium">Filtry</p>
        {filtersActive && (
          <button
            onClick={clearAll}
            className="text-xs text-accent hover:underline"
          >
            Wyczyść wszystko
          </button>
        )}
      </div>
      {filtersActive && (
        <button
          onClick={clearAll}
          className="mb-2 text-xs text-accent hover:underline md:hidden"
        >
          Wyczyść wszystko
        </button>
      )}

      <div className="mt-4 md:mt-6">
        <p className="text-xs text-muted">Cena do {formatPrice(priceLimit)}</p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          className="mt-3 w-full accent-fg"
        />
      </div>

      <FilterGroup
        title="Marka"
        options={BRANDS}
        counts={brandCounts}
        active={activeBrands}
        onToggle={(v) => toggleIn(setActiveBrands, v)}
      />

      <FilterGroup
        title="Typ aparatu"
        options={[...ALL_CAMERA_TYPES]}
        counts={cameraTypeCounts}
        active={activeCameraTypes}
        onToggle={(v) => toggleIn(setActiveCameraTypes, v)}
      />

      <FilterGroup
        title="Matryca"
        options={[...ALL_SENSORS]}
        counts={sensorCounts}
        active={activeSensors}
        onToggle={(v) => toggleIn(setActiveSensors, v)}
      />

      <FilterGroup
        title="Rozdzielczość wideo"
        options={[...ALL_VIDEO_RES]}
        counts={videoResCounts}
        active={activeVideoRes}
        onToggle={(v) => toggleIn(setActiveVideoRes, v)}
      />

      <div className="mt-8 flex flex-col gap-2.5">
        <label
          className={`flex items-center gap-2.5 text-sm ${
            inStockCount === 0 ? "cursor-not-allowed text-muted/50" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            disabled={inStockCount === 0}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-fg disabled:opacity-40"
          />
          Tylko dostępne <span className="text-muted">({inStockCount})</span>
        </label>
        <label
          className={`flex items-center gap-2.5 text-sm ${
            onSaleCount === 0 ? "cursor-not-allowed text-muted/50" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            checked={onSaleOnly}
            disabled={onSaleCount === 0}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-fg disabled:opacity-40"
          />
          Na wyprzedaży <span className="text-muted">({onSaleCount})</span>
        </label>
      </div>
    </>
  );
}

function FilterGroup({
  title,
  options,
  counts,
  active,
  onToggle,
}: {
  title: string;
  options: string[];
  counts: Map<string, number>;
  active: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-8">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {title}
      </p>
      <div className="mt-3 flex flex-col gap-2.5">
        {options.map((option) => {
          const count = counts.get(option) ?? 0;
          const disabled = count === 0;
          return (
            <label
              key={option}
              className={`flex items-center gap-2.5 text-sm ${
                disabled ? "cursor-not-allowed text-muted/50" : "cursor-pointer"
              }`}
            >
              <input
                type="checkbox"
                checked={active.includes(option)}
                disabled={disabled}
                onChange={() => onToggle(option)}
                className="h-4 w-4 rounded border-border accent-fg disabled:opacity-40"
              />
              {option} <span className="text-muted">({count})</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ListRow({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [broken, setBroken] = useState(false);

  return (
    <li className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-center gap-4">
        <Link
          href={`/produkt/${product.slug}`}
          className="viewfinder relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg text-fg/40 sm:h-20 sm:w-20"
        >
          {!broken ? (
            <Image
              src={`/produkty/${product.slug}.jpg`}
              alt={product.name}
              fill
              sizes="80px"
              className="object-contain p-2"
              onError={() => setBroken(true)}
            />
          ) : (
            <div className="ph-block absolute inset-0" />
          )}
        </Link>
        <div className="min-w-0 sm:hidden">
          <p className="text-xs uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <Link
            href={`/produkt/${product.slug}`}
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            {product.name}
          </Link>
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="text-xs uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <Link
          href={`/produkt/${product.slug}`}
          className="text-sm font-medium hover:text-accent transition-colors"
        >
          {product.name}
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="text-sm font-medium">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={onAdd}
          className="rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-colors hover:bg-accent"
        >
          Do koszyka
        </button>
      </div>
    </li>
  );
}
