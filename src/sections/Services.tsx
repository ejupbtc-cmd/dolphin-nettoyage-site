import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sofa, Car, Building2, Layers } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Sofa,
    title: 'Nettoyage Textile',
    color: '#1E6091',
    // Modern sofa — upholstery fabric, on-topic
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    alt: 'Canapé tissu propre après nettoyage professionnel',
    items: ['Moquettes et tapis', 'Canapés et matelas', 'Fauteuils et chaises'],
  },
  {
    icon: Car,
    title: 'Voiture',
    color: '#2E86AB',
    // Car interior detailing
    image: 'https://images.unsplash.com/photo-1610647752529-41b7b3f68bfd?w=600&q=80&auto=format&fit=crop',
    alt: 'Intérieur de voiture nettoyé et détaillé',
    items: ['Intérieur complet', 'Nettoyage extérieur écologique (sans eau)', 'Siège auto bébé'],
  },
  {
    icon: Building2,
    title: 'Nettoyage Industriel',
    color: '#2E86AB',
    // Professional cleaning, mop/office
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
    alt: 'Nettoyage professionnel de bureaux et espaces industriels',
    items: ['Fin de chantier', 'Bureaux et commerces', 'Cabinets médicaux', 'Airbnb / location saisonnière'],
  },
  {
    icon: Layers,
    title: 'Surfaces spécialisées',
    color: '#1E6091',
    // Window squeegee cleaning — on-topic
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80&auto=format&fit=crop',
    alt: 'Nettoyage de vitres avec raclette professionnelle',
    items: ['Vitres et vérandas', 'Terrasses et balcons', 'Espaces piscine', 'Entretien jardins'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.85,
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%', once: true },
        }
      )

      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 56, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 px-6"
      style={{ background: '#EEF4FA' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <span className="section-label">Ce que nous faisons</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: '#0F1C2E' }}>
            Nettoyage <span className="gradient-text">haut de gamme</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#4A6580' }}>
            Des solutions adaptées à chaque besoin — particulier ou professionnel.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group card rounded-2xl overflow-hidden cursor-default"
                style={{ opacity: 0 }}
              >
                {/* Photo with unified blue duotone overlay */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Blue duotone overlay — unifies all photos */}
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, rgba(30,96,145,0.32) 0%, rgba(46,134,171,0.18) 100%)`,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  {/* Bottom fade for text legibility if needed */}
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(14,30,60,0.25) 100%)' }}
                  />
                </div>

                {/* Icon badge — cleanly below image, above title */}
                <div className="px-6 pt-6 pb-0 flex items-center gap-3.5">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                    style={{
                      background: `rgba(46,134,171,0.1)`,
                      border: `1.5px solid rgba(46,134,171,0.2)`,
                      boxShadow: '0 2px 12px rgba(46,134,171,0.15)',
                    }}
                  >
                    <Icon size={20} style={{ color: service.color }} aria-hidden="true" />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: 'Sora, sans-serif', color: '#0F1C2E' }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="px-6 pt-4 pb-6">
                  <ul className="space-y-3" role="list">
                    {service.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: '#4A6580' }}>
                        <span
                          className="mt-[3px] flex-shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: service.color }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-[3px] mx-0 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${service.color}80, transparent)`,
                    transition: 'opacity 0.3s',
                    opacity: 0.6,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
