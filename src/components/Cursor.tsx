'use client'

import { useEffect, useRef, useState } from 'react'
import { useSpring, motion } from 'framer-motion'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useSpring(0, { stiffness: 200, damping: 25 })
  const mouseY = useSpring(0, { stiffness: 200, damping: 25 })

  const circleX = useSpring(0, { stiffness: 80, damping: 20 })
  const circleY = useSpring(0, { stiffness: 80, damping: 20 })

  useEffect(() => {
    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      circleX.set(e.clientX)
      circleY.set(e.clientY)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.dataset.cursor === 'hover'
      ) {
        setHovering(true)
      }
    }

    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [mouseX, mouseY, circleX, circleY])

  if (!mounted) return null

  return (
    <>
      <motion.div
        ref={dotRef}
        className={`cursor-dot${hovering ? ' hovering' : ''}`}
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        ref={circleRef}
        className={`cursor-circle${hovering ? ' hovering' : ''}`}
        style={{ x: circleX, y: circleY }}
      />
    </>
  )
}
