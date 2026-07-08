'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
    else { setQuery(''); setResults([]) }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.slice(0, 6))
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  function goTo(slug: string) {
    router.push(`/produkt/${slug}`)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md h-9 w-9 text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Hľadať produkt... (napr. SUN-10K, hybridný menič)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {query.trim() && (
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">Hľadám...</div>
                ) : results.length > 0 ? (
                  <ul>
                    {results.map(p => (
                      <li key={p.slug}>
                        <button
                          onClick={() => goTo(p.slug)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="w-12 h-12 bg-muted/30 rounded-lg overflow-hidden shrink-0">
                            {p.imageUrl && <img src={p.imageUrl} alt={p.model} className="w-full h-full object-contain p-1" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-foreground truncate">{p.model}</div>
                            <div className="text-xs text-muted-foreground">{p.shortSpecs}</div>
                          </div>
                          <div className="text-sm font-bold text-foreground shrink-0">{p.priceNet?.toLocaleString('sk-SK')} €</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">Žiadne výsledky pre „{query}"</div>
                )}
              </div>
            )}

            {!query.trim() && (
              <div className="px-4 py-4 text-xs text-muted-foreground">
                Začnite písať pre vyhľadávanie produktov
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
