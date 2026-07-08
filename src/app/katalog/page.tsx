import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { CatalogContent } from "@/components/catalog-content";

export const metadata = {
  title: "Katalog produktov | SK Partner",
  description: "Oficialny distributor Deye, FoxESS a Solis na Slovensku. Hybridne invertory, sietove invertory, bateriove uloziska.",
};

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Katalog produktov
            </h1>
            <p className="mt-2 text-muted-foreground">
              Deye · FoxESS · Solis
            </p>
          </div>
          <Suspense fallback={<div>Nacitavam...</div>}>
            <CatalogContent />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
