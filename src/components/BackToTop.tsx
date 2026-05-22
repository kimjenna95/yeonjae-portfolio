'use client'

import { useEffect, useState } from 'react'

const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 40,
        right: 40,
        zIndex: 9000,
        background: '#fff',
        border: '1px solid #e0e0e0',
        padding: '10px 18px',
        cursor: 'pointer',
        ...B400,
        fontSize: 13,
        lineHeight: '20px',
        color: '#333',
        letterSpacing: '0.02em',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'opacity 0.2s, box-shadow 0.2s',
      }}
      className="hover:shadow-md hover:opacity-80 transition-all"
      aria-label="Back to top"
    >
      ↑ Back to Top
    </button>
  )
}
