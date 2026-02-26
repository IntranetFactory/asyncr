"use client";

import { APISelect } from "@/components/async-select";
import { useState } from "react";

export default function DemoPage() {
  const [selectedProduct1, setSelectedProduct1] = useState<string>("26");
  const [selectedProduct2, setSelectedProduct2] = useState<string>("26");

  console.log(selectedProduct1, selectedProduct2);

  return (
    <main className="flex min-h-screen justify-center gap-4 pt-12">
      <APISelect<Record<string, unknown>>
        searchUrl="https://dummyjson.com/products/search?q=${query}&limit=10"
        idUrl="https://dummyjson.com/products/${id}"
        resultsKey={(data: unknown) => (data as { products: Record<string, unknown>[] }).products}
        getOptionValue={(product) => String(product.id)}
        renderItem={(product) => (
          <>
            <img
              src={product.thumbnail as string}
              alt={product.title as string}
              className="w-8 h-8 rounded object-cover"
            />
            <div className="flex flex-col leading-tight">
              <div className="font-medium">{product.title as string}</div>
              <div className="text-xxs text-muted-foreground">${String(product.price)}</div>
            </div>
          </>
        )}
        renderListItem={(product) => (
          <>
            <img
              src={product.thumbnail as string}
              alt={product.title as string}
              className="w-8 h-8 rounded object-cover"
            />
            <div className="flex flex-col">
              <div className="font-medium">{product.title as string}</div>
              <div className="text-xs text-muted-foreground">${String(product.price)}</div>
            </div>
          </>
        )}
        notFound={<div className="py-6 text-center text-sm">No products found</div>}
        label="Product 1"
        placeholder="Search products..."
        value={selectedProduct1}
        onChange={setSelectedProduct1}
        width="350px"
      />
      <APISelect<Record<string, unknown>>
        searchUrl="https://dummyjson.com/products/search?q=${query}&limit=10"
        idUrl="https://dummyjson.com/products/${id}"
        resultsKey={(data: unknown) => (data as { products: Record<string, unknown>[] }).products}
        getOptionValue={(product) => String(product.id)}
        renderItem={(product) => (
          <>
            <img
              src={product.thumbnail as string}
              alt={product.title as string}
              className="w-8 h-8 rounded object-cover"
            />
            <div className="flex flex-col">
              <div className="font-medium">{product.title as string}</div>
              <div className="text-xs text-muted-foreground">${String(product.price)}</div>
            </div>
          </>
        )}
        notFound={<div className="py-6 text-center text-sm">No products found</div>}
        label="Product 2"
        placeholder="Search products..."
        value={selectedProduct2}
        onChange={setSelectedProduct2}
        width="350px"
      />
    </main>
  );
}
