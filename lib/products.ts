import { Category, Product } from "./types";

export const CATEGORIES: Category[] = [
  { slug: "mirrorless", name: "Aparaty bezlusterkowe", photoLabel: "Zdjęcie / Aparat bezlusterkowy" },
  { slug: "dslr", name: "Lustrzanki cyfrowe", photoLabel: "Zdjęcie / Lustrzanka" },
  { slug: "cinema", name: "Kamery kinowe", photoLabel: "Zdjęcie / Kamera kinowa" },
  { slug: "lenses", name: "Obiektywy", photoLabel: "Zdjęcie / Obiektyw" },
  { slug: "drones", name: "Drony", photoLabel: "Zdjęcie / Dron" },
  { slug: "lighting", name: "Oświetlenie", photoLabel: "Zdjęcie / Oświetlenie" },
  { slug: "audio", name: "Audio", photoLabel: "Zdjęcie / Sprzęt audio" },
  { slug: "accessories", name: "Akcesoria", photoLabel: "Zdjęcie / Akcesoria" },
];

export const BRANDS = [
  "Canon",
  "Sony",
  "Nikon",
  "Fujifilm",
  "Leica",
  "Panasonic",
  "Sigma",
  "Tamron",
];

function specsFor(category: string): { label: string; value: string }[] {
  switch (category) {
    case "mirrorless":
    case "dslr":
      return [
        { label: "Matryca", value: "Pełna klatka, 45,2 Mpx" },
        { label: "Zakres ISO", value: "100 – 51 200" },
        { label: "Autofokus", value: "759 punktów detekcji fazowej" },
        { label: "Wideo", value: "6K / 30 kl./s, 4K / 120 kl./s" },
        { label: "Stabilizacja", value: "5-osiowa w korpusie, 8 działek" },
        { label: "Waga", value: "650 g (sam korpus)" },
      ];
    case "cinema":
      return [
        { label: "Matryca", value: "Super 35, 8,6K" },
        { label: "Zakres dynamiki", value: "16 działek" },
        { label: "Nagrywanie", value: "ProRes RAW, wewnętrznie" },
        { label: "Mocowanie", value: "Wymienne, PL / EF" },
        { label: "Filtry ND", value: "Wbudowane, 2–10 działek" },
        { label: "Waga", value: "2,1 kg (sam korpus)" },
      ];
    case "lenses":
      return [
        { label: "Ogniskowa", value: "24–70 mm" },
        { label: "Maks. przysłona", value: "f/2.8 stała" },
        { label: "Elementy optyczne", value: "18 elementów w 13 grupach" },
        { label: "Min. odległość ostrzenia", value: "0,32 m" },
        { label: "Gwint na filtr", value: "82 mm" },
        { label: "Waga", value: "805 g" },
      ];
    case "drones":
      return [
        { label: "Czas lotu", value: "Do 46 minut" },
        { label: "Kamera", value: "Matryca 1 cal, wideo 5,4K" },
        { label: "Zasięg", value: "15 km transmisji" },
        { label: "Wykrywanie przeszkód", value: "Dookólne" },
        { label: "Maks. prędkość", value: "75 km/h (tryb sportowy)" },
        { label: "Waga", value: "895 g" },
      ];
    case "lighting":
      return [
        { label: "Moc", value: "Odpowiednik 300 W" },
        { label: "Temperatura barwowa", value: "2700K – 6500K, regulowana" },
        { label: "CRI / TLCI", value: "97 / 99" },
        { label: "Sterowanie", value: "Aplikacja + pokrętło" },
        { label: "Mocowanie", value: "Bowens S" },
        { label: "Waga", value: "3,4 kg" },
      ];
    case "audio":
      return [
        { label: "Typ", value: "Mikrofon kierunkowy, dwie kapsuły" },
        { label: "Pasmo przenoszenia", value: "20 Hz – 20 kHz" },
        { label: "Złącza", value: "USB-C, 3.5mm, XLR" },
        { label: "Bateria", value: "Do 30 godzin" },
        { label: "Nagrywanie wewnętrzne", value: "32-bit float" },
        { label: "Waga", value: "78 g" },
      ];
    default:
      return [
        { label: "Materiał", value: "Aluminium anodowane" },
        { label: "Kompatybilność", value: "Mocowanie uniwersalne" },
        { label: "W zestawie", value: "Pokrowiec, zestaw montażowy" },
        { label: "Waga", value: "210 g" },
      ];
  }
}

