"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PrihlaseniePage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/b2b/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      if (!data.approved) {
        setError('Váš účet čaká na schválenie. Kontaktujte nás na sales@sk-partner.sk')
        return
      }
      router.push('/katalog')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20 py-12">
        <div className="mx-auto max-w-sm px-4">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Prihlásenie</h1>
              <p className="mt-2 text-muted-foreground">B2B portál SK Partner</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="info@firma.sk" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Heslo</Label>
                <Input id="password" type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Nemáte účet?{' '}
                <Link href="/registracia" className="text-primary hover:underline">B2B registrácia</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
