import { Phone, Mail, MapPin } from "lucide-react"
import { ConsultationForm } from "@/components/consultation-form"
import { Logo } from "@/components/logo"

const infoLinks = [
  "Dílerom",
  "O spoločnosti",
  "Blog",
  "Dodanie",
  "VOP",
  "GDPR",
  "Kontakt",
]
const brandLinks = [
  { label: "Deye", href: "/katalog?brand=deye" },
  { label: "FoxESS", href: "/katalog?brand=fox-ess" },
  { label: "Solis", href: "/katalog?brand=solis" },
  { label: "Dyness", href: "/katalog?brand=dyness" },
  { label: "BYD", href: "/katalog?brand=byd" },
]
const categoryLinks = ["Hybridné", "Sieťové", "Batérie"]

export function SiteFooter() {
  return (
    <footer className="bg-[#111] text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: logo + contact */}
          <div>
            <a href="/" aria-label="SK Partner — domov">
              <Logo inverted />
            </a>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+421948450458"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  +421 948 450 458
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@sk-partner.sk"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  sales@sk-partner.sk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>Staviteľská ulica 3, 831 04 Bratislava - Rača</span>
              </li>
            </ul>
          </div>

          {/* Col 2: info links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Informácie
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {infoLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: brands + categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Značky
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {brandLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-white">
              Kategórie
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categoryLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: consultation form */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Potrebujete konzultáciu?
            </h3>
            <ConsultationForm />
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500">
          © 2026 SK Partner s.r.o.
        </div>
      </div>
    </footer>
  )
}
