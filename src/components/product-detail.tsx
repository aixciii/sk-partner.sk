"use client"

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight, ShoppingCart, FileText, Download,
  Shield, Wifi, Zap, Check, X, Send, Lock, Package, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Product, WholesaleTier, categoryColors, formatPrice, calculateVatPrice } from "@/lib/products";
import { CompatibleDevicesSection } from "@/components/product-relations-section";
import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  serverWholesalePrices?: any;
  priceHidden?: boolean;
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const certifications = [
  { name: "CE", description: "Európska zhoda" },
  { name: "TÜV", description: "Nemecká certifikácia" },
  { name: "IEC 62109", description: "Bezpečnostná norma" },
];

const categoryDocuments: Record<string, { name: string; url: string }[]> = {
  "hybrid-lv-1f": [
    { name: "Datasheet SUN-3.6–8K-SG05LP1-EU", url: "/documents/datasheet-sun-3.6-8k-sg05lp1-eu.pdf" },
  ],
  "hybrid-lv-3f": [
    { name: "Datasheet SUN-3–12K-SG05LP3-EU", url: "/documents/datasheet-sun-3-12k-sg05lp3-eu.pdf" },
  ],
  "hybrid-hv-3f": [
    { name: "Datasheet SUN-29.9–50K-SG01HP3-EU", url: "/documents/datasheet-sun-29.9-50k-sg01hp3-eu.pdf" },
    { name: "Datasheet SUN-60–80K-SG02HP3-EU-EM6", url: "/documents/datasheet-sun-60-80k-sg02hp3-eu-em6.pdf" },
  ],
  "on-grid": [
    { name: "Datasheet SUN-7–10.5K-G", url: "/documents/datasheet-sun-10k-g.pdf" },
    { name: "Datasheet SUN-18–25K-G05", url: "/documents/datasheet-sun-18-25k-g05.pdf" },
    { name: "Datasheet SUN-30–36K-G04", url: "/documents/datasheet-sun-30-36k-g04.pdf" },
    { name: "Datasheet SUN-40–50K-G04", url: "/documents/datasheet-sun-40-50k-g04.pdf" },
  ],
  "battery-lv": [
    { name: "Datasheet SE-F12-C LV", url: "/documents/datasheet-se-f12-c-lv.pdf" },
    { name: "Datasheet SE-F16-C LV", url: "/documents/datasheet-se-f16-c-lv.pdf" },
    { name: "Datasheet SE-G5.1Pro-B", url: "/documents/datasheet-baterie-se-g5.1pro-b.pdf" },
  ],
  "battery-hv": [],
};

function StockBlock({ product }: { product: Product }) {
  if (product.stockNote) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-muted-foreground">{product.stockNote}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      {product.stockStatus === 'instock' && (
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
          <span className="font-medium text-green-600 dark:text-green-400">Skladom</span>
          <span className="text-muted-foreground">· sklad Bratislava · {(product.specs as any)?.delivery ?? "dodanie 1–2 dni"}</span>
        </div>
      )}
      {product.stockStatus !== 'instock' && product.transitQty > 0 && product.transitDate && (
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
          <span className="font-medium text-amber-600 dark:text-amber-400">Na ceste</span>
          <span className="text-muted-foreground">· očakávame {product.transitDate}</span>
        </div>
      )}
      {product.stockStatus === 'onorder' && (
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
          <span className="font-medium text-yellow-600 dark:text-yellow-400">Na objednávku</span>
          <span className="text-muted-foreground">· skladom u výrobcu · dodanie po dohode</span>
        </div>
      )}
      {product.stockStatus === 'outofstock' && (
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
          <span className="font-medium text-red-600 dark:text-red-400">Momentálne nedostupné</span>
        </div>
      )}
    </div>
  );
}

