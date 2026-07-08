
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const hybridna = await prisma.category.upsert({
    where: { slug: 'hybridne-invertory' },
    update: {},
    create: { slug: 'hybridne-invertory', name: 'Hybridné invertory', order: 1 }
  })
  
  const baterie = await prisma.category.upsert({
    where: { slug: 'baterie' },
    update: {},
    create: { slug: 'baterie', name: 'Batériové úložiská', order: 2 }
  })

  const products = [
    { slug: 'foxess-ep6', name: 'Vysokonapäťová batéria FoxESS EP6', model: 'EP6', brand: 'fox-ess', categoryId: baterie.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { kapacita: '5.76 kWh', typ: 'LiFePO4', napatie: 'HV', zaruka: '10 rokov' } },
    { slug: 'foxess-ep12', name: 'Vysokonapäťová batéria FoxESS EP12', model: 'EP12', brand: 'fox-ess', categoryId: baterie.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { kapacita: '11.52 kWh', typ: 'LiFePO4', napatie: 'HV', zaruka: '10 rokov' } },
    { slug: 'foxess-h3-6-0-e', name: 'FoxESS H3-6.0-E', model: 'H3-6.0-E', brand: 'fox-ess', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: true, specs: { vykon: '6000W', fazy: '3-fázový', mppt: '2x MPPT', komunikacia: 'Wi-Fi dongle + Smartmeter', zaruka: '10 rokov' } },
    { slug: 'foxess-p3-12-0-sh', name: 'FoxESS P3-12.0-SH', model: 'P3-12.0-SH', brand: 'fox-ess', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '12000W', fazy: '3-fázový', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'foxess-p3-6-0-sh', name: 'FoxESS P3-6.0-SH', model: 'P3-6.0-SH', brand: 'fox-ess', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '6000W', fazy: '3-fázový', mppt: '2x MPPT', zaruka: '10 rokov' } },
    { slug: 'foxess-p3-8-0-sh', name: 'FoxESS P3-8.0-SH', model: 'P3-8.0-SH', brand: 'fox-ess', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '8000W', fazy: '3-fázový', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'foxess-p3-10-0-sh', name: 'FoxESS P3-10.0-SH', model: 'P3-10.0-SH', brand: 'fox-ess', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '10000W', fazy: '3-fázový', mppt: '3x MPPT', zaruka: '10 rokov' } },
  ]

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: p, create: p })
    console.log('OK: ' + p.slug)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
