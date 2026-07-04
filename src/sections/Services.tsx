import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sofa, Car, Building2, Layers } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Sofa,
    title: 'Nettoyage Textile',
    color: '#7FDBFF',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format',
    items: ['Moquettes et tapis', 'Canapés et matelas', 'Fauteuils et chaises'],
  },
  {
    icon: Car,
    title: 'Voiture',
    color: '#5BC0DE',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80&auto=format',
    items: ['Intérieur complet', 'Nettoyage extérieur écologique (sans eau)', 'Siège auto bébé'],
  },
  {
    icon: Building2,
    title: 'Nettoyage Industriel',
    color: '#2E86AB',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format',
    items: ['Fin de chantier', 'Bureaux et commerces', 'Cabinets médicaux', 'Airbnb / location saisonnière'],
  },
  {
    icon: Layers,
    title: 'Surfaces spécialisées',
    color: '#1E6091',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80&auto=format',
    items: ['Vitres et vérandas', 'Terrasses et balcons', 'Espaces piscine', 'Entretien jardins et espaces verts'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9,
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
        }
      )

      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', once: true },
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
      className="relative py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0d2e57 0%, #0B2545 100%)' }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute', top: '10%', left: '-5%', width: '40%', height: '40%',
          background: 'radial-gradient(circle, rgba(46,134,171,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5BC0DE] mb-4">
            Ce que nous faisons
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Nettoyage <span className="gradient-text">haut de gamme</span>
          </h2>
          <p className="text-[#a8cce0] text-lg max-w-xl mx-auto">
            Des solutions adaptées à chaque besoin — particulier ou professionnel.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group glass-card rounded-2xl overflow-hidden cursor-default"
                style={{ opacity: 0 }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(180deg, transparent 30%, rgba(11,37,69,0.85) 100%)',
                  }} />
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex p-2 rounded-xl"
                      style={{ background: `${service.color}25`, border: `1px solid ${service.color}40` }}>
                      <Icon size={18} style={{ color: service.color }} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#a8cce0]">
                        <span style={{ color: service.color, marginTop: '3px', flexShrink: 0 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <div className="h-px mx-5 mb-5" style={{ background: `linear-gradient(90deg, ${service.color}60, transparent)` }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
