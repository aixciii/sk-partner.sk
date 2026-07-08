// Seed script: добавление новых линеек Solis в БД skpartner
// Запуск на сервере из корня проекта sk-partner.sk:
//   node seed-solis-new.js
// (использует тот же Prisma Client, что и основной проект)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CATEGORY_IDS = {
  'hybridne-lv-3f': 'cmr1z7k78000027h33rdnrd2d',
  'hybridne-hv': 'cmr1z7k78000227h3gtdsmcld',
  'hybridne-lv-1f': 'cmr1z7k78000127h3egtofs5z',
};

const products = [
  // ---- S6-EH3P(8-15)K02-NV-YD-L — 3-fázové LV, hybridne-lv-3f ----
  {
    slug: 'solis-s6-eh3p8k02-nv-yd-l',
    name: 'Solis S6-EH3P8K02-NV-YD-L',
    model: 'S6-EH3P8K02-NV-YD-L',
    categoryId: CATEGORY_IDS['hybridne-lv-3f'],
    specs: { fazy: '3-fazovy', mppt: '2x MPPT', vykon: '8000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh3p10k02-nv-yd-l',
    name: 'Solis S6-EH3P10K02-NV-YD-L',
    model: 'S6-EH3P10K02-NV-YD-L',
    categoryId: CATEGORY_IDS['hybridne-lv-3f'],
    specs: { fazy: '3-fazovy', mppt: '2x MPPT', vykon: '10000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh3p12k02-nv-yd-l',
    name: 'Solis S6-EH3P12K02-NV-YD-L',
    model: 'S6-EH3P12K02-NV-YD-L',
    categoryId: CATEGORY_IDS['hybridne-lv-3f'],
    specs: { fazy: '3-fazovy', mppt: '2x MPPT', vykon: '12000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh3p15k02-nv-yd-l',
    name: 'Solis S6-EH3P15K02-NV-YD-L',
    model: 'S6-EH3P15K02-NV-YD-L',
    categoryId: CATEGORY_IDS['hybridne-lv-3f'],
    specs: { fazy: '3-fazovy', mppt: '2x MPPT', vykon: '15000W', napatie: 'LV' },
  },

  // ---- S6-EH3P(29.9-50)K-H — 3-fázové HV, hybridne-hv ----
  {
    slug: 'solis-s6-eh3p29-9k-h',
    name: 'Solis S6-EH3P29.9K-H',
    model: 'S6-EH3P29.9K-H',
    categoryId: CATEGORY_IDS['hybridne-hv'],
    specs: { fazy: '3-fazovy', mppt: '3x MPPT', vykon: '29900W', napatie: 'HV' },
  },
  {
    slug: 'solis-s6-eh3p30k-h',
    name: 'Solis S6-EH3P30K-H',
    model: 'S6-EH3P30K-H',
    categoryId: CATEGORY_IDS['hybridne-hv'],
    specs: { fazy: '3-fazovy', mppt: '3x MPPT', vykon: '30000W', napatie: 'HV' },
  },
  {
    slug: 'solis-s6-eh3p40k-h',
    name: 'Solis S6-EH3P40K-H',
    model: 'S6-EH3P40K-H',
    categoryId: CATEGORY_IDS['hybridne-hv'],
    specs: { fazy: '3-fazovy', mppt: '4x MPPT', vykon: '40000W', napatie: 'HV' },
  },
  {
    slug: 'solis-s6-eh3p50k-h',
    name: 'Solis S6-EH3P50K-H',
    model: 'S6-EH3P50K-H',
    categoryId: CATEGORY_IDS['hybridne-hv'],
    specs: { fazy: '3-fazovy', mppt: '4x MPPT', vykon: '50000W', napatie: 'HV' },
  },

  // ---- S6-EH1P(3-8)K-L-PLUS — 1-fázové LV, hybridne-lv-1f ----
  {
    slug: 'solis-s6-eh1p3k-l-plus',
    name: 'Solis S6-EH1P3K-L-PLUS',
    model: 'S6-EH1P3K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '3000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh1p3-6k-l-plus',
    name: 'Solis S6-EH1P3.6K-L-PLUS',
    model: 'S6-EH1P3.6K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '3600W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh1p4-6k-l-plus',
    name: 'Solis S6-EH1P4.6K-L-PLUS',
    model: 'S6-EH1P4.6K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '4600W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh1p5k-l-plus',
    name: 'Solis S6-EH1P5K-L-PLUS',
    model: 'S6-EH1P5K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '5000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh1p6k-l-plus',
    name: 'Solis S6-EH1P6K-L-PLUS',
    model: 'S6-EH1P6K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '6000W', napatie: 'LV' },
  },
  {
    slug: 'solis-s6-eh1p8k-l-plus',
    name: 'Solis S6-EH1P8K-L-PLUS',
    model: 'S6-EH1P8K-L-PLUS',
    categoryId: CATEGORY_IDS['hybridne-lv-1f'],
    specs: { fazy: '1-fazovy', mppt: '2x MPPT', vykon: '8000W', napatie: 'LV' },
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
        brand: 'solis',
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
