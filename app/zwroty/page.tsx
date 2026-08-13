export default function ZwrotyPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <div className="max-w-[65ch]">
        <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
          Zwroty
        </h1>
        <p className="mt-4 text-fg/80">
          Chcemy, żebyś kupował sprzęt z pełnym spokojem — jeśli coś nie
          spełni oczekiwań, masz na to 30 dni.
        </p>

        <div className="mt-10 flex flex-col divide-y divide-border">
          <div className="py-6">
            <h2 className="font-medium">30 dni na zwrot</h2>
            <p className="mt-2 text-sm text-muted">
              Licząc od dnia dostarczenia zamówienia, możesz zwrócić produkt
              bez podania przyczyny.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Warunki produktu</h2>
            <p className="mt-2 text-sm text-muted">
              Sprzęt musi być kompletny, nieuszkodzony i w oryginalnym
              opakowaniu. Liczba wykonanych zdjęć nie wpływa na możliwość
              zwrotu.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Zwrot środków</h2>
            <p className="mt-2 text-sm text-muted">
              Pieniądze wracają na oryginalną metodę płatności w ciągu 5–7
              dni roboczych od otrzymania i sprawdzenia przesyłki zwrotnej.
            </p>
          </div>
          <div className="py-6">
            <h2 className="font-medium">Jak zgłosić zwrot</h2>
            <p className="mt-2 text-sm text-muted">
              Napisz do nas przez stronę Kontakt z numerem zamówienia —
              odeślemy etykietę zwrotną i instrukcję pakowania.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          To projekt portfolio — powyższe warunki są przykładowe i nie
          stanowią rzeczywistej polityki zwrotów.
        </p>
      </div>
    </main>
  );
}