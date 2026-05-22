'use client'

import { useEffect, useRef } from 'react'

interface FadeUpProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export default function FadeUp({ children, style, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fade-up${className ? ` ${className}` : ''}`} style={style}>
      {children}
    </div>
  )
}
