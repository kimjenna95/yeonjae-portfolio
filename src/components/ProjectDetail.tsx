'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/data/projects'
import { getCaseStudy } from '@/data/caseStudies'
import BackToTop from '@/components/BackToTop'

/** Fades in and slides up when scrolled into view. */
function FadeUp({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="fade-up" style={style}>{children}</div>
}

/** Plays when scrolled into view (≥50% visible), pauses when scrolled away. Natural ratio — no crop. */
function AutoplayVideo({ src, width, height }: { src: string; width?: number | string; height?: number | string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.5 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const hasCustomSize = width !== undefined || height !== undefined
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      style={hasCustomSize
        ? { display: 'block', width: width ?? 'auto', height: height ?? 'auto' }
        : { display: 'block', width: '100%', height: 'auto' }
      }
    />
  )
}

/** Click-to-play video — full-width, editorial play button overlay, optional controls after play. */
function ClickPlayVideo({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    // Small delay so the controls render before play() is called
    setTimeout(() => { ref.current?.play().catch(() => {}) }, 50)
  }

  return (
    <div style={{ position: 'relative', width: '100%', background: '#0b1627', aspectRatio: '16 / 9', overflow: 'hidden' }}>
      <video
        ref={ref}
        src={src}
        controls={playing}
        playsInline
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => { (e.target as HTMLVideoElement).style.display = 'none' }}
      />
      {!playing && (
        <div
          onClick={handlePlay}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            background: 'rgba(9, 17, 33, 0.28)',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(9, 17, 33, 0.18)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(9, 17, 33, 0.28)')}
        >
          {/* Play button ring */}
          <div style={{
            width: 72, height: 72,
            borderRadius: '50%',
            border: '1.5px solid rgba(255, 255, 255, 0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
          }}>
            {/* Triangle */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginLeft: 3 }}>
              <polygon points="4,2 18,10 4,18" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B500: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 500 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }
const TEXT: React.CSSProperties = { color: '#333' }

const PLACEHOLDER_COLORS: Record<string, string> = {
  cisco:           '#0f1f3d',
  'life-is-sweet': '#2a1a2e',
  'fire-escape':   '#1a1a1a',
  'silent-echo':   '#1c1c2e',
}

// Shared label style — matches Andy's OVERVIEW / ROLE / TIMELINE labels
const LABEL: React.CSSProperties = {
  fontFamily: 'Barlow, sans-serif', fontWeight: 500,
  fontSize: 12, lineHeight: '20px', letterSpacing: '1px',
  color: '#333', textTransform: 'uppercase',
}

interface Props {
  project: Project
  prev: Project | null
  next: Project | null
}

export default function ProjectDetail({ project, prev, next }: Props) {
  const hasImg    = !!project.thumbnail
  const bgColor   = PLACEHOLDER_COLORS[project.slug] ?? '#1a1a1a'
  const caseStudy = getCaseStudy(project.slug)
  const metricsRef = useRef<HTMLDivElement>(null)

  // Trigger staggered fade-up on each metric card when the grid scrolls into view
  useEffect(() => {
    const container = metricsRef.current
    if (!container) return
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.fade-up'))
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach(card => card.classList.add('visible'))
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Sticky nav — 116px total height (48px padding top + bottom, 20px link line-height) */}
      <div style={{ position: 'sticky', top: 0, background: '#fff', borderBottom: '1px solid #eee', zIndex: 1000 }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '48px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ ...B600, fontSize: 18, lineHeight: '20px', color: '#141414', textDecoration: 'none' }} className="hover:opacity-60 transition-opacity">
            Yeonjae Kim
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <Link href="/work"   style={{ ...B400, fontSize: 14, lineHeight: '20px', color: '#222', textDecoration: 'none' }} className="hover:opacity-60 transition-opacity">Work</Link>
            <Link href="/resume" style={{ ...B400, fontSize: 14, lineHeight: '20px', color: '#222', textDecoration: 'none' }} className="hover:opacity-60 transition-opacity">Résumé</Link>
            <Link href="/about"  style={{ ...B400, fontSize: 14, lineHeight: '20px', color: '#222', textDecoration: 'none' }} className="hover:opacity-60 transition-opacity">About</Link>
          </nav>
        </div>
      </div>

      {/* ── 1. Title + description — 800px ───────────────────────────
          Andy: .div-block-111 = 800px, marginTop/Bottom 64px each
      ───────────────────────────────────────────────────────────── */}
      <FadeUp style={{ maxWidth: 800, margin: '64px auto' }} >
        <div className="px-6 md:px-12">
          <h1 style={{ ...B500, fontSize: 32, lineHeight: '40px', color: '#000', marginBottom: 16 }}>
            {project.name}
            {project.subtitle && (
              <span style={{ ...B500, color: '#000' }}> — {project.subtitle}</span>
            )}
          </h1>
          <p style={{ ...B400, fontSize: 20, lineHeight: '28px', color: '#a8a8a8', margin: 0 }}>
            {project.description}
          </p>
        </div>
      </FadeUp>

      {/* ── 2. Hero image — 960px ─────────────────────────────────────
          Andy: .div-block-103 = 960px, marginTop/Bottom 64px
      ───────────────────────────────────────────────────────────── */}
      <FadeUp style={{ maxWidth: 960, margin: '64px auto' }} >
        <div className="px-6 md:px-12">
          <div style={{ position: 'relative', width: '100%', paddingTop: `${(560 / 960) * 100}%`, background: bgColor, overflow: 'hidden' }}>
            {hasImg && (
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
                priority
                unoptimized
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
        </div>
      </FadeUp>

      {/* ── 3. Overview | Role + Timeline — 800px ────────────────────
          Andy: .columns-4 = 800px, paddingBottom 56px
          Overview ~66%, Role/Timeline ~34% with paddingLeft 40px
      ───────────────────────────────────────────────────────────── */}
      <FadeUp style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 56 }} >
      <div className="px-6 md:px-12">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* Overview — 66% */}
          <div style={{ flex: '0 0 66.6%' }}>
            <div style={{ ...LABEL, marginBottom: 16 }}>Overview</div>
            <div style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#000', whiteSpace: 'pre-line' }}>
              {caseStudy ? caseStudy.overview : project.description}
            </div>
          </div>

          {/* Role + Timeline — 34% */}
          <div style={{ flex: '0 0 33.4%', paddingLeft: 40 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ ...LABEL, marginBottom: 16 }}>Role</div>
              <div style={{ ...B300, fontSize: 16, lineHeight: '24px', ...TEXT }}>
                {project.role ?? project.categories[0] ?? project.category}
              </div>
            </div>
            <div>
              <div style={{ ...LABEL, marginBottom: 16 }}>Timeline</div>
              <div style={{ ...B300, fontSize: 16, lineHeight: '24px', ...TEXT }}>
                {project.year}
              </div>
            </div>
          </div>

        </div>
      </div>
      </FadeUp>

      {/* ── 3b. Impact metrics — 960px, shown between overview and sections ── */}
      {caseStudy?.metrics && caseStudy.metrics.length > 0 && (
        <div style={{ maxWidth: 960, margin: '64px auto 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }} className="px-6 md:px-12">
          <div ref={metricsRef} style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${caseStudy.metrics.length}, 1fr)`,
            gap: '0',
          }}
            className="metrics-grid"
          >
            {caseStudy.metrics.map((m, i) => (
              <div
                key={i}
                className="fade-up"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  padding: '40px 0',
                  borderRight: i < caseStudy.metrics!.length - 1 ? '1px solid #eee' : 'none',
                  paddingLeft: i === 0 ? 0 : 24,
                  paddingRight: i === caseStudy.metrics!.length - 1 ? 0 : 24,
                }}
              >
                <div style={{ ...B600, fontSize: 40, lineHeight: '48px', color: '#141414', marginBottom: 8 }}>
                  {m.value}
                </div>
                <div style={{ ...B300, fontSize: 13, lineHeight: '20px', color: '#767676' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Award strip — below metrics, inside the bordered container */}
          {caseStudy.award && (
            <FadeUp>
              <div style={{
                borderTop: '1px solid #eee',
                padding: '20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{
                    fontFamily: 'Barlow, sans-serif', fontWeight: 500,
                    fontSize: 11, lineHeight: '20px', letterSpacing: '0.08em',
                    color: '#a4a4a4', textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {caseStudy.award.level}
                  </span>
                  <span style={{ color: '#ddd', fontSize: 12 }}>·</span>
                  <span style={{
                    ...B300, fontSize: 14, lineHeight: '20px', color: '#555',
                  }}>
                    {caseStudy.award.category}
                  </span>
                </div>
                {caseStudy.award.href && (
                  <a
                    href={caseStudy.award.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...B300, fontSize: 13, lineHeight: '20px',
                      color: '#a4a4a4', textDecoration: 'none',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                    className="hover:opacity-60 transition-opacity"
                  >
                    Stevie Awards →
                  </a>
                )}
              </div>
            </FadeUp>
          )}

        </div>
      )}

      {/* ── 3c. Context video — 960px, after metrics, before sections ── */}
      {caseStudy?.contextVideo && (
        <div style={{ maxWidth: 960, margin: '80px auto 0' }} className="px-6 md:px-12">

          {/* Label + title + body — 640px wide, left-aligned */}
          <FadeUp style={{ maxWidth: 640, marginBottom: 40 }}>
            {caseStudy.contextVideo.label && (
              <div style={{
                fontFamily: 'Barlow, sans-serif', fontWeight: 500,
                fontSize: 12, lineHeight: '20px', letterSpacing: '1px',
                color: '#a4a4a4', textTransform: 'uppercase', marginBottom: 12,
              }}>
                {caseStudy.contextVideo.label}
              </div>
            )}
            {caseStudy.contextVideo.title && (
              <div style={{ ...B600, fontSize: 22, lineHeight: '32px', color: '#141414', marginBottom: 16 }}>
                {caseStudy.contextVideo.title}
              </div>
            )}
            {caseStudy.contextVideo.body && (
              <div style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#555' }}>
                {caseStudy.contextVideo.body}
              </div>
            )}
          </FadeUp>

          {/* Video — full 960px */}
          <FadeUp>
            <ClickPlayVideo src={caseStudy.contextVideo.src} />

            {/* Below-video meta: timestamp (left) + credit (right) */}
            {(caseStudy.contextVideo.timestamp || caseStudy.contextVideo.credit) && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 16, gap: 16,
              }}>
                <div style={{ ...B300, fontSize: 13, lineHeight: '20px', color: '#a4a4a4', fontStyle: 'italic' }}>
                  {caseStudy.contextVideo.timestamp
                    ? `MyID Groups appears at ${caseStudy.contextVideo.timestamp}`
                    : ''}
                </div>
                {caseStudy.contextVideo.credit && (
                  <div style={{ ...B300, fontSize: 13, lineHeight: '20px', color: '#a4a4a4', textAlign: 'right' }}>
                    {caseStudy.contextVideo.credit}
                  </div>
                )}
              </div>
            )}
          </FadeUp>

        </div>
      )}

      {/* ── 4. Case study sections ────────────────────────────────────
          Text blocks: 640px. Images break out to 960px.
          Section top margin: 80px. Image margin: 40px top.
          Subsection gap: 32px. After image → next sub: 40px.
      ───────────────────────────────────────────────────────────── */}
      {caseStudy ? (
        caseStudy.sections.map((section, i) => (
          <div key={i}>

            {/* Section label + title + body — 640px */}
            <FadeUp style={{ maxWidth: 640, margin: '80px auto 0' }}>
              <div className="px-6 md:px-12">
                <div style={{ marginBottom: 40 }}>
                  <div style={{ ...B600, fontSize: 28, lineHeight: '40px', color: '#000', marginBottom: section.title ? 12 : 0 }}>
                    {section.label}
                  </div>
                  {section.title && (
                    <div style={{ ...B300, fontSize: 16, lineHeight: '24px', color: '#767676' }}>
                      {section.title}
                    </div>
                  )}
                </div>
                {section.body ? (
                  <div style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#000', whiteSpace: 'pre-line' }}>
                    {section.body}
                  </div>
                ) : null}
              </div>
            </FadeUp>

            {/* Section images array — 960px, stacked, natural ratio */}
            {section.images && section.images.length > 0 && (
              <div style={{ maxWidth: 960, margin: '40px auto 0', overflow: 'visible' }} className="px-6 md:px-12">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {section.images.map((img, imgIdx) => {
                    const imgWidth = section.imageWidths?.[imgIdx]
                    const imgStyle = section.imageStyles?.[imgIdx]
                    return (
                      <FadeUp key={imgIdx} style={imgWidth ? { maxWidth: imgWidth, overflow: 'visible' } : { overflow: 'visible' }}>
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt=""
                            style={{ display: 'block', width: '100%', height: 'auto', ...imgStyle }}
                            loading="lazy" decoding="async"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        ) : (
                          <div style={{
                            position: 'relative', width: '100%',
                            paddingTop: `${(512 / 960) * 100}%`,
                            background: '#f0f0f0',
                          }}>
                            <p style={{ ...B300, fontSize: 13, color: '#bbb', letterSpacing: '0.04em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', margin: 0, whiteSpace: 'nowrap' }}>
                              960 × 512
                            </p>
                          </div>
                        )}
                      </FadeUp>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Section image — 960px, natural ratio */}
            {section.image !== undefined && (
              <FadeUp style={{ maxWidth: 960, margin: '40px auto 0' }}>
                <div className="px-6 md:px-12">
                  {section.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={section.image} alt=""
                      style={{ display: 'block', width: '100%', height: 'auto', ...section.imageStyle }}
                      loading="lazy" decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  ) : (
                    <div style={{
                      position: 'relative', width: '100%',
                      paddingTop: `${(512 / 960) * 100}%`,
                      background: '#f0f0f0',
                    }}>
                      <p style={{ ...B300, fontSize: 13, color: '#bbb', letterSpacing: '0.04em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', margin: 0, whiteSpace: 'nowrap' }}>
                        960 × 512
                      </p>
                    </div>
                  )}
                </div>
              </FadeUp>
            )}

            {/* Section videos — 960px, stacked or side-by-side grid */}
            {section.videos && (
              <div style={{ maxWidth: 960, margin: '40px auto 0' }} className="px-6 md:px-12">
                <div style={section.videosGrid
                  ? { display: 'grid', gridTemplateColumns: section.videosGridCols ?? `repeat(${section.videos.length}, 1fr)`, gap: 16, alignItems: 'start' }
                  : { display: 'flex', flexDirection: 'column', gap: 24 }
                }>
                  {section.videos.map((vid, v) => (
                    <FadeUp key={v}>
                      <div style={{ ...B300, fontSize: 12, letterSpacing: '0.08em', color: '#aaa', textTransform: 'uppercase', marginBottom: 10 }}>
                        {vid.label}
                      </div>
                      {vid.src ? (
                        <AutoplayVideo src={vid.src} width={vid.width} height={vid.height} />
                      ) : (
                        <div style={{
                          position: 'relative', width: '100%',
                          paddingTop: '56.25%',
                          background: '#f0f0f0',
                        }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ display: 'block', margin: '0 auto 8px' }}>
                              <circle cx="20" cy="20" r="19" stroke="#ccc" strokeWidth="1.5" />
                              <polygon points="16,13 28,20 16,27" fill="#ccc" />
                            </svg>
                            <p style={{ ...B300, fontSize: 12, color: '#bbb', margin: 0, letterSpacing: '0.04em' }}>{vid.label}</p>
                          </div>
                        </div>
                      )}
                    </FadeUp>
                  ))}
                </div>
              </div>
            )}

            {/* Subsections — stacked (default) or 2-col grid */}
            {section.subsections && (
              section.subsectionsGrid ? (
                /* ── Grid layout: pairs of subsections side by side ── */
                <FadeUp style={{ maxWidth: 960, margin: '40px auto 0' }}>
                  <div className="px-6 md:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 32px' }}>
                      {section.subsections.map((sub, j) => (
                        <div key={j}>
                          <div style={{ ...B600, fontSize: 16, lineHeight: '24px', color: '#000', marginBottom: 8 }}>
                            {sub.title}
                          </div>
                          <div style={{ ...B300, fontSize: 16, lineHeight: '24px', color: '#555', whiteSpace: 'pre-line', marginBottom: sub.image ? 20 : 0 }}>
                            {sub.body}
                          </div>
                          {sub.video && (
                            <AutoplayVideo src={sub.video} />
                          )}
                          {sub.image !== undefined && !sub.video && (
                            sub.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={sub.image} alt=""
                                style={{ display: 'block', width: '100%', height: 'auto', marginTop: 20 }}
                                loading="lazy" decoding="async"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            ) : (
                              <div style={{
                                position: 'relative', width: '100%',
                                paddingTop: `${(512 / 460) * 100}%`,
                                background: '#f0f0f0', marginTop: 20,
                              }}>
                                <p style={{ ...B300, fontSize: 13, color: '#bbb', letterSpacing: '0.04em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', margin: 0, whiteSpace: 'nowrap' }}>
                                  460 × 512
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ) : (
                /* ── Default stacked layout ── */
                section.subsections.map((sub, j) => {
                  const hasSideBySide = !!sub.mediaPosition
                  const topMargin = j === 0 ? (section.image !== undefined ? 40 : 32) : 80

                  /* ── Media block (video or image) ── */
                  const mediaBlock = sub.video ? (
                    <AutoplayVideo src={sub.video} />
                  ) : sub.image !== undefined ? (
                    sub.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={sub.image} alt=""
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                        loading="lazy" decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ) : (
                      <div style={{
                        position: 'relative', width: '100%',
                        paddingTop: `${(512 / 460) * 100}%`,
                        background: '#f0f0f0',
                      }}>
                        <p style={{ ...B300, fontSize: 13, color: '#bbb', letterSpacing: '0.04em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', margin: 0, whiteSpace: 'nowrap' }}>
                          460 × 512
                        </p>
                      </div>
                    )
                  ) : null

                  /* ── Text block ── */
                  const textBlock = (
                    <div>
                      <div style={{ ...B600, fontSize: 16, lineHeight: '24px', color: '#000', marginBottom: 8 }}>
                        {sub.title}
                      </div>
                      <div style={{ ...B300, fontSize: 16, lineHeight: '28px', color: '#555', whiteSpace: 'pre-line' }}>
                        {sub.body}
                      </div>
                      {sub.feedback && (
                        <div style={{ marginTop: 24, paddingLeft: 16, borderLeft: '2px solid #e8e8e8' }}>
                          <span style={{ ...B600, fontSize: 13, lineHeight: '20px', color: '#a4a4a4', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                            Feedback
                          </span>
                          <div style={{ ...B300, fontSize: 15, lineHeight: '26px', color: '#555' }}>
                            {sub.feedback}
                          </div>
                        </div>
                      )}
                    </div>
                  )

                  if (hasSideBySide) {
                    /* ── Side-by-side: media + text in a 2-col flex row ── */
                    const isMediaLeft = sub.mediaPosition === 'left'
                    return (
                      <FadeUp key={j} style={{ maxWidth: 960, margin: `${topMargin}px auto 0` }}>
                        <div className="px-6 md:px-12">
                          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
                            {isMediaLeft ? (
                              <>
                                <div style={{ flex: '0 0 52%', boxShadow: sub.mediaShadow }}>{mediaBlock}</div>
                                <div style={{ flex: 1, paddingTop: 8 }}>{textBlock}</div>
                              </>
                            ) : (
                              <>
                                <div style={{ flex: 1, paddingTop: 8 }}>{textBlock}</div>
                                <div style={{ flex: '0 0 52%', boxShadow: sub.mediaShadow }}>{mediaBlock}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </FadeUp>
                    )
                  }

                  /* ── Stacked: text then media, full-width ── */
                  return (
                    <div key={j}>
                      <FadeUp style={{ maxWidth: 640, margin: `${topMargin}px auto 0` }}>
                        <div className="px-6 md:px-12">{textBlock}</div>
                      </FadeUp>
                      {mediaBlock && (
                        <FadeUp style={{ maxWidth: 960, margin: '32px auto 0' }}>
                          <div className="px-6 md:px-12">{mediaBlock}</div>
                        </FadeUp>
                      )}
                    </div>
                  )
                })
              )
            )}

            {/* ctaNote + CTA button — rendered after subsections so they always
                land at the very end of the section. ctaNote sits flush above
                the button with minimal spacing. */}
            {(section.ctaNote || section.cta) && (
              <FadeUp style={{ maxWidth: 640, margin: '40px auto 0' }}>
              <div className="px-6 md:px-12">
                {section.ctaNote && (
                  <p style={{ ...B300, fontSize: 16, lineHeight: '24px', color: '#555', margin: '0 0 16px' }}>
                    {section.ctaNote}
                  </p>
                )}
                {section.cta && (
                  <a
                    href={section.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      ...B400, fontSize: 14, lineHeight: '20px', color: '#333',
                      textDecoration: 'none',
                      border: '1px solid #d8d8d8', padding: '12px 20px',
                    }}
                    className="hover:border-gray-400 transition-colors"
                  >
                    {section.cta.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="#333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
              </FadeUp>
            )}

          </div>
        ))
      ) : (
        <div style={{ maxWidth: 640, margin: '80px auto 0' }} className="px-6 md:px-12">
          <div style={{ marginBottom: 40 }}>
            <div style={{ ...B600, fontSize: 28, lineHeight: '40px', color: '#000' }}>I. Context</div>
          </div>
          <div style={{
            width: '100%', minHeight: 240, background: '#f8f8f8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{ ...B300, fontSize: 14, color: '#767676', letterSpacing: '0.04em' }}>
              Case study coming soon
            </p>
          </div>
        </div>
      )}

      {/* ── 5. Prev / Next — 640px ───────────────────────────────────
          Andy: .div-block-153 = 640px, marginTop 120px
          Prev left, Next right. B400 14px #333.
      ───────────────────────────────────────────────────────────── */}
      <FadeUp style={{ maxWidth: 640, margin: '120px auto 0', paddingBottom: 80 }}>
      <div className="px-6 md:px-12">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>

          {prev ? (
            <Link href={`/work/${prev.slug}`} style={{ textDecoration: 'none', textAlign: 'left' }} className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 12, letterSpacing: '1px', color: '#767676', textTransform: 'uppercase', marginBottom: 6 }}>
                Previous
              </div>
              <div style={{ ...B400, fontSize: 14, lineHeight: '20px', ...TEXT }}>
                ← {prev.name}
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/work/${next.slug}`} style={{ textDecoration: 'none', textAlign: 'right' }} className="hover:opacity-60 transition-opacity">
              <div style={{ ...B500, fontSize: 12, letterSpacing: '1px', color: '#767676', textTransform: 'uppercase', marginBottom: 6 }}>
                Next
              </div>
              <div style={{ ...B400, fontSize: 14, lineHeight: '20px', ...TEXT }}>
                {next.name} →
              </div>
            </Link>
          ) : <div />}

        </div>
      </div>
      </FadeUp>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #eee', marginTop: 80 }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: '64px 0' }} className="px-6 md:px-12">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ ...B600, fontSize: 16, lineHeight: '20px', ...TEXT }}>Yeonjae Kim</span>
            <a href="mailto:yeonjae.design@gmail.com" target="_blank" rel="noopener noreferrer"
              style={{ ...B300, fontSize: 16, lineHeight: '20px', ...TEXT, textDecoration: 'none' }}
              className="hover:opacity-60 transition-opacity">
              yeonjae.design@gmail.com
            </a>
            <span style={{ ...B400, fontSize: 16, lineHeight: '20px', ...TEXT }}>2026</span>
          </div>
        </div>
      </div>

      <BackToTop />

    </div>
  )
}
