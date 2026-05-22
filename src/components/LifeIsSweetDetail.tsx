'use client'

/**
 * LifeIsSweetDetail — white editorial fashion page
 */

import { useCallback, useEffect, useRef, useState } from 'react'
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

// ── Local image helpers ────────────────────────────────────────────
// Photoshoot: 1.jpg … 21.jpg  →  public/life-is-sweet/photoshoot/
const shoot  = (n: number) => `/life-is-sweet/photoshoot/${n}.jpg`
// Sketchbook: LifeisSweet-01.png … LifeisSweet-32.png  →  public/life-is-sweet/sketchbook/
const sketch = (n: number) => `/life-is-sweet/sketchbook/LifeisSweet-${String(n).padStart(2, '0')}.png`
const LINESHEET   = '/life-is-sweet/linesheet.jpg'
const ROUGHNOTES  = '/life-is-sweet/roughnotes.jpg'

// Sketchbook carousel: all 32 pages
const SKETCHES = Array.from({ length: 32 }, (_, i) => sketch(i + 1))

// Wayne Thiebaud hover painting
const THIEBAUD_IMG = '/life-is-sweet/cakes-and-pies-1995.jpg'

// ── Image components ───────────────────────────────────────────────

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

// ── Photoshoot — all 21 in one mixed carousel ──────────────────────
// Tall images (span 2 rows) at every 3rd position: indices 2,5,8,11,14,17,20
const PHOTOS     = Array.from({ length: 21 }, (_, i) => shoot(i + 1))
const TALL_IDX   = new Set([2, 5, 8, 11, 14, 17, 20])

