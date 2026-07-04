import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, Leaf, Zap, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const differentiators = [
  {
    icon: Clock,
    title: 'Devis gratuit sous 24h',
    desc: 'Envoyez-nous votre demande, nous vous répondons en moins de 24 heures avec un devis personnalisé et transparent.',
    color: '#7FDBFF',
  },
  {
    icon: Zap,
    title: 'Intervention rapide',
    desc: 'Nos équipes sont disponibles rapidement sur tout le Canton de Vaud. Urgence ou planification, nous nous adaptons.',
    color: '#5BC0DE',
  },
  {
    icon: Leaf,
    title: 'Écologique & sans eau',
    desc: 'Notre nettoyage extérieur voiture est 100% écologique, sans eau — moins de gaspillage, des résultats supérieurs.',
    color: '#4CAF82',
  },
  {
    icon: Users,
    title: 'Particuliers & Professionnels',
    desc: 'Que vous soyez particulier, PME, cabinet médical ou gérant Airbnb, nous avons la solution adaptée.',
    color: '#2E86AB',
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      )
      gsap.fromTo(
        '.why-visual',
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pourquoi"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B2545 0%, #091e3a 100%)' }}
    >
      {/* Wave shape background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full opacity-[0.04]">
          <path fill="#7FDBFF" d="M0,300 C360,180 720,420 1080,300 C1260,240 1350,360 1440,300 L1440,0 L0,0 Z" />
        </svg>
        <div style={{
          position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '60%',
          background: 'radial-gradient(circle, rgba(46,134,171,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5BC0DE] mb-4">
              Pourquoi nous choisir
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
              L'excellence qui fait<br />
              <span className="gradient-text">la différence</span>
            </h2>
            <p className="text-[#a8cce0] text-lg mb-10 leading-relaxed">
              Nous ne faisons pas que nettoyer — nous nous engageons sur chaque prestation
              pour un résultat impeccable et une expérience client sans friction.
            </p>

            <div className="space-y-6">
              {differentiators.map(d => {
                const Icon = d.icon
                return (
                  <div key={d.title} className="why-item flex gap-4 group" style={{ opacity: 0 }}>
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${d.color}18`, border: `1px solid ${d.color}35` }}
                    >
                      <Icon size={20} style={{ color: d.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {d.title}
                      </h3>
                      <p className="text-sm text-[#8ab0c8] leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual side */}
          <div className="why-visual hidden lg:block" style={{ opacity: 0 }}>
            <div className="relative">
              <div className="glass-card rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format"
                  alt="Nettoyage professionnel"
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, transparent 40%, rgba(11,37,69,0.8) 100%)',
                }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-2xl p-4">
                    <div className="text-2xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>100%</div>
                    <div className="text-sm text-[#7FDBFF]">Clients satisfaits</div>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 text-center">
                <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Sora, sans-serif' }}>24h</div>
                <div className="text-xs text-[#a8cce0]">Délai de réponse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
