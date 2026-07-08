import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Oficiálny importér Deye pre Slovensko",
  "Všetky produkty skladom na SK",
  "B2B veľkoobchodné ceny bez DPH",
  "Technická podpora v slovenčine",
  "Expresné dodanie 1-2 pracovné dni",
  "Objemové zľavy pre veľkoobchod",
];

export function TrustSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Prečo nakupovať u nás?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sme oficiálny importér Deye na Slovensku. Ponúkame
              kompletný sortiment solárnych meničov a batérií priamo zo skladu s plnou zárukou a
              technickou podporou.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-4xl font-bold text-primary">10</div>
              <div className="mt-1 text-sm font-medium text-foreground">
                rokov záruky
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Na všetky produkty Deye
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-4xl font-bold text-primary">23+</div>
              <div className="mt-1 text-sm font-medium text-foreground">
                modelov skladom
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Okamžite dostupné na SK
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-4xl font-bold text-primary">1-2</div>
              <div className="mt-1 text-sm font-medium text-foreground">
                dni dodanie
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Expresná doprava po celej SR
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-4xl font-bold text-primary">B2B</div>
              <div className="mt-1 text-sm font-medium text-foreground">
                veľkoobchod
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Ceny bez DPH, zľavy pri odbere
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
