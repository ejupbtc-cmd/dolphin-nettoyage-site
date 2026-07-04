import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

function useCountUp(target: number | string, inView: boolean, duration = 1.8) {
  const isNumber = typeof target === 'number'
  const numTarget = isNumber ? target : parseFloat(target as string)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || !isNumber) return
    let start = 0
    const step = numTarget / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= numTarget) { setCount(numTarget); clearInterval(id) }
      else setCount(parseFloat(start.toFixed(1)))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [inView, numTarget, duration, isNumber])

  return isNumber ? count : target
}

const testimonials = [
  {
    name: 'Sophie M.',
    location: 'Yverdon-les-Bains',
    text: 'Service impeccable ! Mon canapé semblait neuf après le nettoyage. Équipe professionnelle, ponctuelle et très soigneuse. Je recommande vivement.',
    service: 'Nettoyage Textile',
    avatar: 'SM',
    color: '#7FDBFF',
  },
  {
    name: 'Marc R.',
    location: 'Lausanne',
    text: 'Nettoyage de fin de chantier réalisé rapidement et avec soin. Résultat parfait, prix honnête et devis reçu en moins de 2h. Très sérieux.',
    service: 'Nettoyage Industriel',
    avatar: 'MR',
    color: '#5BC0DE',
  },
  {
    name: 'Isabelle V.',
    location: 'Morges',
    text: "J'ai fait nettoyer l'intérieur de ma voiture — résultat bluffant ! Comme sortie du concessionnaire. Le nettoyage sans eau est vraiment efficace.",
    service: 'Voiture',
    avatar: 'IV',
    color: '#2E86AB',
  },
]

function StatCounter({
  value, suffix, label, inView, decimals = 0,
}: { value: number; suffix: string; label: string; inView: boolean; decimals?: number }) {
  const count = useCountUp(value, inView, 1.6) as number
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString()
  return (
    <div className="text-center">
      <div
        className="text-3xl sm:text-4xl font-black gradient-text"
        style={{ fontFamily: 'Sora, sans-serif' }}
        aria-live="polite"
      >
        {display}{suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}

function Stars({ inView }: { inView: boolean }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label="5 étoiles sur 5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300, damping: 18 }}
        >
          <Star size={14} fill="#FFB800" color="#FFB800" />
        </motion.div>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="avis"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--white)' }}
    >
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          style={{ maxWidth: '640px', marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Avis clients</span>
          <h2 className="h2-section mb-6">
            Ils nous font <span className="gradient-text">confiance</span>
          </h2>
          <p className="body-lg">
            La satisfaction de nos clients est notre meilleure carte de visite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="card p-8 flex flex-col group hover:scale-[1.02] transition-all duration-300"
              style={{ gap: '24px' }}
            >
              <div className="flex items-center justify-between">
                <Stars inView={inView} />
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(46,134,171,0.08)',
                    border: '1px solid rgba(46,134,171,0.18)',
                    color: 'var(--blue)',
                  }}
                >
                  {t.service}
                </span>
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                "{t.text}"
              </p>

              <div
                className="flex items-center gap-3 pt-2 border-t"
                style={{ borderColor: 'var(--border-soft)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `rgba(46,134,171,0.1)`,
                    border: `1.5px solid rgba(46,134,171,0.2)`,
                    color: 'var(--blue)',
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--navy-deep)' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-12 mt-16"
        >
          <StatCounter value={5.0} suffix="" label="Note moyenne" inView={inView} decimals={1} />
          <StatCounter value={100} suffix="+" label="Clients satisfaits" inView={inView} />
          <StatCounter value={3} suffix=" ans" label="d'expérience" inView={inView} />
        </motion.div>
      </div>
    </section>
  )
}
