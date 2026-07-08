'use client'

import { useState, useEffect } from 'react'
import { X, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PopupOffer() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popup-dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setOpen(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setOpen(false)
    sessionStorage.setItem('popup-dismissed', '1')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/popup-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion_event_submit_lead_form_2');
        (window as any).gtag('event', 'form_submit');
      }
      setTimeout(dismiss, 3000)
    } catch {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-5">
          <button onClick={dismiss} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
          <div className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wide mb-1">Špeciálna ponuka</div>
          <h2 className="text-xl font-bold text-white">Získajte cenovú ponuku zadarmo</h2>
          <p className="mt-1 text-sm text-primary-foreground/80">Odpovieme do 24 hodín v pracovné dni</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold text-foreground">Ďakujeme!</p>
              <p className="text-sm text-muted-foreground mt-1">Ozveme sa vám čo najskôr.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Meno a priezvisko *"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Telefón"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <textarea
                  placeholder="O aký produkt máte záujem? (napr. hybridný menič 10kW)"
                  rows={2}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? 'Odosielam...' : 'Požiadať o cenovú ponuku →'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Bez záväzkov · Odpoveď do 24 hodín
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
