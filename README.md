# CameraHub

Projekt portfolio: sklep z aparatami zbudowany w Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz http://localhost:3000

## Co jest gotowe

- **Strona główna** — hero, kategorie, polecane produkty, marki, galeria "Shot on CameraHub"
- **Strona kategorii** (`/kategoria/[slug]`) — filtrowanie po marce, sortowanie (cena/ocena), widok siatka/lista
- **Strona produktu** (`/produkt/[slug]`) — galeria zdjęć, zakładki (opis/specyfikacja/opinie), dobór ilości, produkty powiązane
- **Koszyk** — wysuwany panel (slide-out), zapisywany w `localStorage`, dostępny z każdej podstrony
- **Checkout** (`/checkout`) — 3 kroki: dostawa → płatność → podsumowanie (bez realnej integracji płatności — to demo portfolio)

## Dane produktowe

Wszystkie produkty, marki i zdjęcia to placeholdery w `lib/products.ts` — nazwy modeli są fikcyjne (pod prawdziwymi markami), a zdjęcia to stylizowane bloki z podpisem zamiast prawdziwych fotografii. Stopka ma dopisek "Portfolio demo project — not a real store", żeby było jasne, że to nie realny sklep.

Żeby podmienić placeholdery na prawdziwe zdjęcia:
1. Wrzuć pliki do `/public/products/...`
2. W `lib/types.ts` i `lib/products.ts` zamień pole `images: string[]` (etykiety) na ścieżki do plików
3. W komponentach `ProductCard`, `ProductGallery`, `CategoryGrid` zamień `<div className="ph-block .../>` na `<Image src={...} .../>` z `next/image`

## Design tokens

Zdefiniowane w `tailwind.config.ts`:
- `accent` — #0A5FFF (niebieski akcent)
- `fg` / `bg` / `muted` / `border` / `surface` — skala neutralna
- Fonty: Space Grotesk (nagłówki, `font-display`) + Inter (tekst, `font-body`) — ładowane z Google Fonts przez `next/font`, więc build wymaga dostępu do internetu (standardowo na Vercel to nieproblem)

Sygnaturowy element wizualny: narożniki "wizjera" (`.viewfinder` w `app/globals.css`) na hero i zdjęciach produktowych — nawiązanie do kadru aparatu.

## Deploy

Projekt jest gotowy pod Vercel — wystarczy połączyć repo i wdrożyć bez dodatkowej konfiguracji.
