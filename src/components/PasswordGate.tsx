'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

const CORRECT_PASSWORD = 'ask4yeonjae'

interface Props {
  slug: string
  children: React.ReactNode
}

export default function PasswordGate({ slug, children }: Props) {
  const storageKey = `pw-unlocked-${slug}`
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput]       = useState('')
  const [error, setError]       = useState(false)
  const [shake, setShake]       = useState(false)

  // Check sessionStorage on mount so refresh doesn't re-lock
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(storageKey) === '1') {
      setUnlocked(true)
    }
  }, [storageKey])

  if (unlocked) return <>{children}</>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(storageKey, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#101314' }}>

      {/* Nav */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}>
          <Link href="/" style={{ ...B600, fontSize: 14, color: '#fff', textDecoration: 'none', opacity: 0.9 }} className="hover:opacity-60 transition-opacity">
            Yeonjae Kim
          </Link>
          <nav style={{ display: 'flex', gap: 32 }}>
            {[{ href: '/work', label: 'Work' }, { href: '/resume', label: 'Résumé' }, { href: '/about', label: 'About' }].map((l) => (
              <Link key={l.href} href={l.href} style={{ ...B400, fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }} className="hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        minHeight: 'calc(100vh - 57px)',
      }}>

      {/* Lock icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="white"
        style={{ marginBottom: 24, opacity: 0.9 }}
      >
        <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z" />
      </svg>

      {/* Heading */}
      <p style={{
        ...B600, fontSize: 13, lineHeight: '20px',
        color: '#fff', letterSpacing: '2px',
        textTransform: 'uppercase' as const,
        marginBottom: 20,
      }}>
        Password Required
      </p>

      {/* Subtext */}
      <p style={{
        ...B300, fontSize: 14, lineHeight: '24px',
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        marginBottom: 32,
        maxWidth: 320,
      }}>
        Password is on my provided resume.{' '}
        <br />
        Contact me at{' '}
        <a
          href="mailto:yeonjae.design@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...B500, color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
          className="hover:opacity-60 transition-opacity"
        >
          yeonjae.design@gmail.com
        </a>
        {' '}for access!
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: 280 }}
        className={shake ? 'animate-shake' : ''}
      >
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            ...B300, fontSize: 14, lineHeight: '20px',
            color: '#fff',
            background: 'rgba(255,255,255,0.07)',
            border: error ? '1px solid rgba(220,80,80,0.8)' : '1px solid rgba(255,255,255,0.15)',
            outline: 'none',
            marginBottom: 8,
            transition: 'border-color 0.2s',
          }}
        />

        {error && (
          <p style={{
            ...B300, fontSize: 12, color: 'rgba(220,80,80,0.9)',
            marginBottom: 8, textAlign: 'center',
          }}>
            Incorrect password. Try again.
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 16px',
            ...B500, fontSize: 13, letterSpacing: '2px',
            color: '#1a1a1a',
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase' as const,
            transition: 'background 0.2s',
          }}
          className="hover:bg-white transition-colors"
        >
          Submit
        </button>
      </form>

      </div>
    </div>
  )
}
