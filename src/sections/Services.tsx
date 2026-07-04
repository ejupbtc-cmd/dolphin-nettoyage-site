import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sofa, Car, Building2, Layers } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext'

gsap.registerPlugin(ScrollTrigger)

const servicesMeta = [
  {
    id: 'textile',
    icon: Sofa,
    title: 'Nettoyage Textile',
    color: '#1E6091',
    alt: 'Canapé tissu propre après nettoyage professionnel',
    items: ['Moquettes et tapis', 'Canapés et matelas', 'Fauteuils et chaises'],
  },
  {
    id: 'voiture',
    icon: Car,
    title: 'Voiture',
    color: '#2E86AB',
    alt: 'Intérieur de voiture nettoyé et détaillé',
    items: ['Intérieur complet', 'Nettoyage extérieur écologique (sans eau)', 'Siège auto bébé'],
  },
  {
    id: 'industriel',
    icon: Building2,
    title: 'Nettoyage Industriel',
    color: '#2E86AB',
    alt: 'Nettoyage professionnel de bureaux et espaces industriels',
    items: ['Fin de chantier', 'Bureaux et commerces', 'Cabinets médicaux', 'Airbnb / location saisonnière'],
  },
  {
    id: 'surfaces',
    icon: Layers,
    title: 'Surfaces spécialisées',
    color: '#1E6091',
    alt: 'Nettoyage de vitres avec raclette professionnelle',
    items: ['Vitres et vérandas', 'Terrasses et balcons', 'Espaces piscine', 'Entretien jardins'],
  },
]

export default function Services() {
  const { serviceImages } = useSiteData()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const services = servicesMeta.map(s => ({ ...s, image: serviceImages[s.id] || '' }))

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
      className="section-pad"
      style={{ background: 'var(--bg-ice)' }}
    >
      <div className="container-page">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16" style={{ opacity: 0, maxWidth: '640px', marginInline: 'auto' }}>
          <span className="eyebrow mb-6 block">Ce que nous faisons</span>
          <h2 className="h2-section mb-6">
            Nettoyage <span className="gradient-text">haut de gamme</span>
          </h2>
          <p className="body-lg">
            Des solutions adaptées à chaque besoin — particulier ou professionnel.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map(service => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group card cursor-default relative"
                style={{ opacity: 0 }}
              >
                {/* Photo with unified blue duotone overlay */}
                <div className="relative" style={{ aspectRatio: '4/3', borderRadius: '20px 20px 0 0' }}>
                  {/* Inner wrapper clips the image without clipping the icon badge */}
                  <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
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
                    <div
                      className="absolute inset-0"
                      aria-hidden="true"
                      style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(14,30,60,0.3) 100%)' }}
                    />
                  </div>

                  {/* Icon badge — straddling the photo/content boundary (bottom edge of photo) */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{
                      bottom: 0, left: '50%',
                      transform: 'translate(-50%, 50%)',
                      width: '56px', height: '56px',
                      borderRadius: '9999px',
                      background: '#FFFFFF',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 8px 24px rgba(11,27,46,0.18)',
                      zIndex: 2,
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{ width: '100%', height: '100%', background: 'rgba(46,134,171,0.1)' }}
                    >
                      <Icon size={22} style={{ color: service.color }} aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Content — 36px top so the icon badge (28px below photo edge) doesn't overlap title */}
                <div className="px-6 pb-6 lg:px-8 lg:pb-8" style={{ paddingTop: '36px' }}>
                  <h3 className="h3-card" style={{ marginBottom: '16px', fontSize: '20px' }}>
                    {service.title}
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} role="list">
                    {service.items.map(item => (
                      <li key={item} className="flex items-start text-sm leading-relaxed" style={{ color: 'var(--text-muted)', gap: '12px' }}>
                        <span
                          className="flex-shrink-0 rounded-full flex items-center justify-center"
                          style={{ width: '20px', height: '20px', marginTop: '1px' }}
                          aria-hidden="true"
                        >
                          <span className="rounded-full" style={{ width: '6px', height: '6px', background: service.color, display: 'block' }} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
