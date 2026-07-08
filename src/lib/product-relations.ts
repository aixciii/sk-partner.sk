import type { Product, ProductCategory } from "./products";
import { fetchProducts, fetchProductBySlug } from "./products";

const COMPATIBLE_CATEGORY_MAP: Record<string, ProductCategory[]> = {
  "hybrid-lv-1f": ["battery-lv"],
  "hybrid-lv-3f": ["battery-lv"],
  "hybrid-hv-3f": ["battery-hv"],
  "on-grid": [], // on-grid meniče nemajú vstup pre batériu — v katalógu preň neexistuje reálne kompatibilné zariadenie
  "battery-lv": ["hybrid-lv-1f", "hybrid-lv-3f"],
  "battery-hv": ["hybrid-hv-3f"],
  "ci": [],
};

function extractPowerKw(product: Product): number | null {
  const raw = product.power ?? (product.specs as any)?.power ?? (product.specs as any)?.vykon;
  if (!raw) return null;
  const str = String(raw).trim();
  const kwMatch = str.match(/([\d.]+)\s*kw/i);
  if (kwMatch) return parseFloat(kwMatch[1]);
  const wMatch = str.match(/([\d.]+)\s*w\b/i);
  if (wMatch) return parseFloat(wMatch[1]) / 1000;
  return null;
}

export interface RelationResult {
  product: Product;
  reason?: string;
}

export async function resolveCompatibleDevices(product: Product, limit = 3): Promise<RelationResult[]> {
  if (product.compatibleDevices && product.compatibleDevices.length > 0) {
    const resolved = await Promise.all(
      product.compatibleDevices.map(async (ref) => ({
        product: await fetchProductBySlug(ref.productId),
        reason: ref.reason,
      }))
    );
    return resolved
      .filter((r): r is { product: Product; reason: string } => !!r.product)
      .map((r) => ({ product: r.product, reason: r.reason }));
  }

  const relatedCats = COMPATIBLE_CATEGORY_MAP[product.category] ?? [];
  if (relatedCats.length === 0) return [];

  const results = await Promise.all(relatedCats.map((cat) => fetchProducts({ category: cat })));
  let candidates = results.flat().filter((p) => p.id !== product.id && p.inStock !== false);

  const myPower = extractPowerKw(product);
  if (myPower !== null) {
    candidates.sort((a, b) => {
      const pa = extractPowerKw(a);
      const pb = extractPowerKw(b);
      const da = pa === null ? Infinity : Math.abs(pa - myPower);
      const db = pb === null ? Infinity : Math.abs(pb - myPower);
      return da - db;
    });
  } else {
    candidates.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return candidates.slice(0, limit).map((p) => ({ product: p }));
}

export async function resolveAccessories(product: Product, limit = 3): Promise<RelationResult[]> {
  if (product.accessories && product.accessories.length > 0) {
    const resolved = await Promise.all(
      product.accessories.map(async (ref) => ({
        product: await fetchProductBySlug(ref.productId),
        reason: ref.note,
      }))
    );
    return resolved
      .filter((r): r is { product: Product; reason: string } => !!r.product)
      .map((r) => ({ product: r.product, reason: r.reason }));
  }

  const candidates = (await fetchProducts({ category: product.category })).filter(
    (p) => p.id !== product.id && p.brand === product.brand && p.inStock !== false
  );
  const sorted = candidates.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  return sorted.slice(0, limit).map((p) => ({ product: p }));
}
