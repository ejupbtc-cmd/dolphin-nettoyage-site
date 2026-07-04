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
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#EEF4FA' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(46,134,171,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label">Zone d'intervention</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: '#0F1C2E' }}>
            Tout le <span className="gradient-text">Canton de Vaud</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#4A6580' }}>
            Basés à Yverdon-les-Bains, nous intervenons dans tout le canton.
            Contactez-nous pour confirmer votre commune.
          </p>
        </motion.div>

        {/* Illustrative map-style layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="card rounded-3xl p-10 sm:p-14 relative overflow-hidden"
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
            <div className="w-4 h-4 rounded-full bg-[#5BC0DE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ boxShadow: '0 0 20px rgba(91,192,222,0.6)' }} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-12">
            {/* Main badge */}
            <div className="flex-shrink-0 text-center">
              <div className="inline-flex flex-col items-center gap-3 card rounded-2xl px-8 py-6">
                <MapPin size={36} style={{ color: '#2E86AB' }} />
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#0F1C2E' }}>
                    Yverdon-les-Bains
                  </div>
                  <div className="text-sm" style={{ color: '#1E6091' }}>& Lausanne</div>
                  <div className="text-xs mt-1" style={{ color: '#8BA4BA' }}>Base principale</div>
                </div>
              </div>
            </div>

            {/* City grid */}
            <div>
              <p className="text-sm mb-5 font-medium" style={{ color: '#8BA4BA' }}>Communes desservies :</p>
              <div className="flex flex-wrap gap-3">
                {cities.map(city => (
                  <span
                    key={city.name}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: city.main ? 'rgba(46,134,171,0.12)' : 'rgba(46,134,171,0.05)',
                      border: city.main ? '1.5px solid rgba(46,134,171,0.3)' : '1px solid rgba(46,134,171,0.12)',
                      color: city.main ? '#1E6091' : '#4A6580',
                    }}
                  >
                    {city.main && <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2E86AB' }} />}
                    {city.name}
                  </span>
                ))}
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm"
                  style={{ border: '1px dashed rgba(46,134,171,0.2)', color: '#8BA4BA' }}
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
