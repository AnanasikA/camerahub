export default function GwarancjaPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <div className="max-w-[65ch]">
        <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
          Gwarancja
        </h1>
        <p className="mt-4 text-fg/80">
          Każdy sprzęt kupiony w CameraHub objęty jest gwarancją producenta,
          a dodatkowo oferujemy własne wsparcie posprzedażowe.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-border">
          <div className="py-6">
            <h2 className="font-medium">Standardowa gwarancja producenta</h2>
            <p className="mt-2 text-sm text-muted">
              24 miesiące na korpusy aparatów i obiektywy, 12 miesięcy na
              akcesoria i sprzęt oświetleniowy — zgodnie z warunkami
              producenta.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Rozszerzona ochrona CameraHub</h2>
            <p className="mt-2 text-sm text-muted">
              Opcjonalne przedłużenie gwarancji do 5 lat, dostępne przy
              zakupie korpusów i obiektywów powyżej 3000 zł.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Co obejmuje gwarancja</h2>
            <p className="mt-2 text-sm text-muted">
              Wady fabryczne i awarie mechaniczne przy normalnym użytkowaniu.
              Gwarancja nie obejmuje uszkodzeń mechanicznych, zalania ani
              napraw wykonanych poza autoryzowanym serwisem.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Jak zgłosić naprawę</h2>
            <p className="mt-2 text-sm text-muted">
              Napisz do nas przez stronę Kontakt, podając numer zamówienia i
              opis usterki — odpowiemy w ciągu 1 dnia roboczego z dalszymi
              krokami.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          To projekt portfolio — powyższe warunki są przykładowe i nie
          stanowią rzeczywistej oferty gwarancyjnej.
        </p>
      </div>
    </main>
  );
}