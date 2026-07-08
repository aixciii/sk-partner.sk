'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Package, Users, TrendingUp, AlertCircle, Clock, CheckCircle, Truck, XCircle, Euro } from 'lucide-react'

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  NEW:       { label: 'Nová',        color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',     icon: AlertCircle },
  CONFIRMED: { label: 'Potvrdená',   color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Clock },
  INVOICED:  { label: 'Fakturovaná', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Euro },
  SHIPPED:   { label: 'Odoslaná',    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: Truck },
  DELIVERED: { label: 'Doručená',    color: 'bg-green-500/10 text-green-400 border-green-500/20',   icon: CheckCircle },
  CANCELLED: { label: 'Zrušená',     color: 'bg-red-500/10 text-red-400 border-red-500/20',         icon: XCircle },
}

function fmt(n: number) {
  return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(n)
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(data => { setStats(data); setLoading(false) })
  }, [])

  if (loading) return <div className="p-8 text-gray-500 text-sm animate-pulse">Načítanie štatistík...</div>

  const cards = [
    { label: 'Nové objednávky', value: stats.newOrders, sub: `z ${stats.totalOrders} celkom`, icon: ShoppingCart, color: 'text-blue-400', href: '/admin/orders?status=NEW' },
    { label: 'Obrat (bez DPH)', value: fmt(stats.totalRevenueNet), sub: `${fmt(stats.totalRevenueGross)} s DPH`, icon: TrendingUp, color: 'text-green-400', href: '/admin/orders' },
    { label: 'Zákazníci', value: stats.totalCustomers, sub: 'B2B registrovaných', icon: Users, color: 'text-purple-400', href: '/admin/customers' },
    { label: 'Aktívne produkty', value: stats.totalProducts, sub: 'v katalógu', icon: Package, color: 'text-yellow-400', href: '/admin/products' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Prehľad aktivít deyesolar.sk</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, sub, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="text-white text-2xl font-bold group-hover:text-blue-400 transition-colors">{value}</div>
            <div className="text-gray-600 text-xs mt-1">{sub}</div>
          </Link>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold text-sm">Posledné objednávky</h2>
            <Link href="/admin/orders" className="text-blue-400 text-xs hover:text-blue-300">Všetky →</Link>
          </div>
          <div className="divide-y divide-gray-800">
            {stats.recentOrders.length === 0 && <div className="px-5 py-8 text-center text-gray-600 text-sm">Žiadne objednávky</div>}
            {stats.recentOrders.map((order: any) => {
              const cfg = statusConfig[order.status] ?? statusConfig.NEW
              const Icon = cfg.icon
              return (
                <Link key={order.id} href="/admin/orders" className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-800/50 transition-colors">
                  <div>
                    <div className="text-white text-sm font-medium">{order.orderNum}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{order.guestName || order.user?.name || '—'} · {order.guestEmail || order.user?.email}</div>
                    <div className="text-gray-600 text-xs">{fmtDate(order.createdAt)}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-white text-sm font-semibold">{fmt(order.totalNet)}</div>
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border mt-1 ${cfg.color}`}>
                      <Icon className="w-3 h-3" />{cfg.label}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold text-sm">Objednávky podľa stavu</h2>
          </div>
          <div className="p-4 space-y-2">
            {stats.ordersByStatus.length === 0 && <div className="text-center text-gray-600 text-sm py-4">Žiadne objednávky</div>}
            {stats.ordersByStatus.map((s: any) => {
              const cfg = statusConfig[s.status] ?? statusConfig.NEW
              const Icon = cfg.icon
              return (
                <div key={s.status} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${cfg.color}`}>
                  <div className="flex items-center gap-2"><Icon className="w-3.5 h-3.5" /><span className="text-xs font-medium">{cfg.label}</span></div>
                  <span className="text-xs font-bold">{s._count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
