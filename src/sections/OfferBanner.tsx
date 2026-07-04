import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
    </svg>
  )
}

const checks = ['Devis gratuit', 'Sans engagement', 'Réponse sous 24h']

export default function OfferBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28 lg:py-36"
      style={{ background: 'var(--navy-deep)' }}
      aria-labelledby="offer-heading"
    >
      {/* Single clean radial — no animation, no glow loop */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,134,171,0.16) 0%, transparent 65%)',
        }}
      />
      {/* Thin top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(91,192,222,0.4) 50%, transparent 100%)' }}
      />

      <div className="container-page relative z-10" style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full mb-8"
            style={{
              padding: '10px 22px',
              background: 'rgba(91,192,222,0.1)',
              border: '1px solid rgba(91,192,222,0.22)',
            }}
          >
            <span aria-hidden="true">🎉</span>
            <span className="eyebrow" style={{ color: 'var(--turquoise)' }}>Offre de bienvenue</span>
          </motion.div>

          {/* Big number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 180, damping: 20 }}
          >
            <span
              id="offer-heading"
              className="block font-black leading-none"
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(72px, 14vw, 120px)',
                background: 'linear-gradient(135deg, var(--turquoise) 0%, var(--aqua) 50%, #b8e8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              -20%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.65 }}
            style={{ marginTop: '12px' }}
          >
            <h2
              className="font-bold text-white"
              style={{ fontSize: 'clamp(20px, 3vw, 26px)', marginBottom: '16px' }}
            >
              sur votre premier nettoyage
            </h2>

            <p style={{ color: '#8db8d0', fontSize: '16px', lineHeight: 1.75, maxWidth: '460px', marginInline: 'auto', marginBottom: '40px' }}>
              Profitez de cette offre de bienvenue pour découvrir notre savoir-faire.
              Valable sur tous nos services, sans condition de montant minimum.
            </p>

            <a
              href="https://wa.me/41779915344"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-3 rounded-full w-full sm:w-auto"
              style={{ fontSize: '16px', padding: '18px 36px' }}
            >
              <WaIcon />
              Je profite de l'offre
            </a>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
              {checks.map(c => (
                <div key={c} className="flex items-center gap-2" style={{ color: '#6a90a8', fontSize: '14px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="7" fill="rgba(91,192,222,0.15)"/>
                    <path d="M4 7l2 2 4-4" stroke="#5BC0DE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {c}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
