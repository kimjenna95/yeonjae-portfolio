import Link from 'next/link'

const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

export default function SiteNav({ active }: { active?: string }) {
  const links = [
    { href: '/work',   label: 'Work' },
    { href: '/resume', label: 'Résumé' },
    { href: '/about',  label: 'About' },
  ]

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #eeeeee' }}>
      <div
        style={{ maxWidth: 940, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        className="px-6 md:px-12"
      >
        <Link
          href="/"
          style={{ ...B600, fontSize: 14, lineHeight: '20px', color: '#141414', textDecoration: 'none', padding: '18px 0', display: 'block' }}
          className="hover:opacity-60 transition-opacity"
        >
          Yeonjae Kim
        </Link>
        <nav style={{ display: 'flex', gap: 32 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                ...B400, fontSize: 13, lineHeight: '20px',
                color: active === link.label ? '#111111' : '#888888',
                textDecoration: 'none',
                padding: '18px 0',
                display: 'block',
              }}
              className="hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
