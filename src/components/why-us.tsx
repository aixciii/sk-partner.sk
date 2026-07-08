import { FileCheck, Truck, Warehouse, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: FileCheck,
    title: "Oficiálny import",
    desc: "Priame zmluvy s výrobcami Deye, FoxESS a Solis bez sprostredkovateľov.",
  },
  {
    icon: Truck,
    title: "Rýchle dodávky",
    desc: "Expedícia po celom Slovensku do 3 pracovných dní.",
  },
  {
    icon: Warehouse,
    title: "Skladové zásoby",
    desc: "Stála dostupnosť kľúčových produktov na sklade v Bratislave.",
  },
  {
    icon: ShieldCheck,
    title: "Plná záruka",
    desc: "10-ročná záruka výrobcu a technická podpora v slovenčine.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Prečo SK Partner?
          </span>
          <h2 className="mt-3 text-balance text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
            Spoľahlivý veľkoobchodný partner
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Pomáhame dílerom a inštalatérom rásť so spoľahlivými dodávkami
            a profesionálnym servisom.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col items-center bg-card p-7 text-center transition-colors hover:bg-accent/40"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-bold uppercase tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