export default function LifeIsSweetDetail({ prev, next }: Props) {
  const [scrolled, setScrolled] = useState(false)

  // ── Sketchbook carousel refs ─────────────────────────────────────
  const outerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cueRef      = useRef<HTMLElement>(null)
  const counterRef  = useRef<HTMLElement>(null)

  // ── Photoshoot carousel refs ─────────────────────────────────────
  const photoOuterRef    = useRef<HTMLDivElement>(null)
  const photoTrackRef    = useRef<HTMLDivElement>(null)
  const photoProgressRef = useRef<HTMLDivElement>(null)
  const photoCueRef      = useRef<HTMLElement>(null)
  const photoCounterRef  = useRef<HTMLElement>(null)

  // ── Thiebaud hover painting ──────────────────────────────────────
  const thiebaudRef        = useRef<HTMLDivElement>(null)
  const thiebaudPositioned = useRef(false)

  /** Position the tooltip first, then reveal it — prevents top-left flash */
  const onThiebaudMove = useCallback((e: React.MouseEvent) => {
    const el = thiebaudRef.current
    if (!el) return
    const TIP_W = 260
    const OFFSET = 20
    // Flip left when too close to the right edge
    const x = e.clientX + OFFSET + TIP_W > window.innerWidth
      ? e.clientX - TIP_W - OFFSET
      : e.clientX + OFFSET
    // Flip up when too close to the bottom edge
    const tipH = el.offsetHeight || 220
    const y = e.clientY + OFFSET + tipH > window.innerHeight
      ? e.clientY - tipH - OFFSET
      : e.clientY + OFFSET
    el.style.transform = `translate(${x}px, ${y}px)`
    // Only make visible after the first position has been set
    if (!thiebaudPositioned.current) {
      thiebaudPositioned.current = true
      el.style.opacity = '1'
    }
  }, [])

  const onThiebaudLeave = useCallback(() => {
    const el = thiebaudRef.current
    if (el) el.style.opacity = '0'
    thiebaudPositioned.current = false
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useHorizontalGallery(outerRef, trackRef, {
    progressRef,
    cueRef,
    counterRef,
    imageCount: SKETCHES.length, // 32
  })

  useHorizontalGallery(photoOuterRef, photoTrackRef, {
    progressRef: photoProgressRef,
    cueRef: photoCueRef,
    counterRef: photoCounterRef,
    imageCount: PHOTOS.length, // 21
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
          1. VIDEO HERO
         ══════════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>
        <video autoPlay muted loop playsInline
          poster="/life-is-sweet/hero-poster.jpg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}>
          <source src="/life-is-sweet/video.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <p style={{ ...B400, fontSize: 11, letterSpacing: '4px', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', margin: '0 0 18px' }}>
            Parsons School of Design &nbsp;·&nbsp; Senior Thesis &nbsp;·&nbsp; 2018
          </p>
          <h1 style={{ ...B300, fontSize: 80, lineHeight: 1, color: '#ffffff', margin: 0, letterSpacing: '-2px' }}>
            Life is Sweet
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <div className="animate-pulse" style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.35)' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. OPENING QUOTE
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px 100px', textAlign: 'center' }}>
        <p style={{ ...B300, fontSize: 21, lineHeight: '38px', color: '#141414', fontStyle: 'italic', margin: '0 0 48px' }}>
          &ldquo;Happiness is largely a matter of being thankful for the small things around us — not being greedy, not desiring for more. Life should be sweet. Life should be happy.&rdquo;
        </p>
        <Divider />
      </div>

      {/* ══════════════════════════════════════════════════════════
          3. METADATA STRIP
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 720, margin: '0 auto 120px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: '1px solid #ececec', paddingTop: 40 }}>
          {[
            { label: 'Role',   value: 'Fashion Designer' },
            { label: 'Year',   value: '2018' },
            { label: 'Medium', value: 'Womenswear' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ ...B500, fontSize: 10, letterSpacing: '2px', color: '#767676', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
              <div style={{ ...B300, fontSize: 15, lineHeight: '22px', color: '#141414' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          4. CONCEPT — text left, process notes image right
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 880, margin: '120px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
          {/* Left: concept text */}
          <div style={{ flex: '1 1 0' }}>
            <Label>The Concept</Label>
            <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#141414', margin: '0 0 24px' }}>
              <em>Life is Sweet</em> is a womenswear collection born from an obsession with small, saturated moments of pleasure — a slice of cake left on a counter, the careful spiral of frosting, the gentle weight of a layered pastry.
            </p>
            <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#141414', margin: 0 }}>
              The collection explores how joy can be structural — built into silhouette, pleating, and proportion — and how garments can carry an emotional register that is at once sophisticated and deeply personal.
            </p>
          </div>

          {/* Right: process notes */}
          <FadeUp style={{ flexShrink: 0, width: 380 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ROUGHNOTES}
              alt="Process notes"
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
              decoding="async"
            />
          </FadeUp>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          5. INSPIRATION — Wayne Thiebaud
             Hover anywhere in the section to reveal his painting.
         ══════════════════════════════════════════════════════════ */}
      <div
        onMouseMove={onThiebaudMove}
        onMouseLeave={onThiebaudLeave}
        style={{ maxWidth: 840, margin: '140px auto', padding: '0 24px', textAlign: 'center', cursor: 'default' }}
      >
        <Label>Inspiration</Label>
        <p style={{ ...B300, fontSize: 19, lineHeight: '34px', color: '#141414', margin: '0 0 20px' }}>
          The paintings of Wayne Thiebaud.
        </p>
        <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#141414', margin: 0 }}>
          Thiebaud&rsquo;s dessert paintings — luminous, hyperreal, abundant — gave the collection its color palette and emotional temperature. His cakes and pies are not about food. They are about longing, abundance, and the strange intimacy of objects we consume. The collection borrows his palette directly, translating the warm pastels and soft whites of his canvases into garment, surface, and structure.
        </p>
      </div>

      {/* ── Thiebaud floating tooltip — position:fixed, pointer-events:none ── */}
      <div
        ref={thiebaudRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 260,
          pointerEvents: 'none',
          zIndex: 8000,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
          background: '#fff',
          padding: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={THIEBAUD_IMG}
          alt="Wayne Thiebaud — Cakes, 1963"
          style={{ display: 'block', width: '100%', height: 'auto' }}
          draggable={false}
        />
        <p style={{ ...B300, fontSize: 10, color: '#aaa', margin: '7px 0 0', letterSpacing: '1px', textAlign: 'center' }}>
          Wayne Thiebaud &nbsp;·&nbsp; <em>Cakes and Pies</em>, 1995
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          8. SKETCHBOOK — single-row horizontal gallery
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 940, margin: '0 auto 24px', padding: '0 24px' }}>
        <div style={{ borderTop: '1px solid #ececec', paddingTop: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <Label>Sketchbook</Label>
          <p
            ref={cueRef as React.RefObject<HTMLParagraphElement>}
            style={{ ...B300, fontSize: 11, letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: '0 0 20px', transition: 'opacity 0.8s ease' }}>
            Scroll to turn through the pages →
          </p>
        </div>
      </div>

      <div ref={outerRef} className="hz-outer">
        <div className="hz-sticky" style={{ background: '#fff' }}>
          <div ref={trackRef} className="hz-track hz-track--sm">
            {SKETCHES.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Sketchbook page ${i + 2}`}
                className="hz-img"
                loading={i < 6 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>

          {/* Progress indicator: counter above fill line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 80px 10px' }}>
              <span
                ref={counterRef as React.RefObject<HTMLSpanElement>}
                style={{ ...B300, fontSize: 10, color: '#888', letterSpacing: '1px', fontVariantNumeric: 'tabular-nums' }}>
                1 / {SKETCHES.length}
              </span>
            </div>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }}>
              <div ref={progressRef} style={{ height: '100%', background: 'rgba(0,0,0,0.28)', width: '0%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          8. FILM — full-length collection film
         ══════════════════════════════════════════════════════════ */}
      <div style={{ padding: '120px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 940, margin: '0 auto 32px', padding: '0 24px', textAlign: 'left' }}>
          <Label>The Collection in Motion</Label>
        </div>
        <div style={{ width: '75vw', margin: '0 auto', aspectRatio: '16/9', background: '#f5f0eb', overflow: 'hidden' }}>
          <video
            controls
            playsInline
            poster="/life-is-sweet/film-poster.jpg"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/life-is-sweet/film.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          9. DESIGN LANGUAGE — techniques + 2 stacked sketches
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 880, margin: '140px auto', padding: '0 24px' }}>
        <Label>Design Language</Label>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          {/* Left: text entries */}
          <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 36 }}>
            {[
              {
                name: 'Silhouette',
                desc: 'Volumes are generous but controlled — hemlines rise and fall unexpectedly, waists are cinched then released. The shapes carry the same quiet abundance as a pastry left whole on a counter.',
              },
              {
                name: 'Construction',
                desc: 'Pleats fold into precise architectural layers; piped edges trace garment seams with the steady gesture of a pastry bag. Structure is never hidden — it is the language.',
              },
              {
                name: 'Surface',
                desc: 'Soft pastels drawn directly from Thiebaud\'s palette — blush, cream, vanilla, dusty rose. Organza and chiffon are layered to create translucency, mimicking the depth of a glazed surface catching light.',
              },
              {
                name: 'Detail',
                desc: 'Black and white striped bias tape outlines edges and seams, threading a graphic line through the softness. Sweetness needs contrast. Joy needs weight to be felt.',
              },
            ].map(({ name, desc }) => (
              <div key={name} style={{ borderTop: '1px solid #ececec', paddingTop: 24 }}>
                <p style={{ ...B500, fontSize: 14, color: '#141414', margin: '0 0 10px', letterSpacing: '0.5px' }}>{name}</p>
                <p style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#6a6a6a', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Right: 2 natural-ratio images */}
          <div style={{ flexShrink: 0, width: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/life-is-sweet/fitting.png"
                alt="Fitting"
                style={{ display: 'block', width: '75%', height: 'auto' }}
                loading="lazy"
                decoding="async"
              />
            </FadeUp>
            <FadeUp>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/life-is-sweet/manipulation.jpg"
                alt="Fabric manipulation"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                loading="lazy"
                decoding="async"
              />
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          10. LINE SHEET
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 720, margin: '80px auto 0', padding: '0 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <Label>Line Sheet</Label>
        </div>
        <FadeUp>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LINESHEET}
            alt="Life is Sweet Line Sheet"
            style={{ display: 'block', width: '100%', height: 'auto' }}
            loading="lazy"
            decoding="async"
          />
        </FadeUp>
      </div>

      {/* ══════════════════════════════════════════════════════════
          11. EDITORIAL — all 21 photos, mixed-size carousel
              Rhythm: small, small, tall, small, small, tall …
              Tall images (span 2 rows) at indices 2,5,8,11,14,17,20
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 940, margin: '80px auto 24px', padding: '0 24px' }}>
        <Label>The Collection</Label>
      </div>

      <div ref={photoOuterRef} className="hz-outer">
        <div className="hz-sticky" style={{ background: '#fff' }}>
          <div ref={photoTrackRef} className="hz-track--mixed" style={{ padding: '0 40px' }}>
            {PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Collection photo ${i + 1}`}
                className={TALL_IDX.has(i) ? 'hz-img hz-img--tall' : 'hz-img'}
                loading={i < 6 ? 'eager' : 'lazy'}
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
          12. CLOSING STATEMENT
         ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 560, margin: '140px auto', padding: '0 24px', textAlign: 'center' }}>
        <Divider />
        <p style={{ ...B300, fontSize: 17, lineHeight: '32px', color: '#6a6a6a', margin: '48px 0 0', fontStyle: 'italic' }}>
          The collection was designed to find a more lighthearted manner and to discover joy in unique design — to remind the wearer that sweetness is not trivial. It is essential.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          13. PREV / NEXT
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
