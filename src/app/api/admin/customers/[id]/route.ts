import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(body.approved !== undefined && { approved: body.approved }),
      ...(body.discount !== undefined && { discount: parseFloat(body.discount) }),
      ...(body.role && { role: body.role }),
      ...(body.name && { name: body.name }),
      ...(body.phone !== undefined && { phone: body.phone }),
      ...(body.address !== undefined && { address: body.address }),
      ...(body.city !== undefined && { city: body.city }),
      ...(body.zip !== undefined && { zip: body.zip }),
      ...(body.partnerTier && { partnerTier: body.partnerTier, tierUpdatedAt: new Date() }),
    },
    include: { orders: { select: { id: true, totalNet: true, status: true, createdAt: true }, orderBy: { createdAt: 'desc' } } },
  })
  if (body.approved === true) {
    try {
      const { sendEmail } = await import('@/lib/email')
      await sendEmail({
        to: user.email,
        subject: 'Vas B2B ucet bol schvaleny - SK Partner',
        html: `
          <h2>Vitajte v B2B portali SK Partner</h2>
          <p>Dobry den, ${user.name},</p>
          <p>vas B2B ucet bol schvaleny. Teraz mate pristup k velkoobchodnym cenam.</p>
          <p><a href="https://www.sk-partner.sk/prihlasenie" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block;margin-top:12px">Prihlasit sa do portalu</a></p>
          <p style="margin-top:20px;color:#666;font-size:13px">SK Partner s.r.o. | sales@sk-partner.sk | +421 948 450 458</p>
        `
      })
    } catch (e) { console.error('Approval email error:', e) }
  }
  return NextResponse.json(user)
}
