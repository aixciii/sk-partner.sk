import { ArrowRight } from "lucide-react"

const brands = [
  { name: "Deye", logo: "/logos/deye.png", desc: "Hybridne a sietove invertory, bateriove uloziska", href: "/katalog?brand=deye", accent: "#1D9E75" },
  { name: "FoxESS", logo: "/logos/fox-ess.png", desc: "Invertory a skladovanie energie pre domacnosti aj firmy", href: "/katalog?brand=fox-ess", accent: "#E87D0D" },
  { name: "Solis", logo: "/logos/solis.png", desc: "Spolahlivé sietove a hybridne invertory", href: "/katalog?brand=solis", accent: "#E82323" },
  { name: "Dyness", logo: "/logos/dyness.png", desc: "Bateriove uloziska LV a C&I stohovatelne systemy", href: "/katalog?brand=dyness", accent: "#0EA5E9" },
  { name: "BYD", logo: "/logos/byd.png", desc: "Bateriove uloziska Battery-Box pre hybridne systemy", href: "/katalog?brand=byd", accent: "#7C3AED" },
]

export function Brands() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Oficiálne zastúpenie
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          Katalóg podľa výrobcov
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center leading-relaxed text-muted-foreground">
          Oficiálne zastúpenie popredných svetových značiek solárnej
          techniky.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: brand.accent }}
                aria-hidden="true"
              />
              <div className="flex h-16 items-center justify-center">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} style={{height:"48px",maxWidth:"180px",width:"auto",objectFit:"contain"}} />
                ) : (
                  <span className="text-2xl font-bold text-foreground">{brand.name}</span>
                )}
              </div>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {brand.desc}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Zobraziť produkty
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
