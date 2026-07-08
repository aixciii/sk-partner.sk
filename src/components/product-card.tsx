"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { Product, categoryColors, formatPrice, calculateVatPrice } from "@/lib/products";
import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      <Link href={`/produkt/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative h-[200px] bg-white p-4">
          {(product.specs as any)?.badge && (
              <span className="absolute right-3 top-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {(product.specs as any).badge}
              </span>
            )}
          <Badge className={cn("absolute left-3 top-3 z-10 text-xs font-medium", categoryColors[product.category])}>
            {product.categoryName}
          </Badge>
          <div className="flex h-full items-center justify-center">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.model} className="h-full w-full object-contain" />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="mx-auto mb-2 h-24 w-24 rounded-lg bg-muted/80" />
                <p className="text-xs">Foto príde čoskoro</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary">{product.name}</h3>
          <p className="mt-1 text-xs font-medium text-primary uppercase tracking-wide">{product.brand}</p>
          {product.quickStats && product.quickStats.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
              {product.quickStats.slice(0, 2).map((stat, i) => (
                <span key={i}><span className="font-medium text-foreground">{stat.value}</span> {stat.label}</span>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{product.shortSpecs}</p>
          )}
          <div className="mt-2">
            {product.stockStatus === 'onorder' ? (
              <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                Na objednávku
              </span>
            ) : product.stockStatus === 'outofstock' ? (
              <span className="inline-flex items-center gap-1 text-xs text-red-500">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Vypredané
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Skladom
              </span>
            )}
          </div>
          <div className="mt-auto pt-4">
            {product.priceHidden ? (
              <Badge variant="secondary" className="gap-1.5 text-xs font-medium">
                <Lock className="h-3 w-3" />
                Len pre partnerov
              </Badge>
            ) : product.priceExVat > 0 ? (
              <>
                <p className="text-lg font-bold">{formatPrice(product.priceExVat)} € bez DPH</p>
                <p className="text-sm text-muted-foreground">{formatPrice(calculateVatPrice(product.priceExVat, product.vatRate))} € s DPH</p>
              </>
            ) : (
              <p className="text-lg font-bold text-muted-foreground">Cena na dopyt</p>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        {product.priceHidden ? (
          <Link href="/registracia" className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium bg-primary text-white hover:bg-blue-700 transition-all duration-300">
            Registrácia pre partnerov
          </Link>
        ) : product.priceExVat > 0 ? (
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
              added ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-blue-700'
            }`}
          >
            {added ? (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Pridané do košíka!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
                Do košíka
              </>
            )}
          </button>
        ) : (
          <Link href={`/produkt/${product.slug}`} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium bg-primary text-white hover:bg-blue-700 transition-all duration-300">
            Vyžiadať cenovú ponuku
          </Link>
        )}
      </div>
    </Card>
  );
}
