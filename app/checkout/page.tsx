import CheckoutSteps from "@/components/CheckoutSteps";

export default function CheckoutPage() {
  return (
    <main className="max-w-wrap mx-auto px-6 py-16 md:px-10">
      <h1 className="font-display text-3xl font-medium tracking-tightest md:text-4xl">
        Checkout
      </h1>
      <div className="mt-10">
        <CheckoutSteps />
      </div>
    </main>
  );
}
