'use client'

/**
 * SilentEchoDetail — white editorial fashion page
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Project } from '@/data/projects'
import BackToTop from '@/components/BackToTop'
import { useHorizontalGallery } from '@/hooks/useHorizontalGallery'
import FadeUp from '@/components/FadeUp'

// ── Font constants ─────────────────────────────────────────────────
const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }

// ── Local image paths ──────────────────────────────────────────────
// Sketchbook: SE-01.png … SE-34.png  →  public/silent-echo/sketchbook/
const SKETCHBOOK: string[] = Array.from({ length: 34 }, (_, i) =>
  `/silent-echo/sketchbook/SE-${String(i + 1).padStart(2, '0')}.png`
)

// Photoshoot: 1.png … 12.png  →  public/silent-echo/photoshoot/
const PHOTOS: string[] = Array.from({ length: 12 }, (_, i) =>
  `/silent-echo/photoshoot/${i + 1}.png`
)

// Tall images (span 2 rows) — indices 2, 5, 9  →  S S T  S S T  S S S T  S S
const PHOTO_TALL = new Set([2, 5, 9])

const LINEUP = '/silent-echo/lineup.jpg'
const ECHO   = '/silent-echo/letter.png'

// ── Helpers ────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ ...B500, fontSize: 10, letterSpacing: '3px', color: '#767676', textTransform: 'uppercase', margin: '0 0 20px' }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ width: 40, height: 1, background: '#d8d8d8', margin: '0 auto' }} />
}


interface Props {
  project: Project
  prev: Project | null
  next: Project | null
}

export default function SilentEchoDetail({ prev, next }: Props) {
  const [scrolled, setScrolled] = useState(false)

  // Sketchbook gallery refs
  const outerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cueRef      = useRef<HTMLElement>(null)
  const counterRef  = useRef<HTMLElement>(null)

  // Photo carousel refs
  const photoOuterRef    = useRef<HTMLDivElement>(null)
  const photoTrackRef    = useRef<HTMLDivElement>(null)
  const photoProgressRef = useRef<HTMLDivElement>(null)
  const photoCounterRef  = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useHorizontalGallery(outerRef, trackRef, {
    progressRef,
    cueRef,
    counterRef,
    imageCount: SKETCHBOOK.length, // 34
  })

  useHorizontalGallery(photoOuterRef, photoTrackRef, {
    progressRef: photoProgressRef,
    counterRef: photoCounterRef,
    imageCount: PHOTOS.length, // 12
  })

  const navColor = scrolled ? '#141414' : '#ffffff'

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── Fixed transparent → white nav ─────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid #eee' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ ...B600, fontSize: 18, color: navColor, textDecoration: 'none', transition: 'color 0.5s ease' }}
            className="hover:opacity-60 transition-opacity">
            Yeonjae Kim
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {[{ href: '/work', label: 'Work' }, { href: '/resume', label: 'Résumé' }, { href: '/about', label: 'About' }].map(({ href, label }) => (
              <Link key={href} href={href}
                style={{ ...B400, fontSize: 14, color: navColor, textDecoration: 'none', transition: 'color 0.5s ease' }}
                className="hover:opacity-60 transition-opacity">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          1. VIDEO HERO — centered, matching Life is Sweet format
         ══════════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>
        <video autoPlay muted loop playsInline
          poster="/silent-echo/hero-poster.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}>
          <source src="/silent-echo/video.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <p style={{ ...B400, fontSize: 11, letterSpacing: '4px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', margin: '0 0 18px' }}>
            Parsons School of Design &nbsp;·&nbsp; Junior Year &nbsp;·&nbsp; Spring 2017
          </p>
          <h1 style={{ ...B300, fontSize: 80, lineHeight: 1, color: '#ffffff', margin: 0, letterSpacing: '-2px' }}>
            Silent Echo
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="animate-pulse" style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.35)' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. OPENING STATEMENT
         ══════════════════════════════════════════════════════════ */}
      <FadeUp style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px 100px', textAlign: 'center' }}>
        <p style={{ ...B300, fontSize: 21, lineHeight: '38px', color: '#141414', fontStyle: 'italic', margin: '0 0 48px' }}>
          &ldquo;There are things we carry without knowing — the warmth of a presence that has left the room, the imprint of a hand, the breath of a name never spoken aloud.&rdquo;
        </p>
        <Divider />
      </FadeUp>

      {/* ══════════════════════════════════════════════════════════
          3. METADATA STRIP
         ══════════════════════════════════════════════════════════ */}
      <FadeUp style={{ maxWidth: 720, margin: '0 auto 120px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: '1px solid #ececec', paddingTop: 40 }}>
          {[
            { label: 'Role',   value: 'Fashion Designer' },
            { label: 'Year',   value: 'Spring 2017' },
            { label: 'Medium', value: 'Womenswear' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ ...B500, fontSize: 10, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
              <div style={{ ...B300, fontSize: 15, lineHeight: '22px', color: '#141414' }}>{value}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ══════════════════════════════════════════════════════════
          4. CONCEPT — text left, echo.png right
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 880, margin: '0 auto 120px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px 72px', alignItems: 'center' }}>
          <FadeUp>
            <Label>The Concept</Label>
            <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#141414', margin: '0 0 28px' }}>
              <em>Silent Echo</em> explores the emotional residue left behind by absence — the invisible weight of memory, silence, and unresolved presence. Garments become surfaces where traces linger: memories compressed into texture, loneliness worn like a second skin.
            </p>
            <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#141414', margin: 0 }}>
              Inspired by Han Yong-un&rsquo;s poem &ldquo;비밀&rdquo; (Secret), the collection reflects the belief that the most profound emotions are often the ones withheld. That silence carries its own gravity. That what remains unspoken echoes the longest.
            </p>
          </FadeUp>
          <FadeUp>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ECHO} alt="Silent Echo"
              style={{ display: 'block', width: '100%', height: 'auto', opacity: 0.9 }}
              loading="lazy" decoding="async" />
          </FadeUp>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          5. SKETCHBOOK SECTION HEADER
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 940, margin: '0 auto 24px', padding: '0 24px' }}>
        <div style={{ borderTop: '1px solid #ececec', paddingTop: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <Label>Process &nbsp;/&nbsp; Sketchbook</Label>
          <p
            ref={cueRef as React.RefObject<HTMLParagraphElement>}
            style={{ ...B300, fontSize: 11, letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: '0 0 20px', transition: 'opacity 0.8s ease' }}>
            Scroll to turn through the pages →
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          6. SKETCHBOOK — two-row horizontal gallery
             Images: row 1 = odd pages, row 2 = even pages.
             Progress bar + page counter anchored to bottom of sticky.
         ══════════════════════════════════════════════════════════ */}
      <div ref={outerRef} className="hz-outer">
        <div className="hz-sticky" style={{ background: '#fff' }}>
          <div ref={trackRef} className="hz-track hz-track--sm">
            {SKETCHBOOK.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Sketchbook page ${i + 1}`}
                className="hz-img"
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>

          {/* Progress indicator: page counter above the fill line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 80px 10px' }}>
              <span
                ref={counterRef as React.RefObject<HTMLSpanElement>}
                style={{ ...B300, fontSize: 10, color: '#888', letterSpacing: '1px', fontVariantNumeric: 'tabular-nums' }}>
                1 / {SKETCHBOOK.length}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }}>
              <div ref={progressRef} style={{ height: '100%', background: 'rgba(0,0,0,0.28)', width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          7. LINE-UP
         ══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#f8f8f6', padding: '120px 0' }}>
        <div style={{ maxWidth: 940, margin: '0 auto 32px', padding: '0 24px' }}>
          <Label>The Collection</Label>
        </div>
        <FadeUp>
          <div style={{ position: 'relative', width: '100%', paddingTop: '42%', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LINEUP} alt="Silent Echo — Full Line-up"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '0 40px' }}
              loading="lazy" decoding="async" />
          </div>
        </FadeUp>
      </div>

      {/* ══════════════════════════════════════════════════════════
          8. GARMENT LANGUAGE — text + 2 stacked sketches
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 880, margin: '140px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px 64px', alignItems: 'start' }}>
          <FadeUp>
            <Label>Garment Language</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                {
                  name: 'Silhouette',
                  desc: 'Silhouettes drift gently around the body rather than sharply defining it. Elongated sleeves, suspended layers, and softened structure create forms that feel protective, fragile, and slightly unresolved.',
                },
                {
                  name: 'Construction',
                  desc: 'The collection balances delicacy with control. Beneath sheer drape and softened surfaces are pleats, knit studies, and quiet internal structures that hold each form together without disrupting its softness.',
                },
                {
                  name: 'Surface',
                  desc: 'Muted neutrals, layered translucency, unraveling knits, and washed textures create surfaces that feel worn, intimate, and quietly vulnerable. Materials absorb light softly, revealing depth over time.',
                },
                {
                  name: 'Detail',
                  desc: 'Exposed seams, loose threads, handwritten notes, unfinished edges, and hidden text fragments remain intentionally visible throughout the collection — traces of process, attachment, and things left unsaid.',
                },
              ].map(({ name, desc }) => (
                <div key={name} style={{ borderTop: '1px solid #ececec', paddingTop: 24 }}>
                  <p style={{ ...B500, fontSize: 14, color: '#141414', margin: '0 0 10px', letterSpacing: '0.5px' }}>{name}</p>
                  <p style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#6a6a6a', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Knit swatch — natural ratio, no crop */}
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/silent-echo/knitswatch.jpg" alt="" loading="lazy" decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto', transition: 'opacity 0.5s ease' }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
              />
            </FadeUp>
            {/* Fabric swatches — cover fills the frame */}
            <FadeUp>
              <div style={{ position: 'relative', width: '100%', paddingTop: '120%', overflow: 'hidden', background: '#ececec' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/silent-echo/fabricswatches.jpg" alt="" loading="lazy" decoding="async"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          9. FILM — 62vw video placeholder
         ══════════════════════════════════════════════════════════ */}
      <div style={{ padding: '120px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 940, margin: '0 auto 32px', padding: '0 24px', textAlign: 'left' }}>
          <Label>The Collection in Motion</Label>
        </div>
        <div style={{ width: '62vw', margin: '0 auto', aspectRatio: '16/9', background: '#f0f0ec', overflow: 'hidden' }}>
          <video
            controls
            playsInline
            poster="/silent-echo/film-poster.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/silent-echo/film.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          10. EDITORIAL — mixed-size horizontal carousel
              Rhythm: S S T  S S T  S S S T  S S
              Tall images (span 2 rows) at indices 2, 5, 9
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 940, margin: '80px auto 24px', padding: '0 24px' }}>
        <Label>Editorial</Label>
      </div>

      <div ref={photoOuterRef} className="hz-outer">
        <div className="hz-sticky" style={{ background: '#fff' }}>
          <div ref={photoTrackRef} className="hz-track--mixed" style={{ padding: '0 40px' }}>
            {PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Editorial photo ${i + 1}`}
                className={PHOTO_TALL.has(i) ? 'hz-img hz-img--tall' : 'hz-img'}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>

          {/* Progress indicator */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 40px 10px' }}>
              <span
                ref={photoCounterRef as React.RefObject<HTMLSpanElement>}
                style={{ ...B300, fontSize: 10, color: '#888', letterSpacing: '1px', fontVariantNumeric: 'tabular-nums' }}>
                1 / {PHOTOS.length}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }}>
              <div ref={photoProgressRef} style={{ height: '100%', background: 'rgba(0,0,0,0.28)', width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          11. CLOSING REFLECTION
         ══════════════════════════════════════════════════════════ */}
      <FadeUp style={{ maxWidth: 560, margin: '140px auto', padding: '0 24px', textAlign: 'center' }}>
        <Divider />
        <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#6a6a6a', margin: '48px 0 0', fontStyle: 'italic' }}>
          The garments do not speak. They hold. Silence is its own language — weighted, patient, precise.
        </p>
      </FadeUp>

      {/* ══════════════════════════════════════════════════════════
          11. PREV / NEXT
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 640, margin: '80px auto 0', padding: '56px 24px 80px', borderTop: '1px solid #ececec' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {prev ? (
            <Link href={`/work/${prev.slug}`} style={{ textDecoration: 'none', textAlign: 'left' }}
              className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 10, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 8 }}>Previous</div>
              <div style={{ ...B400, fontSize: 14, lineHeight: '20px', color: '#333' }}>← {prev.name}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/work/${next.slug}`} style={{ textDecoration: 'none', textAlign: 'right' }}
              className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 10, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 8 }}>Next</div>
              <div style={{ ...B400, fontSize: 14, lineHeight: '20px', color: '#333' }}>{next.name} →</div>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '64px 24px' }}>
          <div className="site-footer-row">
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
