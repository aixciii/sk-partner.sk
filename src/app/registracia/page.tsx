"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

export default function RegistraciaPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", ico: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/b2b/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20 py-12">
        <div className="mx-auto max-w-lg px-4">
          {success ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Registrácia prijatá</h1>
              <p className="mt-3 text-muted-foreground">
                Váš účet bol vytvorený. Náš tím overí vaše údaje a aktivuje prístup k B2B cenám do 24 hodín.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">O schválení vás informujeme emailom.</p>
              <Link href="/katalog">
                <Button className="mt-6">Prejsť do katalógu</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">B2B registrácia</h1>
                <p className="mt-2 text-muted-foreground">Pre inštalačné firmy a resellerov. Po overení získate prístup k veľkoobchodným cenám.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Meno a priezvisko *</Label>
                    <Input id="name" placeholder="Ján Novák" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Telefón</Label>
                    <Input id="phone" placeholder="+421 9XX XXX XXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="company">Názov firmy *</Label>
                    <Input id="company" placeholder="ABC s.r.o." required value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ico">IČO *</Label>
                    <Input id="ico" placeholder="12345678" required value={form.ico} onChange={e => setForm(p => ({ ...p, ico: e.target.value }))} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="info@firma.sk" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Heslo * (min. 8 znakov)</Label>
                  <Input id="password" type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                </div>

                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Registrujem...' : 'Zaregistrovať sa'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Už máte účet?{' '}
                  <Link href="/prihlasenie" className="text-primary hover:underline">Prihláste sa</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
