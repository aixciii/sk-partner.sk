import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <div style={{
        background: '#111', padding: '48px 32px 32px',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr', gap: 40,
        maxWidth: 1280, margin: '0 auto'
      }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1D9E75', letterSpacing: -1, marginBottom: 20 }}>
            SK PARTNER
          </div>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#1D9E75' }}>✆</span>
            <strong style={{ color: '#fff' }}>+421 948 450 458</strong>
          </div>
          <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
            <span style={{ color: '#1D9E75' }}>✉</span> sales@sk-partner.sk
          </div>
          <div style={{ fontSize: 13, color: '#aaa' }}>
            <span style={{ color: '#1D9E75' }}>⌂</span> Staviteľská 3, Bratislava
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Informácie
          </h4>
          {['Dilerom', 'O spoločnosti', 'Blog', 'Dodanie', 'VOP', 'GDPR', 'Kontakt'].map(item => (
            <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} style={{
              display: 'block', fontSize: 13, color: '#aaa',
              marginBottom: 8, textDecoration: 'none'
            }}>{item}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Značky
          </h4>
          {['Deye', 'FoxESS', 'Solis'].map(b => (
            <Link key={b} href={`/katalog/${b.toLowerCase()}`} style={{
              display: 'block', fontSize: 13, color: '#aaa',
              marginBottom: 8, textDecoration: 'none'
            }}>{b}</Link>
          ))}
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1, margin: '20px 0 16px' }}>
            Kategórie
          </h4>
          {['Hybridné invertory', 'Sieťové invertory', 'Batériové úložiská'].map(k => (
            <Link key={k} href="/katalog" style={{
              display: 'block', fontSize: 13, color: '#aaa',
              marginBottom: 8, textDecoration: 'none'
            }}>{k}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
            Potrebujete konzultáciu?
          </h4>
          <input type="text" placeholder="Vaše meno" style={{
            width: '100%', background: '#222', border: '1px solid #333',
            borderRadius: 8, padding: '10px 14px', color: '#fff',
            fontSize: 13, marginBottom: 8, outline: 'none'
          }} />
          <input type="text" placeholder="Telefónne číslo" style={{
            width: '100%', background: '#222', border: '1px solid #333',
            borderRadius: 8, padding: '10px 14px', color: '#fff',
            fontSize: 13, marginBottom: 12, outline: 'none'
          }} />
          <button style={{
            width: '100%', background: '#1D9E75', color: '#fff',
            border: 'none', borderRadius: 8, padding: '10px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer'
          }}>Odoslať</button>
        </div>
      </div>

      <div style={{
        background: '#0a0a0a', padding: '14px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontSize: 12, color: '#555' }}>© 2026 SK Partner s.r.o. · IČO: 56 032 340 · IČ DPH: SK2122176936</span>
        <span style={{ fontSize: 12, color: '#555' }}>VOP · GDPR</span>
      </div>
    </footer>
  )
}
export default Footer
