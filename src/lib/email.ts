import nodemailer from 'nodemailer'

const t = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: { user: process.env.BREVO_SMTP_USER, pass: process.env.BREVO_SMTP_PASS }
})

export async function sendOrderConfirmation(order: any) {
  const rows = order.items?.map((i: any) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.qty}x</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${i.priceNet?.toFixed(2)} €</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right"><b>${i.totalNet?.toFixed(2)} €</b></td>
    </tr>`).join('')

  const customerHtml = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#1e40af;padding:24px;border-radius:8px 8px 0 0">
      <h1 style="color:white;margin:0;font-size:22px">☀️ Deye Solar SK</h1>
      <p style="color:#bfdbfe;margin:4px 0 0">Potvrdenie objednávky</p>
    </div>
    <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
      <h2 style="color:#1e293b;margin:0 0 16px">Ďakujeme za objednávku!</h2>
      <p style="color:#64748b">Číslo objednávky: <b style="color:#1e293b">${order.orderNum}</b></p>

      <h3 style="color:#1e293b;margin:20px 0 8px">Objednané produkty</h3>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:6px;overflow:hidden;border:1px solid #e2e8f0">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="padding:10px 8px;text-align:left;font-size:13px;color:#64748b">Produkt</th>
            <th style="padding:10px 8px;text-align:center;font-size:13px;color:#64748b">Qty</th>
            <th style="padding:10px 8px;text-align:right;font-size:13px;color:#64748b">Cena/ks</th>
            <th style="padding:10px 8px;text-align:right;font-size:13px;color:#64748b">Spolu</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr style="background:#f8fafc">
            <td colspan="3" style="padding:10px 8px;text-align:right;font-size:13px;color:#64748b">Bez DPH:</td>
            <td style="padding:10px 8px;text-align:right;font-weight:bold">${order.totalNet?.toFixed(2)} €</td>
          </tr>
          <tr style="background:#f8fafc">
            <td colspan="3" style="padding:4px 8px;text-align:right;font-size:13px;color:#64748b">DPH (23%):</td>
            <td style="padding:4px 8px;text-align:right">${order.totalVat?.toFixed(2)} €</td>
          </tr>
          <tr style="background:#1e40af">
            <td colspan="3" style="padding:10px 8px;text-align:right;color:white;font-weight:bold">CELKOM s DPH:</td>
            <td style="padding:10px 8px;text-align:right;color:white;font-weight:bold;font-size:16px">${order.totalGross?.toFixed(2)} €</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="color:#1e293b;margin:20px 0 8px">Fakturačné údaje</h3>
      <div style="background:white;padding:16px;border-radius:6px;border:1px solid #e2e8f0;font-size:14px;color:#334155">
        <p style="margin:4px 0"><b>${order.company}</b></p>
        ${order.ico ? `<p style="margin:4px 0;color:#64748b">IČO: ${order.ico}</p>` : ''}
        <p style="margin:4px 0;color:#64748b">${order.address}</p>
        <p style="margin:4px 0;color:#64748b">📧 ${order.guestEmail}</p>
        <p style="margin:4px 0;color:#64748b">📞 ${order.phone}</p>
        ${order.note ? `<p style="margin:8px 0 0;padding-top:8px;border-top:1px solid #e2e8f0;color:#64748b">Poznámka: ${order.note}</p>` : ''}
      </div>

      <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;text-align:center">
        Náš obchodný tím vás bude kontaktovať do 24 hodín.<br>
        <a href="mailto:sales@sk-partner.sk" style="color:#1e40af">sales@sk-partner.sk</a> | +421 948 450 458
      </p>
    </div>
  </div>`

  const adminHtml = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#dc2626;padding:16px;border-radius:8px 8px 0 0">
      <h2 style="color:white;margin:0">🔔 Nová objednávka: ${order.orderNum}</h2>
    </div>
    <div style="background:#fef2f2;padding:20px;border-radius:0 0 8px 8px;border:1px solid #fecaca">
      <h3 style="margin:0 0 12px;color:#991b1b">Zákazník</h3>
      <p style="margin:4px 0"><b>${order.company}</b></p>
      ${order.ico ? `<p style="margin:4px 0">IČO: ${order.ico}</p>` : ''}
      <p style="margin:4px 0">📧 ${order.guestEmail}</p>
      <p style="margin:4px 0">📞 ${order.phone}</p>
      <p style="margin:4px 0">📍 ${order.address}</p>
      ${order.note ? `<p style="margin:8px 0 0"><b>Poznámka:</b> ${order.note}</p>` : ''}

      <h3 style="margin:16px 0 12px;color:#991b1b">Produkty</h3>
      <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #fecaca">
        <thead><tr style="background:#fee2e2">
          <th style="padding:8px;text-align:left">Produkt</th>
          <th style="padding:8px;text-align:center">Qty</th>
          <th style="padding:8px;text-align:right">Spolu</th>
        </tr></thead>
        <tbody>${order.items?.map((i: any) => `<tr><td style="padding:8px;border-top:1px solid #fee2e2">${i.name}<br><small style="color:#6b7280">${i.model}</small></td><td style="padding:8px;text-align:center;border-top:1px solid #fee2e2">${i.qty}x</td><td style="padding:8px;text-align:right;border-top:1px solid #fee2e2"><b>${i.totalNet?.toFixed(2)} €</b></td></tr>`).join('')}</tbody>
      </table>
      <p style="text-align:right;font-size:18px;font-weight:bold;color:#991b1b;margin:12px 0 0">
        CELKOM: ${order.totalGross?.toFixed(2)} € s DPH
      </p>
    </div>
  </div>`

  await t.sendMail({
    from: `"Deye Solar SK" <${process.env.MAIL_FROM}>`,
    to: order.guestEmail,
    subject: `✅ Objednávka ${order.orderNum} - Deye Solar SK`,
    html: customerHtml
  })

  await t.sendMail({
    from: `"Deye Solar SK" <${process.env.MAIL_FROM}>`,
    to: process.env.MAIL_TO,
    subject: `🔔 Nová objednávka ${order.orderNum} - ${order.company}`,
    html: adminHtml
  })
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  await t.sendMail({
    from: `"Deye Solar SK" <${process.env.MAIL_FROM}>`,
    to,
    subject,
    html,
  })
}
