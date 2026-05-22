'use client'

/**
 * FireEscapeDetail — photography archive page
 *
 * Layout:
 *   1. Minimal sticky intro   (normal vertical scroll)
 *   2. Gallery section        (three-row horizontal scroll pinned to vertical)
 *   3. Closing statement      (normal vertical scroll)
 *
 * Horizontal scroll interaction:
 *   The outer `.hz-outer` div is tall enough to scroll through the full track.
 *   A sticky 100vh container holds the three-row photo grid.
 *   useHorizontalGallery maps vertical scroll progress → translateX.
 *   Images distribute column-first across three rows (img[0]→r1, img[1]→r2,
 *   img[2]→r3, img[3]→r1 …) and keep their natural aspect ratios.
 *   Reduced side padding lets photos reach close to viewport edges.
 *   On mobile (< 768px) falls back to a vertical single-column stack.
 *
 * Images:
 *   Drop photos at /public/fire-escape/01.jpg … 54.jpg (or update PHOTOS).
 */

import { useRef } from 'react'
import Link from 'next/link'
import { Project } from '@/data/projects'
import BackToTop from '@/components/BackToTop'
import { useHorizontalGallery } from '@/hooks/useHorizontalGallery'

// ── Font constants ─────────────────────────────────────────────────
const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

// ── Photo manifest ─────────────────────────────────────────────────
const PHOTOS = Array.from({ length: 54 }, (_, i) =>
  `/fire-escape/${String(i + 1).padStart(2, '0')}.jpg`
)

interface Props {
  project: Project
  prev: Project | null
  next: Project | null
}

export default function FireEscapeDetail({ prev, next }: Props) {
  const outerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cueRef      = useRef<HTMLElement>(null)
  const counterRef  = useRef<HTMLElement>(null)

  useHorizontalGallery(outerRef, trackRef, {
    progressRef,
    cueRef,
    counterRef,
    imageCount: PHOTOS.length,
  })

  return (
    <div style={{ background: '#f7f7f5', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════
          NAV — sticky, off-white
         ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky', top: 0, background: '#f7f7f5',
        borderBottom: '1px solid #e8e8e4', zIndex: 1000,
      }}>
        <div style={{
          maxWidth: 940, margin: '0 auto', padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ ...B600, fontSize: 18, color: '#141414', textDecoration: 'none' }}
            className="hover:opacity-60 transition-opacity">
            Yeonjae Kim
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {[
              { href: '/work',   label: 'Work'   },
              { href: '/resume', label: 'Résumé' },
              { href: '/about',  label: 'About'  },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                style={{ ...B400, fontSize: 14, color: '#333', textDecoration: 'none' }}
                className="hover:opacity-60 transition-opacity">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          INTRO — minimal typographic header
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '80px 24px 56px' }}>

        <p style={{ ...B400, fontSize: 10, letterSpacing: '3px', color: '#767676', textTransform: 'uppercase', margin: '0 0 32px' }}>
          Photography
        </p>

        <h1 style={{ ...B300, fontSize: 56, lineHeight: '60px', color: '#141414', margin: '0 0 32px', letterSpacing: '-1.5px' }}>
          Fire Escapes
        </h1>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 80, flexWrap: 'wrap' }}>
          <p style={{ ...B300, fontSize: 17, lineHeight: '30px', color: '#555', margin: 0, maxWidth: 420, flex: '1 1 280px' }}>
            A photographic study of repetition, color, and geometry across New York City.
          </p>
          <div style={{ display: 'flex', gap: 56, flex: '0 0 auto' }}>
            {[
              { label: 'Medium',   value: 'Photography'   },
              { label: 'Location', value: 'New York City' },
              { label: 'Years',    value: '2018 — 2022'   },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ ...B500, fontSize: 9, letterSpacing: '2.5px', color: '#767676', textTransform: 'uppercase', marginBottom: 8 }}>
                  {label}
                </div>
                <div style={{ ...B300, fontSize: 14, color: '#333' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin rule + scroll cue */}
      <div style={{ borderTop: '1px solid #e0e0db', margin: '0 24px' }} />
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '20px 24px' }}>
        {/* Scroll cue — fades out on first gallery interaction */}
        <p
          ref={cueRef as React.RefObject<HTMLParagraphElement>}
          style={{ ...B300, fontSize: 11, letterSpacing: '2px', color: '#6a6a6a', textTransform: 'uppercase', margin: 0, transition: 'opacity 0.8s ease' }}>
          Scroll to move through the archive →
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          GALLERY — three-row horizontal scroll
          Images distribute column-first across three rows.
          Reduced side padding lets images reach closer to the
          viewport edge for a gallery-wall feel.
         ══════════════════════════════════════════════════════════ */}
      <div ref={outerRef} className="hz-outer">
        <div className="hz-sticky" style={{ background: '#f7f7f5' }}>
          <div ref={trackRef} className="hz-track hz-track--3r" style={{ padding: '0 40px' }}>
            {PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Fire escape ${i + 1}`}
                className="hz-img"
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>

          {/* Progress indicator: photo counter above fill line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 40px 10px' }}>
              <span
                ref={counterRef as React.RefObject<HTMLSpanElement>}
                style={{ ...B300, fontSize: 10, color: '#888', letterSpacing: '1px', fontVariantNumeric: 'tabular-nums' }}>
                1 / {PHOTOS.length}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.06)' }}>
              <div
                ref={progressRef}
                style={{ height: '100%', background: 'rgba(0,0,0,0.22)', width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CLOSING — artist statement
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 640, margin: '120px auto', padding: '0 24px' }}>
        <div style={{ borderTop: '1px solid #e0e0db', paddingTop: 48 }}>
          <p style={{ ...B300, fontSize: 15, lineHeight: '28px', color: '#6a6a6a', margin: 0 }}>
            Photographed throughout SoHo, Manhattan between 2018 and 2022. The series explores
            the repetitive geometry of fire escapes and the subtle ways they shift across surrounding
            facades, textures, and architectural surfaces.
          </p>
          <p style={{ ...B300, fontSize: 15, lineHeight: '28px', color: '#6a6a6a', margin: '20px 0 0' }}>
            The framing remains deliberately consistent, allowing variation to emerge through
            the structures themselves.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PREV / NEXT
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {prev ? (
            <Link href={`/work/${prev.slug}`} style={{ textDecoration: 'none', textAlign: 'left' }}
              className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 9, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 8 }}>
                Previous
              </div>
              <div style={{ ...B400, fontSize: 14, color: '#333' }}>← {prev.name}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/work/${next.slug}`} style={{ textDecoration: 'none', textAlign: 'right' }}
              className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 9, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 8 }}>
                Next
              </div>
              <div style={{ ...B400, fontSize: 14, color: '#333' }}>{next.name} →</div>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
         ══════════════════════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid #e8e8e4' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...B600, fontSize: 16, color: '#333' }}>Yeonjae Kim</span>
            <a href="mailto:yeonjae.design@gmail.com" target="_blank" rel="noopener noreferrer"
              style={{ ...B300, fontSize: 16, color: '#333', textDecoration: 'none' }}
              className="hover:opacity-60 transition-opacity">
              yeonjae.design@gmail.com
            </a>
            <span style={{ ...B400, fontSize: 16, color: '#333' }}>2026</span>
          </div>
        </div>
      </div>

      <BackToTop />

    </div>
  )
}
