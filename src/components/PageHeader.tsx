import Link from 'next/link'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

type ActivePage = 'Work' | 'Résumé' | 'About'

export default function PageHeader({ active }: { active: ActivePage }) {
  const links: { href: string; label: ActivePage }[] = [
    { href: '/work',   label: 'Work' },
    { href: '/resume', label: 'Résumé' },
    { href: '/about',  label: 'About' },
  ]

  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-28"
      style={{ background: '#101314' }}
    >
      <h1 style={{ ...B600, fontSize: 32, lineHeight: '40px', color: '#fff', marginBottom: 24 }}>
        Yeonjae Kim
      </h1>
      <p style={{ ...B300, fontSize: 18, lineHeight: '32px', color: '#fff', marginBottom: 96 }}>
        Product Design at{' '}
        <a href="https://www.cisco.com/" target="_blank" rel="noopener noreferrer" className="cisco-link" style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-block' }}>Cisco</a>
        {' '}/ Based in TX / Parsons, BFA
        <br />
        Previously at J.P. Morgan Chase / OxeFit / JCPenney / Banana Republic
      </p>
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              ...(active === link.label ? B500 : B400),
              fontSize: 18,
              color: active === link.label ? '#fff' : '#737373',
              paddingBottom: 2,
              textDecoration: 'none',
            }}
            className="hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
