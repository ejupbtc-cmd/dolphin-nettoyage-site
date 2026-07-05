import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
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
    floatClass: 'icon-float',
  },
  {
    icon: Zap,
    title: 'Intervention rapide',
    desc: 'Nos équipes sont disponibles rapidement sur tout le Canton de Vaud. Urgence ou planification, nous nous adaptons.',
    color: '#2E86AB',
    floatClass: 'icon-float-2',
  },
  {
    icon: Leaf,
    title: 'Écologique & sans eau',
    desc: 'Notre nettoyage extérieur voiture est 100% écologique, sans eau — moins de gaspillage, résultats supérieurs.',
    color: '#2A9D6E',
    floatClass: 'icon-float-3',
  },
  {
    icon: Users,
    title: 'Particuliers & Professionnels',
    desc: 'Que vous soyez particulier, PME, cabinet médical ou gérant Airbnb, nous avons la solution adaptée.',
    color: '#2E86AB',
    floatClass: 'icon-float-4',
  },
]


const keyStats = [
  { value: '100%', label: 'Satisfaction client' },
  { value: '24h', label: 'Délai de réponse' },
  { value: '5★', label: 'Note moyenne' },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

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
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--white)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(46,134,171,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>

          {/* ── Text side ── */}
          <div>
            <span className="eyebrow mb-8 block">Pourquoi nous choisir</span>
            <h2 className="h2-section mb-6">
              L'excellence qui fait<br />
              <span className="gradient-text">la différence</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
              Nous ne faisons pas que nettoyer — nous nous engageons sur chaque prestation
              pour un résultat impeccable et une expérience client sans friction.
            </p>

            <div className="flex flex-col" style={{ gap: 'clamp(20px, 3.5vw, 36px)' }}>
              {differentiators.map((d, idx) => {
                const Icon = d.icon
                return (
                  <div key={d.title} className="why-item flex group" style={{ opacity: 0, gap: '22px', alignItems: 'flex-start' }}>
                    <div
                      className={`flex-shrink-0 rounded-xl flex items-center justify-center relative ${d.floatClass}`}
                      style={{
                        width: '56px', height: '56px',
                        background: `${d.color}12`,
                        border: `1.5px solid ${d.color}28`,
                        boxShadow: `0 2px 12px ${d.color}18`,
                        color: d.color,
                      }}
                    >
                      <Icon size={22} style={{ color: d.color }} aria-hidden="true" />
                      {/* Animated ring on first item */}
                      {idx === 0 && (
                        <span
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            border: `2px solid ${d.color}`,
                            animation: 'ringExpand 2.5s ease-out infinite',
                          }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div style={{ paddingTop: '4px' }}>
                      <h3 className="h3-card" style={{ fontSize: '17px', marginBottom: '8px' }}>
                        {d.title}
                      </h3>
                      <p className="body-md" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                        {d.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Animated stats strip (mobile & desktop) */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 mt-10 lg:mt-8 rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(46,134,171,0.14)',
                background: 'rgba(46,134,171,0.04)',
              }}
            >
              {keyStats.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center text-center py-4 px-2"
                  style={{
                    borderRight: i < keyStats.length - 1 ? '1px solid rgba(46,134,171,0.1)' : 'none',
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <span
                    className="font-black gradient-text block leading-none"
                    style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(18px, 4vw, 24px)' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Visual side ── */}
          <div className="why-visual hidden lg:block" style={{ opacity: 0 }}>
            <div className="relative" style={{ paddingTop: '24px', paddingRight: '24px' }}>
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4/5',
                  borderRadius: '20px',
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
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30,96,145,0.28) 0%, rgba(46,134,171,0.12) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
                <div
                  className="absolute rounded-2xl"
                  style={{
                    bottom: '24px', left: '24px',
                    padding: '18px 24px',
                    background: 'rgba(255,255,255,0.94)',
                    backdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 4px 24px rgba(11,27,46,0.14)',
                    minWidth: '160px',
                  }}
                >
                  <div
                    className="font-black gradient-text"
                    style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', lineHeight: 1 }}
                  >
                    100%
                  </div>
                  <div className="text-sm font-semibold mt-1" style={{ color: 'var(--navy-deep)' }}>
                    Clients satisfaits
                  </div>
                </div>
              </div>

              <div
                className="absolute rounded-2xl text-center"
                style={{
                  top: 0, right: 0,
                  padding: '18px 22px',
                  background: '#FFFFFF',
                  border: '1.5px solid var(--border-soft)',
                  boxShadow: '0 8px 32px rgba(46,134,171,0.18)',
                  minWidth: '100px',
                }}
              >
                <div
                  className="font-black gradient-text"
                  style={{ fontFamily: 'Sora, sans-serif', fontSize: '26px', lineHeight: 1 }}
                >
                  24h
                </div>
                <div className="text-xs font-medium mt-1.5" style={{ color: 'var(--text-muted)' }}>
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
