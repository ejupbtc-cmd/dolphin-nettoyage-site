import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

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

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
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
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B2545 0%, #091e3a 100%)' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5BC0DE] mb-4">
            Avis clients
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Ils nous font <span className="gradient-text">confiance</span>
          </h2>
          <p className="text-[#a8cce0] text-lg max-w-xl mx-auto">
            La satisfaction de nos clients est notre meilleure carte de visite.
            {/* Placeholder testimonials — to be replaced with real reviews */}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-between">
                <Stars />
                <span className="text-xs text-[#5BC0DE] font-medium px-2 py-1 rounded-full"
                  style={{ background: 'rgba(91,192,222,0.1)', border: '1px solid rgba(91,192,222,0.2)' }}>
                  {t.service}
                </span>
              </div>

              <p className="text-[#c0d8e8] text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `${t.color}30`, border: `1.5px solid ${t.color}50`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-[#6a90a8]">{t.location}</div>
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
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: '5.0', label: 'Note moyenne' },
            { value: '100+', label: 'Clients satisfaits' },
            { value: '3 ans', label: "d'expérience" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black gradient-text" style={{ fontFamily: 'Sora, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#6a90a8]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
