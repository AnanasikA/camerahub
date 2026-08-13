import CheckoutSteps from "@/components/CheckoutSteps";

export default function CheckoutPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-14 sm:py-16 md:px-10">
      <h1 className="font-display text-2xl font-medium tracking-tightest sm:text-3xl md:text-4xl">
        Zamówienie
      </h1>
      <div className="mt-8 sm:mt-10">
        <CheckoutSteps />
      </div>
    </main>
  );
}