import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function WaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
    </svg>
  )
}

export default function OfferBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-24 lg:py-40"
      style={{ background: 'var(--navy-deep)' }}
      aria-labelledby="offer-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(46,134,171,0.14) 0%, transparent 70%)',
        }}
      />

      <div className="container-page relative z-10" style={{ maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden offer-glow shine-sweep text-center p-10 lg:p-20"
          style={{
            borderRadius: '24px',
            background: 'var(--glass-dark-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-dark-border)',
          }}
        >
          <div
            className="absolute top-0 left-1/4 right-1/4 h-px"
            aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(127,219,255,0.55), transparent)' }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6, type: 'spring' }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full mb-6"
              style={{ padding: '10px 20px', background: 'rgba(91,192,222,0.1)', border: '1px solid rgba(91,192,222,0.2)' }}
            >
              <span aria-hidden="true">🎉</span>
              <span className="eyebrow" style={{ color: 'var(--turquoise)' }}>
                Offre spéciale
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center" style={{ gap: '24px' }}>
            <div>
              <span
                id="offer-heading"
                className="text-7xl sm:text-8xl font-black shimmer-text block leading-none"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                -20%
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ marginTop: '16px' }}>
                sur votre 1er nettoyage
              </h2>
            </div>

            <p style={{ color: '#a8cce0', maxWidth: '480px' }} className="text-base">
              Profitez de cette offre de bienvenue pour découvrir notre savoir-faire.
              Valable sur tous nos services, sans condition de montant minimum.
            </p>

            <a
              href="https://wa.me/41779915344"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp pulse-wa-btn inline-flex items-center gap-3 rounded-full text-lg"
            >
              <WaIcon />
              Je profite de l'offre
            </a>

            <p className="text-xs" style={{ color: '#6a90a8' }}>
              Devis gratuit · Pas d'engagement · Réponse sous 24h
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
