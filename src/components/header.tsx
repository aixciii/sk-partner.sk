'use client'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [katalogOpen, setKatalogOpen] = useState(false)
  const [znackyOpen, setZnackyOpen] = useState(false)
  const [spolocnostOpen, setSpolocnostOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#fff', borderBottom: '1px solid #e8e8e8',
      fontFamily: 'var(--font-inter, sans-serif)'
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 56
      }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: '#1D9E75', letterSpacing: -1, textDecoration: 'none' }}>
          SK PARTNER
        </Link>

        <nav style={{ display: 'flex', gap: 24, fontSize: 14, color: '#444' }}>
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setKatalogOpen(true)}
            onMouseLeave={() => setKatalogOpen(false)}>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Katalóg ▾
            </span>
            {katalogOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: '#fff', border: '1px solid #e8e8e8',
                borderRadius: 8, padding: '8px 0', minWidth: 200,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 100
              }}>
                <Link href="/katalog/hybridne" style={dropStyle}>Hybridné invertory</Link>
                <Link href="/katalog/sietove" style={dropStyle}>Sieťové invertory</Link>
                <Link href="/katalog/baterie" style={dropStyle}>Batériové úložiská</Link>
              </div>
            )}
          </div>

          <Link href="/dilerom" style={{ color: '#444', textDecoration: 'none' }}>Dilerom</Link>

          <div style={{ position: 'relative' }}
            onMouseEnter={() => setZnackyOpen(true)}
            onMouseLeave={() => setZnackyOpen(false)}>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Značky ▾
            </span>
            {znackyOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: '#fff', border: '1px solid #e8e8e8',
                borderRadius: 8, padding: '8px 0', minWidth: 160,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 100
              }}>
                <Link href="/katalog/deye" style={dropStyle}>Deye</Link>
                <Link href="/katalog/fox-ess" style={dropStyle}>FoxESS</Link>
                <Link href="/katalog/solis" style={dropStyle}>Solis</Link>
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}
            onMouseEnter={() => setSpolocnostOpen(true)}
            onMouseLeave={() => setSpolocnostOpen(false)}>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Spoločnosť ▾
            </span>
            {spolocnostOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: '#fff', border: '1px solid #e8e8e8',
                borderRadius: 8, padding: '8px 0', minWidth: 160,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 100
              }}>
                <Link href="/o-nas" style={dropStyle}>O nás</Link>
                <Link href="/blog" style={dropStyle}>Blog</Link>
                <Link href="/dodanie" style={dropStyle}>Dodanie</Link>
                <Link href="/vop" style={dropStyle}>VOP</Link>
                <Link href="/gdpr" style={dropStyle}>GDPR</Link>
              </div>
            )}
          </div>

          <Link href="/kontakt" style={{ color: '#444', textDecoration: 'none' }}>Kontakt</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>+421 948 450 458</span>
          <Link href="/prihlasenie" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>Prihlásiť</Link>
          <Link href="/registracia" style={{
            background: '#1D9E75', color: '#fff', borderRadius: 20,
            padding: '7px 16px', fontSize: 13, fontWeight: 500, textDecoration: 'none'
          }}>Registrácia partnera</Link>
        </div>
      </div>
    </header>
  )
}

const dropStyle: React.CSSProperties = {
  display: 'block', padding: '8px 16px',
  fontSize: 14, color: '#333', textDecoration: 'none',
}
export default Header
