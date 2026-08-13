import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-wrap mx-auto flex flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-6xl">404</p>
      <p className="mt-4 text-muted">
        We couldn&apos;t find what you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-fg px-6 py-3 text-sm text-bg hover:bg-accent"
      >
        Back to home
      </Link>
    </main>
  );
}
