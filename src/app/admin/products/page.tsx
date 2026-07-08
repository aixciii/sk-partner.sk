'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, Pencil, ToggleLeft, ToggleRight, RefreshCw, Star } from 'lucide-react'

function fmt(n: number) { return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(n) }

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('ALL')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkSaving, setBulkSaving] = useState(false)
  const [bulkData, setBulkData] = useState<{ priceNet: string; active: string; description: string }>({ priceNet: '', active: '', description: '' })
  const [inlineEdit, setInlineEdit] = useState<{ id: string; field: string } | null>(null)
  const [inlineValue, setInlineValue] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const [pRes, cRes] = await Promise.all([
      fetch(`/api/admin/products${search ? `?q=${search}` : ''}`),
      fetch('/api/categories'),
    ])
    setProducts(await pRes.json())
    if (cRes.ok) setCategories(await cRes.json())
    setLoading(false)
  }, [search])

  useEffect(() => { load() }, [load])

  const brands = Array.from(new Set(products.map(p => p.brand))).sort()
  const filteredProducts = products.filter(p =>
    (brandFilter === 'ALL' || p.brand === brandFilter) &&
    (categoryFilter === 'ALL' || p.categoryId === categoryFilter)
  )

  function toggleSelect(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    setSelectedIds(prev => prev.size === filteredProducts.length ? new Set() : new Set(filteredProducts.map(p => p.id)))
  }

  async function applyBulk() {
    setBulkSaving(true)
    const data: any = {}
    if (bulkData.priceNet !== '') data.priceNet = bulkData.priceNet
    if (bulkData.active !== '') data.active = bulkData.active === 'true'
    if (bulkData.description !== '') data.description = bulkData.description
    await fetch('/api/admin/products/bulk', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: Array.from(selectedIds), data }) })
    await load()
    setSelectedIds(new Set())
    setBulkData({ priceNet: '', active: '', description: '' })
    setBulkSaving(false)
  }

  async function saveInline(product: any, field: string, value: string) {
    setInlineEdit(null)
    const res = await fetch(`/api/admin/products/${product.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: value }) })
    const updated = await res.json()
    setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
  }

  async function toggleActive(product: any) {
    const res = await fetch(`/api/admin/products/${product.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !product.active }) })
    const updated = await res.json()
    setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
  }

  async function toggleFeatured(product: any) {
    const res = await fetch(`/api/admin/products/${product.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !product.featured }) })
    const updated = await res.json()
    setProducts(prev => prev.map(p => p.id === product.id ? updated : p))
  }

  async function saveProduct() {
    setSaving(true)
    const url = editing.id ? `/api/admin/products/${editing.id}` : '/api/admin/products'
    const method = editing.id ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    const saved = await res.json()
    if (editing.id) { setProducts(prev => prev.map(p => p.id === saved.id ? saved : p)) } else { setProducts(prev => [saved, ...prev]) }
    setEditing(null)
    setSaving(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-white text-2xl font-bold">Produkty</h1><p className="text-gray-500 text-sm mt-1">{filteredProducts.length} z {products.length} produktov</p></div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={() => setEditing({ name: '', model: '', priceNet: '', costPrice: '', vatRate: 0.23, inStock: true, stockQty: 0, transitDate: '', active: true, featured: false, sortOrder: 0 })} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"><Plus className="w-4 h-4" />Nový produkt</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hľadať produkt..." className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="ALL">Všetky značky</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="ALL">Všetky kategórie</option>
          {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-500 text-sm animate-pulse">Načítanie...</div> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-800 text-gray-500 text-xs">
                <th className="px-4 py-3 text-left"><input type="checkbox" checked={filteredProducts.length > 0 && selectedIds.size === filteredProducts.length} onChange={toggleSelectAll} className="w-4 h-4 rounded" /></th>
                <th className="px-4 py-3 text-left font-medium">Produkt</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Značka</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Kategória</th>
                <th className="px-4 py-3 text-right font-medium">Cena (bez DPH)</th>
                <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Marža</th>
                <th className="px-4 py-3 text-center font-medium">Sklad</th>
                <th className="px-4 py-3 text-center font-medium">Aktívny</th>
                <th className="px-4 py-3 text-center font-medium">Featured</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProducts.map(product => (
                  <tr key={product.id} className={`hover:bg-gray-800/40 transition-colors ${!product.active ? 'opacity-50' : ''} ${selectedIds.has(product.id) ? 'bg-blue-500/5' : ''}`}>
                    <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.has(product.id)} onChange={() => toggleSelect(product.id)} className="w-4 h-4 rounded" /></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-3">{product.imageUrl && <img src={product.imageUrl} alt="" className="w-10 h-10 object-contain rounded bg-gray-800" />}<div><div className="text-white text-xs font-medium">{product.name}</div><div className="text-gray-500 text-xs font-mono">{product.model}</div></div></div></td>
                    <td className="px-4 py-3 text-gray-400 text-xs uppercase hidden md:table-cell">{product.brand}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{product.category?.name}</td>
                    <td className="px-4 py-3 text-right text-white text-xs font-semibold" onDoubleClick={() => { setInlineEdit({ id: product.id, field: 'priceNet' }); setInlineValue(String(product.priceNet)) }}>
                      {inlineEdit?.id === product.id && inlineEdit.field === 'priceNet' ? (
                        <input
                          autoFocus type="number" value={inlineValue}
                          onChange={e => setInlineValue(e.target.value)}
                          onBlur={() => saveInline(product, 'priceNet', inlineValue)}
                          onKeyDown={e => { if (e.key === 'Enter') saveInline(product, 'priceNet', inlineValue); if (e.key === 'Escape') setInlineEdit(null) }}
                          className="w-20 bg-gray-800 border border-blue-500 rounded px-2 py-1 text-white text-xs text-right"
                        />
                      ) : fmt(product.priceNet)}
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      {product.costPrice ? (
                        <div>
                          <div className="text-xs font-medium text-green-400">{fmt(product.priceNet - product.costPrice)}</div>
                          <div className="text-xs text-gray-500">{Math.round((product.priceNet - product.costPrice) / product.priceNet * 100)}%</div>
                        </div>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center" onDoubleClick={() => { if (product.stockStatus !== 'instock') return; setInlineEdit({ id: product.id, field: 'stockQty' }); setInlineValue(String(product.stockQty)) }}>
                      {inlineEdit?.id === product.id && inlineEdit.field === 'stockQty' ? (
                        <input
                          autoFocus type="number" value={inlineValue}
                          onChange={e => setInlineValue(e.target.value)}
                          onBlur={() => saveInline(product, 'stockQty', inlineValue)}
                          onKeyDown={e => { if (e.key === 'Enter') saveInline(product, 'stockQty', inlineValue); if (e.key === 'Escape') setInlineEdit(null) }}
                          className="w-16 bg-gray-800 border border-blue-500 rounded px-2 py-1 text-white text-xs text-center"
                        />
                      ) : product.stockStatus === 'onorder' ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Na obj.</span>
                      ) : product.stockStatus === 'outofstock' ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">Vypred.</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">{product.stockQty} ks</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center"><button onClick={() => toggleActive(product)} className="text-gray-400 hover:text-white transition-colors">{product.active ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5" />}</button></td>
                    <td className="px-4 py-3 text-center"><button onClick={() => toggleFeatured(product)} className="text-gray-400 hover:text-white transition-colors"><Star className={`w-4 h-4 ${product.featured ? 'text-yellow-400 fill-yellow-400' : ''}`} /></button></td>
                    <td className="px-4 py-3"><button onClick={() => setEditing({ ...product, categoryId: product.categoryId })} className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"><Pencil className="w-3.5 h-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedIds.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-4 flex flex-wrap items-center gap-3 w-full max-w-2xl mx-4">
          <span className="text-white text-sm font-medium whitespace-nowrap">Vybraných {selectedIds.size} produktov</span>
          <input type="number" placeholder="Cena (€)" value={bulkData.priceNet} onChange={e => setBulkData({ ...bulkData, priceNet: e.target.value })} className="w-28 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500" />
          <select value={bulkData.active} onChange={e => setBulkData({ ...bulkData, active: e.target.value })} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500">
            <option value="">Aktívny: nezmeniť</option>
            <option value="true">Aktívny: áno</option>
            <option value="false">Aktívny: nie</option>
          </select>
          <input placeholder="Popis (placeholder)" value={bulkData.description} onChange={e => setBulkData({ ...bulkData, description: e.target.value })} className="flex-1 min-w-32 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500" />
          <button disabled={bulkSaving} onClick={applyBulk} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap">
            {bulkSaving ? 'Ukladanie...' : `Uložiť pre ${selectedIds.size}`}
          </button>
          <button onClick={() => setSelectedIds(new Set())} className="text-gray-400 hover:text-white text-xs">Zrušiť výber</button>
        </div>
      )}
      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-white font-semibold">{editing.id ? 'Upraviť produkt' : 'Nový produkt'}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {[{ label: 'Názov', key: 'name', type: 'text' }, { label: 'Model', key: 'model', type: 'text' }, { label: 'Cena bez DPH (€)', key: 'priceNet', type: 'number' }, { label: 'Počet na sklade', key: 'stockQty', type: 'number' }, { label: 'URL obrázka', key: 'imageUrl', type: 'text' }, { label: 'Slug (URL)', key: 'slug', type: 'text' }, { label: 'Nákupná cena / náklad (€)', key: 'costPrice', type: 'number' }, { label: 'Dátum dodania (na ceste)', key: 'transitDate', type: 'text' }].map(({ label, key, type }) => (
                <div key={key}><label className="block text-xs text-gray-400 mb-1.5 font-medium">{label}</label><input type={type} value={editing[key] ?? ''} onChange={e => setEditing({ ...editing, [key]: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" /></div>
              ))}
              {categories.length > 0 && (
                <div><label className="block text-xs text-gray-400 mb-1.5 font-medium">Kategória</label>
                  <select value={editing.categoryId ?? ''} onChange={e => setEditing({ ...editing, categoryId: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option value="">— Vyberte kategóriu —</option>
                    {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              )}
              <div><label className="block text-xs text-gray-400 mb-1.5 font-medium">Popis</label><textarea value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" /></div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">B2B cenové tiere</label>
                <div className="space-y-2">
                  {(editing.wholesalePrices && Array.isArray(editing.wholesalePrices) ? editing.wholesalePrices : [{label:'',min:1,max:3,price:null},{label:'',min:4,max:11,price:null},{label:'',min:12,max:23,price:null},{label:'',min:24,max:null,price:null}]).map((tier: any, i: number) => {
                    const tiers = editing.wholesalePrices && Array.isArray(editing.wholesalePrices) ? [...editing.wholesalePrices] : [{label:'',min:1,max:3,price:null},{label:'',min:4,max:11,price:null},{label:'',min:12,max:23,price:null},{label:'',min:24,max:null,price:null}]
                    return (
                      <div key={i} className="grid grid-cols-4 gap-2 items-center">
                        <input placeholder="Label" value={tier.label ?? ''} onChange={e => { tiers[i] = {...tiers[i], label: e.target.value}; setEditing({...editing, wholesalePrices: tiers}) }} className="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500" />
                        <input placeholder="Od" type="number" value={tier.min ?? ''} onChange={e => { tiers[i] = {...tiers[i], min: parseInt(e.target.value)}; setEditing({...editing, wholesalePrices: tiers}) }} className="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500" />
                        <input placeholder="Do (prázdne=∞)" type="number" value={tier.max ?? ''} onChange={e => { tiers[i] = {...tiers[i], max: e.target.value ? parseInt(e.target.value) : null}; setEditing({...editing, wholesalePrices: tiers}) }} className="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500" />
                        <input placeholder="Cena (prázdne=dopyt)" type="number" value={tier.price ?? ''} onChange={e => { tiers[i] = {...tiers[i], price: e.target.value ? parseFloat(e.target.value) : null}; setEditing({...editing, wholesalePrices: tiers}) }} className="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500" />
                      </div>
                    )
                  })}
                  <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 px-1"><span>Názov tiera</span><span>Od (ks)</span><span>Do (ks)</span><span>Cena €</span></div>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Stav skladu</label>
                <select value={editing.stockStatus ?? 'instock'} onChange={e => setEditing({ ...editing, stockStatus: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                  <option value="instock">✅ Skladom</option>
                  <option value="onorder">🕐 Na objednávku (do 2 týždňov)</option>
                  <option value="outofstock">❌ Vypredané</option>
                </select>
              </div>
              <div className="flex gap-4">{[{ label: 'Na sklade', key: 'inStock' }, { label: 'Aktívny', key: 'active' }, { label: 'Featured', key: 'featured' }].map(({ label, key }) => (<label key={key} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editing[key] ?? false} onChange={e => setEditing({ ...editing, [key]: e.target.checked })} className="w-4 h-4 rounded" /><span className="text-gray-300 text-sm">{label}</span></label>))}</div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="flex-1 border border-gray-700 text-gray-400 hover:text-white rounded-lg py-2.5 text-sm transition-colors">Zrušiť</button>
                <button onClick={saveProduct} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors">{saving ? 'Ukladanie...' : 'Uložiť'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
