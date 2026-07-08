'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart'
import { formatPrice, calculateVatPrice, fetchProducts } from '@/lib/products'

function getRelatedCategories(category: string): string[] {
  const map: Record<string, string[]> = {
    'hybrid-lv-1f': ['battery-lv'],
    'hybrid-lv-3f': ['battery-lv'],
    'hybrid-hv-3f': ['battery-hv'],
    'on-grid':      ['hybrid-lv-3f', 'battery-lv'],
    'battery-lv':   ['hybrid-lv-1f', 'hybrid-lv-3f'],
    'battery-hv':   ['hybrid-hv-3f'],
  }
  return map[category] ?? []
}

const categoryLabels: Record<string, string> = {
  'battery-lv': '🔋 Odporúčané batérie LV',
  'battery-hv': '🔋 Odporúčané batérie HV',
  'hybrid-lv-1f': '⚡ Odporúčané meniče',
  'hybrid-lv-3f': '⚡ Odporúčané meniče',
  'hybrid-hv-3f': '⚡ Odporúčané meniče',
  'on-grid': '⚡ Odporúčané meniče',
}

export function RelatedProducts({ currentProductId, category }: { currentProductId: string; category: string }) {
  const [products, setProducts] = useState<any[]>([])
  const addItem = useCartStore(state => state.addItem)
  const relatedCategories = getRelatedCategories(category)

  useEffect(() => {
    if (!relatedCategories.length) return
    Promise.all(
      relatedCategories.map(cat => fetchProducts({ category: cat }))
    ).then(results => {
      const all = results.flat().filter((p: any) => p.id !== currentProductId && p.inStock !== false)
      const sorted = all.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      setProducts(sorted.slice(0, 3))
    }).catch(() => {})
  }, [currentProductId, category])

  if (!products.length) return null

  const title = relatedCategories.map(c => categoryLabels[c]).filter(Boolean)[0] ?? 'Odporúčané produkty'

  return (
    <div className="mt-12 border-t border-border pt-10">
      <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">Produkty vhodné k tomuto zariadeniu</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <div key={product.id} className="rounded-xl border border-border bg-card p-4 flex flex-col">
            <div className="flex items-center justify-center h-32 mb-3 bg-muted/30 rounded-lg overflow-hidden">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain p-2" />
              ) : (
                <div className="h-16 w-16 bg-muted/60 rounded-lg" />
              )}
            </div>
            <div className="flex-1">
              <Link href={`/produkt/${product.slug ?? product.id}`} className="font-semibold text-sm text-foreground hover:text-primary line-clamp-2">
                {product.name}
              </Link>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.shortSpecs}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-foreground">
                  {formatPrice(product.priceExVat)} € <span className="font-normal text-xs text-muted-foreground">bez DPH</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatPrice(calculateVatPrice(product.priceExVat, product.vatRate))} € s DPH
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => addItem(product, 1)} className="gap-1">
                <ShoppingCart className="h-3.5 w-3.5" />
                Pridať
              </Button>
            </div>
            <div className="mt-2 text-xs">
              {product.stockStatus === 'onorder' ? (
                <span className="text-yellow-600 dark:text-yellow-400">🕐 Na objednávku</span>
              ) : (
                <span className="text-green-600 dark:text-green-400">✅ Skladom</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
