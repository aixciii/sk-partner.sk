"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { User, Building, Mail, Phone, ShoppingCart, Lock, CheckCircle, Clock } from "lucide-react"

export default function MojUcetPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/b2b/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) { router.push('/prihlasenie'); return }
        setUser(d)
        setLoading(false)
      })
      .catch(() => router.push('/prihlasenie'))
  }, [])

  if (loading) return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Načítanie...</div>
      </main>
      <Footer />
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20 py-10">
        <div className="mx-auto max-w-3xl px-4 space-y-6">

          <div>
            <h1 className="text-2xl font-bold text-foreground">Môj účet</h1>
            <p className="text-muted-foreground text-sm mt-1">B2B portál DeyeSolar.sk</p>
          </div>

          <div className={`rounded-xl border p-4 flex items-center gap-3 ${user.approved ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : 'border-amber-200 bg-amber-50 dark:bg-amber-950/20'}`}>
            {user.approved
              ? <><CheckCircle className="h-5 w-5 text-green-600 shrink-0" /><div><p className="text-sm font-medium text-green-800 dark:text-green-400">Účet schválený — máte prístup k B2B cenám</p></div></>
              : <><Clock className="h-5 w-5 text-amber-600 shrink-0" /><div><p className="text-sm font-medium text-amber-800 dark:text-amber-400">Účet čaká na schválenie</p><p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">Overíme vaše údaje do 24 hodín a pošleme email.</p></div></>
            }
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">Informácie o účte</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Meno</p>
                  <p className="font-medium text-foreground">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
              {user.company && (
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Firma</p>
                    <p className="font-medium text-foreground">{user.company}</p>
                  </div>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefón</p>
                    <p className="font-medium text-foreground">{user.phone}</p>
                  </div>
                </div>
              )}
              {user.discount > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Vaša zľava</p>
                    <p className="font-medium text-green-600">{user.discount}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Rýchle akcie</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/katalog" className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Katalóg produktov</p>
                  <p className="text-xs text-muted-foreground">Zobraziť B2B ceny</p>
                </div>
              </Link>
              <a href="mailto:sales@sk-partner.sk" className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Kontaktovať obchod</p>
                  <p className="text-xs text-muted-foreground">sales@sk-partner.sk</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
