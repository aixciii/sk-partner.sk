"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/product-card";
import {
  fetchProducts,
  categoryNames,
  type Product,
  type ProductCategory,
} from "@/lib/products";

const categories: { id: ProductCategory | "all"; name: string }[] = [
  { id: "all", name: "Všetky produkty" },
  { id: "hybrid-lv-3f", name: "Hybridné meniče LV 3-fázové" },
  { id: "battery-lv", name: "Batérie LV" },
  { id: "hybrid-lv-1f", name: "Hybridné meniče LV 1-fázové" },
  { id: "hybrid-hv-3f", name: "Hybridné meniče HV" },
  { id: "battery-hv", name: "Batérie HV + Rack" },
  { id: "on-grid", name: "On-Grid meniče" },
  { id: "ci", name: "Priemyselné riešenia" },
];

const categorySlug: Record<string, string> = {
  "all": "/katalog",
  "hybrid-lv-3f": "/katalog/hybridne-lv-3f",
  "battery-lv": "/katalog/baterie-lv",
  "hybrid-lv-1f": "/katalog/hybridne-lv-1f",
  "on-grid": "/katalog/on-grid",
  "hybrid-hv-3f": "/katalog/hybridne-hv",
  "battery-hv": "/katalog/baterie-hv",
  "ci": "/katalog/komercne-riesenia",
};

const powerFilters = [
  { id: "all", name: "Všetky výkony" },
  { id: "6-10", name: "6-10 kW" },
  { id: "10-20", name: "10-20 kW" },
  { id: "20-50", name: "20-50 kW" },
  { id: "50+", name: "50+ kW" },
];

const phaseFilters = [
  { id: "all", name: "Všetky fázy" },
  { id: "1f", name: "1-fázové" },
  { id: "3f", name: "3-fázové" },
];

const brandFilters = [
  { id: "all", name: "Všetky značky" },
  { id: "deye", name: "Deye" },
  { id: "fox-ess", name: "FoxESS" },
  { id: "solis", name: "Solis" },
  { id: "dyness", name: "Dyness" },
  { id: "byd", name: "BYD" },
];

export function CatalogContent({ defaultCategory }: { defaultCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugToCategory: Record<string, string> = {
    "hybridne-lv-3f": "hybrid-lv-3f",
    "hybridne-lv-1f": "hybrid-lv-1f",
    "hybridne-hv": "hybrid-hv-3f",
    "baterie-lv": "battery-lv",
    "baterie-hv": "battery-hv",
    "on-grid": "on-grid",
    "komercne-riesenia": "ci",
  }
  const rawCategory = defaultCategory || searchParams.get("category") || "all"
  const initialCategory = slugToCategory[rawCategory] || rawCategory
  const initialBrand = searchParams.get("brand") || "all"

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "all"
  >(initialCategory as ProductCategory | "all");
  const [selectedPower, setSelectedPower] = useState("all");
  const [selectedPhase, setSelectedPhase] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);

  // Fetch products from API
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("[v0] Failed to fetch products:", err);
        setError("Nepodarilo sa načítať produkty. Skúste to znova.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !product.model.toLowerCase().includes(query) &&
          !product.shortSpecs.toLowerCase().includes(query) &&
          !product.categoryName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Phase filter
      if (selectedPhase !== "all" && product.phase !== selectedPhase) {
        return false;
      }

      // Power filter
      if (selectedPower !== "all" && product.power) {
        const powerNum = parseInt(product.power);
        if (selectedPower === "6-10" && (powerNum < 6 || powerNum > 10))
          return false;
        if (selectedPower === "10-20" && (powerNum < 10 || powerNum > 20))
          return false;
        if (selectedPower === "20-50" && (powerNum < 20 || powerNum > 50))
          return false;
        if (selectedPower === "50+" && powerNum < 50) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedPower, selectedPhase]);

  const handleCategoryChange = (category: ProductCategory | "all") => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/katalog?${params.toString()}`, { scroll: false });
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const params = new URLSearchParams(searchParams.toString());
    if (brand === "all") {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }
    router.push(`/katalog?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedPower("all");
    setSelectedPhase("all");
    router.push("/katalog", { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    selectedPower !== "all" ||
    selectedPhase !== "all" ||
    searchQuery !== "";

  const getCategoryCount = (categoryId: ProductCategory | "all") => {
    if (categoryId === "all") return products.length;
    return products.filter((p) => p.category === categoryId).length;
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Kategórie</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={categorySlug[category.id] || "/katalog"}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {category.name}
              <span
                className={`text-xs ${
                  selectedCategory === category.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                }`}
              >
                {getCategoryCount(category.id)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Značka</h3>
        <div className="space-y-1">
          {brandFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleBrandChange(filter.id)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedBrand === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Power Filter */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Výkon</h3>
        <div className="space-y-1">
          {powerFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedPower(filter.id)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedPower === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Filter */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Fáza</h3>
        <div className="space-y-1">
          {phaseFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedPhase(filter.id)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedPhase === filter.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Zrušiť filtre
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Načítavam produkty...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-destructive/50 bg-destructive/5 py-16">
        <p className="text-lg font-medium text-destructive">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Skúsiť znova
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl border border-border bg-card p-5">
          <FilterSidebar />
        </div>
      </aside>

      {/* Main Content */}
      <div>
        {/* Search and Mobile Filter */}
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Hľadať produkty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtre
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtre</SheetTitle>
              </SheetHeader>
              <div className="mt-6 pb-10">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Aktívne filtre:
            </span>
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {categoryNames[selectedCategory]}
                <button
                  onClick={() => handleCategoryChange("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedBrand !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {brandFilters.find((f) => f.id === selectedBrand)?.name}
                <button
                  onClick={() => handleBrandChange("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPower !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {powerFilters.find((f) => f.id === selectedPower)?.name}
                <button
                  onClick={() => setSelectedPower("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPhase !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {phaseFilters.find((f) => f.id === selectedPhase)?.name}
                <button
                  onClick={() => setSelectedPhase("all")}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="mb-4 text-sm text-muted-foreground">
          Nájdených {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "produkt" : "produktov"}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
            <p className="text-lg font-medium text-foreground">
              Žiadne produkty
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Skúste zmeniť filtre alebo vyhľadávanie
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Zrušiť filtre
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
