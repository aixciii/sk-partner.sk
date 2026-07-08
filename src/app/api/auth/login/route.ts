import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Nesprávne prihlasovacie údaje' }, { status: 401 })
  }
  const ok = await comparePassword(password, user.passwordHash)
  if (!ok) {
    return NextResponse.json({ error: 'Nesprávne prihlasovacie údaje' }, { status: 401 })
  }
  const token = signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company ?? undefined,
    discount: user.discount,
  })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
