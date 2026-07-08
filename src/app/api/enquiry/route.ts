import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const t = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: { user: process.env.BREVO_SMTP_USER, pass: process.env.BREVO_SMTP_PASS }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, message, productModel, type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Meno a email sú povinné' }, { status: 400 });
    }

    const subject = type === 'b2b'
      ? `B2B dopyt: ${productModel}`
      : `Cenová ponuka: ${productModel}`;

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1e40af;padding:16px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0">🔔 ${subject}</h2>
      </div>
      <div style="background:#f8fafc;padding:20px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px">Typ dopytu</td><td style="padding:8px;border-bottom:1px solid #eee">${type === 'b2b' ? 'Veľkoobchodný odber' : 'Cenová ponuka'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Produkt</td><td style="padding:8px;border-bottom:1px solid #eee">${productModel}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Meno</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Firma</td><td style="padding:8px;border-bottom:1px solid #eee">${company || '—'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Telefón</td><td style="padding:8px;border-bottom:1px solid #eee">${phone || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Správa</td><td style="padding:8px">${message || '—'}</td></tr>
        </table>
      </div>
    </div>`;

    await t.sendMail({
      from: `"Deye Solar SK" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `🔔 ${subject} — ${name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Enquiry error:', err);
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 });
  }
}
