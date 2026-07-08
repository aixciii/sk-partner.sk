import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('q')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20
  const where: any = {
    ...(status && status !== 'ALL' && { status }),
    ...(search && { OR: [{ orderNum: { contains: search, mode: 'insensitive' } }, { guestEmail: { contains: search, mode: 'insensitive' } }, { guestName: { contains: search, mode: 'insensitive' } }, { company: { contains: search, mode: 'insensitive' } }] }),
  }
  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, include: { items: { include: { product: { select: { name: true, imageUrl: true } } } }, user: { select: { name: true, email: true, company: true } } }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
    prisma.order.count({ where }),
  ])
  return NextResponse.json({ orders, total, pages: Math.ceil(total / limit) })
}
