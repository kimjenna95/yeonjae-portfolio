import Link from 'next/link'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

export default function Hero() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#101314' }}
    >
      <div style={{ maxWidth: 560 }}>
        <h1 style={{ ...B600, fontSize: 40, lineHeight: '48px', color: '#fff', marginBottom: 20 }}>
          Yeonjae Kim
        </h1>
        <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#fff', marginBottom: 80 }}>
          Product Design at{' '}
          <span className="underline underline-offset-4 decoration-white/40">Cisco</span>
          {' '}/ Based in TX / Parsons, BFA
          <br />
          Previously at J.P. Morgan Chase / OxeFit / JCPenney / Banana Republic
        </p>
        <nav className="flex items-center justify-center gap-8">
          <Link href="/work" style={{ ...B500, fontSize: 17, color: '#fff', paddingBottom: 2 }}>Work</Link>
          <Link href="/resume" style={{ ...B400, fontSize: 17, color: '#737373', paddingBottom: 2 }} className="hover:text-white transition-colors">Résumé</Link>
          <Link href="/about" style={{ ...B400, fontSize: 17, color: '#737373', paddingBottom: 2 }} className="hover:text-white transition-colors">About</Link>
        </nav>
      </div>
    </div>
  )
}
