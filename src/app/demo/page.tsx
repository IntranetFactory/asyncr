"use client";

import { AsyncSelect } from "@/components/async-select";
import { useState } from "react";

async function searchProducts(query?: string): Promise<Record<string, unknown>[]> {
  const url = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=10`
    : `https://dummyjson.com/products?limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
}

async function getProductById(id: string): Promise<Record<string, unknown> | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function DemoPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>("26");

  console.log(selectedProduct);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AsyncSelect<Record<string, unknown>>
        fetcher={searchProducts}
        fetchInitialOption={getProductById}
        renderOption={(product) => (
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
        )}
        getOptionValue={(product) => String(product.id)}
        getDisplayValue={(product) => (
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
        )}
        notFound={<div className="py-6 text-center text-sm">No products found</div>}
        label="Product"
        placeholder="Search products..."
        value={selectedProduct}
        onChange={setSelectedProduct}
        width="350px"
      />
    </main>
  );
}
