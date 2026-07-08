import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov (GDPR) | SK Partner",
  description: "Zásady ochrany osobných údajov a GDPR pre SK Partner",
};

export default function GDPRPage() {
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
              Ochrana osobnych udajov
            </h1>
            <p className="mt-4 text-muted-foreground">
              Zásady spracovania osobných údajov v súlade s GDPR
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-foreground">1. Prevádzkovateľ</h2>
            <p className="mt-4 text-muted-foreground">
              Prevádzkovateľom osobných údajov je spoločnosť SK Partner s.r.o., so sídlom v Bratislave, 
              IČO: 55 285 252 (ďalej len &quot;prevádzkovateľ&quot;).
            </p>
            <p className="mt-4 text-muted-foreground">
              Kontakt pre otázky týkajúce sa ochrany osobných údajov: sales@sk-partner.sk
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">2. Aké údaje spracúvame</h2>
            <p className="mt-4 text-muted-foreground">
              V závislosti od účelu spracovania spracúvame nasledovné kategórie osobných údajov:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Identifikačné údaje: meno, priezvisko, názov firmy, IČO, DIČ, IČ DPH</li>
              <li>Kontaktné údaje: email, telefónne číslo, doručovacia a fakturačná adresa</li>
              <li>Údaje o objednávkach: história objednávok, zakúpený tovar, platobné informácie</li>
              <li>Technické údaje: IP adresa, cookies, údaje o prehliadači</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">3. Účely spracovania</h2>
            <p className="mt-4 text-muted-foreground">
              Vaše osobné údaje spracúvame na nasledovné účely:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Plnenie zmluvy:</strong> spracovanie objednávok, dodanie tovaru, fakturácia, reklamácie</li>
              <li><strong>Zákonné povinnosti:</strong> vedenie účtovníctva, daňové povinnosti, archivácia</li>
              <li><strong>Oprávnený záujem:</strong> zlepšovanie služieb, ochrana pred podvodmi</li>
              <li><strong>Súhlas:</strong> marketing (newsletter), cookies pre analytiku</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">4. Právny základ spracovania</h2>
            <p className="mt-4 text-muted-foreground">
              Osobné údaje spracúvame na základe nasledovných právnych základov podľa čl. 6 GDPR:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR)</li>
              <li>Plnenie zákonnej povinnosti (čl. 6 ods. 1 písm. c) GDPR)</li>
              <li>Oprávnený záujem prevádzkovateľa (čl. 6 ods. 1 písm. f) GDPR)</li>
              <li>Súhlas dotknutej osoby (čl. 6 ods. 1 písm. a) GDPR)</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">5. Doba uchovávania</h2>
            <p className="mt-4 text-muted-foreground">
              Osobné údaje uchovávame len po dobu nevyhnutnú na dosiahnutie účelu spracovania:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Údaje pre plnenie zmluvy: po dobu trvania zmluvného vzťahu a 5 rokov po jeho ukončení</li>
              <li>Účtovné doklady: 10 rokov</li>
              <li>Marketingové údaje: do odvolania súhlasu</li>
              <li>Údaje z cookies: podľa platnosti jednotlivých cookies (max. 2 roky)</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">6. Príjemcovia údajov</h2>
            <p className="mt-4 text-muted-foreground">
              Vaše osobné údaje môžeme zdieľať s nasledovnými kategóriami príjemcov:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Prepravné spoločnosti (pre doručenie tovaru)</li>
              <li>Poskytovatelia platobných služieb</li>
              <li>Účtovné a daňové služby</li>
              <li>Poskytovatelia IT služieb a hostingu</li>
              <li>Štátne orgány (ak to vyžaduje zákon)</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">7. Vaše práva</h2>
            <p className="mt-4 text-muted-foreground">
              V súvislosti so spracovaním osobných údajov máte nasledovné práva:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Právo na prístup:</strong> získať informácie o tom, aké údaje o vás spracúvame</li>
              <li><strong>Právo na opravu:</strong> požiadať o opravu nesprávnych údajov</li>
              <li><strong>Právo na vymazanie:</strong> požiadať o vymazanie údajov za podmienok stanovených GDPR</li>
              <li><strong>Právo na obmedzenie spracovania:</strong> požiadať o obmedzenie spracovania</li>
              <li><strong>Právo na prenosnosť:</strong> získať údaje v štruktúrovanom formáte</li>
              <li><strong>Právo namietať:</strong> namietať proti spracovaniu na základe oprávneného záujmu</li>
              <li><strong>Právo odvolať súhlas:</strong> kedykoľvek odvolať udelený súhlas</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Pre uplatnenie svojich práv nás kontaktujte na sales@sk-partner.sk.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">8. Sťažnosť</h2>
            <p className="mt-4 text-muted-foreground">
              Ak sa domnievate, že vaše osobné údaje spracúvame v rozpore s GDPR, máte právo podať 
              sťažnosť dozornému orgánu - Úradu na ochranu osobných údajov Slovenskej republiky 
              (www.dataprotection.gov.sk).
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">9. Cookies</h2>
            <p className="mt-4 text-muted-foreground">
              Naša stránka používa cookies pre zabezpečenie správnej funkčnosti, analytiku 
              a zlepšovanie používateľského zážitku. Podrobnosti o používaných cookies:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Nevyhnutné cookies:</strong> potrebné pre základnú funkčnosť stránky</li>
              <li><strong>Analytické cookies:</strong> pomáhajú nám pochopiť, ako návštevníci používajú stránku</li>
              <li><strong>Funkčné cookies:</strong> umožňujú zapamätať vaše preferencie</li>
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-foreground">10. Bezpečnosť údajov</h2>
            <p className="mt-4 text-muted-foreground">
              Prijali sme primerané technické a organizačné opatrenia na ochranu vašich osobných 
              údajov pred neoprávneným prístupom, stratou, zneužitím alebo poškodením. Všetky 
              údaje prenášané cez internet sú šifrované pomocou SSL/TLS.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">11. Zmeny zásad</h2>
            <p className="mt-4 text-muted-foreground">
              Tieto zásady môžeme priebežne aktualizovať. O významných zmenách vás budeme 
              informovať prostredníctvom emailu alebo oznámenia na stránke.
            </p>

            <p className="mt-8 text-sm text-muted-foreground">
              Posledná aktualizácia: 1.1.2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
