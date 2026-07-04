import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'

const mainCities = ['Yverdon-les-Bains', 'Lausanne']
const otherCities = [
  'Nyon', 'Morges', 'Vevey', 'Payerne',
  'Orbe', 'Grandson', 'Pomy', 'Chavornay',
  'Echallens', 'Moudon',
]

export default function ZoneIntervention() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="zone"
      ref={ref}
      className="section-pad relative"
      style={{ background: 'var(--bg-ice)' }}
    >
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
          style={{ maxWidth: '600px', marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Zone d'intervention</span>
          <h2 className="h2-section mb-5">
            Tout le <span className="gradient-text">Canton de Vaud</span>
          </h2>
          <p className="body-lg">
            Basés à Yverdon-les-Bains, nous intervenons dans tout le canton.
            Contactez-nous pour confirmer votre commune.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="card"
          style={{ padding: 'clamp(28px, 5vw, 56px)' }}
        >
          <div className="flex flex-col lg:flex-row" style={{ gap: '48px' }}>

            {/* Left: base principale */}
            <div
              className="flex-shrink-0"
              style={{ minWidth: '220px' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--blue)' }}>
                Base principale
              </p>
              <div className="flex flex-col" style={{ gap: '12px' }}>
                {mainCities.map(city => (
                  <div
                    key={city}
                    className="flex items-center gap-3 rounded-xl"
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(46,134,171,0.07)',
                      border: '1.5px solid rgba(46,134,171,0.18)',
                    }}
                  >
                    <MapPin size={16} style={{ color: 'var(--blue-light)', flexShrink: 0 }} />
                    <span className="font-semibold text-sm" style={{ color: 'var(--navy-deep)' }}>{city}</span>
                  </div>
                ))}
              </div>

              {/* Stat pill */}
              <div
                className="flex items-center gap-3 rounded-xl mt-6"
                style={{
                  padding: '14px 18px',
                  background: 'linear-gradient(135deg, rgba(30,96,145,0.08), rgba(46,134,171,0.05))',
                  border: '1px solid rgba(30,96,145,0.12)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(91,192,222,0.15)' }}
                >
                  <span style={{ fontSize: '14px' }}>📍</span>
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>Canton de Vaud</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Couverture complète</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="hidden lg:block flex-shrink-0 w-px"
              style={{ background: 'var(--border-soft)' }}
              aria-hidden="true"
            />
            <div
              className="block lg:hidden h-px w-full"
              style={{ background: 'var(--border-soft)' }}
              aria-hidden="true"
            />

            {/* Right: all cities */}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--blue)' }}>
                Communes desservies
              </p>
              <div className="flex flex-wrap" style={{ gap: '10px' }}>
                {otherCities.map((city, i) => (
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.04, duration: 0.35 }}
                    className="inline-flex items-center text-sm font-medium rounded-full"
                    style={{
                      padding: '8px 18px',
                      background: 'rgba(46,134,171,0.05)',
                      border: '1px solid var(--border-soft)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {city}
                  </motion.span>
                ))}
                <span
                  className="inline-flex items-center text-sm rounded-full"
                  style={{
                    padding: '8px 18px',
                    border: '1px dashed rgba(46,134,171,0.28)',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  + et bien d'autres…
                </span>
              </div>

              <p className="text-sm mt-6" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Vous ne voyez pas votre commune ?{' '}
                <a
                  href="https://wa.me/41779915344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                  style={{ color: 'var(--blue)' }}
                >
                  Contactez-nous
                </a>{' '}
                pour vérifier la disponibilité dans votre zone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
