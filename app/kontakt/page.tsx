"use client";

import { useState } from "react";
import { Check, Mail, Phone, MapPin } from "lucide-react";

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
        Kontakt
      </h1>
      <p className="mt-4 max-w-[60ch] text-fg/80">
        Masz pytanie o produkt, zamówienie albo współpracę? Napisz do nas —
        odpowiadamy zwykle w ciągu 1 dnia roboczego.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <ContactRow icon={Mail} label="E-mail" value="kontakt@camerahub.pl" />
          <ContactRow icon={Phone} label="Telefon" value="+48 71 123 45 67" />
          <ContactRow
            icon={MapPin}
            label="Adres"
            value={"ul. Przykładowa 12\n50-001 Wrocław"}
          />
        </div>

        <div>
          {submitted ? (
            <div className="flex flex-col items-start rounded-card border border-border px-6 py-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-bg">
                <Check size={22} />
              </div>
              <h2 className="mt-6 font-display text-xl">Wiadomość wysłana</h2>
              <p className="mt-2 text-sm text-muted">
                To projekt portfolio — formularz nie wysyła prawdziwych
                wiadomości, ale w realnym wdrożeniu tu pojawi się
                potwierdzenie.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Imię i nazwisko" placeholder="Anna Kowalska" />
                <Field label="E-mail" type="email" placeholder="anna@example.com" />
              </div>
              <Field label="Temat" placeholder="Pytanie o zamówienie #1234" />
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted">Wiadomość</span>
                <textarea
                  required
                  rows={5}
                  placeholder="W czym możemy pomóc?"
                  className="resize-none rounded-lg border border-border px-3.5 py-2.5 outline-none focus:border-fg"
                />
              </label>

              <button
                type="submit"
                className="mt-2 self-start rounded-full bg-fg px-7 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                Wyślij wiadomość
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface">
        <Icon size={17} strokeWidth={1.6} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="mt-1 whitespace-pre-line text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="rounded-lg border border-border px-3.5 py-2.5 outline-none focus:border-fg"
      />
    </label>
  );
}