'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, Menu, X, Sun, Settings } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Objednávky', icon: ShoppingCart },
  { href: '/admin/products', label: 'Produkty', icon: Package },
  { href: '/admin/customers', label: 'Zákazníci (CRM)', icon: Users },
  { href: '/admin/settings', label: 'Nastavenia', icon: Settings },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return }
    fetch('/api/admin/stats')
      .then(r => { if (r.status === 401) router.push('/admin/login'); else setChecking(false) })
      .catch(() => router.push('/admin/login'))
  }, [router, pathname])

  if (pathname === '/admin/login') return <>{children}</>
  if (checking) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white text-sm animate-pulse">Načítanie...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="hidden lg:flex flex-col w-60 bg-gray-900 border-r border-gray-800 fixed h-full z-30">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
          <Sun className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-white text-sm">Admin Panel</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${pathname === href ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <a href="https://www.deyesolar.sk" target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-white hover:bg-gray-800 w-full transition-colors mb-1">
            🌐 Otvoriť web
          </a>
          <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/admin/login') }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors">
            <LogOut className="w-4 h-4" />Odhlásiť sa
          </button>
        </div>
      </aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2"><Sun className="w-4 h-4 text-yellow-400" /><span className="font-bold text-white text-sm">Admin</span></div>
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setOpen(false)}>
          <aside className="w-60 h-full bg-gray-900 border-r border-gray-800 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="h-14 border-b border-gray-800" />
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${pathname === href ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                  <Icon className="w-4 h-4" />{label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 min-h-screen">{children}</main>
    </div>
  )
}
