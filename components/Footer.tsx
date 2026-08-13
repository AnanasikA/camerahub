import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-wrap mx-auto grid grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-display text-lg tracking-tightest">CameraHub</p>
          <p className="mt-4 max-w-[26ch] text-sm text-muted">
            Profesjonalne aparaty i obiektywy dla twórców, którzy nie idą na
            kompromis w jakości obrazu.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">Sklep</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <li>
              <Link href="/kategoria/mirrorless" className="hover:text-fg">
                Bezlusterkowe
              </Link>
            </li>
            <li>
              <Link href="/kategoria/lenses" className="hover:text-fg">
                Obiektywy
              </Link>
            </li>
            <li>
              <Link href="/kategoria/cinema" className="hover:text-fg">
                Kino
              </Link>
            </li>
            <li>
              <Link href="/kategoria/accessories" className="hover:text-fg">
                Akcesoria
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Pomoc</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <li>
              <Link href="/dostawa" className="hover:text-fg">
                Dostawa
              </Link>
            </li>
            <li>
              <Link href="/gwarancja" className="hover:text-fg">
                Gwarancja
              </Link>
            </li>
            <li>
              <Link href="/zwroty" className="hover:text-fg">
                Zwroty
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-fg">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Newsletter</p>
          <div className="mt-4 border-b border-fg/30 pb-2">
            <input
              type="email"
              placeholder="Adres e-mail"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </div>
      </div>

      <div className="max-w-wrap mx-auto flex flex-col gap-2 border-t border-border px-6 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>&copy; 2026 CameraHub. Wszelkie prawa zastrzeżone.</p>
        <p>Projekt portfolio — to nie prawdziwy sklep.</p>
      </div>
    </footer>
  );
}