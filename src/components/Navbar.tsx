'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/resume', label: 'Résumé' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-md bg-bg/70 border-b border-white/5' : ''
        }`}
      >
        <div className="mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-poppins font-800 text-xl tracking-tight text-foreground hover:text-accent transition-colors duration-200"
            style={{ fontWeight: 800 }}
          >
            YK
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-6 h-5 justify-center z-[9999]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-foreground transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-bold text-foreground hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-12 left-8 flex gap-6">
              <a
                href="https://linkedin.com/in/yeonjaekim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/50 hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://behance.net/yeonjaekim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/50 hover:text-foreground transition-colors"
              >
                Behance
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
