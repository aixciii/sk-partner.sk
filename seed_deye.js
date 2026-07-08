const { PrismaClient } = require('@prisma/client')
const { Pool } = require('pg')

const source = new Pool({ connectionString: 'postgresql://deye:DeYeDB_StrongPass2026%21@localhost:5432/deyesolar' })
const target = new PrismaClient()

async function main() {
  const { rows: products } = await source.query(`
    SELECT p.*, c.slug as cat_slug, c.name as cat_name, c."order" as cat_order
    FROM "Product" p
    JOIN "Category" c ON c.id = p."categoryId"
    WHERE p.active = true
  `)
  console.log('Найдено: ' + products.length)

  for (const p of products) {
    const cat = await target.category.upsert({
      where: { slug: p.cat_slug },
      update: {},
      create: { slug: p.cat_slug, name: p.cat_name, order: p.cat_order || 0 }
    })

    await target.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        model: p.model,
        brand: 'deye',
        categoryId: cat.id,
        description: p.description,
        specs: p.specs || {},
        priceNet: p.priceNet,
        vatRate: p.vatRate,
        stockStatus: p.stockStatus,
        imageUrl: p.imageUrl,
        featured: p.featured,
        active: true,
        wholesalePrices: p.wholesalePrices || {},
      }
    })
    console.log('OK: ' + p.slug)
  }
}

main().catch(console.error).finally(async () => {
  await source.end()
  await target.$disconnect()
})
