import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('q')
  const slug = searchParams.get('slug')

  const slugMap: Record<string,string> = {
    'hybrid-lv-1f': 'hybridne-lv-1f',
    'hybrid-lv-3f': 'hybridne-lv-3f',
    'hybrid-hv-3f': 'hybridne-hv',
    'on-grid': 'on-grid',
    'battery-lv': 'baterie-lv',
    'battery-hv': 'baterie-hv',
    'ci': 'komercne-riesenia',
  }
  const dbCategory = (category && slugMap[category]) ? slugMap[category] : category

  const session = getSessionFromRequest(req)
  const isVerifiedB2B = session?.approved === true

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(slug && { slug }),
      ...(category && { category: { slug: dbCategory } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } },
        ]
      }),
    },
    include: { category: true },
    orderBy: [{ category: { order: 'asc' } }],
  })

  const result = products.map(p => {
    const hidePrice = !slug && !isVerifiedB2B && p.priceNet > 0
    return {
      ...p,
      wholesalePrices: isVerifiedB2B ? p.wholesalePrices : null,
      priceNet: hidePrice ? null : p.priceNet,
      priceHidden: hidePrice,
    }
  })

  return NextResponse.json(result)
}
