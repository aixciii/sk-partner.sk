import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [totalOrders, newOrders, totalCustomers, totalProducts, revenueResult, recentOrders, ordersByStatus] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.user.count({ where: { role: 'B2B' } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      _sum: { totalNet: true, totalGross: true },
      where: { status: { notIn: ['CANCELLED'] } },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { product: true } } },
    }),
    prisma.order.groupBy({ by: ['status'], _count: true }),
  ])

  return NextResponse.json({
    totalOrders, newOrders, totalCustomers, totalProducts,
    totalRevenueNet: revenueResult._sum.totalNet ?? 0,
    totalRevenueGross: revenueResult._sum.totalGross ?? 0,
    recentOrders, ordersByStatus,
  })
}
