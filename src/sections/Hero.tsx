import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import WaveBackground from '../components/WaveBackground'

const trustItems = [
  { icon: '📍', label: 'Canton de Vaud' },
  { icon: '✅', label: 'Devis gratuit' },
  { icon: '⚡', label: 'Réponse rapide' },
]

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-16"
      style={{
        background: 'linear-gradient(180deg, #061829 0%, #0B2545 45%, #0d2e57 100%)',
      }}
    >
      <WaveBackground />

      {/* Discount badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        className="badge-float absolute top-28 right-4 sm:right-10 lg:right-20 xl:right-32 z-10"
      >
        <div className="glass-card rounded-2xl px-4 py-3 text-center"
          style={{ boxShadow: '0 0 30px rgba(91,192,222,0.25)' }}>
          <div className="text-2xl font-black text-[#7FDBFF]" style={{ fontFamily: 'Sora, sans-serif' }}>-20%</div>
          <div className="text-xs text-[#c8dff0] font-medium leading-tight mt-0.5">sur votre 1er<br />nettoyage</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#5BC0DE] animate-pulse" />
          <span className="text-xs text-[#7FDBFF] font-medium tracking-wide uppercase">
            Nettoyage professionnel — Canton de Vaud
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
          style={{ opacity: 0 }}
        >
          Votre expert du{' '}
          <span className="gradient-text">nettoyage</span>
          <br />à domicile
        </h1>

        <p
          ref={subRef}
          className="text-base sm:text-lg md:text-xl text-[#a8cce0] leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Particuliers &amp; professionnels — <strong className="text-white">devis gratuit sous 24h</strong>,
          intervention rapide dans tout le Canton de Vaud.
          Un service haut de gamme, des résultats impeccables.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/41779915344"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex items-center gap-3 text-white font-bold px-7 py-4 rounded-full text-base w-full sm:w-auto justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
            </svg>
            Obtenir mon devis gratuit
          </a>
          <a
            href="#services"
            onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-outline text-white font-semibold px-7 py-4 rounded-full text-base w-full sm:w-auto text-center"
          >
            Découvrir nos services
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {trustItems.map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-[#a8cce0] font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#5BC0DE] opacity-60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
