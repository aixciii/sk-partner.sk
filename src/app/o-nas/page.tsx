import { Metadata } from "next";
import Link from "next/link";
import { Building2, Award, Truck, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "O nás | SK Partner",
  description: "SK Partner s.r.o. je oficiálny importér značky Deye pre Slovensko. IČO: 56032340. Sídlo: Staviteľská ulica 3, 831 04 Bratislava - Rača. Vlastný sklad, dodanie 1-2 dni.",
  keywords: "SK Partner s.r.o., Deye importér Slovensko, solárne meniče Bratislava",
  openGraph: {
    title: "O nás | SK Partner",
    description: "Oficiálny importér Deye pre Slovensko. Vlastný sklad, B2B ceny, dodanie 1-2 dni.",
    url: "https://www.sk-partner.sk/o-nas",
    type: "website",
  },
};

const values = [
  {
    icon: Award,
    title: "Oficiálny importér",
    description: "Sme autorizovaný importér značky Deye pre Slovensko s priamym prepojením na výrobcu.",
  },
  {
    icon: Truck,
    title: "Vlastný sklad",
    description: "Všetky produkty máme skladom na SK s expresným dodaním do 1-2 pracovných dní.",
  },
  {
    icon: Users,
    title: "B2B partner",
    description: "Spolupracujeme s inštalačnými firmami a veľkoobchodmi po celom Slovensku.",
  },
];

const milestones = [
  { year: "2024", event: "Založenie spoločnosti SK Partner s.r.o. a rokovania s výrobcom Deye" },
  { year: "2025", event: "Získanie statusu oficiálneho importéra Deye pre SR a budovanie skladu" },
  { year: "2026", event: "Spustenie B2B e-shopu SK Partner a aktívny predaj na Slovensku" },
];

export default function ONasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Spat na hlavnu stranku
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              O nas
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              SK Partner s.r.o. — Oficiálny importér Deye na Slovensku
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                SK Partner s.r.o.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Sme slovenská spoločnosť zameraná na import a distribúciu solárnych technológií. 
                Ako oficiálny importér značky Deye pre Slovensko zabezpečujeme kompletnú dodávku 
                hybridných a on-grid meničov, batériových úložísk a príslušenstva.
              </p>
              <p className="mt-4 text-muted-foreground">
                Naším cieľom je sprístupniť kvalitné solárne technológie slovenským inštalačným 
                firmám a veľkoobchodom za konkurenčné B2B ceny s expresnou dostupnosťou 
                priamo zo skladu na SK.
              </p>
              
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Firemné údaje</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Obchodné meno:</dt>
                    <dd className="font-medium text-foreground">SK Partner s.r.o.</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">IČO:</dt>
                    <dd className="font-medium text-foreground">56 032 340</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">DIČ:</dt>
                    <dd className="font-medium text-foreground">2122176936</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">IČ DPH:</dt>
                    <dd className="font-medium text-foreground">SK2122176936</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sídlo:</dt>
                    <dd className="text-right font-medium text-foreground">
                      Staviteľská ulica 3<br />831 04 Bratislava - mestská časť Rača
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Deye */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Prečo Deye?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Deye je jedným z najväčších svetových výrobcov solárnych meničov s ročnou 
              produkciou viac ako 2 milióny kusov. Produkty Deye spĺňajú najprísnejšie 
              európske normy a sú certifikované pre použitie v EÚ.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <ul className="space-y-4">
              {[
                "Top 5 svetový výrobca solárnych meničov",
                "Kompletná certifikácia CE, TÜV, IEC",
                "10-ročná záruka na všetky meniče",
                "Technická podpora v slovenčine a češtine",
                "Široký výkonový rozsah 3,6 kW - 80 kW",
                "Kompatibilita s väčšinou batérií na trhu",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
            Naša história
          </h2>
          <div className="mx-auto max-w-2xl">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="h-full w-0.5 bg-border" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm font-medium text-primary">
                      {milestone.year}
                    </div>
                    <div className="mt-1 text-foreground">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Máte záujem o spoluprácu?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Kontaktujte nás pre B2B ponuku a objemové zľavy.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <Link href="/katalog">Zobraziť katalóg</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:sales@sk-partner.sk">Kontaktovať nás</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
      <SiteFooter />
    </div>
  );
}
