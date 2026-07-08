import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { fetchProductBySlug } from "@/lib/products";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getCategoryMinPriceForProduct(slug: string): Promise<number | null> {
  const dbProduct = await prisma.product.findUnique({ where: { slug }, select: { categoryId: true } });
  if (!dbProduct) return null;
  const agg = await prisma.product.aggregate({
    where: { active: true, priceNet: { gt: 0 }, categoryId: dbProduct.categoryId },
    _min: { priceNet: true },
  });
  return agg._min.priceNet ?? null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductBySlug(id);

  if (!product) {
    return { title: "Produkt nenájdený | DeyeSolar.sk" };
  }

  const categoryMinPrice = await getCategoryMinPriceForProduct(id);
  const priceLabel = categoryMinPrice ? `od ${Math.round(categoryMinPrice)}€` : null;

  const title = product.metaTitle || `${product.model}${priceLabel ? ` | ${priceLabel}` : ""} | DeyeSolar.sk`;
  const description = product.metaDescription
    || `${product.model} - ${product.shortSpecs}.${priceLabel ? ` Ceny v kategórii ${priceLabel} bez DPH.` : ""} Skladom na Slovensku, dodanie 1-2 dni. Záruka 10 rokov.`;
  const ogImage = product.ogImage || product.imageUrl || undefined;

  return {
    title,
    description,
    keywords: `${product.model}, ${product.name}, Deye, solárny menič, kúpiť, cena, Slovensko`,
    alternates: {
      canonical: `https://www.deyesolar.sk/produkt/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: product.metaTitle || `${product.model} | DeyeSolar.sk`,
      description,
      url: `https://www.deyesolar.sk/produkt/${id}`,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductBySlug(id);

  if (!product) {
    notFound();
  }

  const categoryMinPrice = await getCategoryMinPriceForProduct(id);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Katalóg", "item": "https://www.deyesolar.sk/katalog" },
      { "@type": "ListItem", "position": 2, "name": product.categoryName, "item": `https://www.deyesolar.sk/katalog?category=${product.category}` },
      { "@type": "ListItem", "position": 3, "name": product.model, "item": `https://www.deyesolar.sk/produkt/${id}` }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "model": product.model,
    "description": product.shortSpecs,
    "brand": {
      "@type": "Brand",
      "name": "Deye"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Ningbo Deye Inverter Technology Co., Ltd."
    },
    "offers": {
      "@type": categoryMinPrice ? "AggregateOffer" : "Offer",
      "url": `https://www.deyesolar.sk/produkt/${id}`,
      "priceCurrency": "EUR",
      ...(categoryMinPrice ? { "lowPrice": categoryMinPrice.toFixed(2) } : {}),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "SK Partner s.r.o.",
        "url": "https://www.deyesolar.sk"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "EUR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          }
        }
      }
    },
    "warranty": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": {
        "@type": "QuantitativeValue",
        "value": 10,
        "unitCode": "ANN"
      }
    },
    ...(product.imageUrl && { "image": product.imageUrl }),
  };

  const faqLd = product.faq && product.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer },
    })),
  } : null;

  const cookieStore = await cookies()
  const token = cookieStore.get("auth")?.value
  const session = token ? verifyToken(token) : null
  let wholesalePrices = null
  if (session?.approved) {
    const dbProduct = await prisma.product.findUnique({ where: { slug: id }, select: { wholesalePrices: true } })
    wholesalePrices = dbProduct?.wholesalePrices ?? null
  }
  const priceHidden = !session?.approved && product.priceExVat > 0

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <Header />
      <main className="flex-1 bg-muted/20 py-8">
        <ProductDetail product={product} serverWholesalePrices={wholesalePrices} priceHidden={priceHidden} />
      </main>
      <Footer />
    </div>
  );
}
