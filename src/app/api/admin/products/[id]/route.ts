import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.model && { model: body.model }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.priceNet !== undefined && { priceNet: parseFloat(body.priceNet) }),
      ...(body.inStock !== undefined && { inStock: body.inStock }),
      ...(body.stockQty !== undefined && { stockQty: parseInt(body.stockQty) }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.active !== undefined && { active: body.active }),
      ...(body.sortOrder !== undefined && { sortOrder: parseInt(body.sortOrder) }),
      ...(body.specs !== undefined && { specs: body.specs }),
      ...(body.categoryId && { categoryId: body.categoryId }),
      ...(body.stockStatus !== undefined && { stockStatus: body.stockStatus, inStock: body.stockStatus === 'instock' }),
      ...(body.transitQty !== undefined && { transitQty: parseInt(body.transitQty) }),
      ...(body.transitDate !== undefined && { transitDate: body.transitDate }),
      ...(body.wholesalePrices !== undefined && { wholesalePrices: body.wholesalePrices }),
      ...(body.costPrice !== undefined && { costPrice: body.costPrice ? parseFloat(body.costPrice) : null }),
    },
    include: { category: true },
  })
  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.product.update({ where: { id }, data: { active: false } })
  return NextResponse.json({ success: true })
}
