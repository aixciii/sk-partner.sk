import { Metadata } from "next";
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Stať sa partnerom | SK Partner",
  description: "Ste inštalačná firma alebo reseller? Staňte sa oficiálnym partnerom SK Partner s.r.o. — jediného importéra Deye na Slovensku. Partnerské ceny, sklad v Bratislave, záruka 10 rokov.",
  openGraph: {
    title: "Stať sa partnerom | SK Partner",
    description: "Partnerské ceny, sklad v Bratislave, záruka 10 rokov Deye.",
    url: "https://www.sk-partner.sk/stat-partnerom",
  },
};

const vyhody = [
  { title: "Oficiálny importér SR", desc: "Váš zákazník dostane originálnu záruku Deye 10 rokov priamo od výrobcu. Nie šedý dovoz." },
  { title: "Sklad Bratislava — 1–2 dni", desc: "Tovar expedujeme do 1–2 pracovných dní po celej SR. Montér môže prísť k zákazníkovi ihneď." },
  { title: "Rýchla dostupnosť", desc: "Objednáte dnes — tovar máte zajtra. Žiadne čakanie na dovoz zo zahraničia." },
  { title: "Marketingové materiály", desc: "Fotky, datasheet, cenové ponuky — všetko pripravené. Vy len predávate." },
];

const vyhody2 = [
  "Individuálna veľkoobchodná cena podľa objemu",
  "Dodanie 1–2 pracovné dni po celej SR",
  "Všetky modely skladom — žiadne čakanie",
  "Oficiálna záruka 10 rokov od výrobcu Deye",
];

const faq = [
  { q: "Pre koho je partnerský program určený?", a: "Pre registrované firmy a živnostníkov pôsobiacich v oblasti fotovoltiky, elektro inštalácií alebo predaja energetických riešení. Program nie je určený pre súkromné osoby." },
  { q: "Ako dlho trvá vybavenie partnerstva?", a: "Zvyčajne odpovieme do 24 hodín. Po overení firmy zašleme partnerský cenník." },
  { q: "Aké produkty môžem predávať?", a: "Celý sortiment Deye — hybridné meniče LV a HV (1-fázové aj 3-fázové), on-grid meniče a batériové úložiská. Všetko skladom v Bratislave." },
  { q: "Ako funguje záruka pre môjho zákazníka?", a: "Ako oficiálny importér vystavujeme záručný list Deye platný 10 rokov. Váš zákazník má rovnakú ochranu ako pri kúpe priamo od výrobcu." },
];

export default function StatPartneromPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-wide text-primary mb-3">Pre inštalačné firmy a resellerov</p>
          <h1 className="text-3xl font-bold text-foreground mb-4">Predávajte Deye.<br />My zabezpečíme zvyšok.</h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
            SK Partner s.r.o. je jediný oficiálny importér Deye na Slovensku. Inštalačným firmám a resellerom dodávame priamo zo skladu v Bratislave — bez medzičlánkov, bez čakania.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vyhody.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 mb-12">
          <p className="text-xs font-medium uppercase tracking-wide text-primary mb-2">Začnite spoluprácu</p>
          <h2 className="text-xl font-bold text-foreground mb-2">Požiadajte o partnerský cenník</h2>
          <p className="text-sm text-muted-foreground mb-5">Odpovieme do 24 hodín s individuálnou ponukou pre vašu firmu.</p>
          <ul className="space-y-2 text-sm text-foreground mb-7">
            {vyhody2.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span> {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:sales@sk-partner.sk?subject=Záujem%20o%20partnerstvo%20%E2%80%94%20SK%20Partner" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
              Napísať nám →
            </a>
            <a href="tel:+421948450458" className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary text-primary px-6 py-3 text-sm font-medium hover:bg-primary/10 transition-colors">
              +421 948 450 458
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Časté otázky</h2>
          {faq.map((item) => (
            <div key={item.q} className="border-b border-border pb-6">
              <p className="font-medium text-foreground mb-1">{item.q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}
