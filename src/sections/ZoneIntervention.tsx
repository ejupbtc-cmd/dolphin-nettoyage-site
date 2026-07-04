import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'

const cities = [
  { name: 'Yverdon-les-Bains', main: true },
  { name: 'Lausanne', main: true },
  { name: 'Nyon' },
  { name: 'Morges' },
  { name: 'Vevey' },
  { name: 'Payerne' },
  { name: 'Orbe' },
  { name: 'Grandson' },
  { name: 'Pomy' },
  { name: 'Chavornay' },
  { name: 'Echallens' },
  { name: 'Moudon' },
]

export default function ZoneIntervention() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="zone"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--bg-ice)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(46,134,171,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="container-page relative z-10" style={{ maxWidth: '1024px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          style={{ maxWidth: '640px', marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Zone d'intervention</span>
          <h2 className="h2-section mb-6">
            Tout le <span className="gradient-text">Canton de Vaud</span>
          </h2>
          <p className="body-lg">
            Basés à Yverdon-les-Bains, nous intervenons dans tout le canton.
            Contactez-nous pour confirmer votre commune.
          </p>
        </motion.div>

        {/* Illustrative map-style layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="card relative overflow-hidden p-6 sm:p-10 lg:p-14"
        >
          {/* Decorative circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  border: '1px solid rgba(46,134,171,0.12)',
                  width: `${(i + 1) * 180}px`,
                  height: `${(i + 1) * 180}px`,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.6 - i * 0.15,
                }}
              />
            ))}
            <div className="w-4 h-4 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'var(--aqua)', boxShadow: '0 0 20px rgba(91,192,222,0.6)' }} />
          </div>

          <div className="flex flex-col sm:flex-row items-center" style={{ gap: '48px' }}>
            {/* Main badge */}
            <div className="flex-shrink-0 text-center">
              <div className="card inline-flex flex-col items-center" style={{ gap: '12px', padding: '24px 32px' }}>
                <MapPin size={36} style={{ color: 'var(--blue-light)' }} />
                <div>
                  <div className="h3-card" style={{ fontSize: '18px' }}>
                    Yverdon-les-Bains
                  </div>
                  <div className="text-sm" style={{ color: 'var(--blue)' }}>& Lausanne</div>
                  <div className="text-sm-meta mt-1">Base principale</div>
                </div>
              </div>
            </div>

            {/* City grid */}
            <div>
              <p className="text-sm mb-5 font-medium" style={{ color: 'var(--text-muted)' }}>Communes desservies :</p>
              <div className="flex flex-wrap" style={{ gap: '12px' }}>
                {cities.map(city => (
                  <span
                    key={city.name}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '999px',
                      background: city.main ? 'rgba(46,134,171,0.12)' : 'rgba(46,134,171,0.05)',
                      border: city.main ? '1.5px solid rgba(46,134,171,0.3)' : '1px solid var(--border-soft)',
                      color: city.main ? 'var(--blue)' : 'var(--text-muted)',
                    }}
                  >
                    {city.main && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--blue-light)' }} />}
                    {city.name}
                  </span>
                ))}
                <span
                  className="inline-flex items-center text-sm"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '999px',
                    border: '1px dashed rgba(46,134,171,0.3)',
                    color: 'var(--text-muted)',
                  }}
                >
                  + et bien d'autres…
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
