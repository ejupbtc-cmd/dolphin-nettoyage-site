import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
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

function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
    </svg>
  )
}

const contactMethods = [
  {
    icon: <WaIcon size={22} />,
    label: 'WhatsApp',
    sub: '+41 77 991 53 44',
    href: 'https://wa.me/41779915344',
    style: {
      background: 'linear-gradient(135deg, #25D366, #1aad57)',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
    },
  },
  {
    icon: <Phone size={20} />,
    label: 'Téléphone',
    sub: '+41 77 991 53 44',
    href: 'tel:+41779915344',
    style: {
      background: 'linear-gradient(135deg, var(--blue-light), var(--blue))',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(46,134,171,0.3)',
    },
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    sub: 'dolphin.nettoyage1400@gmail.com',
    href: 'mailto:dolphin.nettoyage1400@gmail.com',
    style: {
      background: 'var(--white)',
      color: 'var(--navy-deep)',
      border: '1.5px solid var(--border-soft)',
      boxShadow: '0 2px 12px rgba(11,27,46,0.06)',
    },
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: 'var(--bg-ice)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(46,134,171,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container-page relative z-10" style={{ maxWidth: '720px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="eyebrow mb-7 block">Contactez-nous</span>
            <h2 className="h2-section mb-5">
              Votre devis gratuit en{' '}
              <span className="gradient-text">moins de 24h</span>
            </h2>
            <p className="body-md" style={{ maxWidth: '420px', marginInline: 'auto' }}>
              Décrivez-nous votre besoin via WhatsApp, par téléphone ou par email.
              Nous répondons rapidement avec une estimation claire et sans engagement.
            </p>
          </div>

          {/* Contact methods */}
          <div className="flex flex-col gap-4">
            {contactMethods.map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl transition-all duration-250 hover:-translate-y-0.5"
                style={{
                  padding: 'clamp(16px, 3vw, 20px) clamp(16px, 4vw, 24px)',
                  textDecoration: 'none',
                  ...item.style,
                }}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-xs mt-0.5 opacity-75 truncate">{item.sub}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.6 }}>
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Social links */}
          <div
            className="mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(30,96,145,0.12)' }}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)' }}>
              Retrouvez-nous sur
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/dolphin_nettoyage.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '11px 22px',
                  background: 'var(--white)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--navy-deep)',
                  boxShadow: '0 2px 8px rgba(11,27,46,0.05)',
                }}
              >
                <InstagramIcon size={15} />
                @dolphin_nettoyage.ch
              </a>
              <a
                href="https://www.facebook.com/dolphin.nettoyage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-full font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  padding: '11px 22px',
                  background: 'var(--white)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--navy-deep)',
                  boxShadow: '0 2px 8px rgba(11,27,46,0.05)',
                }}
              >
                <FacebookIcon size={15} />
                dolphin nettoyage
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
