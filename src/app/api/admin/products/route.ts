import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('q')
  const products = await prisma.product.findMany({ where: search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { model: { contains: search, mode: 'insensitive' } }] } : undefined, include: { category: true }, orderBy: [{ category: { order: 'asc' } }, { sortOrder: 'asc' }] })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const product = await prisma.product.create({ data: { slug: body.slug, name: body.name, model: body.model, categoryId: body.categoryId, description: body.description, specs: body.specs, priceNet: parseFloat(body.priceNet), vatRate: parseFloat(body.vatRate ?? 0.23), inStock: body.inStock ?? true, stockQty: parseInt(body.stockQty ?? 0), imageUrl: body.imageUrl, featured: body.featured ?? false, active: body.active ?? true, sortOrder: parseInt(body.sortOrder ?? 0) }, include: { category: true } })
  return NextResponse.json(product)
}
