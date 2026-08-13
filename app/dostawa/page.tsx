export default function DostawaPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <div className="max-w-[65ch]">
        <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
          Dostawa
        </h1>
        <p className="mt-4 text-fg/80">
          Zamówienia realizujemy szybko i śledzimy każdą przesyłkę od
          momentu wysyłki z magazynu do dostarczenia pod drzwi.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-border">
          <div className="py-6">
            <h2 className="font-medium">Standardowa dostawa</h2>
            <p className="mt-2 text-sm text-muted">
              1–2 dni robocze na wysyłkę, 2–4 dni robocze w drodze. Darmowa
              od zamówień powyżej 500 zł, w innych przypadkach 19,99 zł.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Dostawa ekspresowa</h2>
            <p className="mt-2 text-sm text-muted">
              Wysyłka tego samego dnia przy zamówieniu do 12:00, dostawa
              następnego dnia roboczego. Koszt: 39,99 zł.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Odbiór osobisty</h2>
            <p className="mt-2 text-sm text-muted">
              Bezpłatny odbiór w punkcie partnerskim w ciągu 24 godzin od
              złożenia zamówienia — powiadomimy Cię e-mailem, gdy paczka
              będzie gotowa.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Śledzenie przesyłki</h2>
            <p className="mt-2 text-sm text-muted">
              Link do śledzenia otrzymasz e-mailem w momencie nadania
              przesyłki.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          To projekt portfolio — powyższe dane są przykładowe i nie
          odzwierciedlają działania prawdziwej firmy kurierskiej.
        </p>
      </div>
    </main>
  );
}