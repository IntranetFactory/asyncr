"use client";

import { APISelect } from "@/components/async-select";
import { useState } from "react";

export default function DemoPage() {
  const [selectedProduct1, setSelectedProduct1] = useState<string>("26");
  const [selectedProduct2, setSelectedProduct2] = useState<string>("26");

  console.log(selectedProduct1, selectedProduct2);

  const selectProps = {
    searchUrl: "https://dummyjson.com/products/search?q=${query}&limit=10",
    idUrl: "https://dummyjson.com/products/${id}",
    resultsKey: (data: unknown) => (data as { products: Record<string, unknown>[] }).products,
    renderOption: (product: Record<string, unknown>) => (
      <div className="flex items-center gap-2">
        <img
          src={product.thumbnail as string}
          alt={product.title as string}
          className="w-8 h-8 rounded object-cover"
        />
        <div className="flex flex-col">
          <div className="font-medium">{product.title as string}</div>
          <div className="text-xs text-muted-foreground">${String(product.price)}</div>
        </div>
      </div>
    ),
    getOptionValue: (product: Record<string, unknown>) => String(product.id),
    getDisplayValue: (product: Record<string, unknown>) => (
      <div className="flex items-center gap-2 text-left">
        <img
          src={product.thumbnail as string}
          alt={product.title as string}
          className="w-8 h-8 rounded object-cover"
        />
        <div className="flex flex-col leading-tight">
          <div className="font-medium">{product.title as string}</div>
          <div className="text-xxs text-muted-foreground">${String(product.price)}</div>
        </div>
      </div>
    ),
    notFound: <div className="py-6 text-center text-sm">No products found</div>,
    label: "Product",
    placeholder: "Search products...",
    width: "350px",
  } as const;

  return (
    <main className="flex min-h-screen justify-center gap-4 pt-12">
      <APISelect<Record<string, unknown>>
        {...selectProps}
        label="Product 1"
        value={selectedProduct1}
        onChange={setSelectedProduct1}
      />
      <APISelect<Record<string, unknown>>
        {...selectProps}
        label="Product 2"
        value={selectedProduct2}
        onChange={setSelectedProduct2}
      />
    </main>
  );
}
