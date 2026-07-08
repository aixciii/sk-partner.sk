// Seed script: pridanie novej znacky Dyness do DB skpartner
// Spustenie na serveri z korena projektu sk-partner.sk:
//   node seed-dyness.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATEGORY_IDS = {
  'baterie-lv': 'cmr1z7k78000327h3q7rehgi3',
  'baterie-hv': 'cmr1z7k78000427h39kq543jm',
};

const products = [
  // ---- LV batérie ----
  {
    slug: 'dyness-powerbrick-plus',
    name: 'Dyness PowerBrick Plus',
    model: 'PowerBrick Plus',
    categoryId: CATEGORY_IDS['baterie-lv'],
    specs: {
      kapacita: '16.07kWh',
      maxParalelne: 'do 803kWh',
      maxPrud: '200A',
      ip: 'IP65',
      cykly: '≥8000',
      kompatibilita: 'Deye',
    },
  },
  {
    slug: 'dyness-powerbox-g2',
    name: 'Dyness Powerbox G2',
    model: 'Powerbox G2',
    categoryId: CATEGORY_IDS['baterie-lv'],
    specs: {
      kapacita: '10.24kWh',
      maxParalelne: 'do 40 jednotiek',
      maxPrud: '200A',
      ip: 'IP65',
      cykly: 'Unlimited / 10 rokov',
      kompatibilita: 'Deye',
    },
  },
  {
    slug: 'dyness-powerdepot-g2',
    name: 'Dyness PowerDepot G2',
    model: 'PowerDepot G2',
    categoryId: CATEGORY_IDS['baterie-lv'],
    specs: {
      kapacita: '5.12kWh',
      maxParalelne: 'do 256kWh',
      maxPrud: '100A',
      ip: 'IP66',
      cykly: '≥5000',
      kompatibilita: 'Deye',
    },
  },
  {
    slug: 'dyness-dl5-0c',
    name: 'Dyness DL5.0C',
    model: 'DL5.0C',
    categoryId: CATEGORY_IDS['baterie-lv'],
    specs: {
      kapacita: '5.12kWh',
      maxParalelne: 'do 256kWh',
      maxPrud: '100A',
      ip: 'IP20',
      cykly: '≥6000',
      kompatibilita: 'Deye',
    },
  },

  // ---- C&I stohovatelné (baterie-hv) ----
  {
    slug: 'dyness-stack100',
    name: 'Dyness STACK100',
    model: 'STACK100',
    categoryId: CATEGORY_IDS['baterie-hv'],
    specs: {
      kapacita: 'do 921kWh',
      typ: 'C&I stohovatelny system',
      kompatibilita: 'Deye',
    },
  },
  {
    slug: 'dyness-stack280',
    name: 'Dyness STACK280',
    model: 'STACK280',
    categoryId: CATEGORY_IDS['baterie-hv'],
    specs: {
      kapacita: 'do 2.58MWh',
      typ: 'C&I stohovatelny system',
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
        brand: 'dyness',
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
