import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const SECRET = process.env.JWT_SECRET!

export interface SessionUser { id: string; email: string; name: string; role: string; company?: string; discount: number; approved: boolean }

export function signToken(user: SessionUser) { return jwt.sign(user, SECRET, { expiresIn: '30d' }) }

export function verifyToken(token: string): SessionUser | null {
  try { return jwt.verify(token, SECRET) as SessionUser } catch { return null }
}

export function getSession(): SessionUser | null {
  try {
    const { cookies: getCookies } = require('next/headers')
    const cookieStore = getCookies()
    const token = cookieStore.get('auth')?.value
    if (!token) return null
    return verifyToken(token)
  } catch { return null }
}

export function getSessionFromRequest(req: NextRequest): SessionUser | null {
  const token = req.cookies.get('auth')?.value
  if (!token) return null
  return verifyToken(token)
}

export function hashPassword(p: string) { return bcrypt.hash(p, 10) }
export function comparePassword(p: string, h: string) { return bcrypt.compare(p, h) }
