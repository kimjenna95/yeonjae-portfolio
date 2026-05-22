'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-bg overflow-hidden">
      {/* Rotating arc decoration */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <circle cx="80" cy="80" r="70" stroke="#C8745A" strokeWidth="1" strokeDasharray="8 6" strokeOpacity="0.3" />
            <circle cx="80" cy="80" r="50" stroke="#F0EDE8" strokeWidth="0.5" strokeOpacity="0.1" />
          </svg>
        </motion.div>
      </div>

      <div className="mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Giant CTA */}
        <div className="text-center mb-16">
          <a
            href="mailto:yeonjae.j.kim@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-display inline-block text-5xl md:text-7xl lg:text-9xl text-foreground hover:text-accent transition-colors duration-300"
          >
            LET&apos;S TALK
          </a>
          <p className="mt-4 text-foreground/40 text-sm">yeonjae.j.kim@gmail.com</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/30">
          <p>© {new Date().getFullYear()} YeonJae Kim. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/yeonjaekim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://behance.net/yeonjaekim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