function WholesaleBlock({ tiers, palletQty }: { tiers: WholesaleTier[]; palletQty?: number }) {
  const [qty, setQty] = useState(1);

  function getActiveTier(q: number) {
    return tiers.find(t => q >= t.min && (t.max === null || q <= t.max)) ?? tiers[0];
  }

  const activeTier = getActiveTier(qty);
  const total = activeTier.price ? activeTier.price * qty : null;
  const pallets = palletQty ? Math.ceil(qty / palletQty) : null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-medium text-foreground">Veľkoobchodné ceny (bez DPH)</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-2 text-muted-foreground font-medium">Množstvo</th>
            <th className="text-right px-4 py-2 text-muted-foreground font-medium">Cena / ks</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => (
            <tr key={i} className={cn("border-b border-border last:border-0 cursor-pointer transition-colors",
              activeTier === tier ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/30"
            )} onClick={() => setQty(tier.min)}>
              <td className="px-4 py-2.5 text-foreground">{tier.label}</td>
              <td className="px-4 py-2.5 text-right font-medium text-foreground">
                {tier.price ? `${formatPrice(tier.price)} €` : (
                  <span className="text-muted-foreground italic">cena na dopyt</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-border px-4 py-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground min-w-20">Počet kusov</span>
          <div className="flex items-center rounded-lg border border-border">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 text-foreground hover:bg-muted text-sm">-</button>
            <input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-14 text-center text-sm font-medium bg-transparent border-none outline-none py-1.5 text-foreground" />
            <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 text-foreground hover:bg-muted text-sm">+</button>
          </div>
          {palletQty && (
            <span className="text-xs text-muted-foreground">
              = {pallets} {pallets === 1 ? 'paleta' : pallets && pallets < 5 ? 'palety' : 'paliet'} ({palletQty} ks/paleta)
            </span>
          )}
        </div>

        <div className="rounded-lg bg-muted/30 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Cena za ks</p>
            <p className="text-sm font-medium text-foreground">
              {activeTier.price ? `${formatPrice(activeTier.price)} €` : <span className="italic text-muted-foreground">na dopyt</span>}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Celkom bez DPH</p>
            <p className="text-lg font-bold text-foreground">
              {total ? `${formatPrice(total)} €` : <span className="text-sm italic text-muted-foreground">cena na dopyt</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WholesaleBlurred() {
  const rows = ["1 ks", "2 – 11 ks", "12 – 23 ks", "24+ ks"];
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-medium text-foreground">Veľkoobchodné ceny (bez DPH)</p>
      </div>
      <div className="relative">
        <table className="w-full text-sm select-none pointer-events-none">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2 text-muted-foreground font-medium">Množstvo</th>
              <th className="text-right px-4 py-2 text-muted-foreground font-medium">Cena / ks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((label, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 text-foreground">{label}</td>
                <td className="px-4 py-2.5 text-right">
                  <span className="inline-block h-4 w-20 rounded bg-muted-foreground/20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm rounded-b-xl">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground text-center px-4">
            Zaregistrujte sa a získajte prístup k B2B cenníku
          </p>
          <div className="flex gap-2">
            <Link href="/registracia">
              <Button size="sm">Registrácia</Button>
            </Link>
            <Link href="/prihlasenie">
              <Button size="sm" variant="outline">Prihlásiť sa</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceBlurred() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 overflow-hidden">
      <div className="relative">
        <div className="select-none pointer-events-none opacity-0">
          <p className="text-2xl sm:text-3xl font-bold text-foreground">0 € <span className="text-base font-normal text-muted-foreground">bez DPH</span></p>
          <p className="mt-1 text-muted-foreground">0 € s DPH</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm rounded-xl">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground text-center px-4">
            Cena je dostupná len pre registrovaných partnerov
          </p>
          <div className="flex gap-2">
            <Link href="/registracia">
              <Button size="sm">Registrácia</Button>
            </Link>
            <Link href="/prihlasenie">
              <Button size="sm" variant="outline">Prihlásiť sa</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiryModal({ product, type, onClose }: { product: Product; type: "b2b" | "quote"; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = type === "b2b" ? "Získať veľkoobchodnú cenu" : "Vyžiadať cenovú ponuku";
  const defaultMessage = type === "b2b"
    ? `Záujem o veľkoobchodný odber: ${product.model}`
    : `Žiadam o cenovú ponuku na: ${product.model}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: form.message || defaultMessage,
          productModel: product.model,
          type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Chyba servera');
      setSuccess(true);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion_event_submit_lead_form_2');
        (window as any).gtag('event', 'form_submit');
      }
    } catch (err: any) {
      setError(err.message ?? 'Nastala chyba, skúste znova');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{product.model}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        {success ? (
          <div className="flex flex-col items-center px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 mb-4">
              <Check className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Dopyt odoslaný!</h3>
            <p className="mt-2 text-sm text-muted-foreground">Náš obchodný tím vás kontaktuje do 24 hodín.</p>
            <Button className="mt-6" onClick={onClose}>Zatvoriť</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="eq-name">Meno a priezvisko *</Label>
                <Input id="eq-name" placeholder="Ján Novák" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eq-company">Firma</Label>
                <Input id="eq-company" placeholder="ABC s.r.o." value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="eq-email">Email *</Label>
                <Input id="eq-email" type="email" placeholder="info@firma.sk" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eq-phone">Telefón</Label>
                <Input id="eq-phone" type="tel" placeholder="+421 9XX XXX XXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="eq-message">Správa</Label>
              <Textarea id="eq-message" rows={3} placeholder={defaultMessage} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
            </div>
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">{error}</div>
            )}
            <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
              {submitting ? 'Odosielanie...' : (<><Send className="h-4 w-4" />Odoslať dopyt</>)}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export function ProductDetail({ product, serverWholesalePrices, priceHidden }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [modalType, setModalType] = useState<"b2b" | "quote" | null>(null);
  const images: string[] = (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : ((product.specs as any)?.images ?? (product.imageUrl ? [product.imageUrl] : []));
  const addItem = useCartStore((state) => state.addItem);
  const downloads = product.downloads && product.downloads.length > 0 ? product.downloads : null;
  const specsDocs = (product.specs as any)?.documents ?? [];
  const legacyDocs = specsDocs.length > 0 ? specsDocs : (categoryDocuments[product.category] ?? []);

  const handleAddToCart = () => { addItem(product, quantity); };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {modalType && <EnquiryModal product={product} type={modalType} onClose={() => setModalType(null)} />}

      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/katalog" className="hover:text-primary">Katalóg</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/katalog?category=${product.category}`} className="hover:text-primary">{product.categoryName}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.model}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-border bg-white">
            <Badge className={cn("absolute left-4 top-4 z-10", categoryColors[product.category])}>
              {product.categoryName}
            </Badge>
            <div className="flex h-[400px] items-center justify-center p-6 relative">
              {images.length > 0 ? (
                <>
                  <img src={images[activeImg]} alt={`${product.model} - foto ${activeImg + 1}`} className="h-full w-full object-contain" />
                  {images.length > 1 && (
                    <>
                      <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button onClick={() => setActiveImg(i => (i + 1) % images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="mx-auto mb-4 h-48 w-48 rounded-2xl bg-muted/80" />
                  <p className="text-sm">Foto príde čoskoro</p>
                </div>
              )}
            </div>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={cn("flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden transition-all", activeImg === i ? "border-primary" : "border-border hover:border-primary/50")}>
                  <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-contain bg-white p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground break-all">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {product.shortLead ? renderBold(product.shortLead) : product.shortSpecs}
            </p>
          </div>

          <StockBlock product={product} />

          {priceHidden ? (
            <PriceBlurred />
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                {product.priceExVat > 0 ? (
                  <>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">{formatPrice(product.priceExVat)} € <span className="text-base font-normal text-muted-foreground">bez DPH</span></p>
                    <p className="mt-1 text-muted-foreground">{formatPrice(calculateVatPrice(product.priceExVat, product.vatRate))} € s DPH</p>
                  </>
                ) : (
                  <p className="text-2xl sm:text-3xl font-bold text-muted-foreground">Cena na dopyt</p>
                )}
              </div>
              {product.priceExVat > 0 ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex items-center rounded-lg border border-border">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-lg font-medium text-foreground hover:bg-muted">-</button>
                    <span className="min-w-[3rem] text-center font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-lg font-medium text-foreground hover:bg-muted">+</button>
                  </div>
                  <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="h-5 w-5" />Do košíka
                  </Button>
                </div>
              ) : (
                <Button size="lg" className="w-full gap-2" onClick={() => setModalType("quote")}>
                  Vyžiadať cenovú ponuku
                </Button>
              )}
              {product.priceExVat > 0 && (
                <Button variant="outline" size="lg" className="w-full gap-2" onClick={() => setModalType("quote")}>
                  Vyžiadať cenovú ponuku
                </Button>
              )}
            </div>
          )}

          {serverWholesalePrices && serverWholesalePrices.length > 0
            ? (product.category !== "ci" ? <WholesaleBlock tiers={serverWholesalePrices} palletQty={(product.specs as any)?.palletQty} /> : null)
            : (product.category !== "ci" ? <WholesaleBlurred /> : null)
          }

          {product.quickStats && product.quickStats.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.quickStats.slice(0, 4).map((stat, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4 text-center">
                  <Zap className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : (product.power || product.mppt || product.efficiency) && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.power && (
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Zap className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">{product.power}</p>
                  <p className="text-xs text-muted-foreground">Výkon</p>
                </div>
              )}
              {product.phase && (
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Zap className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">{product.phase === "1f" ? "1-fázový" : "3-fázový"}</p>
                  <p className="text-xs text-muted-foreground">Fáza</p>
                </div>
              )}
              {product.mppt && (
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Zap className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">{product.mppt}x MPPT</p>
                  <p className="text-xs text-muted-foreground">Trackery</p>
                </div>
              )}
              {product.wifi && (
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Wifi className="mx-auto mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-foreground">WiFi</p>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Popis</TabsTrigger>
            <TabsTrigger value="specs">Špecifikácia</TabsTrigger>
            <TabsTrigger value="documents">Na stiahnutie</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6 space-y-8">
            {product.features && product.features.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-6">
              {product.description ? (
                <p className="text-base text-foreground leading-relaxed">{product.description}</p>
              ) : (
                <p className="text-muted-foreground">Popis produktu nie je k dispozícii.</p>
              )}
            </div>

            {product.usageAndCompatibility && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-2 text-lg font-bold text-foreground">Použitie a kompatibilita</h2>
                <p className="text-base text-foreground leading-relaxed whitespace-pre-line">{product.usageAndCompatibility}</p>
              </div>
            )}

            <CompatibleDevicesSection product={product} />

            {product.warranty && (
              <div className="rounded-xl border border-border bg-card p-6 flex items-start gap-3">
                <Shield className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h2 className="font-semibold text-foreground">Záruka</h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{product.warranty}</p>
                </div>
              </div>
            )}

            {product.faq && product.faq.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-bold text-foreground">Časté otázky</h2>
                <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-6">
                  {product.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </TabsContent>

          <TabsContent value="specs" className="mt-6 space-y-6">
            {product.specGroups && product.specGroups.length > 0 ? (
              product.specGroups.map((group, gi) => (
                <div key={gi} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <p className="text-sm font-semibold uppercase tracking-wide text-foreground">{group.groupName}</p>
                  </div>
                  <Table>
                    <TableBody>
                      {group.rows.map((row, ri) => (
                        <TableRow key={ri}><TableCell className="font-medium">{row.label}</TableCell><TableCell>{row.value}</TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))
            ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <Table>
                <TableBody>
                  {product.power && <TableRow><TableCell className="font-medium">Výkon</TableCell><TableCell>{product.power}</TableCell></TableRow>}
                  {product.phase && <TableRow><TableCell className="font-medium">Fáza</TableCell><TableCell>{product.phase === "1f" ? "1-fázový" : "3-fázový"}</TableCell></TableRow>}
                  {product.batteryType && <TableRow><TableCell className="font-medium">Typ batérie</TableCell><TableCell>{product.batteryType}</TableCell></TableRow>}
                  {product.mppt && <TableRow><TableCell className="font-medium">MPPT</TableCell><TableCell>{product.mppt}x tracker</TableCell></TableRow>}
                  {product.efficiency && <TableRow><TableCell className="font-medium">Účinnosť</TableCell><TableCell>{product.efficiency}</TableCell></TableRow>}
                  {product.wifi !== undefined && <TableRow><TableCell className="font-medium">WiFi monitoring</TableCell><TableCell>{product.wifi ? "Áno, WiFi modul v balení" : "Nie"}</TableCell></TableRow>}
                  {(product.specs as any)?.capacity && <TableRow><TableCell className="font-medium">Kapacita</TableCell><TableCell>{(product.specs as any).capacity}</TableCell></TableRow>}
                  {(product.specs as any)?.voltage && <TableRow><TableCell className="font-medium">Napätie</TableCell><TableCell>{(product.specs as any).voltage}</TableCell></TableRow>}
                  {(product.specs as any)?.capacity_ah && <TableRow><TableCell className="font-medium">Kapacita (Ah)</TableCell><TableCell>{(product.specs as any).capacity_ah}</TableCell></TableRow>}
                  {(product.specs as any)?.cycles && <TableRow><TableCell className="font-medium">Počet cyklov</TableCell><TableCell>{(product.specs as any).cycles}</TableCell></TableRow>}
                  {(product.specs as any)?.chemistry && <TableRow><TableCell className="font-medium">Technológia</TableCell><TableCell>{(product.specs as any).chemistry}</TableCell></TableRow>}
                  {(product.specs as any)?.charge_current && <TableRow><TableCell className="font-medium">Max. prúd nabíjania</TableCell><TableCell>{(product.specs as any).charge_current}</TableCell></TableRow>}
                  {(product.specs as any)?.discharge_current && <TableRow><TableCell className="font-medium">Max. prúd vybíjania</TableCell><TableCell>{(product.specs as any).discharge_current}</TableCell></TableRow>}
                  {(product.specs as any)?.communication && <TableRow><TableCell className="font-medium">Komunikácia</TableCell><TableCell>{(product.specs as any).communication}</TableCell></TableRow>}
                  {(product.specs as any)?.weight && <TableRow><TableCell className="font-medium">Hmotnosť</TableCell><TableCell>{(product.specs as any).weight}</TableCell></TableRow>}
                  {(product.specs as any)?.dimensions && <TableRow><TableCell className="font-medium">Rozmery (mm)</TableCell><TableCell>{(product.specs as any).dimensions}</TableCell></TableRow>}
                  {(product.specs as any)?.mounting && <TableRow><TableCell className="font-medium">Montáž</TableCell><TableCell>{(product.specs as any).mounting}</TableCell></TableRow>}
                  {(product.specs as any)?.warranty && <TableRow><TableCell className="font-medium">Záruka</TableCell><TableCell>{(product.specs as any).warranty}</TableCell></TableRow>}
                  {(product.specs as any)?.slots && <TableRow><TableCell className="font-medium">Počet slotov</TableCell><TableCell>{(product.specs as any).slots}</TableCell></TableRow>}
                  {(product.specs as any)?.compatible && <TableRow><TableCell className="font-medium">Kompatibilné s</TableCell><TableCell>{(product.specs as any).compatible}</TableCell></TableRow>}
                  {(product.specs as any)?.type && <TableRow><TableCell className="font-medium">Typ</TableCell><TableCell>{(product.specs as any).type}</TableCell></TableRow>}
                  {(product.specs as any)?.clusters && <TableRow><TableCell className="font-medium">Počet klastrov</TableCell><TableCell>{(product.specs as any).clusters}</TableCell></TableRow>}
                  {(product.specs as any)?.battery && <TableRow><TableCell className="font-medium">Typ batérie</TableCell><TableCell>{(product.specs as any).battery}</TableCell></TableRow>}
                  {(product.specs as any)?.battery_current_charge && <TableRow><TableCell className="font-medium">Max. prúd nabíjania/vybíjania</TableCell><TableCell>{(product.specs as any).battery_current_charge}</TableCell></TableRow>}
                  {(product.specs as any)?.pv_power_max && <TableRow><TableCell className="font-medium">Max. výkon PV</TableCell><TableCell>{(product.specs as any).pv_power_max}</TableCell></TableRow>}
                  {(product.specs as any)?.pv_voltage_max && <TableRow><TableCell className="font-medium">Max. napätie PV</TableCell><TableCell>{(product.specs as any).pv_voltage_max}</TableCell></TableRow>}
                  {(product.specs as any)?.mppt_range && <TableRow><TableCell className="font-medium">Rozsah MPPT</TableCell><TableCell>{(product.specs as any).mppt_range}</TableCell></TableRow>}
                  {(product.specs as any)?.pv_current_max && <TableRow><TableCell className="font-medium">Max. prúd PV</TableCell><TableCell>{(product.specs as any).pv_current_max}</TableCell></TableRow>}
                  {(product.specs as any)?.ac_voltage && <TableRow><TableCell className="font-medium">Napätie AC</TableCell><TableCell>{(product.specs as any).ac_voltage}</TableCell></TableRow>}
                  {(product.specs as any)?.ac_current && <TableRow><TableCell className="font-medium">Menovitý prúd AC</TableCell><TableCell>{(product.specs as any).ac_current}</TableCell></TableRow>}
                  {(product.specs as any)?.ac_grid && <TableRow><TableCell className="font-medium">Sieťové pripojenie</TableCell><TableCell>{(product.specs as any).ac_grid}</TableCell></TableRow>}
                  {(product.specs as any)?.euro_efficiency && <TableRow><TableCell className="font-medium">Euro účinnosť</TableCell><TableCell>{(product.specs as any).euro_efficiency}</TableCell></TableRow>}
                  {(product.specs as any)?.mppt_efficiency && <TableRow><TableCell className="font-medium">Účinnosť MPPT</TableCell><TableCell>{(product.specs as any).mppt_efficiency}</TableCell></TableRow>}
                  {(product.specs as any)?.thd && <TableRow><TableCell className="font-medium">THDi</TableCell><TableCell>{(product.specs as any).thd}</TableCell></TableRow>}
                  {(product.specs as any)?.peak_power && <TableRow><TableCell className="font-medium">Špičkový výkon</TableCell><TableCell>{(product.specs as any).peak_power}</TableCell></TableRow>}
                  {(product.specs as any)?.parallel && <TableRow><TableCell className="font-medium">Paralelná prevádzka</TableCell><TableCell>{(product.specs as any).parallel}</TableCell></TableRow>}
                  {(product.specs as any)?.protection && <TableRow><TableCell className="font-medium">Krytie</TableCell><TableCell>{(product.specs as any).protection}</TableCell></TableRow>}
                  {(product.specs as any)?.cooling && <TableRow><TableCell className="font-medium">Chladenie</TableCell><TableCell>{(product.specs as any).cooling}</TableCell></TableRow>}
                  {(product.specs as any)?.temp_range && <TableRow><TableCell className="font-medium">Pracovná teplota</TableCell><TableCell>{(product.specs as any).temp_range}</TableCell></TableRow>}
                  {(product.specs as any)?.noise && <TableRow><TableCell className="font-medium">Hlučnosť</TableCell><TableCell>{(product.specs as any).noise}</TableCell></TableRow>}
                  {(product.specs as any)?.altitude && <TableRow><TableCell className="font-medium">Max. nadmorská výška</TableCell><TableCell>{(product.specs as any).altitude}</TableCell></TableRow>}

                </TableBody>
              </Table>
            </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            {downloads ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {downloads.map((doc, i) => (
                  <a key={i} href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doc.label}</p>
                      <p className="text-sm text-muted-foreground">Oficiálny PDF dokument</p>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            ) : legacyDocs.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {legacyDocs.map((doc: any) => (
                  <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30 hover:bg-muted/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Oficiálny PDF dokument · Deye</p>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
                <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
                <p>Dokumenty pre tento produkt čoskoro pribudnú.</p>
                <p className="mt-1 text-sm">Kontaktujte nás na <a href="mailto:sales@sk-partner.sk" className="text-primary hover:underline">sales@sk-partner.sk</a></p>
              </div>
            )}
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
}
