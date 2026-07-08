import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, hashPassword, comparePassword } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const users = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { action } = body

  if (action === 'change_password') {
    const { currentPassword, newPassword } = body
    const user = await prisma.user.findUnique({ where: { id: session.id } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const ok = await comparePassword(currentPassword, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'Nesprávne aktuálne heslo' }, { status: 400 })
    if (newPassword.length < 8) return NextResponse.json({ error: 'Heslo musí mať aspoň 8 znakov' }, { status: 400 })
    const passwordHash = await hashPassword(newPassword)
    await prisma.user.update({ where: { id: session.id }, data: { passwordHash } })
    return NextResponse.json({ success: true })
  }

  if (action === 'create_admin') {
    const { email, name, password } = body
    if (!email || !name || !password) return NextResponse.json({ error: 'Vyplňte všetky polia' }, { status: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'Email už existuje' }, { status: 400 })
    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, name, passwordHash, role: 'ADMIN', approved: true },
      select: { id: true, email: true, name: true, createdAt: true },
    })
    return NextResponse.json(user)
  }

  if (action === 'delete_admin') {
    const { userId } = body
    if (userId === session.id) return NextResponse.json({ error: 'Nemôžete zmazať seba' }, { status: 400 })
    await prisma.user.delete({ where: { id: userId } })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
