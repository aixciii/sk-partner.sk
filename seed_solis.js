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
    { slug: 'solis-s6-eh3p8k-l', name: 'Solis S6-EH3P8K-L', model: 'S6-EH3P8K-L', brand: 'solis', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '8000W', fazy: '3-fázový', napatie: 'LV', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'solis-s6-eh3p10k-l', name: 'Solis S6-EH3P10K-L', model: 'S6-EH3P10K-L', brand: 'solis', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: true, specs: { vykon: '10000W', fazy: '3-fázový', napatie: 'LV', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'solis-s6-eh3p12k-l', name: 'Solis S6-EH3P12K-L', model: 'S6-EH3P12K-L', brand: 'solis', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '12000W', fazy: '3-fázový', napatie: 'LV', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'solis-s6-eh3p15k-l', name: 'Solis S6-EH3P15K-L', model: 'S6-EH3P15K-L', brand: 'solis', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '15000W', fazy: '3-fázový', napatie: 'LV', mppt: '3x MPPT', zaruka: '10 rokov' } },
    { slug: 'solis-s6-eh3p20k-h', name: 'Solis S6-EH3P20K-H', model: 'S6-EH3P20K-H', brand: 'solis', categoryId: hybridna.id, priceNet: 0, stockStatus: 'instock', active: true, featured: false, specs: { vykon: '20000W', fazy: '3-fázový', napatie: 'HV', mppt: '4x MPPT', zaruka: '10 rokov' } },
  ]

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: p, create: p })
    console.log('OK: ' + p.slug)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
