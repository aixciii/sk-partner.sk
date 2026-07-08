import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('q')
  const approved = searchParams.get('approved')
  const tier = searchParams.get('tier')
  const sort = searchParams.get('sort')
  const orderBy = sort === 'volume_desc' ? { quarterlyVolumeEur: 'desc' as const }
    : sort === 'volume_asc' ? { quarterlyVolumeEur: 'asc' as const }
    : { createdAt: 'desc' as const }
  const customers = await prisma.user.findMany({ where: { role: { in: ['B2B', 'B2C'] }, ...(approved !== null && approved !== 'ALL' && { approved: approved === 'true' }), ...(tier && tier !== 'ALL' && { partnerTier: tier as any }), ...(search && { OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }, { company: { contains: search, mode: 'insensitive' } }, { ico: { contains: search, mode: 'insensitive' } }] }) }, include: { orders: { select: { id: true, totalNet: true, status: true, createdAt: true }, orderBy: { createdAt: 'desc' } } }, orderBy })
  return NextResponse.json(customers)
}
