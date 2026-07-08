import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Všeobecné obchodné podmienky | SK Partner",
  description: "Všeobecné obchodné podmienky pre nákup na SK Partner",
};

export default function VOPPage() {
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
              Vseobecne obchodne podmienky
            </h1>
            <p className="mt-4 text-muted-foreground">
              Platné od 1.1.2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-foreground">1. Úvodné ustanovenia</h2>
            <p className="mt-4 text-muted-foreground">
              1.1. Tieto všeobecné obchodné podmienky (ďalej len &quot;VOP&quot;) upravujú práva a povinnosti 
              zmluvných strán vyplývajúce z kúpnej zmluvy uzatvorenej medzi predávajúcim a kupujúcim, 
              ktorej predmetom je kúpa a predaj tovaru na internetovej stránke elektronického obchodu predávajúceho.
            </p>
            <p className="mt-4 text-muted-foreground">
              1.2. Predávajúcim je spoločnosť SK Partner s.r.o., so sídlom v Bratislave, 
              IČO: 55 285 252, DIČ: 2121975977, IČ DPH: SK2121975977 (ďalej len &quot;predávajúci&quot;).
            </p>
            <p className="mt-4 text-muted-foreground">
              1.3. Kupujúcim je podnikateľ alebo spotrebiteľ (ďalej len &quot;kupujúci&quot;).
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">2. Objednávka a uzatvorenie zmluvy</h2>
            <p className="mt-4 text-muted-foreground">
              2.1. Kupujúci objednáva tovar prostredníctvom internetového obchodu na stránke sk-partner.sk, 
              emailom na adrese sales@sk-partner.sk alebo telefonicky na čísle +421 948 450 458.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.2. Odoslaním objednávky kupujúci potvrdzuje, že sa oboznámil s týmito VOP a súhlasí s nimi.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.3. Kúpna zmluva je uzatvorená potvrdením objednávky predávajúcim.
            </p>
            <p className="mt-4 text-muted-foreground">
              2.4. Predávajúci si vyhradzuje právo odmietnuť objednávku v prípade nedostupnosti tovaru, 
              zjavnej chyby v cene alebo z iných závažných dôvodov.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">3. Ceny a platobné podmienky</h2>
            <p className="mt-4 text-muted-foreground">
              3.1. Všetky ceny uvedené na stránke sú B2B ceny bez DPH. K cenám sa pripočítava DPH 
              v zákonnej výške (aktuálne 23%).
            </p>
            <p className="mt-4 text-muted-foreground">
              3.2. Predávajúci akceptuje nasledovné spôsoby platby: bankový prevod, platba kartou online.
            </p>
            <p className="mt-4 text-muted-foreground">
              3.3. Pri platbe bankovým prevodom je kupujúci povinný uhradiť kúpnu cenu pred dodaním tovaru.
            </p>
            <p className="mt-4 text-muted-foreground">
              3.4. Pre stálych B2B odberateľov je možné dohodnúť platobné podmienky individuálne.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">4. Dodacie podmienky</h2>
            <p className="mt-4 text-muted-foreground">
              4.1. Predávajúci dodáva tovar výhradne na územie Slovenskej republiky.
            </p>
            <p className="mt-4 text-muted-foreground">
              4.2. Štandardná doba dodania je 1-2 pracovné dni od prijatia platby pre tovar skladom.
            </p>
            <p className="mt-4 text-muted-foreground">
              4.3. Doprava je zdarma pre objednávky nad 500 EUR bez DPH. Pre objednávky pod túto 
              hranicu sa účtuje doprava podľa aktuálneho cenníka.
            </p>
            <p className="mt-4 text-muted-foreground">
              4.4. Kupujúci je povinný pri prevzatí zásielky skontrolovať neporušenosť obalu. 
              V prípade poškodenia je nutné spísať škodový protokol s dopravcom.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">5. Záručné podmienky</h2>
            <p className="mt-4 text-muted-foreground">
              5.1. Na všetky meniče Deye poskytujeme záruku 10 rokov.
            </p>
            <p className="mt-4 text-muted-foreground">
              5.2. Na batérie poskytujeme záruku podľa špecifikácie výrobcu (štandardne 10 rokov).
            </p>
            <p className="mt-4 text-muted-foreground">
              5.3. Záruka sa nevzťahuje na poškodenie spôsobené nesprávnou inštaláciou, 
              prepätím, bleskom, mechanickým poškodením alebo použitím v rozpore s návodom.
            </p>
            <p className="mt-4 text-muted-foreground">
              5.4. Pre uplatnenie záruky je nutné predložiť doklad o kúpe a sériové číslo zariadenia.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">6. Reklamácie</h2>
            <p className="mt-4 text-muted-foreground">
              6.1. Reklamácie sa riadia Reklamačným poriadkom, ktorý je dostupný na stránke /reklamacie.
            </p>
            <p className="mt-4 text-muted-foreground">
              6.2. Reklamáciu je možné uplatniť emailom na sales@sk-partner.sk alebo telefonicky.
            </p>
            <p className="mt-4 text-muted-foreground">
              6.3. Lehota na vybavenie reklamácie je 30 dní od jej prijatia.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">7. Ochrana osobných údajov</h2>
            <p className="mt-4 text-muted-foreground">
              7.1. Spracovanie osobných údajov sa riadi Zásadami ochrany osobných údajov (GDPR), 
              ktoré sú dostupné na stránke /gdpr.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">8. Záverečné ustanovenia</h2>
            <p className="mt-4 text-muted-foreground">
              8.1. Tieto VOP nadobúdajú platnosť a účinnosť dňom ich zverejnenia na stránke predávajúceho.
            </p>
            <p className="mt-4 text-muted-foreground">
              8.2. Predávajúci si vyhradzuje právo na zmenu týchto VOP. Zmena VOP bude zverejnená 
              na stránke predávajúceho.
            </p>
            <p className="mt-4 text-muted-foreground">
              8.3. Vzťahy neupravené týmito VOP sa riadia príslušnými ustanoveniami Občianskeho 
              zákonníka, Obchodného zákonníka a ďalšími právnymi predpismi Slovenskej republiky.
            </p>
            <p className="mt-4 text-muted-foreground">
              8.4. V prípade sporu je príslušný súd Slovenskej republiky podľa sídla predávajúceho.
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
