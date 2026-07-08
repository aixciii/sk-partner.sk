'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sun, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Nesprávne prihlasovacie údaje')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400/10 rounded-2xl mb-4">
            <Sun className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-white text-xl font-bold">Deye Solar Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Prihláste sa do administrácie</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="admin@sk-partner.sk" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Heslo</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" />
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />{loading ? 'Prihlasovanie...' : 'Prihlásiť sa'}
          </button>
        </form>
      </div>
    </div>
  )
}
