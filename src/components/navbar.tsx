"use client"

import { useState } from "react"
import { ChevronDown, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

const katalogItems = [
  { label: "Hybridné meniče LV 3-fázové", href: "/katalog/hybridne-lv-3f" },
  { label: "Hybridné meniče LV 1-fázové", href: "/katalog/hybridne-lv-1f" },
  { label: "Hybridné meniče HV", href: "/katalog/hybridne-hv" },
  { label: "Batérie LV", href: "/katalog/baterie-lv" },
  { label: "Batérie HV + Rack", href: "/katalog/baterie-hv" },
  { label: "On-Grid meniče", href: "/katalog/on-grid" },
  { label: "Priemyselné riešenia", href: "/katalog/komercne-riesenia" },
]

const znackyItems = [
  { label: "Deye", href: "/katalog?brand=deye" },
  { label: "FoxESS", href: "/katalog?brand=fox-ess" },
  { label: "Solis", href: "/katalog?brand=solis" },
  { label: "Dyness", href: "/katalog?brand=dyness" },
  { label: "BYD", href: "/katalog?brand=byd" },
]

const spolocnostItems = [
  { label: "O nás", href: "/o-nas" },
  { label: "Blog", href: "/blog" },
  { label: "Dodanie", href: "/dodanie" },
  { label: "VOP", href: "/vop" },
  { label: "GDPR", href: "/gdpr" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [katalogOpen, setKatalogOpen] = useState(false)
  const [znackyOpen, setZnackyOpen] = useState(false)
  const [spolocnostOpen, setSpolocnostOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" aria-label="SK Partner — domov">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={() => setKatalogOpen(true)} onMouseLeave={() => setKatalogOpen(false)}>
            <a href="/katalog" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
              Katalóg <ChevronDown className="h-4 w-4" />
            </a>
            {katalogOpen && (
              <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-border bg-background shadow-lg">
                {katalogItems.map(item => (
                  <a key={item.href} href={item.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="/dilerom" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Dílerom
          </a>

          <div className="relative" onMouseEnter={() => setZnackyOpen(true)} onMouseLeave={() => setZnackyOpen(false)}>
            <a href="/katalog" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
              Značky <ChevronDown className="h-4 w-4" />
            </a>
            {znackyOpen && (
              <div className="absolute left-0 top-full z-50 w-48 rounded-lg border border-border bg-background shadow-lg">
                {znackyItems.map(item => (
                  <a key={item.href} href={item.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setSpolocnostOpen(true)} onMouseLeave={() => setSpolocnostOpen(false)}>
            <a href="/o-nas" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
              Spoločnosť <ChevronDown className="h-4 w-4" />
            </a>
            {spolocnostOpen && (
              <div className="absolute left-0 top-full z-50 w-48 rounded-lg border border-border bg-background shadow-lg">
                {spolocnostItems.map(item => (
                  <a key={item.href} href={item.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="/kontakt" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Kontakt
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+421948450458" className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-foreground transition-colors hover:text-primary">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            +421 948 450 458
          </a>
          <a href="/prihlasenie" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Prihlásiť
          </a>
          <Button className="rounded-full bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90">
            <a href="/registracia">Registrácia partnera</a>
          </Button>
        </div>

        <button className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden" onClick={() => setOpen(v => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            <a href="/katalog" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Katalóg</a>
            <a href="/dilerom" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Dílerom</a>
            <a href="/katalog?brand=deye" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Deye</a>
            <a href="/katalog?brand=fox-ess" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">FoxESS</a>
            <a href="/katalog?brand=solis" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Solis</a>
            <a href="/katalog?brand=dyness" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Dyness</a>
            <a href="/katalog?brand=byd" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">BYD</a>
            <a href="/kontakt" className="px-2 py-3 text-sm font-medium text-foreground hover:text-primary">Kontakt</a>
            <a href="tel:+421948450458" className="flex items-center gap-2 px-2 py-3 text-sm font-semibold text-foreground">
              <Phone className="h-4 w-4 text-primary" />+421 948 450 458
            </a>
            <Button className="mt-2 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
              Registrácia partnera
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
