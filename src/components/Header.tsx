import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services',         href: '#services' },
  { label: 'Pourquoi nous',    href: '#pourquoi' },
  { label: 'Avis',             href: '#avis'     },
  { label: "Zone d'intervention", href: '#zone'  },
  { label: 'Contact',          href: '#contact'  },
]

export default function Header() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [activeSection, setActive]    = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'services', 'pourquoi', 'avis', 'zone', 'contact']
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled
          ? 'rgba(255, 255, 255, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(46, 134, 171, 0.1)' : 'none',
        boxShadow: scrolled ? '0 2px 24px rgba(46, 134, 171, 0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 group"
            aria-label="Dolphin Nettoyage — Retour en haut"
          >
            <span className="text-3xl" aria-hidden="true">🐬</span>
            <div>
              <div
                className="font-black leading-tight tracking-tight"
                style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.05rem', color: '#0B2545' }}
              >
                DOLPHIN
              </div>
              <div
                className="font-semibold tracking-widest"
                style={{ fontSize: '0.58rem', color: '#2E86AB' }}
              >
                NETTOYAGE
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navigation principale">
            {navLinks.map(link => {
              const sectionId = link.href.slice(1)
              const isActive  = activeSection === sectionId
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none group"
                  style={{ color: isActive ? '#1E6091' : '#4A6580' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-[#2E86AB] transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#5BC0DE] transition-all duration-300 group-hover:w-full opacity-60" />
                </button>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Devis gratuit
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-200"
            style={{ color: '#0B2545' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(46, 134, 171, 0.1)',
              boxShadow: '0 8px 32px rgba(46, 134, 171, 0.1)',
            }}
          >
            <nav className="px-4 pt-2 pb-5 space-y-0.5" aria-label="Navigation mobile">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left px-3 py-3.5 text-base font-medium border-b cursor-pointer bg-transparent transition-colors duration-150"
                  style={{
                    color: '#0F1C2E',
                    borderColor: 'rgba(46,134,171,0.08)',
                  }}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
