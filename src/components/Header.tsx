import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pourquoi nous', href: '#pourquoi' },
  { label: 'Avis', href: '#avis' },
  { label: "Zone d'intervention", href: '#zone' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(11, 37, 69, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(91, 192, 222, 0.12)' : 'none',
        boxShadow: scrolled ? '0 4px 32px rgba(11, 37, 69, 0.5)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/src/assets/logo-dolphin.svg"
              alt="Dolphin Nettoyage logo"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-lg"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 6px rgba(127,219,255,0.4))' }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm text-[#c8dff0] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#7FDBFF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Devis gratuit
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
            style={{
              background: 'rgba(11, 37, 69, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(91, 192, 222, 0.12)',
            }}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left text-[#c8dff0] hover:text-white px-3 py-3 text-base border-b border-white/5 bg-transparent cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); handleNav('#contact') }}
                className="btn-primary block text-center text-white font-semibold px-5 py-3 rounded-full mt-4"
              >
                Devis gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
