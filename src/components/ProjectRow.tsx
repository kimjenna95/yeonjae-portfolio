'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useSpring } from 'framer-motion'
import { Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectRow({ project, index }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  const springX = useSpring(0, { stiffness: 120, damping: 20 })
  const springY = useSpring(0, { stiffness: 120, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rowRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    springX.set(x - 160)
    springY.set(y - 110)
  }

  const padded = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative border-b border-foreground/10 py-6 md:py-8 flex items-center gap-6 md:gap-10 group overflow-hidden">
          {/* Index */}
          <span className="text-xs font-medium text-foreground/30 w-8 shrink-0 font-mono">
            {padded}
          </span>

          {/* Project name */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 truncate">
              {project.name}
            </h2>
          </div>

          {/* Category */}
          <span className="hidden md:block text-sm text-foreground/40 shrink-0">
            {project.category}
          </span>

          {/* Year */}
          <span className="text-sm text-foreground/30 shrink-0 font-mono">{project.year}</span>

          {/* Arrow */}
          <span className="hidden md:block text-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 text-lg">
            →
          </span>

          {/* Mobile thumbnail (always visible on mobile) */}
          <div className="md:hidden shrink-0 w-16 h-12 relative overflow-hidden rounded">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
            />
          </div>
        </div>
      </Link>

      {/* Hover reveal image (desktop only) */}
      <motion.div
        className="hidden md:block absolute pointer-events-none z-10 w-80 h-56 overflow-hidden rounded-sm shadow-2xl"
        style={{
          x: springX,
          y: springY,
          top: 0,
          left: 0,
        }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          className="object-cover"
          sizes="320px"
          unoptimized
        />
      </motion.div>
    </motion.div>
  )
}
