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
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #091e3a 0%, #0B2545 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30,96,145,0.1) 0%, transparent 70%)',
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5BC0DE] mb-4">
            Zone d'intervention
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Tout le <span className="gradient-text">Canton de Vaud</span>
          </h2>
          <p className="text-[#a8cce0] text-lg max-w-xl mx-auto">
            Basés à Yverdon-les-Bains, nous intervenons dans tout le canton.
            Contactez-nous pour confirmer votre commune.
          </p>
        </motion.div>

        {/* Illustrative map-style layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Decorative circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute rounded-full border border-[#2E86AB]/15"
                style={{
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

          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Main badge */}
            <div className="flex-shrink-0 text-center">
              <div className="inline-flex flex-col items-center gap-3 glass-card rounded-2xl px-8 py-6">
                <MapPin size={36} className="text-[#5BC0DE]" />
                <div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Yverdon-les-Bains
                  </div>
                  <div className="text-sm text-[#7FDBFF]">& Lausanne</div>
                  <div className="text-xs text-[#6a90a8] mt-1">Base principale</div>
                </div>
              </div>
            </div>

            {/* City grid */}
            <div>
              <p className="text-sm text-[#6a90a8] mb-4 font-medium">Communes desservies :</p>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <span
                    key={city.name}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: city.main ? 'rgba(46,134,171,0.25)' : 'rgba(46,134,171,0.1)',
                      border: city.main ? '1px solid rgba(91,192,222,0.4)' : '1px solid rgba(91,192,222,0.15)',
                      color: city.main ? '#7FDBFF' : '#a8cce0',
                    }}
                  >
                    {city.main && <span className="w-1.5 h-1.5 rounded-full bg-[#5BC0DE]" />}
                    {city.name}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-[#5a7a8e]"
                  style={{ border: '1px dashed rgba(91,192,222,0.2)' }}>
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
