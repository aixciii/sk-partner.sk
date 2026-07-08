import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { CatalogContent } from "@/components/catalog-content";
import { fetchProducts } from "@/lib/products";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

async function getCategoryMinPrice(categorySlug: string): Promise<number | null> {
  const agg = await prisma.product.aggregate({
    where: { active: true, priceNet: { gt: 0 }, category: { slug: categorySlug } },
    _min: { priceNet: true },
  })
  return agg._min.priceNet ?? null
}

const categoryMeta: Record<string, { title: string; h1: string; perex: string }> = {
  "hybridne-lv-3f": {
    title: "Hybridne meniče LV 3-fazove | SK Partner",
    h1: "Hybridné meniče LV 3-fázové",
    perex: "Trojfazove hybridne meniče Deye, FoxESS a Solis s LV batériami. Vykon 6–20 kW.",
  },
  "hybridne-lv-1f": {
    title: "Hybridne meniče LV 1-fazove | SK Partner",
    h1: "Hybridné meniče LV 1-fázové",
    perex: "Jednofazove hybridne meniče pre rodinne domy. Vykon 3.6–10 kW.",
  },
  "hybridne-hv": {
    title: "Hybridne meniče HV | SK Partner",
    h1: "Hybridné meniče HV",
    perex: "Vykonne hybridne meniče HV pre väčšie instalácie. Vykon 20–80 kW.",
  },
  "baterie-lv": {
    title: "Batérie LV | SK Partner",
    h1: "Batérie LV",
    perex: "LiFePO4 batériové uloziska LV pre hybridne systemy.",
  },
  "baterie-hv": {
    title: "Batérie HV + Rack | SK Partner",
    h1: "Batérie HV + Rack",
    perex: "Vysoko-napäťové batériové uloziska HV a rack systemy.",
  },
  "on-grid": {
    title: "On-Grid meniče | SK Partner",
    h1: "On-Grid meniče",
    perex: "Sieťové on-grid meniče pre fotovoltaicke systemy bez batérií.",
  },
  "komercne-riesenia": {
    title: "Priemyselné riešenia | SK Partner",
    h1: "Priemyselné riešenia",
    perex: "Komerčné a priemyselné energeticke riesenia pre väčšie projekty.",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category]
  if (!meta) return { title: "Katalog | SK Partner" }
  const minPrice = await getCategoryMinPrice(category)
  const priceLabel = minPrice ? `od ${Math.round(minPrice)}€` : null
  const title = priceLabel ? meta.title.replace(" | SK Partner", ` – ${priceLabel} | SK Partner`) : meta.title
  const description = `${meta.perex}${priceLabel ? ` Ceny ${priceLabel} bez DPH.` : ""}`
  return { title, description }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const meta = categoryMeta[category]
  if (!meta) notFound()
  const minPrice = await getCategoryMinPrice(category)
  const initialProducts = await fetchProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{meta.h1}</h1>
            <p className="mt-2 text-muted-foreground">
              {meta.perex}
              {minPrice ? ` Ceny od ${Math.round(minPrice)}€ bez DPH.` : ""}
            </p>
          </div>
          <Suspense fallback={<div>Nacitavam...</div>}>
            <CatalogContent defaultCategory={category} initialProducts={initialProducts} />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
