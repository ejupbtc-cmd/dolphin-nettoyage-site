import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'

function useCountUp(target: number, inView: boolean, duration = 1.6) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(id) }
      else setCount(parseFloat(start.toFixed(1)))
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [inView, target, duration])
  return count
}

function Stars({ inView }: { inView: boolean }) {
  return (
    <div className="flex gap-1" role="img" aria-label="5 étoiles sur 5">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.04 * i, type: 'spring', stiffness: 320, damping: 18 }}
        >
          <Star size={15} fill="#FFB800" color="#FFB800" />
        </motion.div>
      ))}
    </div>
  )
}

function StatItem({ value, suffix, label, inView, decimals = 0 }: {
  value: number; suffix: string; label: string; inView: boolean; decimals?: number
}) {
  const count = useCountUp(value, inView)
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString()
  return (
    <div
      className="flex flex-col items-center text-center rounded-2xl"
      style={{
        padding: 'clamp(16px, 3.5vw, 28px) clamp(16px, 4vw, 32px)',
        background: 'var(--white)',
        border: '1px solid var(--border-soft)',
        boxShadow: '0 2px 16px rgba(11,27,46,0.06)',
        minWidth: 'min(120px, 28vw)',
      }}
    >
      <div
        className="font-black gradient-text"
        style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1 }}
        aria-live="polite"
      >
        {display}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}

export default function Testimonials() {
  const { testimonials } = useSiteData()
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          style={{ maxWidth: '600px', marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Avis clients</span>
          <h2 className="h2-section mb-5">
            Ils nous font <span className="gradient-text">confiance</span>
          </h2>
          <p className="body-lg">
            La satisfaction de nos clients est notre meilleure carte de visite.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 44 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="card flex flex-col"
              style={{ padding: '32px', gap: '20px' }}
            >
              {/* Top row: stars + service tag */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <Stars inView={inView} />
                {t.service && (
                  <span
                    className="text-xs font-semibold rounded-full flex-shrink-0"
                    style={{
                      padding: '5px 12px',
                      background: 'rgba(46,134,171,0.07)',
                      border: '1px solid rgba(46,134,171,0.18)',
                      color: 'var(--blue)',
                    }}
                  >
                    {t.service}
                  </span>
                )}
              </div>

              {/* Quote */}
              <p
                className="flex-1 leading-relaxed"
                style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3"
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-soft)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: 'rgba(46,134,171,0.1)',
                    border: '1.5px solid rgba(46,134,171,0.2)',
                    color: 'var(--blue)',
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--navy-deep)' }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-6 mt-16"
        >
          <StatItem value={5.0} suffix="" label="Note moyenne" inView={inView} decimals={1} />
          <StatItem value={100} suffix="+" label="Clients satisfaits" inView={inView} />
          <StatItem value={3} suffix=" ans" label="d'expérience" inView={inView} />
        </motion.div>

      </div>
    </section>
  )
}