function sampleReviews(seedName: string): Product["reviews"] {
  return [
    {
      id: "r1",
      author: "M. Kowalska",
      rating: 5,
      date: "2026-06-12",
      title: "Dokładnie tego brakowało w moim sprzęcie",
      body: `${seedName} jest w stałym użyciu na sesjach od dwóch miesięcy. Obsługa jest intuicyjna, a jakość obrazu broni się nawet w trudnym świetle.`,
    },
    {
      id: "r2",
      author: "D. Nowak",
      rating: 4,
      date: "2026-05-28",
      title: "Świetny stosunek jakości do ceny, mała krzywa uczenia",
      body: "Kilka sesji zajęło mi oswojenie się z menu, ale gdy już złapałam schemat, przestałam sięgać po cokolwiek innego.",
    },
    {
      id: "r3",
      author: "A. Bianchi",
      rating: 5,
      date: "2026-04-03",
      title: "Niezawodny w pracy komercyjnej",
      body: "Używałem go na trzech zleceniach klienckich pod rząd bez żadnych niespodzianek. Sama niezawodność jest warta swojej ceny.",
    },
  ];
}

const RAW: Omit<Product, "specs" | "reviews">[] = [
  {
    id: "p1",
    slug: "sony-a7x-mirrorless",
    brand: "Sony",
    name: "Sony A7X Mirrorless",
    category: "mirrorless",
    cameraType: "Bezlusterkowy",
    sensor: "Pełna klatka",
    videoResolution: "6K",
    price: 15999,
    badge: "Bestseller",
    rating: 5,
    reviewCount: 342,
    tagline: "Wszechstronny wybór dla twórców hybrydowych.",
    description:
      "Pełnoklatkowy korpus bezlusterkowy dla fotografów, którzy płynnie przechodzą między zdjęciami a wideo. Szybki, cichy i wystarczająco lekki na cały dzień pracy.",
    images: ["Sony A7X / Bezlusterkowy / Studio", "Sony A7X / Widok z góry", "Sony A7X / W dłoni", "Sony A7X / Złącza"],
    inStock: true,
  },
  {
    id: "p2",
    slug: "sony-a7x-compact",
    brand: "Sony",
    name: "Sony A7X Compact",
    category: "mirrorless",
    cameraType: "Bezlusterkowy",
    sensor: "Pełna klatka",
    videoResolution: "4K",
    price: 12999,
    compareAtPrice: 14999,
    rating: 4,
    reviewCount: 118,
    tagline: "Ta sama matryca, mniejsze gabaryty.",
    description:
      "Odchudzona wersja korpusu A7X dla osób, dla których waga liczy się bardziej niż wielkość uchwytu — bez utraty jakości matrycy.",
    images: ["Sony A7X Compact / Studio", "Sony A7X Compact / Bok"],
    inStock: true,
  },
  {
    id: "p3",
    slug: "nikon-z9-studio",
    brand: "Nikon",
    name: "Nikon Z9 Studio",
    category: "mirrorless",
    cameraType: "Bezlusterkowy",
    sensor: "Pełna klatka",
    videoResolution: "8K",
    price: 21999,
    badge: "Bestseller",
    rating: 5,
    reviewCount: 156,
    tagline: "Stworzony na potrzeby całego dnia pracy w studiu.",
    description:
      "Flagowa platforma bezlusterkowa Nikona, dostrojona do pracy studyjnej i edytorialnej, gdzie powtarzalność w tysiącu klatek liczy się bardziej niż pojedyncze ujęcie.",
    images: ["Nikon Z9 / Studio", "Nikon Z9 / Detal uchwytu", "Nikon Z9 / Ekran tylny"],
    inStock: true,
  },
  {
    id: "p4",
    slug: "canon-r5-field",
    brand: "Canon",
    name: "Canon R5 Field",
    category: "mirrorless",
    cameraType: "Bezlusterkowy",
    sensor: "APS-C",
    videoResolution: "4K",
    price: 16999,
    rating: 4,
    reviewCount: 203,
    tagline: "Uszczelniony na pogodę, gdziekolwiek zabierze Cię zlecenie.",
    description:
      "Zabezpieczony przed kurzem i wilgocią, ze śledzeniem autofokusa dostrojonym dla fotografów przyrody i sportu pracujących poza studiem.",
    images: ["Canon R5 / W plenerze", "Canon R5 / Detal uszczelnienia"],
    inStock: true,
  },
  {
    id: "p5",
    slug: "canon-eos-90d",
    brand: "Canon",
    name: "Canon EOS 90D",
    category: "dslr",
    cameraType: "Lustrzanka",
    sensor: "APS-C",
    videoResolution: "4K",
    price: 5999,
    compareAtPrice: 6999,
    rating: 4,
    reviewCount: 267,
    tagline: "Lustrzanka, która wciąż zasługuje na miejsce w torbie.",
    description:
      "Optyczny wizjer, długi czas pracy na baterii i kompatybilność z obiektywami sprzed dekad — dla fotografów, którzy nigdy nie odeszli od lustrzanek.",
    images: ["Canon EOS 90D / Studio", "Canon EOS 90D / Wizjer"],
    inStock: true,
  },
  {
    id: "p6",
    slug: "nikon-d850-classic",
    brand: "Nikon",
    name: "Nikon D850 Classic",
    category: "dslr",
    cameraType: "Lustrzanka",
    sensor: "Pełna klatka",
    videoResolution: "4K",
    price: 8999,
    rating: 5,
    reviewCount: 189,
    tagline: "Referencyjna lustrzanka do krajobrazu i studia.",
    description:
      "45,7 megapiksela przez optyczną ścieżkę obrazu — dla fotografów, którzy drukują wielkoformatowo i nie idą na kompromis w rozdzielczości.",
    images: ["Nikon D850 / Studio", "Nikon D850 / Górna płyta"],
    inStock: true,
  },
  {
    id: "p7",
    slug: "leica-sl3-edition",
    brand: "Leica",
    name: "Leica SL3 Edition",
    category: "cinema",
    cameraType: "Kinowy",
    sensor: "Pełna klatka",
    videoResolution: "8K",
    price: 27999,
    badge: "Limitowana edycja",
    rating: 5,
    reviewCount: 74,
    tagline: "Narzędzie kinowe z duszą aparatu fotograficznego.",
    description:
      "Kinowy korpus Leiki łączy wewnętrzne nagrywanie RAW z kolorystyką, za którą marka jest znana — limitowana seria dla pracujących operatorów.",
    images: ["Leica SL3 Edition / Studio", "Leica SL3 Edition / Na riggu", "Leica SL3 Edition / Detal"],
    inStock: true,
  },
  {
    id: "p8",
    slug: "panasonic-lumix-cine-8k",
    brand: "Panasonic",
    name: "Panasonic Lumix Cine 8K",
    category: "cinema",
    cameraType: "Kinowy",
    sensor: "Micro 4/3",
    videoResolution: "8K",
    price: 17999,
    badge: "Bestseller",
    rating: 5,
    reviewCount: 98,
    tagline: "Wewnętrzne nagrywanie 8K bez zewnętrznego rejestratora.",
    description:
      "Stworzona na plany fabularne i reklamowe, gdzie master 8K to standard, a nie wyjątek. Podwójne natywne ISO utrzymuje czystość nocnych plenerów.",
    images: ["Panasonic Lumix Cine 8K / Studio", "Panasonic Lumix Cine 8K / Na riggu"],
    inStock: true,
  },
  {
    id: "p9",
    slug: "sigma-24-70-f28-art",
    brand: "Sigma",
    name: "Sigma 24-70mm f/2.8 Art",
    category: "lenses",
    price: 4399,
    compareAtPrice: 4999,
    rating: 5,
    reviewCount: 231,
    tagline: "Standardowy zoom, który przerasta swoją cenę.",
    description:
      "Stała przysłona f/2.8 na całym zakresie ogniskowych, z ostrością od brzegu do brzegu dorównującą obiektywom dwa razy droższym.",
    images: ["Sigma 24-70mm / Studio", "Sigma 24-70mm / Detal mocowania"],
    inStock: true,
  },
  {
    id: "p10",
    slug: "fujifilm-xf-56mm-f12",
    brand: "Fujifilm",
    name: "Fujifilm XF 56mm f/1.2",
    category: "lenses",
    price: 3999,
    rating: 5,
    reviewCount: 176,
    tagline: "Stałoogniskowy obiektyw portretowy o niepowtarzalnym charakterze.",
    description:
      "Szybki, ostry przy pełnym otworze, z kolorystyką, za którą kocha się szkła Fujifilm. Ulubieniec portretów edytorialnych.",
    images: ["Fujifilm XF 56mm / Studio", "Fujifilm XF 56mm / Próbka bokeh"],
    inStock: true,
  },
  {
    id: "p11",
    slug: "tamron-70-200-f28",
    brand: "Tamron",
    name: "Tamron 70-200mm f/2.8",
    category: "lenses",
    price: 5199,
    rating: 4,
    reviewCount: 142,
    tagline: "Zasięg i szybkość do sportu i eventów.",
    description:
      "Szybki autofokus i stała przysłona na całym zakresie zoomu — poradzi sobie z całym dniem wesela albo zleceniem sportowym z linii bocznej.",
    images: ["Tamron 70-200mm / Studio"],
    inStock: true,
  },
  {
    id: "p12",
    slug: "skyframe-aero-4",
    brand: "SkyFrame",
    name: "SkyFrame Aero 4",
    category: "drones",
    price: 6799,
    badge: "Nowość",
    rating: 4,
    reviewCount: 61,
    tagline: "Kinowe ujęcia z powietrza bez krzywej uczenia.",
    description:
      "Dookólne wykrywanie przeszkód i matryca 1 cal sprawiają, że to dron, który polecamy fotografom, którzy nigdy wcześniej nie latali.",
    images: ["SkyFrame Aero 4 / Studio", "SkyFrame Aero 4 / W locie"],
    inStock: true,
  },
  {
    id: "p13",
    slug: "skyframe-aero-4-pro",
    brand: "SkyFrame",
    name: "SkyFrame Aero 4 Pro",
    category: "drones",
    price: 9599,
    rating: 5,
    reviewCount: 47,
    tagline: "Aero 4 dostrojony do produkcji komercyjnej.",
    description:
      "Dodaje migawkę mechaniczną i podwójny zoom kamer do platformy Aero 4 — dla produkcji, które nie mogą pozwolić sobie na artefakty rolling shutter.",
    images: ["SkyFrame Aero 4 Pro / Studio"],
    inStock: true,
  },
  {
    id: "p14",
    slug: "luxbeam-300-studio-light",
    brand: "LuxBeam",
    name: "LuxBeam 300 Studio Light",
    category: "lighting",
    price: 1799,
    compareAtPrice: 2199,
    rating: 5,
    reviewCount: 134,
    tagline: "Moc klasy studyjnej w cenie małego studia.",
    description:
      "Regulowana temperatura barwowa i sterowanie z aplikacji sprawiają, że to światło, które polecamy każdemu budującemu pierwszy prawdziwy zestaw studyjny.",
    images: ["LuxBeam 300 / Studio", "LuxBeam 300 / Zestaw z softboxem"],
    inStock: true,
  },
  {
    id: "p15",
    slug: "fieldtone-shotgun-mic",
    brand: "FieldTone",
    name: "FieldTone Shotgun Mic",
    category: "audio",
    price: 1099,
    rating: 4,
    reviewCount: 208,
    tagline: "Czysty dialog, na aparacie lub poza nim.",
    description:
      "Nagrywanie 32-bit float oznacza koniec przesterowanego dźwięku, nawet gdy scena nagle robi się głośna.",
    images: ["FieldTone Shotgun Mic / Studio", "FieldTone Shotgun Mic / Na riggu"],
    inStock: true,
  },
  {
    id: "p16",
    slug: "gripline-carbon-tripod",
    brand: "GripLine",
    name: "GripLine Carbon Tripod",
    category: "accessories",
    price: 1299,
    rating: 5,
    reviewCount: 167,
    tagline: "Ostatni statyw, jaki musisz kupić.",
    description:
      "Nogi z włókna węglowego i płynna głowica wideo w jednym zestawie — udźwiga korpusy kinowe i jest wystarczająco lekki na cały dzień w terenie.",
    images: ["GripLine Carbon Tripod / Studio"],
    inStock: true,
  },
];

export const PRODUCTS: Product[] = RAW.map((p) => ({
  ...p,
  specs: specsFor(p.category),
  reviews: sampleReviews(p.name),
}));

export function formatPrice(value: number): string {
  return `${value.toLocaleString("pl-PL")} zł`;
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getFeaturedProducts(count = 4): Product[] {
  return PRODUCTS.filter((p) => p.badge).slice(0, count);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, count);
}