import { Zap, Grid3x3, BatteryCharging, Server, ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Batériové úložiská",
    icon: BatteryCharging,
    href: "/katalog/baterie-lv",
  },
  {
    title: "Hybridné invertory",
    icon: Zap,
    href: "/katalog/hybridne-lv-3f",
  },
  {
    title: "Sieťové invertory",
    icon: Grid3x3,
    href: "/katalog/on-grid",
  },
  {
    title: "Systémy ukladania energie",
    icon: Server,
    href: "/katalog/komercne-riesenia",
  },
]

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-20 lg:px-8">
        {/* Left */}
        <div>
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            B2B veľkoobchod · Slovensko
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
            Solárna technika pre profesionálov na Slovensku
          </h1>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Oficiálny distribútor invertorov a batériových úložísk Deye, FoxESS
            a Solis. Veľkoobchodné ceny, skladová dostupnosť a podpora pre dílerov
            a inštalatérov.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/dilerom"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Pre dílerov a inštalatérov
            </a>
            <a
              href="/katalog"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Prejsť do katalógu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right: category grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground ring-1 ring-inset ring-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <cat.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex items-end justify-between gap-2">
                <span className="text-sm font-bold uppercase leading-tight tracking-tight text-foreground">
                  {cat.title}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
