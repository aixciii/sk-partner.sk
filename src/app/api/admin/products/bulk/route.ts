import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function PATCH(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const ids: string[] = body.ids ?? []
  const data = body.data ?? {}
  if (ids.length === 0) return NextResponse.json({ error: 'No ids provided' }, { status: 400 })

  const result = await prisma.product.updateMany({
    where: { id: { in: ids } },
    data: {
      ...(data.priceNet !== undefined && { priceNet: parseFloat(data.priceNet) }),
      ...(data.active !== undefined && { active: data.active }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.stockQty !== undefined && { stockQty: parseInt(data.stockQty) }),
      ...(data.stockStatus !== undefined && { stockStatus: data.stockStatus, inStock: data.stockStatus === 'instock' }),
    },
  })
  return NextResponse.json({ count: result.count })
}
