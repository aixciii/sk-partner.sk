"use client"

import { useId, useState } from "react"
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

function NavDropdown({
  label,
  href,
  items,
  menuWidthClass = "w-64",
}: {
  label: string
  href: string
  items: { label: string; href: string }[]
  menuWidthClass?: string
}) {
  const [open, setOpen] = useState(false)
  const menuId = `nav-dropdown-${useId()}`

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false)
      }}
    >
      <div className="flex items-center">
        <a
          href={href}
          onFocus={() => setOpen(true)}
          className="rounded-md py-2 pl-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {label}
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label={`${open ? "Zavrieť" : "Otvoriť"} podmenu ${label}`}
          className="rounded-md p-2 text-foreground transition-colors hover:text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <div
          id={menuId}
          role="menu"
          className={`absolute left-0 top-full z-50 ${menuWidthClass} rounded-lg border border-border bg-background shadow-lg`}
        >
          {items.map(item => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" aria-label="SK Partner — domov">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavDropdown label="Katalóg" href="/katalog" items={katalogItems} menuWidthClass="w-64" />

          <a href="/dilerom" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary">
            Dílerom
          </a>

          <NavDropdown label="Značky" href="/katalog" items={znackyItems} menuWidthClass="w-48" />
          <NavDropdown label="Spoločnosť" href="/o-nas" items={spolocnostItems} menuWidthClass="w-48" />

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

        <button
          type="button"
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen(v => !v)}
        >
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
