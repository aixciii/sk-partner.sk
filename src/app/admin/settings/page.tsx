'use client'

import { useEffect, useState } from 'react'
import { Shield, Plus, Trash2, KeyRound, User } from 'lucide-react'

function fmt(d: string) {
  return new Date(d).toLocaleDateString('sk-SK', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function SettingsPage() {
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)

  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '', password: '' })
  const [showNewAdmin, setShowNewAdmin] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(data => { setAdmins(data); setLoading(false) })
  }, [])

  function showMsg(text: string, ok: boolean) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 4000)
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    if (pwForm.newPw !== pwForm.confirm) return showMsg('Heslá sa nezhodujú', false)
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'change_password', currentPassword: pwForm.current, newPassword: pwForm.newPw }),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) { showMsg('Heslo úspešne zmenené', true); setPwForm({ current: '', newPw: '', confirm: '' }) }
    else showMsg(data.error, false)
  }

  async function createAdmin(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_admin', ...newAdmin }),
    })
    const data = await res.json()
    setSaving(false)
    if (res.ok) {
      setAdmins(prev => [...prev, data])
      setNewAdmin({ email: '', name: '', password: '' })
      setShowNewAdmin(false)
      showMsg('Admin vytvorený', true)
    } else showMsg(data.error, false)
  }

  async function deleteAdmin(id: string, name: string) {
    if (!confirm(`Zmazať admina ${name}?`)) return
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete_admin', userId: id }),
    })
    const data = await res.json()
    if (res.ok) { setAdmins(prev => prev.filter(a => a.id !== id)); showMsg('Admin zmazaný', true) }
    else showMsg(data.error, false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Nastavenia</h1>
        <p className="text-gray-500 text-sm mt-1">Správa adminov a hesiel</p>
      </div>

      {msg && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${msg.ok ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {msg.text}
        </div>
      )}

      {/* Change password */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <KeyRound className="w-4 h-4 text-blue-400" />
          </div>
          <h2 className="text-white font-semibold">Zmena hesla</h2>
        </div>
        <form onSubmit={changePassword} className="space-y-4">
          {[
            { label: 'Aktuálne heslo', key: 'current', val: pwForm.current },
            { label: 'Nové heslo', key: 'newPw', val: pwForm.newPw },
            { label: 'Potvrdiť nové heslo', key: 'confirm', val: pwForm.confirm },
          ].map(({ label, key, val }) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">{label}</label>
              <input
                type="password"
                value={val}
                onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            {saving ? 'Ukladanie...' : 'Zmeniť heslo'}
          </button>
        </form>
      </div>

      {/* Admin users */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-white font-semibold">Admin používatelia</h2>
          </div>
          <button
            onClick={() => setShowNewAdmin(!showNewAdmin)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />Nový admin
          </button>
        </div>

        {/* New admin form */}
        {showNewAdmin && (
          <form onSubmit={createAdmin} className="mb-5 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="text-xs text-gray-400 font-medium mb-2">Nový admin účet</div>
            {[
              { label: 'Meno', key: 'name', type: 'text' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Heslo', key: 'password', type: 'password' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input
                  type={type}
                  value={(newAdmin as any)[key]}
                  onChange={e => setNewAdmin(p => ({ ...p, [key]: e.target.value }))}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-medium">Vytvoriť</button>
              <button type="button" onClick={() => setShowNewAdmin(false)} className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded text-xs">Zrušiť</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-gray-500 text-sm animate-pulse">Načítanie...</div>
        ) : (
          <div className="space-y-2">
            {admins.map(admin => (
              <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{admin.name}</div>
                    <div className="text-gray-500 text-xs">{admin.email} · od {fmt(admin.createdAt)}</div>
                  </div>
                </div>
                {admins.length > 1 && (
                  <button
                    onClick={() => deleteAdmin(admin.id, admin.name)}
                    className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
