import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, company, ico, phone } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Vyplňte všetky povinné polia' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Heslo musí mať aspoň 8 znakov' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Tento email je už zaregistrovaný' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        company: company || null,
        ico: ico || null,
        phone: phone || null,
        role: 'B2B',
        approved: false,
      }
    })

    // Notifikácia na sales email
    try {
      const { sendEmail } = await import('@/lib/email')
      await sendEmail({
        to: 'sales@sk-partner.sk',
        subject: `Nová B2B registrácia: ${name} – ${company || email}`,
        html: `
          <h2>Nová B2B registrácia na SK Partner</h2>
          <p><strong>Meno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Firma:</strong> ${company || '–'}</p>
          <p><strong>IČO:</strong> ${ico || '–'}</p>
          <p><strong>Telefón:</strong> ${phone || '–'}</p>
          <p>Pre schválenie prístupu choďte do <a href="https://www.sk-partner.sk/admin">admin panela</a>.</p>
        `
      })
    } catch (e) { console.error('Email error:', e) }

    return NextResponse.json({ 
      success: true, 
      message: 'Registrácia úspešná. Po overení vášho účtu získate prístup k B2B cenám.' 
    })
  } catch (e: any) {
    console.error('Register error:', e)
    return NextResponse.json({ error: 'Nastala chyba servera' }, { status: 500 })
  }
}
