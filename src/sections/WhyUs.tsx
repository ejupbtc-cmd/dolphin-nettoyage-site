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
    color: '#1E6091',
  },
  {
    icon: Zap,
    title: 'Intervention rapide',
    desc: 'Nos équipes sont disponibles rapidement sur tout le Canton de Vaud. Urgence ou planification, nous nous adaptons.',
    color: '#2E86AB',
  },
  {
    icon: Leaf,
    title: 'Écologique & sans eau',
    desc: 'Notre nettoyage extérieur voiture est 100% écologique, sans eau — moins de gaspillage, résultats supérieurs.',
    color: '#2A9D6E',
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
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        '.why-visual',
        { opacity: 0, x: 48, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
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
      style={{ background: '#FFFFFF' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(46,134,171,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="section-label">Pourquoi nous choisir</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6" style={{ color: '#0F1C2E' }}>
              L'excellence qui fait<br />
              <span className="gradient-text">la différence</span>
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#4A6580' }}>
              Nous ne faisons pas que nettoyer — nous nous engageons sur chaque prestation
              pour un résultat impeccable et une expérience client sans friction.
            </p>

            <div className="space-y-6">
              {differentiators.map(d => {
                const Icon = d.icon
                return (
                  <div key={d.title} className="why-item flex gap-4 group" style={{ opacity: 0 }}>
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                      style={{
                        background: `${d.color}12`,
                        border: `1.5px solid ${d.color}28`,
                        boxShadow: `0 2px 12px ${d.color}18`,
                      }}
                    >
                      <Icon size={20} style={{ color: d.color }} aria-hidden="true" />
                    </div>
                    <div>
                      <h3
                        className="text-base font-bold mb-1"
                        style={{ fontFamily: 'Sora, sans-serif', color: '#0F1C2E' }}
                      >
                        {d.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#4A6580' }}>
                        {d.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Visual side */}
          <div className="why-visual hidden lg:block" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Main photo card */}
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  boxShadow: '0 24px 64px rgba(46,134,171,0.18), 0 8px 24px rgba(11,37,69,0.1)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700&q=80&auto=format&fit=crop"
                  alt="Professionnel Dolphin Nettoyage en action"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Consistent blue duotone overlay */}
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30,96,145,0.28) 0%, rgba(46,134,171,0.12) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
                {/* 100% stat card — fully contained inside image */}
                <div
                  className="absolute bottom-6 left-6 right-6 rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(46,134,171,0.15)',
                    boxShadow: '0 4px 20px rgba(46,134,171,0.12)',
                  }}
                >
                  <div
                    className="text-2xl font-black gradient-text"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    100%
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#1E6091' }}>
                    Clients satisfaits
                  </div>
                </div>
              </div>

              {/* Floating 24h card — properly anchored, not cropped */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-5 py-4 text-center"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(46,134,171,0.15)',
                  boxShadow: '0 8px 32px rgba(46,134,171,0.16)',
                  minWidth: '96px',
                }}
              >
                <div
                  className="text-2xl font-black gradient-text"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  24h
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: '#4A6580' }}>
                  Délai de réponse
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
