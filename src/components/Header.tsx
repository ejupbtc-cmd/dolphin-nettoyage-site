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
    const onScroll = () => setScrolled(window.scrollY > 80)
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
        background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--border-soft)' : 'none',
      }}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-[72px] lg:h-[88px]">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center group"
            style={{ gap: '12px' }}
            aria-label="Dolphin Nettoyage — Retour en haut"
          >
            <span
              className="flex items-center justify-center flex-shrink-0 rounded-full"
              style={{ width: '48px', height: '48px', background: 'rgba(46,134,171,0.08)', fontSize: '26px' }}
              aria-hidden="true"
            >
              🐬
            </span>
            <div>
              <div
                className="font-black leading-tight tracking-tight"
                style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.05rem', color: 'var(--navy-deep)' }}
              >
                DOLPHIN
              </div>
              <div
                className="font-semibold tracking-widest"
                style={{ fontSize: '0.58rem', color: 'var(--blue-light)' }}
              >
                NETTOYAGE
              </div>
            </div>
          </a>

          {/* Desktop nav — starts at lg: the French labels don't fit md's 768-1023px range */}
          <nav className="hidden lg:flex items-center" style={{ gap: '40px' }} aria-label="Navigation principale">
            {navLinks.map(link => {
              const sectionId = link.href.slice(1)
              const isActive  = activeSection === sectionId
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none group"
                  style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px"
                    style={{ background: 'var(--blue-light)', width: isActive ? '100%' : '0%', transition: 'width 300ms' }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full opacity-60" style={{ background: 'var(--aqua)', transition: 'width 300ms' }} />
                </button>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="btn-primary text-white text-sm font-semibold rounded-full"
              style={{ padding: '14px 28px', minHeight: 'auto' }}
            >
              Devis gratuit
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-200"
            style={{ color: 'var(--navy-deep)' }}
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
            className="lg:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-soft)',
              boxShadow: '0 8px 32px rgba(46, 134, 171, 0.1)',
            }}
          >
            <nav className="container-page pt-2 pb-6 space-y-1" aria-label="Navigation mobile">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left px-3 py-4 text-base font-medium border-b cursor-pointer bg-transparent transition-colors duration-150"
                  style={{
                    color: 'var(--navy-deep)',
                    borderColor: 'var(--border-soft)',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); handleNav('#contact') }}
                className="btn-primary block text-center text-white font-semibold rounded-full mt-4"
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
