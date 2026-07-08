export default function ComingSoon() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#f8f9fa', fontFamily: 'sans-serif'
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1D9E75', marginBottom: 8 }}>
        SK PARTNER
      </div>
      <div style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
        Distributor Deye · FoxESS · Solis
      </div>
      <div style={{
        background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12,
        padding: '24px 40px', textAlign: 'center'
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#111', marginBottom: 8 }}>
          Stránka sa pripravuje
        </div>
        <div style={{ fontSize: 14, color: '#888' }}>
          Čoskoro spustíme. Kontaktujte nás na sales@sk-partner.sk
        </div>
      </div>
    </div>
  )
}
