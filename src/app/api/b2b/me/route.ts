import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session) return NextResponse.json(null, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { name: true, email: true, company: true, approved: true, discount: true }
  })
  if (!user) return NextResponse.json(null, { status: 401 })
  return NextResponse.json(user)
}
