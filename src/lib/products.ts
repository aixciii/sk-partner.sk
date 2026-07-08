export type ProductCategory =
  | "hybrid-lv-1f"
  | "hybrid-lv-3f"
  | "hybrid-hv-3f"
  | "on-grid"
  | "battery-lv"
  | "battery-hv"
  | "ci";

export interface WholesaleTier {
  label: string;
  min: number;
  max: number | null;
  price: number | null;
}

export interface QuickStat { value: string; label: string; }
export interface FeatureItem { title: string; text: string; }
export interface FaqItem { question: string; answer: string; }
export interface SpecRow { label: string; value: string; }
export interface SpecGroup { groupName: string; rows: SpecRow[]; }
export interface CompatibleDeviceRef { productId: string; reason: string; }
export interface AccessoryRef { productId: string; note: string; }
export interface DownloadItem { label: string; fileUrl: string; type: "manual_sk" | "manual_en" | "datasheet" | "declaration" | "warranty_terms"; }

export interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  model: string;
  priceNet: number;
  vatRate: number;
  inStock: boolean;
  stockStatus: string;
  stockQty: number;
  transitQty: number;
  transitDate: string | null;
  wholesalePrices: WholesaleTier[] | null;
  specs: Record<string, string | number | boolean>;
  category: string;
  imageUrl: string | null;
  featured?: boolean;
  description?: string | null;
  priceHidden?: boolean;
  brand?: string;
  shortLead?: string | null;
  quickStats?: QuickStat[] | null;
  features?: FeatureItem[] | null;
  usageAndCompatibility?: string | null;
  compatibleDevices?: CompatibleDeviceRef[] | null;
  accessories?: AccessoryRef[] | null;
  warranty?: string | null;
  faq?: FaqItem[] | null;
  specGroups?: SpecGroup[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  gallery?: string[];
  downloads?: DownloadItem[] | null;
  stockNote?: string | null;
}

