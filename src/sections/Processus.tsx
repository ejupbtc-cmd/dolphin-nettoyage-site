import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { MessageCircle, CalendarCheck, Sparkles } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Demande de devis',
    desc: 'Contactez-nous par WhatsApp ou formulaire. Nous répondons sous 24h avec un devis gratuit et personnalisé.',
    color: '#1E6091',
    bg: 'rgba(30,96,145,0.08)',
    border: 'rgba(30,96,145,0.2)',
    floatClass: 'icon-float',
  },
  {
    num: '02',
    icon: CalendarCheck,
    title: 'On planifie ensemble',
    desc: 'Vous choisissez le créneau qui vous convient. Nos équipes s\'adaptent à votre agenda, sans tracas.',
    color: '#2E86AB',
    bg: 'rgba(46,134,171,0.08)',
    border: 'rgba(46,134,171,0.2)',
    floatClass: 'icon-float-2',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Résultat impeccable',
    desc: 'Nos professionnels interviennent avec les meilleures techniques. Vous repartez avec un résultat bluffant.',
    color: '#2A9D6E',
    bg: 'rgba(42,157,110,0.08)',
    border: 'rgba(42,157,110,0.2)',
    floatClass: 'icon-float-3',
  },
]

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.16, duration: 0.65, ease: 'easeOut' as const },
  }),
}

export default function Processus() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--bg-ice)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(46,134,171,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 560, marginInline: 'auto' }}
        >
          <span className="eyebrow mb-6 block">Simple & rapide</span>
          <h2 className="h2-section mb-5">
            3 étapes vers un <span className="gradient-text">résultat parfait</span>
          </h2>
          <p className="body-lg">
            De la demande au nettoyage, tout est pensé pour que vous n'ayez aucun souci.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 pointer-events-none"
            aria-hidden="true"
            style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, rgba(46,134,171,0.22) 20%, rgba(46,134,171,0.22) 80%, transparent 100%)', zIndex: 0 }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                custom={i}
                variants={variants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="relative"
                style={{ zIndex: 1 }}
              >
                <div
                  className="card flex flex-col items-center text-center h-full"
                  style={{ padding: 'clamp(20px, 4vw, 32px)', background: 'var(--white)' }}
                >
                  {/* Step number badge */}
                  <div
                    className="step-pulse flex items-center justify-center rounded-full mb-5 relative"
                    style={{
                      width: 64, height: 64,
                      background: step.bg,
                      border: `2px solid ${step.border}`,
                      color: step.color,
                    }}
                  >
                    <Icon size={26} aria-hidden="true" className={step.floatClass} />
                    {/* Number tag */}
                    <span
                      className="absolute flex items-center justify-center rounded-full text-white font-black"
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: '10px',
                        width: 22, height: 22,
                        top: -6, right: -6,
                        background: step.color,
                        boxShadow: `0 2px 8px ${step.color}44`,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="h3-card mb-3" style={{ fontSize: '18px' }}>
                    {step.title}
                  </h3>
                  <p className="body-md" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <a
            href="https://wa.me/41779915344"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3"
            style={{ borderRadius: 14 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
            </svg>
            Demander mon devis gratuit
          </a>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Réponse garantie sous 24h · Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
