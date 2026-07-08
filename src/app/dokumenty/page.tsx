import { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dokumenty a manuály | SK Partner",
  description: "Oficiálne technické listy, návody na inštaláciu a príručky pre Deye solárne meniče a batérie.",
};

const documentCategories = [
  {
    title: "Hybridné meniče LV 1-fázové",
    models: "SUN-6K / 8K / 10K / 12K-SG05LP1-EU",
    documents: [
      { name: "Datasheet SUN-3.6–8K-SG05LP1-EU", url: "/documents/datasheet-sun-3.6-8k-sg05lp1-eu.pdf" },
    ],
  },
  {
    title: "Hybridné meniče LV 3-fázové",
    models: "SUN-8K / 10K / 12K / 15K / 20K-SG05LP3-EU",
    documents: [
      { name: "Datasheet SUN-3–12K-SG05LP3-EU", url: "/documents/datasheet-sun-3-12k-sg05lp3-eu.pdf" },
    ],
  },
  {
    title: "Hybridné meniče HV 3-fázové",
    models: "SUN-30K / 50K / 80K",
    documents: [
      { name: "Datasheet SUN-29.9–50K-SG01HP3-EU", url: "/documents/datasheet-sun-29.9-50k-sg01hp3-eu.pdf" },
      { name: "Datasheet SUN-60–80K-SG02HP3-EU-EM6", url: "/documents/datasheet-sun-60-80k-sg02hp3-eu-em6.pdf" },
    ],
  },
  {
    title: "Sieťové meniče (On-Grid)",
    models: "SUN-10K-G / 20K-G05 / 30K-G04 / 50K-G04",
    documents: [
      { name: "Datasheet SUN-7–10.5K-G", url: "/documents/datasheet-sun-10k-g.pdf" },
      { name: "Datasheet SUN-18–25K-G05", url: "/documents/datasheet-sun-18-25k-g05.pdf" },
      { name: "Datasheet SUN-30–36K-G04", url: "/documents/datasheet-sun-30-36k-g04.pdf" },
      { name: "Datasheet SUN-40–50K-G04", url: "/documents/datasheet-sun-40-50k-g04.pdf" },
    ],
  },
  {
    title: "Batérie LV",
    models: "SE-G5.1Pro-B / BOS-GPack5.1 / SE-F12-C LV",
    documents: [
      { name: "Datasheet SE-G5.1Pro-B", url: "/documents/datasheet-baterie-se-g5.1pro-b.pdf" },
    ],
  },
]

export default function DokumentyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />Späť na hlavnú stránku
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Dokumenty a manuály</h1>
            <p className="mt-4 text-lg text-muted-foreground">Oficiálne technické listy a dokumentácia priamo od výrobcu Deye.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-blue-50 dark:bg-blue-950/20 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <span>Dokumenty sú oficiálne technické listy od výrobcu <strong>Ningbo Deye Inverter Technology Co., Ltd.</strong></span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {documentCategories.map((category) => (
              <div key={category.title} className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
                <p className="text-xs text-muted-foreground mb-4 mt-1">{category.models}</p>
                <ul className="space-y-2">
                  {category.documents.map((doc) => (
                    <li key={doc.name}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-muted">
                        <FileText className="h-5 w-5 shrink-0 text-primary" />
                        <span className="flex-1 text-foreground">{doc.name}</span>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">PDF</span>
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Potrebujete ďalšiu dokumentáciu?</h2>
          <p className="mt-2 text-muted-foreground">Kontaktujte nás a pošleme vám kompletný technický balík.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild><a href="/podpora">Technická podpora</a></Button>
            <Button variant="outline" asChild><a href="mailto:sales@sk-partner.sk">sales@sk-partner.sk</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
