"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { resolveCompatibleDevices, resolveAccessories, type RelationResult } from "@/lib/product-relations";
import type { Product } from "@/lib/products";

function RelationCard({ item }: { item: RelationResult }) {
  const p = item.product;
  return (
    <Link
      href={`/produkt/${p.slug}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/30 hover:bg-muted/50"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted/30 overflow-hidden">
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.model} className="h-full w-full object-contain p-1" />
        ) : (
          <div className="h-8 w-8 rounded bg-muted/60" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{p.model}</p>
        {item.reason ? (
          <p className="truncate text-xs text-muted-foreground">{item.reason}</p>
        ) : (
          <p className="truncate text-xs text-muted-foreground">
            {p.priceHidden ? "Len pre partnerov" : p.priceExVat > 0 ? `${formatPrice(p.priceExVat)} € bez DPH` : "Cena na dopyt"}
          </p>
        )}
      </div>
    </Link>
  );
}

export function CompatibleDevicesSection({ product }: { product: Product }) {
  const [items, setItems] = useState<RelationResult[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    resolveCompatibleDevices(product).then((r) => { if (!cancelled) setItems(r); });
    return () => { cancelled = true; };
  }, [product.id]);

  if (!items || items.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-lg font-bold text-foreground">Kompatibilné zariadenia</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => <RelationCard key={item.product.id} item={item} />)}
      </div>
    </div>
  );
}

export function AccessoriesSection({ product }: { product: Product }) {
  const [items, setItems] = useState<RelationResult[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    resolveAccessories(product).then((r) => { if (!cancelled) setItems(r); });
    return () => { cancelled = true; };
  }, [product.id]);

  if (!items || items.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-lg font-bold text-foreground">Príslušenstvo</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => <RelationCard key={item.product.id} item={item} />)}
      </div>
    </div>
  );
}
