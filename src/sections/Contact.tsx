import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contactItems = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
        </svg>
      ),
      label: 'WhatsApp',
      sub: '+41 77 991 53 44',
      href: 'https://wa.me/41779915344',
      className: 'btn-whatsapp',
    },
    {
      icon: <Phone size={22} />,
      label: 'Téléphone',
      sub: '+41 77 991 53 44',
      href: 'tel:+41779915344',
      className: 'btn-primary',
    },
    {
      icon: <Mail size={22} />,
      label: 'Email',
      sub: 'dolphin.nettoyage1400@gmail.com',
      href: 'mailto:dolphin.nettoyage1400@gmail.com',
      className: 'btn-outline',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#EEF4FA' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(46,134,171,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glass card */}
          <div
            className="rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(46,134,171,0.12)',
              boxShadow: '0 16px 64px rgba(46,134,171,0.1), 0 4px 16px rgba(11,37,69,0.06)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[3px] rounded-b"
              aria-hidden="true"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(46,134,171,0.5), transparent)' }}
            />

            <span className="section-label">Contactez-nous</span>

            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#0F1C2E' }}>
              Votre devis gratuit en
              <br />
              <span className="gradient-text">moins de 24h</span>
            </h2>

            <p className="text-base mb-10 max-w-md mx-auto" style={{ color: '#4A6580' }}>
              Décrivez-nous votre besoin via WhatsApp, par téléphone ou par email.
              Nous vous répondons rapidement avec une estimation claire et sans engagement.
            </p>

            {/* Contact buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {contactItems.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`${item.className} flex items-center justify-center gap-3 text-white font-semibold px-6 py-3.5 rounded-full text-sm`}
                >
                  {item.icon}
                  <span>
                    <span className="block font-bold">{item.label}</span>
                    <span className="block text-xs opacity-80 font-normal">{item.sub}</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8" style={{ borderTop: '1px solid rgba(46,134,171,0.1)' }}>
              <p
                className="text-xs mb-4 uppercase tracking-wider font-semibold"
                style={{ color: '#8BA4BA' }}
              >
                Retrouvez-nous sur
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://www.instagram.com/dolphin_nettoyage.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(46,134,171,0.07)',
                    border: '1px solid rgba(46,134,171,0.15)',
                    color: '#1E6091',
                  }}
                >
                  <InstagramIcon size={15} />
                  @dolphin_nettoyage.ch
                </a>
                <a
                  href="https://www.facebook.com/dolphin.nettoyage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(46,134,171,0.07)',
                    border: '1px solid rgba(46,134,171,0.15)',
                    color: '#1E6091',
                  }}
                >
                  <FacebookIcon size={15} />
                  dolphin nettoyage
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
