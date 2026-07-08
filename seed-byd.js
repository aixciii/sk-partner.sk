// Seed script: pridanie novej znacky BYD do DB skpartner
// Spustenie na serveri z korena projektu sk-partner.sk:
//   node seed-byd.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATEGORY_IDS = {
  'baterie-lv': 'cmr1z7k78000327h3q7rehgi3',
};

const products = [
  {
    slug: 'byd-battery-box-lv5-0-plus',
    name: 'BYD Battery-Box LV5.0+',
    model: 'LV5.0+',
    categoryId: CATEGORY_IDS['baterie-lv'],
    specs: {
      kapacita: '5.12kWh',
      maxParalelne: 'do 163.84kWh (×32)',
      kompatibilita: 'Deye',
    },
  },
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`⏭  Preskočené (už existuje): ${p.slug}`);
      skipped++;
      continue;
    }

    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        model: p.model,
        categoryId: p.categoryId,
        specs: p.specs,
        priceNet: 0,
        vatRate: 0.23,
        inStock: true,
        stockQty: 0,
        stockStatus: 'instock',
        transitQty: 0,
        active: true,
        brand: 'byd',
        sortOrder: 0,
      },
    });
    console.log(`✅ Vytvorené: ${p.slug}`);
    created++;
  }

  console.log(`\nHotovo. Vytvorených: ${created}, preskočených: ${skipped}, spolu: ${products.length}`);
}

main()
  .catch((e) => {
    console.error('Chyba pri seedovaní:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
