'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const skills = [
  'User Research',
  'UX Strategy',
  'UI Design',
  'Prototyping',
  'Figma',
  'Design Systems',
  'Interaction Design',
  'Data Visualization',
  'Usability Testing',
  'HTML/CSS',
]

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="px-6 md:px-12 lg:px-16 py-24 md:py-36 border-t border-foreground/10 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Giant italic quote — grid-breaking */}
        <div className="mb-20 -mx-6 md:-mx-12 lg:-mx-16 px-6 md:px-12 lg:px-16 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-display-italic leading-none select-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
          >
            &ldquo;Friends call me Jenna.&rdquo;
          </motion.p>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left: headshot placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] w-full max-w-sm bg-foreground/5 border border-foreground/10 overflow-hidden">
              {/* Placeholder pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 border border-accent/30 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">YK</span>
                  </div>
                  <p className="text-foreground/20 text-sm">Headshot placeholder</p>
                </div>
              </div>
              {/* Decorative corner lines */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent/40" />
            </div>
          </motion.div>

          {/* Right: bio + skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-xs tracking-widest uppercase text-accent mb-4 font-medium">
                About
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed mb-4">
                I&rsquo;m YeonJae Kim — a Senior UX/UI Product Designer at Cisco, where I craft
                data-driven experiences that make complex enterprise products feel intuitive.
              </p>
              <p className="text-foreground/50 leading-relaxed">
                Previously at J.P. Morgan Chase, OxeFit, JCPenney, and Banana Republic. I bridge
                the gap between user empathy and business strategy, turning ambiguous problems into
                elegant, measurable solutions.
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs tracking-widest uppercase text-foreground/30 mb-4 font-medium">
                Capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium border border-foreground/10 text-foreground/60 hover:border-accent/40 hover:text-foreground transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-4 transition-all duration-200 group"
            >
              Full story
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
