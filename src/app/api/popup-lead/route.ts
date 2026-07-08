import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const t = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: { user: process.env.BREVO_SMTP_USER, pass: process.env.BREVO_SMTP_PASS }
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email) return NextResponse.json({ error: 'Chýbajú údaje' }, { status: 400 });

    await t.sendMail({
      from: `"DeyeSolar.sk" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `🔔 Nový dopyt z popupu — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px">
          <div style="background:#1e40af;padding:16px;border-radius:8px 8px 0 0">
            <h2 style="color:white;margin:0">🔔 Nový dopyt z popupu</h2>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:120px">Meno</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Telefón</td><td style="padding:8px;border-bottom:1px solid #eee">${phone || '—'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Záujem</td><td style="padding:8px">${message || '—'}</td></tr>
            </table>
          </div>
        </div>`,
    });

    if (typeof globalThis !== 'undefined' ) {
      // gtag fired client-side in popup component
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Popup lead error:', err);
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 });
  }
}
