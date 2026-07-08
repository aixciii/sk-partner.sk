import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reklamačný poriadok | DeyeSolar.sk",
  description: "Reklamačný poriadok a postup pri reklamácii tovaru zakúpeného na DeyeSolar.sk",
};

export default function ReklamaciePage() {
  return (
    <main className="min-h-screen bg-background">
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
              Reklamacny poriadok
            </h1>
            <p className="mt-4 text-muted-foreground">
              Postup pri reklamácii tovaru zakúpeného na DeyeSolar.sk
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-foreground">1. Všeobecné ustanovenia</h2>
            <p className="mt-4 text-muted-foreground">
              1.1. Tento reklamačný poriadok upravuje spôsob a podmienky reklamácie vád tovaru 
              zakúpeného u predávajúceho SK Partner s.r.o. prostredníctvom internetového obchodu deyesolar.sk.
            </p>
            <p className="mt-4 text-muted-foreground">
              1.2. Reklamačný poriadok sa vzťahuje na tovar, ktorý bol zakúpený u predávajúceho 
              a u ktorého boli v záručnej dobe uplatnené práva kupujúceho zo zodpovednosti za vady.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">2. Záručná doba</h2>
            <p className="mt-4 text-muted-foreground">
              2.1. Záručná doba na meniče Deye je 10 rokov od dátumu predaja.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.2. Záručná doba na batérie je 10 rokov alebo podľa špecifikácie výrobcu.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.3. Záručná doba na príslušenstvo je 24 mesiacov od dátumu predaja.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.4. Záručná doba začína plynúť dňom prevzatia tovaru kupujúcim.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">3. Podmienky záruky</h2>
            <p className="mt-4 text-muted-foreground">
              3.1. Záruka sa vzťahuje na výrobné vady a vady materiálu.
            </p>
            <p className="mt-4 text-muted-foreground">
              3.2. Záruka sa nevzťahuje na:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Vady spôsobené nesprávnou inštaláciou v rozpore s návodom na inštaláciu</li>
              <li>Vady spôsobené neodborným zásahom alebo úpravou</li>
              <li>Mechanické poškodenie (pády, údery, preprava bez originálneho obalu)</li>
              <li>Poškodenie spôsobené prepätím, bleskom alebo inými atmosférickými vplyvmi</li>
              <li>Poškodenie spôsobené vodou, vlhkosťou alebo kondenzáciou</li>
              <li>Poškodenie spôsobené použitím nekompatibilných komponentov</li>
              <li>Bežné opotrebenie</li>
              <li>Vady, na ktoré bol kupujúci upozornený pri predaji</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">4. Postup pri reklamácii</h2>
            <p className="mt-4 text-muted-foreground">
              4.1. Pre uplatnenie reklamácie je kupujúci povinný:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Kontaktovať predávajúceho emailom na info@deyesolar.sk alebo telefonicky na +421 948 450 458</li>
              <li>Uviesť sériové číslo zariadenia</li>
              <li>Priložiť kópiu faktúry alebo iného dokladu o kúpe</li>
              <li>Popísať závadu (čo, kedy, za akých okolností sa prejavuje)</li>
              <li>Priložiť fotografie alebo video dokumentujúce závadu</li>
              <li>Priložiť screenshot z monitorovacej aplikácie s chybovým kódom (ak je k dispozícii)</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              4.2. Po prijatí reklamácie predávajúci potvrdí jej prijatie a informuje kupujúceho 
              o ďalšom postupe do 3 pracovných dní.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">5. Spôsob vybavenia reklamácie</h2>
            <p className="mt-4 text-muted-foreground">
              5.1. Predávajúci rozhodne o reklamácii ihneď, v zložitých prípadoch do 3 pracovných dní.
            </p>
            <p className="mt-4 text-muted-foreground">
              5.2. Reklamácia bude vybavená najneskôr do 30 dní odo dňa uplatnenia reklamácie.
            </p>
            <p className="mt-4 text-muted-foreground">
              5.3. Spôsoby vybavenia reklamácie:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Oprava:</strong> bezplatná oprava tovaru, ak je to možné</li>
              <li><strong>Výmena:</strong> výmena tovaru za nový, ak oprava nie je možná</li>
              <li><strong>Zľava:</strong> primeraná zľava z kúpnej ceny</li>
              <li><strong>Vrátenie:</strong> vrátenie kúpnej ceny pri neodstrániteľnej vade</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">6. Náklady na reklamáciu</h2>
            <p className="mt-4 text-muted-foreground">
              6.1. Pri oprávnenej reklamácii hradí predávajúci náklady na dopravu reklamovaného 
              tovaru na adresu predávajúceho a späť ku kupujúcemu.
            </p>
            <p className="mt-4 text-muted-foreground">
              6.2. Pri neoprávnenej reklamácii hradí náklady na dopravu kupujúci.
            </p>
            <p className="mt-4 text-muted-foreground">
              6.3. Kupujúci je povinný zabezpečiť vhodný obal pre prepravu reklamovaného tovaru. 
              Odporúčame použiť originálny obal.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">7. Diagnostika na mieste</h2>
            <p className="mt-4 text-muted-foreground">
              7.1. V mnohých prípadoch je možné vyriešiť problém vzdialene pomocou diagnostiky 
              cez monitorovací systém.
            </p>
            <p className="mt-4 text-muted-foreground">
              7.2. Predávajúci môže požiadať kupujúceho o poskytnutie prístupu do monitorovacieho 
              systému pre vzdialenú diagnostiku.
            </p>
            <p className="mt-4 text-muted-foreground">
              7.3. Pre aktualizáciu firmware alebo zmenu nastavení môže predávajúci poskytnúť 
              inštrukcie pre vykonanie úkonov kupujúcim alebo jeho inštalačnou firmou.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">8. Kontakt pre reklamácie</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a
                      href="mailto:info@deyesolar.sk"
                      className="text-sm text-primary hover:underline"
                    >
                      info@deyesolar.sk
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Telefón</div>
                    <a
                      href="tel:+421948450458"
                      className="text-sm text-primary hover:underline"
                    >
                      +421 948 450 458
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Posledná aktualizácia: 1.1.2026
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Potrebujete nahlásiť reklamáciu?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Kontaktujte nás emailom s popisom problému a potrebnými dokumentmi.
          </p>
          <div className="mt-6">
            <Button asChild>
              <a href="mailto:info@deyesolar.sk?subject=Reklamácia">
                Nahlásiť reklamáciu
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
