'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { projects } from '@/data/projects'
import PasswordGate from '@/components/PasswordGate'
import PageHeader from '@/components/PageHeader'
import BackToTop from '@/components/BackToTop'
import FadeUp from '@/components/FadeUp'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B400: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 400 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }
const TEXT: React.CSSProperties = { color: '#333' }

const PLACEHOLDER_COLORS: Record<string, string> = {
  cisco:           '#0f1f3d',
  'life-is-sweet': '#2a1a2e',
  'fire-escape':   '#1a1a1a',
  'silent-echo':   '#1c1c2e',
}

const featured = projects.filter((p) => p.featured)
const past      = projects.filter((p) => !p.featured)

// ── Single project card ────────────────────────────────────────────
function ProjectCard({ project, delay = 0 }: { project: typeof projects[0]; delay?: number }) {
  const bgColor = PLACEHOLDER_COLORS[project.slug] ?? '#1a1a1a'
  const isWip   = !!project.wip
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageBlock = (
    // aspect ratio 960/560 = exactly Andy's thumbnail dimensions
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: `${(560 / 960) * 100}%`, // 58.333%
        background: bgColor,
        overflow: 'hidden',
      }}
    >
      {project.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      )}
    </div>
  )

  return (
    <div ref={cardRef} className="fade-up" style={{ transitionDelay: `${delay}ms` }}>
      {/* Image — always clickable; WIP badge signals in-progress status */}
      <Link
        href={`/work/${project.slug}`}
        className="project-card-img"
        style={{ textDecoration: 'none' }}
      >
        {imageBlock}
      </Link>

      {/* Text below image — same left-alignment as Andy */}
      <div style={{ marginTop: 16 }}>
        <p style={{ ...B600, fontSize: 18, lineHeight: '20px', ...TEXT, marginBottom: 0 }}>
          {project.name}
          {project.subtitle && ` — ${project.subtitle}`}
          {isWip && (
            <span style={{ ...B300, fontSize: 12, color: '#a4a4a4', marginLeft: 10, fontStyle: 'italic' }}>
              WIP
            </span>
          )}
        </p>
        <p style={{ ...B300, fontSize: 14, lineHeight: '20px', ...TEXT, marginTop: 8, marginBottom: 0 }}>
          {project.categories.join(', ')}
        </p>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────
export default function WorkPage() {
  return (
    <PasswordGate slug="work">
    <div>
      <PageHeader active="Work" />

      <div style={{ background: '#fff', paddingTop: 72 }}>

        {/* Featured project cards */}
        <div style={{ maxWidth: 940, margin: '0 auto' }} className="px-6 md:px-12">

          <FadeUp style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ ...B600, fontSize: 20, lineHeight: '28px', ...TEXT }}>Featured Work</span>
          </FadeUp>
          {featured.map((project, i) => (
            <div key={project.slug} style={{ marginBottom: 80 }}>
              <ProjectCard project={project} delay={i * 100} />
            </div>
          ))}
        </div>

        {/* Past work 2-column grid */}
        <div style={{ maxWidth: 940, margin: '0 auto' }} className="px-6 md:px-12">

          <FadeUp style={{ textAlign: 'center', marginTop: 160, marginBottom: 56 }}>
            <span style={{ ...B600, fontSize: 20, lineHeight: '28px', ...TEXT }}>Past Work</span>
          </FadeUp>

          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ columnGap: 40, rowGap: 56 }}
          >
            {past.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Breathing room before footer */}
        <div style={{ height: 120 }} />

        {/* Footer */}
        <div style={{ borderTop: '1px solid #eee' }}>
          <div style={{ maxWidth: 940, margin: '0 auto' }} className="px-6 md:px-12">
            <div style={{ padding: '64px 0' }} className="site-footer-row">
              <span style={{ ...B600, fontSize: 16, lineHeight: '20px', ...TEXT }}>Yeonjae Kim</span>
              <a
                href="mailto:yeonjae.design@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...B300, fontSize: 16, lineHeight: '20px', ...TEXT, textDecoration: 'none' }}
                className="hover:opacity-60 transition-opacity"
              >
                yeonjae.design@gmail.com
              </a>
              <span style={{ ...B400, fontSize: 16, lineHeight: '20px', ...TEXT }}>2026</span>
            </div>
          </div>
        </div>

      </div>
      <BackToTop />
    </div>
    </PasswordGate>
  )
}
