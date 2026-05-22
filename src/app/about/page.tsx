'use client'

import { useEffect, useRef, useState } from 'react'
import PageHeader from '@/components/PageHeader'

const B300: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 300 }
const B600: React.CSSProperties = { fontFamily: 'Barlow, sans-serif', fontWeight: 600 }
const L700: React.CSSProperties = { fontFamily: 'Lato, sans-serif', fontWeight: 700 }

export default function AboutPage() {
  const [hovered, setHovered] = useState(false)
  const headshotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headshotRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#101314' }}>
      <PageHeader active="About" />

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />

      {/* Content */}
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '64px 24px 300px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>

          {/* Photo — hover swaps headshot → alternate image */}
          <div
            ref={headshotRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="fade-up"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 321.992,
              flexShrink: 0,
              aspectRatio: '321.992 / 429.328',
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            {/* Primary headshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/headshot.jpg"
              alt="Yeonjae Kim"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: hovered ? 0 : 1,
              }}
            />
            {/* Hover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/headshot-hover.jpg"
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: hovered ? 1 : 0,
              }}
            />
          </div>

          {/* Bio */}
          <div style={{ ...B300, fontSize: 16, lineHeight: '26px', color: '#fff', maxWidth: 500, flex: '1 1 300px' }}>
            <p style={{ marginBottom: 20 }}>
              <strong style={{ ...B600 }}>Hey! I&rsquo;m Yeonjae</strong>
              {' '}— a product designer based in Texas. Over the past few years, I&rsquo;ve worked on
              enterprise-scale products and internal platforms, helping transform complex workflows
              into experiences that feel intuitive, scalable, and a little more human.
            </p>

            <p style={{ marginBottom: 20 }}>
              What excites me most about design is turning ambiguity into clarity — bringing ideas
              from early exploration into thoughtful solutions that create meaningful impact. I enjoy
              the collaborative nature of design; whether it&rsquo;s within large organizations or
              smaller teams, I&rsquo;ve found the process to be most rewarding when people with
              different perspectives can listen to, learn from, and challenge one another.
            </p>

            <p style={{ marginBottom: 20 }}>
              Coming from a fashion background continues to shape the way I think about design today.
              It taught me to care deeply about composition, storytelling, and detail, which naturally
              evolved into a love for product thinking and systems design. Today, design feels like the
              perfect blend of creativity and logic, where visual craft and problem-solving come together
              in meaningful ways.
            </p>

            <p style={{ marginBottom: 20 }}>
              Outside of work, you can usually find me taking photos with my digital camera, baking
              something unnecessarily ambitious, illustrating, or experimenting with ways to bring
              code and design a little closer together.
            </p>

            <p style={{ marginBottom: 32 }}>
              BTW, friends call me Jenna.
            </p>

            {/* Contact */}
            <div style={{ marginTop: 40 }}>
              <div style={{ ...L700, fontSize: 12, letterSpacing: '0.1em', color: '#a4a4a4', textTransform: 'uppercase' as const, marginBottom: 24 }}>
                Contact
              </div>
              <div style={{ display: 'inline-block', marginRight: 48 }}>
                <a
                  href="mailto:yeonjae.design@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...B600, fontSize: 16, lineHeight: '20px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgb(100, 100, 100)', paddingBottom: 2, display: 'inline-block' }}
                  className="hover:border-white transition-colors"
                >
                  yeonjae.design@gmail.com
                </a>
              </div>
              <div style={{ display: 'inline-block' }}>
                <a
                  href="https://www.linkedin.com/in/kimyeonjae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...B600, fontSize: 16, lineHeight: '20px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgb(100, 100, 100)', paddingBottom: 2, display: 'inline-block' }}
                  className="hover:border-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
