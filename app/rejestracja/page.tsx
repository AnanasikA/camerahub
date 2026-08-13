"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function RejestracjaPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="max-w-wrap mx-auto px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
          Załóż konto
        </h1>
        <p className="mt-3 text-muted">
          Śledź zamówienia i zapisuj ulubiony sprzęt na później.
        </p>

        {submitted ? (
          <div className="mt-10 flex flex-col items-center rounded-card border border-border px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-bg">
              <Check size={22} />
            </div>
            <p className="mt-6 text-sm text-muted">
              To wersja demo — rejestracja nie jest podłączona do żadnego
              backendu.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-fg px-6 py-3 text-sm text-bg transition-colors hover:bg-accent"
            >
              Wróć do strony głównej
            </Link>
          </div>
        ) : (
          <form
            className="mt-10 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <Field label="Imię i nazwisko" placeholder="Anna Kowalska" />
            <Field label="E-mail" type="email" placeholder="anna@example.com" />
            <Field label="Hasło" type="password" placeholder="••••••••" />

            <button
              type="submit"
              className="mt-2 rounded-full bg-fg py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              Utwórz konto
            </button>
          </form>
        )}

        {!submitted && (
          <p className="mt-8 text-center text-sm text-muted">
            Masz już konto?{" "}
            <Link href="/logowanie" className="text-fg hover:text-accent">
              Zaloguj się
            </Link>
          </p>
        )}
      </div>
    </main>
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