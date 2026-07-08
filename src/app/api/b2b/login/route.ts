import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Vyplňte email a heslo' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Nesprávny email alebo heslo' }, { status: 401 })
    }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Nesprávny email alebo heslo' }, { status: 401 })
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company ?? undefined,
      discount: user.discount,
      approved: user.approved,
    })

    const res = NextResponse.json({ 
      success: true,
      approved: user.approved,
      name: user.name,
    })

    res.cookies.set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    return res
  } catch (e: any) {
    console.error('Login error:', e)
    return NextResponse.json({ error: 'Nastala chyba servera' }, { status: 500 })
  }
}
