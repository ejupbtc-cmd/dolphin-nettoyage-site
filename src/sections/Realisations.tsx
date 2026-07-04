import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'

const CATEGORIES = ['Tous', 'Textile', 'Voiture', 'Industriel', 'Surfaces', 'Autre']

export default function Realisations() {
  const { realisations } = useSiteData()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState('Tous')
  const [selected, setSelected] = useState<string | null>(null)

  if (realisations.length === 0) return null

  const filtered = filter === 'Tous' ? realisations : realisations.filter(r => r.category === filter)
  const selectedItem = realisations.find(r => r.id === selected)

  return (
    <section
      id="realisations"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--white)' }}
    >
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
          style={{ maxWidth: '640px', marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Galerie</span>
          <h2 className="h2-section mb-6">
            Nos <span className="gradient-text">réalisations</span>
          </h2>
          <p className="body-lg">
            Découvrez quelques-uns de nos travaux récents.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.filter(c => c === 'Tous' || realisations.some(r => r.category === c)).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: '999px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: filter === cat ? 'linear-gradient(135deg, var(--blue-light), var(--blue))' : 'rgba(46,134,171,0.06)',
                color: filter === cat ? '#fff' : 'var(--text-muted)',
                border: filter === cat ? 'none' : '1.5px solid rgba(46,134,171,0.18)',
                boxShadow: filter === cat ? '0 4px 16px rgba(30,96,145,0.2)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="card group cursor-pointer overflow-hidden"
                onClick={() => setSelected(r.id)}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(30,96,145,0.35)' }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <span className="text-white font-semibold text-sm" style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 18px', borderRadius: 20, backdropFilter: 'blur(8px)' }}>
                      Voir en grand
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-xs font-semibold mb-2"
                    style={{
                      color: 'var(--blue)',
                      background: 'rgba(46,134,171,0.08)',
                      border: '1px solid rgba(46,134,171,0.18)',
                      padding: '3px 10px',
                      borderRadius: 6,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {r.category}
                  </span>
                  <h3 className="h3-card" style={{ fontSize: '16px', marginBottom: r.description ? '6px' : 0 }}>
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="text-sm" style={{ color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                      {r.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(11,27,46,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: 20,
                overflow: 'hidden',
                maxWidth: 680,
                width: '100%',
                boxShadow: '0 24px 80px rgba(11,27,46,0.4)',
              }}
            >
              <div style={{ position: 'relative' }}>
                <img src={selectedItem.image} alt={selectedItem.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }} />
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(11,27,46,0.6)', backdropFilter: 'blur(6px)',
                    border: 'none', borderRadius: '50%', width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff',
                  }}
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: '20px 24px 24px' }}>
                <span
                  style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--blue)',
                    background: 'rgba(46,134,171,0.08)', padding: '3px 10px', borderRadius: 6,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}
                >
                  {selectedItem.category}
                </span>
                <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700, color: '#0B1B2E', margin: '10px 0 8px' }}>
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p style={{ fontSize: 15, color: '#5A6B80', lineHeight: 1.6, margin: 0 }}>{selectedItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
