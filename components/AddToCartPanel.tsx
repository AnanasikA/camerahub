"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "./CartContext";

export default function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="mt-8 flex items-center gap-4">
      <div className="flex items-center gap-3 rounded-full border border-border px-3 py-2.5">
        <button
          aria-label="Zmniejsz ilość"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-fg/70 hover:text-fg"
        >
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm">{quantity}</span>
        <button
          aria-label="Zwiększ ilość"
          onClick={() => setQuantity((q) => q + 1)}
          className="text-fg/70 hover:text-fg"
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={() => addItem(product, quantity)}
        className="flex-1 rounded-full bg-fg py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
      >
        Do koszyka
      </button>
    </div>
  );
}