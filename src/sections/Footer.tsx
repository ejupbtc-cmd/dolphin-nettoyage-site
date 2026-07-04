import { Phone, Mail, MapPin } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pourquoi nous', href: '#pourquoi' },
  { label: 'Avis clients', href: '#avis' },
  { label: "Zone d'intervention", href: '#zone' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="relative px-4 pt-16 pb-8 overflow-hidden"
      style={{ background: '#050f1e', borderTop: '1px solid rgba(46,134,171,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐬</span>
              <div>
                <div className="font-black text-white leading-tight tracking-tight" style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.1rem' }}>DOLPHIN</div>
                <div className="text-[#5BC0DE] font-semibold tracking-widest" style={{ fontSize: '0.6rem' }}>NETTOYAGE</div>
              </div>
            </div>
            <p className="text-sm text-[#6a90a8] leading-relaxed">
              Votre expert du nettoyage à domicile. Service haut de gamme pour particuliers et professionnels.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-[#6a90a8] hover:text-[#7FDBFF] transition-colors duration-200 bg-transparent border-none cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-[#6a90a8]">
                <Phone size={14} className="text-[#5BC0DE] mt-0.5 flex-shrink-0" />
                <a href="tel:+41779915344" className="hover:text-white transition-colors">+41 77 991 53 44</a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#6a90a8]">
                <Mail size={14} className="text-[#5BC0DE] mt-0.5 flex-shrink-0" />
                <a href="mailto:dolphin.nettoyage1400@gmail.com" className="hover:text-white transition-colors break-all">
                  dolphin.nettoyage1400@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#6a90a8]">
                <MapPin size={14} className="text-[#5BC0DE] mt-0.5 flex-shrink-0" />
                <span>Yverdon-les-Bains, Canton de Vaud</span>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Réseaux sociaux</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/dolphin_nettoyage.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#a8cce0] hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(46,134,171,0.15)', border: '1px solid rgba(91,192,222,0.2)' }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/dolphin.nettoyage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center text-[#a8cce0] hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(46,134,171,0.15)', border: '1px solid rgba(91,192,222,0.2)' }}
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
            <a
              href="https://wa.me/41779915344"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.099 1.523 5.824L.057 23.886a.5.5 0 00.613.613l6.116-1.467A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.896 0-3.67-.523-5.183-1.43l-.371-.218-3.835.919.953-3.76-.24-.388A9.82 9.82 0 012.182 12c0-5.417 4.401-9.818 9.818-9.818 5.417 0 9.818 4.401 9.818 9.818 0 5.417-4.401 9.818-9.818 9.818z"/>
              </svg>
              Devis gratuit
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6a90a8]">
          <span>© {new Date().getFullYear()} Dolphin Nettoyage — Tous droits réservés</span>
          <div className="flex gap-4">
            <span>Mentions légales (à compléter)</span>
            <span>·</span>
            <span>Politique de confidentialité (à compléter)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