export interface Product {
  id: string;
  slug: string;
  model: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  brand: string;
  power?: string;
  phase?: string;
  batteryType?: string;
  priceExVat: number;
  vatRate: number;
  inStock: boolean;
  stockStatus: string;
  stockQty: number;
  transitQty: number;
  transitDate: string | null;
  wholesalePrices: WholesaleTier[] | null;
  shortSpecs: string;
  mppt?: string;
  efficiency?: string;
  wifi?: boolean;
  description?: string;
  specs?: Record<string, string | number | boolean>;
  imageUrl?: string | null;
  featured?: boolean;
  priceHidden: boolean;
  shortLead?: string | null;
  quickStats?: QuickStat[] | null;
  features?: FeatureItem[] | null;
  usageAndCompatibility?: string | null;
  compatibleDevices?: CompatibleDeviceRef[] | null;
  accessories?: AccessoryRef[] | null;
  warranty?: string | null;
  faq?: FaqItem[] | null;
  specGroups?: SpecGroup[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  gallery: string[];
  downloads?: DownloadItem[] | null;
  stockNote?: string | null;
}

export const categoryColors: Record<ProductCategory, string> = {
  "hybrid-lv-1f": "bg-primary text-primary-foreground",
  "hybrid-lv-3f": "bg-[#0A1628] text-white",
  "hybrid-hv-3f": "bg-[#2563eb] text-white",
  "on-grid": "bg-emerald-600 text-white",
  "battery-lv": "bg-amber-600 text-white",
  "battery-hv": "bg-violet-600 text-white",
  "ci": "bg-slate-700 text-white",
};

export const categoryNames: Record<ProductCategory, string> = {
  "hybrid-lv-1f": "Hybridné meniče LV 1-fázové",
  "hybrid-lv-3f": "Hybridné meniče LV 3-fázové",
  "hybrid-hv-3f": "Hybridné meniče HV",
  "on-grid": "On-Grid meniče",
  "battery-lv": "Batérie LV",
  "battery-hv": "Batérie HV + Rack",
  "ci": "Priemyselné riešenia",
};

export const VAT_RATE = 0.23;

function mapCategory(apiCategory: any): ProductCategory {
  if (typeof apiCategory === "object" && apiCategory !== null) { apiCategory = apiCategory.slug; }
  const categoryMap: Record<string, ProductCategory> = {
    "hybridne-lv-1f": "hybrid-lv-1f",
    "hybridne-lv-3f": "hybrid-lv-3f",
    "hybridne-hv": "hybrid-hv-3f",
    "on-grid": "on-grid",
    "baterie-lv": "battery-lv",
    "baterie-hv": "battery-hv",
    "hybrid-lv-1f": "hybrid-lv-1f",
    "hybrid-lv-3f": "hybrid-lv-3f",
    "hybrid-hv-3f": "hybrid-hv-3f",
    "battery-lv": "battery-lv",
    "battery-hv": "battery-hv",
    "komercne-riesenia": "ci",
    "ci": "ci",
  };
  return categoryMap[apiCategory] || "hybrid-lv-1f";
}

export function transformApiProduct(apiProduct: ApiProduct): Product {
  const category = mapCategory(apiProduct.category);
  const specs = apiProduct.specs || {};
  return {
    id: apiProduct.slug,
    slug: apiProduct.slug,
    model: apiProduct.model,
    name: apiProduct.name,
    category,
    categoryName: categoryNames[category],
    brand: apiProduct.brand || "deye",
    power: specs.power as string | undefined,
    phase: specs.phase as string | undefined,
    batteryType: specs.batteryType as string | undefined,
    priceExVat: apiProduct.priceNet ?? 0,
    priceHidden: apiProduct.priceHidden ?? false,
    vatRate: apiProduct.vatRate,
    inStock: apiProduct.inStock,
    stockStatus: apiProduct.stockStatus ?? "instock",
    stockQty: apiProduct.stockQty ?? 0,
    transitQty: apiProduct.transitQty ?? 0,
    transitDate: apiProduct.transitDate ?? null,
    wholesalePrices: apiProduct.wholesalePrices ?? null,
    featured: apiProduct.featured ?? false,
    shortSpecs: buildShortSpecs(specs, apiProduct.description ?? undefined),
    mppt: specs.mppt as string | undefined,
    efficiency: specs.efficiency as string | undefined,
    wifi: specs.wifi as boolean | undefined,
    description: apiProduct.description ?? specs.description as string | undefined,
    specs: apiProduct.specs,
    imageUrl: apiProduct.imageUrl,
    shortLead: apiProduct.shortLead ?? null,
    quickStats: apiProduct.quickStats ?? null,
    features: apiProduct.features ?? null,
    usageAndCompatibility: apiProduct.usageAndCompatibility ?? null,
    compatibleDevices: apiProduct.compatibleDevices ?? null,
    accessories: apiProduct.accessories ?? null,
    warranty: apiProduct.warranty ?? null,
    faq: apiProduct.faq ?? null,
    specGroups: apiProduct.specGroups ?? null,
    metaTitle: apiProduct.metaTitle ?? null,
    metaDescription: apiProduct.metaDescription ?? null,
    ogImage: apiProduct.ogImage ?? null,
    gallery: apiProduct.gallery ?? [],
    downloads: apiProduct.downloads ?? null,
    stockNote: apiProduct.stockNote ?? null,
  };
}

function buildShortSpecs(specs: Record<string, string | number | boolean>, description?: string): string {
  const parts: string[] = [];
  if (specs.power) parts.push(String(specs.power));
  if (specs.phase) parts.push(String(specs.phase));
  if (specs.batteryType) parts.push(String(specs.batteryType));
  if (specs.capacity) parts.push(String(specs.capacity));
  return parts.join(" · ") || description || "";
}

export async function fetchProducts(params?: { category?: string; q?: string }): Promise<Product[]> {
  const base = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.q) query.set('q', params.q);
  const res = await fetch(`${base}/api/products${query.toString() ? '?' + query.toString() : ''}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ApiProduct[] = await res.json();
  return data.map(transformApiProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/products?slug=${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!res.ok) { if (res.status === 404) return null; throw new Error("Failed to fetch product"); }
  const data: ApiProduct | ApiProduct[] = await res.json();
  const apiProduct = Array.isArray(data) ? data[0] : data;
  if (!apiProduct) return null;
  return transformApiProduct(apiProduct);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("sk-SK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function calculateVatPrice(priceExVat: number, vatRate?: number): number {
  const rate = vatRate ?? VAT_RATE;
  return Math.round(priceExVat * (1 + rate));
}
