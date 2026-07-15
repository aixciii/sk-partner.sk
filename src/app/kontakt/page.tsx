import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt | SK Partner",
  description:
    "Kontaktujte SK Partner s.r.o. – distribútora Deye, FoxESS a Solis na Slovensku. Telefón, email, sklad Bratislava.",
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-background">
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
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Kontakt</h1>
            <p className="mt-4 text-muted-foreground">
              Sme tu pre vás každý pracovný deň od 8:00 do 17:00
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <a
              href="tel:+421948450458"
              className="flex items-start gap-4 rounded-xl border border-border p-6 transition-colors hover:border-primary"
            >
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-foreground">Telefón</h2>
                <p className="mt-1 text-sm text-muted-foreground">+421 948 450 458</p>
              </div>
            </a>
            <a
              href="mailto:sales@sk-partner.sk"
              className="flex items-start gap-4 rounded-xl border border-border p-6 transition-colors hover:border-primary"
            >
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-foreground">Email</h2>
                <p className="mt-1 text-sm text-muted-foreground">sales@sk-partner.sk</p>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-xl border border-border p-6">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-foreground">Sklad a sídlo</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Staviteľská ulica 3<br />
                  831 04 Bratislava - Rača
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border p-6">
              <Building2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-foreground">Fakturačné údaje</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  SK Partner s.r.o.
                  <br />
                  IČO: 55 285 252
                  <br />
                  DIČ: 2121975977
                  <br />
                  IČ DPH: SK2121975977
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
