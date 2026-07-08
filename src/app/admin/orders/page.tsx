'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, RefreshCw, Eye } from 'lucide-react'

const STATUSES = ['ALL', 'NEW', 'CONFIRMED', 'INVOICED', 'SHIPPED', 'DELIVERED', 'CANCELLED']
const STATUS_LABELS: Record<string, string> = { ALL: 'Všetky', NEW: 'Nové', CONFIRMED: 'Potvrdené', INVOICED: 'Fakturované', SHIPPED: 'Odoslané', DELIVERED: 'Doručené', CANCELLED: 'Zrušené' }
const STATUS_COLORS: Record<string, string> = { NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20', CONFIRMED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', INVOICED: 'bg-purple-500/10 text-purple-400 border-purple-500/20', SHIPPED: 'bg-orange-500/10 text-orange-400 border-orange-500/20', DELIVERED: 'bg-green-500/10 text-green-400 border-green-500/20', CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/20' }

function fmt(n: number) { return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(n) }
function fmtDate(d: string) { return new Date(d).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')
  const [selected, setSelected] = useState<any>(null)
  const [updating, setUpdating] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (status !== 'ALL') params.set('status', status)
    if (search) params.set('q', search)
    const res = await fetch(`/api/admin/orders?${params}`)
    const data = await res.json()
    setOrders(data.orders ?? [])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [status, search])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, newStatus: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
    const updated = await res.json()
    setOrders(prev => prev.map(o => o.id === id ? updated : o))
    if (selected?.id === id) setSelected(updated)
    setUpdating(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-white text-2xl font-bold">Objednávky</h1><p className="text-gray-500 text-sm mt-1">{total} objednávok celkom</p></div>
        <button onClick={load} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><RefreshCw className="w-4 h-4" /></button>
      </div>
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Hľadať objednávku, email, firmu..." className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-wrap gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {STATUSES.map(s => (<button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${status === s ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>{STATUS_LABELS[s]}</button>))}
        </div>
      </div>
      <div className="flex gap-6">
        <div className={`flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden ${selected ? 'lg:flex-[2]' : ''}`}>
          {loading ? <div className="p-8 text-center text-gray-500 text-sm animate-pulse">Načítanie...</div> : orders.length === 0 ? <div className="p-8 text-center text-gray-600 text-sm">Žiadne objednávky</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-800 text-gray-500 text-xs">
                  <th className="px-4 py-3 text-left font-medium">Číslo</th>
                  <th className="px-4 py-3 text-left font-medium">Zákazník</th>
                  <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Dátum</th>
                  <th className="px-4 py-3 text-right font-medium">Suma</th>
                  <th className="px-4 py-3 text-left font-medium">Stav</th>
                  <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">Zmeniť stav</th>
                  <th className="px-4 py-3"></th>
                </tr></thead>
                <tbody className="divide-y divide-gray-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-4 py-3 text-white font-mono text-xs">{order.orderNum}</td>
                      <td className="px-4 py-3"><div className="text-white text-xs font-medium">{order.guestName || order.user?.name || '—'}</div><div className="text-gray-500 text-xs">{order.guestEmail || order.user?.email}</div>{order.company && <div className="text-gray-600 text-xs">{order.company}</div>}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{fmtDate(order.createdAt)}</td>
                      <td className="px-4 py-3 text-right text-white text-xs font-semibold">{fmt(order.totalNet)}</td>
                      <td className="px-4 py-3"><span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[order.status] ?? ''}`}>{STATUS_LABELS[order.status] ?? order.status}</span></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><select value={order.status} disabled={updating} onChange={e => updateStatus(order.id, e.target.value)} className="bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500">{STATUSES.filter(s => s !== 'ALL').map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></td>
                      <td className="px-4 py-3"><button onClick={() => setSelected(selected?.id === order.id ? null : order)} className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"><Eye className="w-3.5 h-3.5" /></button></td>
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
              <span className="text-white text-sm font-semibold">{selected.orderNum}</span>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xs">✕</button>
            </div>
            <div className="p-4 space-y-4 text-sm">
              <div><div className="text-gray-500 text-xs font-medium mb-2">ZÁKAZNÍK</div>
                <div className="text-white">{selected.guestName || selected.user?.name}</div>
                <div className="text-gray-400 text-xs">{selected.guestEmail || selected.user?.email}</div>
                {selected.phone && <div className="text-gray-400 text-xs">{selected.phone}</div>}
                {selected.company && <div className="text-gray-400 text-xs">{selected.company}</div>}
                {selected.ico && <div className="text-gray-400 text-xs">IČO: {selected.ico}</div>}
              </div>
              {selected.address && <div><div className="text-gray-500 text-xs font-medium mb-1">ADRESA</div><div className="text-gray-400 text-xs">{selected.address}, {selected.zip} {selected.city}</div></div>}
              <div><div className="text-gray-500 text-xs font-medium mb-2">POLOŽKY</div>
                <div className="space-y-2">{selected.items?.map((item: any) => (<div key={item.id} className="flex justify-between"><div><div className="text-white text-xs">{item.name}</div><div className="text-gray-500 text-xs">{item.qty}× {fmt(item.priceNet)}</div></div><div className="text-white text-xs font-semibold">{fmt(item.totalNet)}</div></div>))}</div>
              </div>
              <div className="border-t border-gray-800 pt-3">
                <div className="flex justify-between text-xs text-gray-400"><span>Bez DPH</span><span>{fmt(selected.totalNet)}</span></div>
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>DPH 23%</span><span>{fmt(selected.totalVat)}</span></div>
                <div className="flex justify-between text-sm text-white font-bold mt-2"><span>Spolu</span><span>{fmt(selected.totalGross)}</span></div>
              </div>
              {selected.note && <div><div className="text-gray-500 text-xs font-medium mb-1">POZNÁMKA</div><div className="text-gray-400 text-xs bg-gray-800 rounded p-2">{selected.note}</div></div>}
              <div><div className="text-gray-500 text-xs font-medium mb-1.5">ZMENIŤ STAV</div>
                <select value={selected.status} disabled={updating} onChange={e => updateStatus(selected.id, e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 px-2 py-2 focus:outline-none focus:border-blue-500">{STATUSES.filter(s => s !== 'ALL').map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
