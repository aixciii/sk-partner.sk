'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, RefreshCw, CheckCircle, XCircle, Mail, Phone, Building, ExternalLink } from 'lucide-react'

function fmt(n: number) { return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(n) }
function fmtDate(d: string) { return new Date(d).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
function fmtDateTime(d: string) { return new Date(d).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }

const tierColors: Record<string, string> = {
  BASIC: 'bg-gray-700/50 text-gray-300',
  PREMIUM: 'bg-blue-500/10 text-blue-400',
  GOLD: 'bg-yellow-500/10 text-yellow-400',
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [tierFilter, setTierFilter] = useState('ALL')
  const [sort, setSort] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (filter !== 'ALL') params.set('approved', filter)
    if (tierFilter !== 'ALL') params.set('tier', tierFilter)
    if (sort) params.set('sort', sort)
    const res = await fetch(`/api/admin/customers?${params}`)
    setCustomers(await res.json())
    setLoading(false)
  }, [search, filter, tierFilter, sort])

  useEffect(() => { load() }, [load])

  async function updateCustomer(id: string, changes: any) {
    setSaving(true)
    const res = await fetch(`/api/admin/customers/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) })
    const updated = await res.json()
    setCustomers(prev => prev.map(c => c.id === id ? updated : c))
    if (selected?.id === id) setSelected(updated)
    setSaving(false)
  }

  const totalRevenue = (c: any) => c.orders?.reduce((s: number, o: any) => s + (o.totalNet ?? 0), 0) ?? 0

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-white text-2xl font-bold">Zákazníci (CRM)</h1><p className="text-gray-500 text-sm mt-1">{customers.length} zákazníkov</p></div>
        <button onClick={load} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><RefreshCw className="w-4 h-4" /></button>
      </div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hľadať zákazníka, email, IČO..." className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {[['ALL', 'Všetci'], ['true', 'Schválení'], ['false', 'Čakajú']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filter === val ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>{label}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {[['ALL', 'Všetky tiery'], ['BASIC', 'Basic'], ['PREMIUM', 'Premium'], ['GOLD', 'Gold']].map(([val, label]) => (
            <button key={val} onClick={() => setTierFilter(val)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${tierFilter === val ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>{label}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500">
          <option value="">Zoradiť: Registrácia</option>
          <option value="volume_desc">Objem: najvyšší</option>
          <option value="volume_asc">Objem: najnižší</option>
        </select>
      </div>
      <div className="flex gap-6">
        <div className={`flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ${selected ? 'lg:flex-[2]' : ''}`}>
          {loading ? <div className="p-8 text-center text-gray-500 text-sm animate-pulse">Načítanie...</div> : customers.length === 0 ? <div className="p-8 text-center text-gray-600 text-sm">Žiadni zákazníci</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-800 text-gray-500 text-xs">
                  <th className="px-4 py-3 text-left font-medium">Zákazník</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Firma / IČO</th>
                  <th className="px-4 py-3 text-center font-medium">Obj.</th>
                  <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Obrat</th>
                  <th className="px-4 py-3 text-center font-medium">Zľava</th>
                  <th className="px-4 py-3 text-center font-medium">Tier</th>
                  <th className="px-4 py-3 text-right font-medium hidden lg:table-cell">Objem (Q)</th>
                  <th className="px-4 py-3 text-center font-medium">Stav</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Reg.</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-800">
                  {customers.map(customer => (
                    <tr key={customer.id} onClick={() => setSelected(selected?.id === customer.id ? null : customer)} className="hover:bg-gray-800/40 transition-colors cursor-pointer">
                      <td className="px-4 py-3"><div className="text-white text-xs font-medium">{customer.name}</div><div className="text-gray-500 text-xs">{customer.email}</div>{customer.phone && <div className="text-gray-600 text-xs">{customer.phone}</div>}</td>
                      <td className="px-4 py-3 hidden md:table-cell"><div className="text-gray-300 text-xs">{customer.company || '—'}</div>{customer.ico && <div className="text-gray-600 text-xs">IČO: {customer.ico}</div>}</td>
                      <td className="px-4 py-3 text-center text-white text-xs">{customer.orders?.length ?? 0}</td>
                      <td className="px-4 py-3 text-right text-white text-xs font-semibold hidden lg:table-cell">{fmt(totalRevenue(customer))}</td>
                      <td className="px-4 py-3 text-center"><span className="text-xs text-yellow-400">{customer.discount > 0 ? `${customer.discount}%` : '—'}</span></td>
                      <td className="px-4 py-3 text-center"><span className={`px-1.5 py-0.5 rounded text-xs font-medium ${tierColors[customer.partnerTier] ?? tierColors.BASIC}`}>{customer.partnerTier ?? 'BASIC'}</span></td>
                      <td className="px-4 py-3 text-right text-gray-300 text-xs hidden lg:table-cell">{fmt(customer.quarterlyVolumeEur ?? 0)}</td>
                      <td className="px-4 py-3 text-center">{customer.approved ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{fmtDate(customer.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {selected && (
          <div className="hidden lg:block w-80 flex-shrink-0 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden h-fit">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <span className="text-white text-sm font-semibold">{selected.name}</span>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xs">✕</button>
            </div>
            <div className="p-4 space-y-4 text-sm">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400 text-xs"><Mail className="w-3.5 h-3.5" />{selected.email}</div>
                {selected.phone && <div className="flex items-center gap-2 text-gray-400 text-xs"><Phone className="w-3.5 h-3.5" />{selected.phone}</div>}
                {selected.company && <div className="flex items-center gap-2 text-gray-400 text-xs"><Building className="w-3.5 h-3.5" />{selected.company}{selected.ico && ` (IČO: ${selected.ico})`}</div>}
                {selected.address && <div className="text-gray-500 text-xs pl-5">{selected.address}, {selected.zip} {selected.city}</div>}
                {selected.ico && (
                  <a href={`https://www.finstat.sk/${selected.ico}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs pl-5">
                    <ExternalLink className="w-3 h-3" />Overiť na FinStat
                  </a>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 rounded-lg p-3 text-center"><div className="text-white text-lg font-bold">{selected.orders?.length ?? 0}</div><div className="text-gray-500 text-xs">objednávok</div></div>
                <div className="bg-gray-800 rounded-lg p-3 text-center"><div className="text-white text-sm font-bold">{fmt(totalRevenue(selected))}</div><div className="text-gray-500 text-xs">obrat</div></div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Zľava (%)</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" max="50" defaultValue={selected.discount} id="discount-input" className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                    <button disabled={saving} onClick={() => { const input = document.getElementById('discount-input') as HTMLInputElement; updateCustomer(selected.id, { discount: parseFloat(input.value) }) }} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors">Uložiť</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 font-medium">Partner tier (manuálny override)</label>
                  <select value={selected.partnerTier ?? 'BASIC'} onChange={e => updateCustomer(selected.id, { partnerTier: e.target.value })} disabled={saving} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                    <option value="BASIC">Basic</option>
                    <option value="PREMIUM">Premium</option>
                    <option value="GOLD">Gold</option>
                  </select>
                  <div className="text-gray-600 text-xs mt-1.5">
                    Objem za kvartál: {fmt(selected.quarterlyVolumeEur ?? 0)}
                    {selected.tierUpdatedAt && ` · aktualiz. ${fmtDateTime(selected.tierUpdatedAt)}`}
                  </div>
                </div>
                <button disabled={saving} onClick={() => updateCustomer(selected.id, { approved: !selected.approved })} className={`w-full py-2 rounded-lg text-xs font-medium transition-colors ${selected.approved ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20' : 'bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/20'}`}>
                  {selected.approved ? 'Zrušiť schválenie' : 'Schváliť zákazníka'}
                </button>
              </div>
              {selected.orders?.length > 0 && (
                <div><div className="text-gray-500 text-xs font-medium mb-2">HISTÓRIA OBJEDNÁVOK</div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {selected.orders.map((o: any) => (
                      <div key={o.id} className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{fmtDate(o.createdAt)}</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${o.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400' : o.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>{o.status}</span>
                        <span className="text-white font-medium">{fmt(o.totalNet)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
