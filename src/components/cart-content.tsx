"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore, type CartItem } from "@/lib/cart";
import { formatPrice, calculateVatPrice, categoryColors } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CartContent() {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ company: "", ico: "", dic: "", icdph: "", address: "", email: "", phone: "", note: "" });

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <CartSkeleton />;
  if (success) return <SuccessMessage orderNum={success} />;
  if (items.length === 0) return <EmptyCart />;

  const totalExVat = getTotalPrice();
  const totalInclVat = calculateVatPrice(totalExVat);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const orderItems = items.map(item => ({ productId: item.product.id, qty: item.quantity }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items: orderItems }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Chyba servera');
      clearCart();
      setSuccess(data.orderNum);
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

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
        ))}
        <div className="flex justify-end">
          <Button variant="ghost" className="text-destructive" onClick={clearCart}>
            <Trash2 className="mr-2 h-4 w-4" />Vyprázdniť košík
          </Button>
        </div>
      </div>

      {/* Order Form */}
      <div className="space-y-6">
        {/* Summary */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Súhrn objednávky</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Medzisúčet bez DPH</span>
              <span className="font-medium">{formatPrice(totalExVat)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">DPH (23%)</span>
              <span className="font-medium">{formatPrice(totalInclVat - totalExVat)} €</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Celkom s DPH</span>
              <span className="text-primary">{formatPrice(totalInclVat)} €</span>
            </div>
          </div>
        </div>

        {/* B2B Form */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Fakturačné údaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Názov firmy *</Label>
              <Input id="company" placeholder="SK Partner s.r.o." required value={form.company} onChange={e => setField('company', e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ico">IČO *</Label>
                <Input id="ico" placeholder="12345678" required value={form.ico} onChange={e => setField('ico', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dic">DIČ</Label>
                <Input id="dic" placeholder="2012345678" value={form.dic} onChange={e => setField('dic', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icdph">IČ DPH</Label>
              <Input id="icdph" placeholder="SK2012345678" value={form.icdph} onChange={e => setField('icdph', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresa *</Label>
              <Input id="address" placeholder="Ulica 123, 85101 Bratislava" required value={form.address} onChange={e => setField('address', e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="objednavky@firma.sk" required value={form.email} onChange={e => setField('email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefón *</Label>
                <Input id="phone" type="tel" placeholder="+421 9XX XXX XXX" required value={form.phone} onChange={e => setField('phone', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Poznámka</Label>
              <Textarea id="note" placeholder="Doplňujúce informácie k objednávke..." rows={3} value={form.note} onChange={e => setField('note', e.target.value)} />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
              {submitting ? 'Odosielanie...' : (<>Odoslať objednávku<ArrowRight className="h-4 w-4" /></>)}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Odoslaním objednávky súhlasíte s{" "}
              <Link href="/vop" className="underline hover:text-primary">VOP</Link>{" "}a{" "}
              <Link href="/gdpr" className="underline hover:text-primary">GDPR</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function SuccessMessage({ orderNum }: { orderNum: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Objednávka odoslaná!</h2>
      <p className="mt-2 text-muted-foreground">Číslo objednávky: <span className="font-mono font-semibold text-foreground">{orderNum}</span></p>
      <p className="mt-4 text-sm text-muted-foreground max-w-sm">Potvrdenie sme zaslali na váš email. Náš obchodný tím vás bude kontaktovať do 24 hodín.</p>
      <Link href="/katalog" className="mt-6">
        <Button variant="outline" className="gap-2"><ShoppingBag className="h-4 w-4" />Pokračovať v nákupe</Button>
      </Link>
    </div>
  );
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (id: string, qty: number) => void; onRemove: (id: string) => void }) {
  const { product, quantity } = item;
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted/50 sm:h-32 sm:w-32">
        <Badge className={cn("absolute left-1 top-1 text-[10px]", categoryColors[product.category])}>
          {product.categoryName?.split(" ")[0]}
        </Badge>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain p-2" />
        ) : (
          <div className="flex h-full items-center justify-center"><div className="h-12 w-12 rounded bg-muted/80" /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/produkt/${product.id}`} className="font-semibold text-foreground hover:text-primary">{product.model}</Link>
            <p className="mt-1 text-sm text-muted-foreground">{product.shortSpecs}</p>
          </div>
          <button onClick={() => onRemove(product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-5 w-5" /></button>
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-center rounded-lg border border-border">
            <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="px-3 py-1.5 text-foreground hover:bg-muted"><Minus className="h-4 w-4" /></button>
            <span className="min-w-[2.5rem] text-center text-sm font-medium">{quantity}</span>
            <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="px-3 py-1.5 text-foreground hover:bg-muted"><Plus className="h-4 w-4" /></button>
          </div>
          <div className="text-right">
            <p className="font-bold text-foreground">{formatPrice(product.priceExVat * quantity)} € bez DPH</p>
            <p className="text-sm text-muted-foreground">{formatPrice(calculateVatPrice(product.priceExVat * quantity))} € s DPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
      <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
      <h2 className="mt-4 text-xl font-semibold text-foreground">Váš košík je prázdny</h2>
      <p className="mt-2 text-muted-foreground">Začnite nakupovať a pridajte produkty do košíka</p>
      <Link href="/katalog"><Button className="mt-6 gap-2"><ShoppingBag className="h-4 w-4" />Prejsť do katalógu</Button></Link>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-4">{Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />)}</div>
      <div className="space-y-6"><div className="h-48 animate-pulse rounded-xl bg-muted" /><div className="h-96 animate-pulse rounded-xl bg-muted" /></div>
    </div>
  );
}
