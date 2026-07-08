import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Send, HelpCircle, FileText, Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Technická podpora | SK Partner",
  description: "Technická podpora pre Deye solárne meniče a batérie. Kontaktujte SK Partner s.r.o. - oficiálneho importéra Deye na Slovensku. Tel: +421 948 450 458",
  keywords: "Deye podpora, servis solárnych meničov, technická pomoc fotovoltaika Slovensko",
  // old_description: "Technická podpora pre Deye solárne meniče a batérie. FAQ, návody, kontakt na technickú podporu.",
};

const faqs = [
  {
    question: "Ako nainštalovať Deye hybridný menič?",
    answer: "Inštaláciu Deye meničov musí vykonať kvalifikovaný elektrikár s platným oprávnením. Pred inštaláciou si prečítajte inštalačnú príručku dostupnú v sekcii Dokumenty. Pre správnu inštaláciu je potrebné dodržať všetky bezpečnostné predpisy a normy.",
  },
  {
    question: "Ako nastaviť WiFi monitoring?",
    answer: "1. Stiahnite si aplikáciu SOLARMAN Smart z App Store alebo Google Play. 2. Vytvorte si účet a prihláste sa. 3. Kliknite na + a vyberte 'Pridať zariadenie'. 4. Naskenujte QR kód na WiFi module meniča. 5. Pripojte menič k vašej WiFi sieti podľa pokynov v aplikácii.",
  },
  {
    question: "Aká je záručná doba na Deye meniče?",
    answer: "Štandardná záručná doba na všetky Deye meniče je 10 rokov. Záruka sa vzťahuje na výrobné chyby a chyby materiálu. Záruka nevzťahuje na poškodenie spôsobené nesprávnou inštaláciou, prepätím alebo mechanickým poškodením.",
  },
  {
    question: "Ako postupovať pri reklamácii?",
    answer: "Pri reklamácii nás kontaktujte emailom na sales@sk-partner.sk s popisom problému a fotografiami. Priložte kópiu faktúry a sériové číslo zariadenia. Reklamáciu vybavíme do 30 dní od jej prijatia.",
  },
  {
    question: "Podporuje Deye menič dynamické tariffy?",
    answer: "Áno, Deye hybridné meniče podporujú programovanie časových pásem pre nabíjanie a vybíjanie batérií. Môžete nastaviť rôzne režimy pre špičku a mimo špičku, čo umožňuje optimalizáciu spotreby podľa dynamických taríf.",
  },
  {
    question: "Aké batérie sú kompatibilné s Deye meničmi?",
    answer: "Deye LV hybridné meniče sú kompatibilné s batériami s napätím 40-60V (napr. Deye BOS-G, Pylontech US3000C). HV hybridné meniče podporujú batérie s napätím 180-500V (napr. Deye SE-G5.1, BYD HVS/HVM).",
  },
  {
    question: "Ako aktualizovať firmware meniča?",
    answer: "Aktualizácie firmware sa vykonávajú cez aplikáciu SOLARMAN Smart alebo pomocou USB kľúča. Pre aktualizáciu cez USB kontaktujte našu technickú podporu pre získanie správneho firmware súboru pre váš model.",
  },
  {
    question: "Čo znamenajú chybové kódy na displeji?",
    answer: "Kompletný zoznam chybových kódov nájdete v užívateľskej príručke vášho meniča v sekcii Dokumenty. Pri závažných chybách (F01-F99) kontaktujte našu technickú podporu.",
  },
];

export default function PodporaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na hlavnú stránku
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Technická podpora
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Pomôžeme vám s inštaláciou, nastavením a prevádzkou Deye solárnych meničov a batérií.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Odpovieme do 24 hodín v pracovné dni
              </p>
              <a
                href="mailto:sales@sk-partner.sk"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                sales@sk-partner.sk
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Telefón</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Po-Pia: 8:00 - 16:00
              </p>
              <a
                href="tel:+421948450458"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                +421 948 450 458
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Rýchle odkazy
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/dokumenty"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">Dokumenty</div>
                <div className="text-sm text-muted-foreground">
                  Návody a manuály
                </div>
              </div>
            </Link>
            <Link
              href="/reklamacie"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">Reklamácie</div>
                <div className="text-sm text-muted-foreground">
                  Reklamačný poriadok
                </div>
              </div>
            </Link>
            <Link
              href="/vop"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <HelpCircle className="h-8 w-8 text-primary" />
              <div>
                <div className="font-medium text-foreground">VOP</div>
                <div className="text-sm text-muted-foreground">
                  Obchodné podmienky
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
            Často kladené otázky
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Nenašli ste odpoveď?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Kontaktujte nás a radi vám pomôžeme.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <a href="mailto:sales@sk-partner.sk">Napísať email</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+421948450458">Zavolať</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
