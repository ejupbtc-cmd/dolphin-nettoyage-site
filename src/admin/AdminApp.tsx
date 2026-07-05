import { useState, useRef } from 'react'
import { useSiteData, type Realisation, type TestimonialData } from '../context/SiteDataContext'

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'dolphin2024'
const CATEGORIES = ['Textile', 'Voiture', 'Industriel', 'Surfaces', 'Autre']
const SERVICE_META: Record<string, { label: string; emoji: string }> = {
  textile:    { label: 'Nettoyage Textile',       emoji: '🛋️' },
  voiture:    { label: 'Voiture',                 emoji: '🚗' },
  industriel: { label: 'Nettoyage Industriel',    emoji: '🏢' },
  surfaces:   { label: 'Surfaces spécialisées',   emoji: '🪟' },
}
const CAT_COLOR: Record<string, string> = {
  Textile: '#1E6091', Voiture: '#2E86AB', Industriel: '#2A9D6E', Surfaces: '#7B5EA7', Autre: '#5A6B80',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function genId() { return Math.random().toString(36).slice(2) + Date.now().toString(36) }

function compressImage(file: File, maxPx = 900, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = reject
    img.src = url
  })
}

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}
function getVimeoId(url: string) {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}
function getVideoThumb(url: string): string | null {
  const yt = getYouTubeId(url)
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`
  return null
}
function isValidVideo(url: string) { return !!(getYouTubeId(url) || getVimeoId(url)) }

// ─── Style helpers ────────────────────────────────────────────────────────────
const inp = (err = false): React.CSSProperties => ({
  padding: '11px 14px', borderRadius: 10, fontSize: 14,
  border: `1.5px solid ${err ? '#e55' : 'rgba(30,96,145,0.22)'}`,
  outline: 'none', color: '#0B1B2E', width: '100%', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif', background: '#fff',
})
const lbl: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: '#5A6B80', marginBottom: 6,
  display: 'block', textTransform: 'uppercase', letterSpacing: '0.07em',
}
const btnPrimary: React.CSSProperties = {
  background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff',
  border: 'none', borderRadius: 10, padding: '11px 24px', fontSize: 14,
  fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
}
const btnGhost: React.CSSProperties = {
  background: 'transparent', color: '#5A6B80',
  border: '1.5px solid rgba(30,96,145,0.2)', borderRadius: 10, padding: '11px 20px',
  fontSize: 14, fontWeight: 600, cursor: 'pointer',
}
const btnDanger: React.CSSProperties = {
  background: 'rgba(220,50,50,0.06)', color: '#c0392b',
  border: '1.5px solid rgba(220,50,50,0.18)', borderRadius: 8, padding: '7px 12px',
  fontSize: 13, fontWeight: 600, cursor: 'pointer',
}
const btnEdit: React.CSSProperties = {
  background: 'rgba(30,96,145,0.07)', color: '#1E6091',
  border: '1.5px solid rgba(30,96,145,0.2)', borderRadius: 8, padding: '7px 12px',
  fontSize: 13, fontWeight: 600, cursor: 'pointer',
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const show = (msg: string, type: 'success' | 'error' = 'success') => {
    clearTimeout(timerRef.current)
    setToast({ msg, type })
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }
  return { toast, show }
}

function Toast({ toast }: { toast: ReturnType<typeof useToast>['toast'] }) {
  if (!toast) return null
  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      background: toast.type === 'success' ? '#0B1B2E' : '#c0392b',
      color: '#fff', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
      zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span>{toast.type === 'success' ? '✓' : '✕'}</span>
      {toast.msg}
    </div>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem('dolphin_admin_auth', '1'); onLogin() }
    else setError(true)
  }
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0B1B2E 0%,#14304D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 400, boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(46,134,171,0.1)', border: '2px solid rgba(46,134,171,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px' }}>🐬</div>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1B2E', margin: '0 0 6px' }}>Dolphin Admin</h1>
          <p style={{ color: '#5A6B80', fontSize: 14, margin: 0 }}>Espace de gestion du site</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={lbl}>Mot de passe</label>
            <input
              type="password" placeholder="••••••••" value={pw} autoFocus
              onChange={e => { setPw(e.target.value); setError(false) }}
              style={{ ...inp(error), fontSize: 16 }}
            />
            {error && <p style={{ color: '#e55', fontSize: 12, margin: '6px 0 0' }}>Mot de passe incorrect</p>}
          </div>
          <button type="submit" style={{ ...btnPrimary, justifyContent: 'center', padding: '14px', fontSize: 15, borderRadius: 12, marginTop: 4 }}>
            Se connecter →
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#5A6B80' }}>
          <a href="/" style={{ color: '#2E86AB', textDecoration: 'none', fontWeight: 600 }}>← Retour au site</a>
        </p>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'realisations' | 'services' | 'temoignages'

const NAV_ITEMS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: 'dashboard',    label: 'Tableau de bord', icon: '▦',  desc: 'Vue d\'ensemble' },
  { id: 'realisations', label: 'Réalisations',    icon: '◼',  desc: 'Photos & vidéos' },
  { id: 'services',     label: 'Services',         icon: '◈',  desc: 'Images des cartes' },
  { id: 'temoignages',  label: 'Témoignages',      icon: '★',  desc: 'Avis clients' },
]

function Sidebar({ tab, setTab, onLogout, onClose }: {
  tab: Tab; setTab: (t: Tab) => void; onLogout: () => void; onClose?: () => void
}) {
  return (
    <div style={{
      width: 248, background: '#0B1B2E', height: '100vh', display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🐬</span>
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 14, color: '#fff', lineHeight: 1.2 }}>DOLPHIN</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#5BC0DE', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin</div>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 20, padding: 4 }}>✕</button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = tab === item.id
          return (
            <button key={item.id} onClick={() => { setTab(item.id); onClose?.() }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: active ? 'linear-gradient(135deg,rgba(46,134,171,0.3),rgba(30,96,145,0.2))' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.55)',
              marginBottom: 4, textAlign: 'left', transition: 'all 0.15s',
              borderLeft: active ? '2px solid #5BC0DE' : '2px solid transparent',
            }}>
              <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{item.label}</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{item.desc}</div>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10,
          color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 6,
          transition: 'all 0.15s',
        }}>
          <span>↗</span> Voir le site
        </a>
        <button onClick={onLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
          borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(220,50,50,0.1)',
          color: 'rgba(255,130,130,0.85)', fontSize: 13, fontWeight: 600,
        }}>
          <span>⏻</span> Déconnexion
        </button>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardTab({ setTab }: { setTab: (t: Tab) => void }) {
  const { realisations, testimonials } = useSiteData()
  const stats = [
    { label: 'Réalisations', value: realisations.length, icon: '◼', color: '#1E6091', tab: 'realisations' as Tab },
    { label: 'Témoignages', value: testimonials.length, icon: '★', color: '#2A9D6E', tab: 'temoignages' as Tab },
    { label: 'Services',     value: 4,                  icon: '◈', color: '#7B5EA7', tab: 'services' as Tab },
  ]
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 800, color: '#0B1B2E', margin: '0 0 6px' }}>
          Bonjour 👋
        </h1>
        <p style={{ color: '#5A6B80', fontSize: 15, margin: 0 }}>
          Gérez le contenu de votre site Dolphin Nettoyage depuis ici.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 16, marginBottom: 36 }}>
        {stats.map(s => (
          <button key={s.label} onClick={() => setTab(s.tab)} style={{
            background: '#fff', border: '1px solid rgba(30,96,145,0.1)', borderRadius: 16,
            padding: '24px 20px', cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 2px 12px rgba(11,27,46,0.06)', transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 22, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Sora,sans-serif', fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#5A6B80', marginTop: 6, fontWeight: 600 }}>{s.label}</div>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1B2E', marginBottom: 16 }}>
        Actions rapides
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12 }}>
        {[
          { label: '+ Ajouter une réalisation', sub: 'Photo ou vidéo', tab: 'realisations' as Tab, color: '#1E6091' },
          { label: '+ Ajouter un témoignage',  sub: 'Avis client',    tab: 'temoignages' as Tab, color: '#2A9D6E' },
          { label: '🖼️ Modifier les images',   sub: 'Section services', tab: 'services' as Tab, color: '#7B5EA7' },
        ].map(a => (
          <button key={a.label} onClick={() => setTab(a.tab)} style={{
            background: `${a.color}10`, border: `1.5px solid ${a.color}28`, borderRadius: 12,
            padding: '16px 18px', cursor: 'pointer', textAlign: 'left', color: a.color,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{a.label}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{a.sub}</div>
          </button>
        ))}
      </div>

      {/* Info */}
      <div style={{ marginTop: 32, background: 'rgba(91,192,222,0.08)', border: '1px solid rgba(91,192,222,0.25)', borderRadius: 14, padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: '#14304D', margin: 0, lineHeight: 1.6 }}>
          <strong>💡 Astuce :</strong> Les réalisations ajoutées ici apparaissent automatiquement dans la section Galerie du site.
          Pour les vidéos, collez une URL YouTube ou Vimeo.
        </p>
      </div>
    </div>
  )
}

// ─── Realisation Modal ────────────────────────────────────────────────────────
type RealisationForm = Omit<Realisation, 'id'>

const EMPTY_FORM: RealisationForm = {
  title: '', description: '', category: 'Textile',
  image: '', video: '', date: new Date().toISOString().slice(0, 10),
}

function RealisationModal({ initial, onSave, onClose }: {
  initial: RealisationForm
  onSave: (f: RealisationForm) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<RealisationForm>(initial)
  const [mediaTab, setMediaTab] = useState<'image' | 'video'>(initial.video ? 'video' : 'image')
  const [imgTab, setImgTab] = useState<'url' | 'upload'>('url')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof RealisationForm, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  const validate = () => {
    const e: Record<string, boolean> = {}
    if (!form.title.trim()) e.title = true
    if (mediaTab === 'image' && !form.image.trim()) e.image = true
    if (mediaTab === 'video' && (!form.video || !isValidVideo(form.video))) e.video = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const cleaned = {
      ...form,
      image: mediaTab === 'image' ? form.image.trim() : (form.image.trim() || ''),
      video: mediaTab === 'video' ? form.video?.trim() : '',
    }
    onSave(cleaned)
  }

  const videoThumb = form.video ? getVideoThumb(form.video) : null
  const videoValid = form.video ? isValidVideo(form.video) : false

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(11,27,46,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, width: '100%', maxWidth: 640,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 32px 80px rgba(11,27,46,0.35)',
      }}>
        {/* Modal header */}
        <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid rgba(30,96,145,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 1, borderRadius: '20px 20px 0 0' }}>
          <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 18, fontWeight: 800, color: '#0B1B2E', margin: 0 }}>
            {initial.title ? 'Modifier la réalisation' : 'Nouvelle réalisation'}
          </h2>
          <button onClick={onClose} style={{ background: 'rgba(30,96,145,0.07)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#5A6B80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '24px 28px 28px' }}>
          {/* Media type toggle */}
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Type de média</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['image', 'video'] as const).map(t => (
                <button key={t} type="button" onClick={() => setMediaTab(t)} style={{
                  flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontSize: 14, transition: 'all 0.15s',
                  background: mediaTab === t ? 'linear-gradient(135deg,#2E86AB,#1E6091)' : 'rgba(30,96,145,0.06)',
                  color: mediaTab === t ? '#fff' : '#5A6B80',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {t === 'image' ? '🖼️ Image' : '▶️ Vidéo'}
                </button>
              ))}
            </div>
          </div>

          {/* Media input */}
          {mediaTab === 'image' ? (
            <div style={{ marginBottom: 20 }}>
              {/* URL / Upload toggle */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {(['url', 'upload'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setImgTab(t)} style={{
                    padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: 12,
                    background: imgTab === t ? '#0B1B2E' : 'rgba(30,96,145,0.07)',
                    color: imgTab === t ? '#fff' : '#5A6B80',
                  }}>
                    {t === 'url' ? '🔗 URL' : '📁 Depuis l\'appareil'}
                  </button>
                ))}
              </div>

              {imgTab === 'url' ? (
                <>
                  <label style={lbl}>URL de l'image *</label>
                  <input
                    style={inp(errors.image)} value={form.image.startsWith('data:') ? '' : form.image}
                    placeholder="https://..."
                    onChange={e => set('image', e.target.value)}
                  />
                </>
              ) : (
                <>
                  <label style={lbl}>Photo depuis votre appareil *</label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      try {
                        const compressed = await compressImage(file)
                        set('image', compressed)
                        setErrors(err => ({ ...err, image: false }))
                      } catch {
                        set('image', '')
                      }
                    }}
                  />
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{
                      border: `2px dashed ${errors.image ? '#e55' : 'rgba(30,96,145,0.25)'}`,
                      borderRadius: 12, padding: '28px 20px', textAlign: 'center',
                      cursor: 'pointer', background: 'rgba(46,134,171,0.03)',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#2E86AB')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = errors.image ? '#e55' : 'rgba(30,96,145,0.25)')}
                  >
                    {form.image && form.image.startsWith('data:') ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <img src={form.image} alt="preview" style={{ maxHeight: 120, borderRadius: 8, objectFit: 'contain' }} />
                        <span style={{ fontSize: 12, color: '#2E86AB', fontWeight: 600 }}>Cliquer pour changer</span>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#0B1B2E', margin: '0 0 4px' }}>
                          Cliquez pour sélectionner une photo
                        </p>
                        <p style={{ fontSize: 12, color: '#5A6B80', margin: 0 }}>
                          JPG, PNG, WEBP — depuis votre appareil photo ou galerie
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}

              {errors.image && <p style={{ color: '#e55', fontSize: 12, margin: '4px 0 0' }}>Image requise</p>}
              {form.image && !form.image.startsWith('data:') && imgTab === 'url' && (
                <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', background: '#EEF4FA', aspectRatio: '16/9', maxWidth: 300 }}>
                  <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>URL YouTube ou Vimeo *</label>
              <input
                style={inp(errors.video)} value={form.video || ''} placeholder="https://youtube.com/watch?v=... ou https://vimeo.com/..."
                onChange={e => set('video', e.target.value)}
              />
              {errors.video && <p style={{ color: '#e55', fontSize: 12, margin: '4px 0 0' }}>URL YouTube ou Vimeo invalide</p>}
              {form.video && !videoValid && form.video.length > 5 && (
                <p style={{ color: '#e77', fontSize: 12, margin: '4px 0 0' }}>⚠️ URL YouTube ou Vimeo non reconnue</p>
              )}
              {videoValid && (
                <div style={{ marginTop: 10, borderRadius: 10, overflow: 'hidden', background: '#0B1B2E', aspectRatio: '16/9', maxWidth: 300, position: 'relative' }}>
                  {videoThumb ? (
                    <>
                      <img src={videoThumb} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>▶</div>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#5BC0DE', flexDirection: 'column', gap: 8, padding: 16 }}>
                      <span style={{ fontSize: 28 }}>▶️</span>
                      <span style={{ fontSize: 12, textAlign: 'center' }}>Vidéo Vimeo détectée</span>
                    </div>
                  )}
                </div>
              )}
              {/* Optional thumbnail for video */}
              <label style={{ ...lbl, marginTop: 14 }}>Image de couverture (optionnel)</label>
              <input
                style={inp()} value={form.image} placeholder="URL d'une image de couverture (si pas YouTube)"
                onChange={e => set('image', e.target.value)}
              />
              <p style={{ fontSize: 11, color: '#5A6B80', margin: '4px 0 0' }}>Pour YouTube, la miniature est générée automatiquement.</p>
            </div>
          )}

          {/* Base fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Titre *</label>
              <input
                style={inp(errors.title)} value={form.title} placeholder="Ex: Canapé cuir blanc..."
                onChange={e => set('title', e.target.value)}
              />
              {errors.title && <p style={{ color: '#e55', fontSize: 12, margin: '4px 0 0' }}>Requis</p>}
            </div>
            <div>
              <label style={lbl}>Catégorie</label>
              <select style={inp()} value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Description</label>
            <textarea
              style={{ ...inp(), minHeight: 80, resize: 'vertical' }}
              value={form.description} placeholder="Décrivez brièvement le travail effectué..."
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Date</label>
            <input type="date" style={{ ...inp(), maxWidth: 200 }} value={form.date} onChange={e => set('date', e.target.value)} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={btnGhost}>Annuler</button>
            <button type="submit" style={btnPrimary}>
              {initial.title ? '💾 Enregistrer' : '✓ Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Réalisations Tab ─────────────────────────────────────────────────────────
function RealisationsTab({ toast }: { toast: (msg: string, t?: 'success' | 'error') => void }) {
  const { realisations, setRealisations } = useSiteData()
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<Realisation | null>(null)

  const openAdd = () => { setEditItem(null); setShowModal(true) }
  const openEdit = (r: Realisation) => { setEditItem(r); setShowModal(true) }

  const handleSave = (form: RealisationForm) => {
    if (editItem) {
      setRealisations(realisations.map(r => r.id === editItem.id ? { ...r, ...form } : r))
      toast('Réalisation modifiée ✓')
    } else {
      setRealisations([{ id: genId(), ...form }, ...realisations])
      toast('Réalisation ajoutée ✓')
    }
    setShowModal(false)
  }

  const del = (id: string) => {
    if (!confirm('Supprimer cette réalisation ?')) return
    setRealisations(realisations.filter(r => r.id !== id))
    toast('Réalisation supprimée')
  }

  const move = (id: string, dir: -1 | 1) => {
    const idx = realisations.findIndex(r => r.id === id)
    const next = idx + dir
    if (next < 0 || next >= realisations.length) return
    const arr = [...realisations]
    ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
    setRealisations(arr)
  }

  const getThumb = (r: Realisation) => {
    if (r.image) return r.image
    if (r.video) return getVideoThumb(r.video) || null
    return null
  }

  return (
    <>
      {showModal && (
        <RealisationModal
          initial={editItem ? { title: editItem.title, description: editItem.description, category: editItem.category, image: editItem.image, video: editItem.video, date: editItem.date } : EMPTY_FORM}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1B2E', margin: '0 0 4px' }}>
            Réalisations
          </h1>
          <p style={{ color: '#5A6B80', fontSize: 14, margin: 0 }}>
            {realisations.length} réalisation{realisations.length !== 1 ? 's' : ''} publiée{realisations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={openAdd} style={btnPrimary}>
          + Nouvelle réalisation
        </button>
      </div>

      {/* Empty state */}
      {realisations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#5A6B80', background: '#EEF4FA', borderRadius: 16, border: '2px dashed rgba(30,96,145,0.2)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontWeight: 700, color: '#0B1B2E', marginBottom: 8 }}>Aucune réalisation</h3>
          <p style={{ fontSize: 14, marginBottom: 24 }}>Ajoutez vos premières photos ou vidéos de travaux</p>
          <button onClick={openAdd} style={btnPrimary}>+ Ajouter ma première réalisation</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 }}>
          {realisations.map((r, idx) => {
            const thumb = getThumb(r)
            const catColor = CAT_COLOR[r.category] || '#5A6B80'
            const isVideo = !!r.video
            return (
              <div key={r.id} style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(30,96,145,0.1)', boxShadow: '0 2px 12px rgba(11,27,46,0.05)',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', background: '#EEF4FA', position: 'relative', overflow: 'hidden' }}>
                  {thumb ? (
                    <img src={thumb} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#5A6B80', fontSize: 28 }}>📷</div>
                  )}
                  {isVideo && (
                    <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(11,27,46,0.7)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                      ▶ Vidéo
                    </div>
                  )}
                  {/* Reorder buttons */}
                  <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <button onClick={() => move(r.id, -1)} disabled={idx === 0} style={{
                      background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 6,
                      width: 26, height: 26, cursor: idx === 0 ? 'not-allowed' : 'pointer',
                      fontSize: 12, color: idx === 0 ? '#aaa' : '#1E6091', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>▲</button>
                    <button onClick={() => move(r.id, 1)} disabled={idx === realisations.length - 1} style={{
                      background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: 6,
                      width: 26, height: 26, cursor: idx === realisations.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: 12, color: idx === realisations.length - 1 ? '#aaa' : '#1E6091', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>▼</button>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: catColor,
                      background: `${catColor}14`, border: `1px solid ${catColor}28`,
                      padding: '2px 8px', borderRadius: 5, textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>{r.category}</span>
                    <span style={{ fontSize: 11, color: '#5A6B80', marginLeft: 'auto' }}>{r.date}</span>
                  </div>
                  <h4 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, color: '#0B1B2E', margin: '0 0 6px', lineHeight: 1.3 }}>
                    {r.title}
                  </h4>
                  {r.description && (
                    <p style={{ fontSize: 13, color: '#5A6B80', margin: '0 0 12px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {r.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <button onClick={() => openEdit(r)} style={{ ...btnEdit, flex: 1, textAlign: 'center' }}>✏️ Modifier</button>
                    <button onClick={() => del(r.id)} style={{ ...btnDanger, flexShrink: 0 }}>🗑</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

// ─── Services Tab ─────────────────────────────────────────────────────────────
function ServicesTab({ toast }: { toast: (msg: string, t?: 'success' | 'error') => void }) {
  const { serviceImages, setServiceImages } = useSiteData()
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [inputMode, setInputMode] = useState<'url' | 'upload'>('url')
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const startEdit = (key: string) => { setEditing(key); setDraft(serviceImages[key] || ''); setInputMode('url') }
  const save = (key: string) => {
    setServiceImages({ ...serviceImages, [key]: draft })
    setEditing(null)
    toast('Image mise à jour ✓')
  }

  const handleFileUpload = async (_key: string, file: File) => {
    try {
      const compressed = await compressImage(file)
      setDraft(compressed)
    } catch {
      const reader = new FileReader()
      reader.onload = ev => { setDraft(ev.target?.result as string) }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1B2E', margin: '0 0 4px' }}>Services</h1>
        <p style={{ color: '#5A6B80', fontSize: 14, margin: 0 }}>Modifiez les images des cartes services affichées sur le site.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(SERVICE_META).map(([key, meta]) => (
          <div key={key} style={{
            background: '#fff', borderRadius: 16, border: '1px solid rgba(30,96,145,0.1)',
            overflow: 'hidden', boxShadow: '0 2px 8px rgba(11,27,46,0.04)',
          }}>
            {/* Preview banner — full width, fixed height */}
            <div style={{ width: '100%', height: 140, background: '#EEF4FA', position: 'relative', flexShrink: 0 }}>
              {serviceImages[key] ? (
                <img src={serviceImages[key]} alt={meta.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 36 }}>{meta.emoji}</div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>{meta.emoji}</span>
                <p style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, color: '#0B1B2E', margin: 0 }}>{meta.label}</p>
              </div>

              {editing === key ? (
                <div>
                  {/* Mode toggle */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {(['url', 'upload'] as const).map(m => (
                      <button key={m} type="button" onClick={() => { setInputMode(m); setDraft('') }} style={{
                        flex: 1, padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        fontWeight: 700, fontSize: 13,
                        background: inputMode === m ? '#0B1B2E' : 'rgba(30,96,145,0.07)',
                        color: inputMode === m ? '#fff' : '#5A6B80',
                      }}>
                        {m === 'url' ? '🔗 URL' : '📷 Photo'}
                      </button>
                    ))}
                  </div>

                  {inputMode === 'url' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <input
                        style={{ ...inp(), width: '100%' }} value={draft} autoFocus
                        placeholder="https://images.unsplash.com/..."
                        onChange={e => setDraft(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') save(key); if (e.key === 'Escape') setEditing(null) }}
                      />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => save(key)} style={{ ...btnPrimary, flex: 1, justifyContent: 'center' }}>Enregistrer</button>
                        <button onClick={() => setEditing(null)} style={{ ...btnGhost, padding: '10px 18px' }}>Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        ref={el => { fileRefs.current[key] = el }}
                        type="file" accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(key, f) }}
                      />
                      {/* Tap zone — large and obvious on mobile */}
                      <button
                        type="button"
                        onClick={() => fileRefs.current[key]?.click()}
                        style={{
                          width: '100%', border: '2px dashed rgba(30,96,145,0.3)', borderRadius: 12,
                          padding: '24px 16px', textAlign: 'center', cursor: 'pointer',
                          background: 'rgba(46,134,171,0.04)', marginBottom: 12,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        }}
                      >
                        {draft && draft.startsWith('data:') ? (
                          <>
                            <img src={draft} alt="preview" style={{ maxHeight: 90, borderRadius: 8, objectFit: 'contain' }} />
                            <span style={{ fontSize: 12, color: '#2E86AB', fontWeight: 600 }}>Appuyer pour changer</span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: 32 }}>📷</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#0B1B2E' }}>Choisir depuis l'appareil</span>
                            <span style={{ fontSize: 12, color: '#5A6B80' }}>JPG, PNG, WEBP</span>
                          </>
                        )}
                      </button>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => { if (draft) save(key) }}
                          disabled={!draft}
                          style={{ ...btnPrimary, flex: 1, justifyContent: 'center', opacity: draft ? 1 : 0.45 }}
                        >
                          Enregistrer
                        </button>
                        <button onClick={() => setEditing(null)} style={{ ...btnGhost, padding: '10px 18px' }}>Annuler</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontSize: 12, color: '#5A6B80', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {serviceImages[key]
                      ? (serviceImages[key].startsWith('data:') ? '📷 Image depuis l\'appareil' : serviceImages[key])
                      : <em>Aucune image définie</em>}
                  </p>
                  <button onClick={() => startEdit(key)} style={{ ...btnPrimary, width: '100%', justifyContent: 'center' }}>
                    🖼️ Modifier l'image
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Testimonials Tab ─────────────────────────────────────────────────────────
type TestimonialForm = Omit<TestimonialData, 'id'>
const EMPTY_T: TestimonialForm = { name: '', location: '', text: '', service: '', avatar: '' }

function TestimonialsTab({ toast }: { toast: (msg: string, t?: 'success' | 'error') => void }) {
  const { testimonials, setTestimonials } = useSiteData()
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<TestimonialForm>(EMPTY_T)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const set = (k: keyof TestimonialForm, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  const openAdd = () => { setEditId(null); setForm(EMPTY_T); setShowForm(true) }
  const openEdit = (t: TestimonialData) => {
    setEditId(t.id)
    setForm({ name: t.name, location: t.location, text: t.text, service: t.service, avatar: t.avatar })
    setShowForm(true)
  }

  const validate = () => {
    const e: Record<string, boolean> = {}
    if (!form.name.trim()) e.name = true
    if (!form.text.trim()) e.text = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const save = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    const avatar = form.avatar || form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    if (editId) {
      setTestimonials(testimonials.map(t => t.id === editId ? { ...t, ...form, avatar } : t))
      toast('Témoignage modifié ✓')
    } else {
      setTestimonials([...testimonials, { id: genId(), ...form, avatar }])
      toast('Témoignage ajouté ✓')
    }
    setShowForm(false)
  }

  const del = (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return
    setTestimonials(testimonials.filter(t => t.id !== id))
    toast('Témoignage supprimé')
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1B2E', margin: '0 0 4px' }}>Témoignages</h1>
          <p style={{ color: '#5A6B80', fontSize: 14, margin: 0 }}>{testimonials.length} avis client{testimonials.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openAdd} style={btnPrimary}>+ Ajouter un avis</button>
      </div>

      {/* Inline form */}
      {showForm && (
        <div style={{ background: '#EEF4FA', borderRadius: 16, padding: '22px 24px', marginBottom: 24, border: '1px solid rgba(30,96,145,0.15)' }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 800, color: '#0B1B2E', margin: '0 0 20px' }}>
            {editId ? 'Modifier l\'avis' : 'Nouvel avis client'}
          </h3>
          <form onSubmit={save}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Nom *</label>
                <input style={inp(errors.name)} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Sophie M." />
                {errors.name && <p style={{ color: '#e55', fontSize: 12, margin: '4px 0 0' }}>Requis</p>}
              </div>
              <div>
                <label style={lbl}>Ville</label>
                <input style={inp()} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Lausanne" />
              </div>
              <div>
                <label style={lbl}>Service</label>
                <input style={inp()} value={form.service} onChange={e => set('service', e.target.value)} placeholder="Nettoyage Textile" />
              </div>
              <div>
                <label style={lbl}>Initiales (auto)</label>
                <input style={inp()} value={form.avatar} onChange={e => set('avatar', e.target.value)} placeholder="SM" maxLength={2} />
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Avis *</label>
              <textarea
                style={{ ...inp(errors.text), minHeight: 90, resize: 'vertical' }}
                value={form.text} onChange={e => set('text', e.target.value)}
                placeholder="Témoignage du client..."
              />
              {errors.text && <p style={{ color: '#e55', fontSize: 12, margin: '4px 0 0' }}>Requis</p>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" style={btnPrimary}>{editId ? '💾 Enregistrer' : '✓ Ajouter'}</button>
              <button type="button" onClick={() => setShowForm(false)} style={btnGhost}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {testimonials.map(t => (
          <div key={t.id} style={{
            background: '#fff', borderRadius: 14, padding: '16px 20px',
            border: '1px solid rgba(30,96,145,0.1)', display: 'flex', gap: 16, alignItems: 'flex-start',
            boxShadow: '0 2px 8px rgba(11,27,46,0.04)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,rgba(46,134,171,0.15),rgba(30,96,145,0.1))',
              border: '1.5px solid rgba(46,134,171,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: '#1E6091', fontSize: 14, fontFamily: 'Sora,sans-serif',
            }}>{t.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 14, fontWeight: 700, color: '#0B1B2E' }}>{t.name}</span>
                {t.location && <span style={{ fontSize: 12, color: '#5A6B80' }}>— {t.location}</span>}
                {t.service && (
                  <span style={{ fontSize: 11, color: '#2E86AB', background: 'rgba(46,134,171,0.08)', padding: '2px 8px', borderRadius: 5, fontWeight: 600 }}>
                    {t.service}
                  </span>
                )}
                <span style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>{'⭐'.repeat(5)}</span>
              </div>
              <p style={{ fontSize: 13, color: '#5A6B80', margin: 0, lineHeight: 1.6 }}>"{t.text}"</p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button onClick={() => openEdit(t)} style={btnEdit}>✏️</button>
              <button onClick={() => del(t.id)} style={btnDanger}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('dolphin_admin_auth') === '1')
  const [tab, setTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast, show: showToast } = useToast()

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const logout = () => { sessionStorage.removeItem('dolphin_admin_auth'); setAuthed(false) }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#F5F7FA' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex" style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 20 }}>
        <Sidebar tab={tab} setTab={setTab} onLogout={logout} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,27,46,0.6)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%' }}>
            <Sidebar tab={tab} setTab={t => { setTab(t); setSidebarOpen(false) }} onLogout={logout} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile header */}
        <div className="flex lg:hidden" style={{
          background: '#0B1B2E', padding: '0 20px', height: 60,
          alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 22, padding: 4 }}>☰</button>
          <span style={{ fontFamily: 'Sora,sans-serif', fontWeight: 800, fontSize: 15, color: '#fff' }}>🐬 Admin</span>
          <a href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>Site ↗</a>
        </div>

        {/* Content */}
        <main style={{ flex: 1, padding: 'clamp(20px, 4vw, 40px)', maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          {tab === 'dashboard'    && <DashboardTab setTab={setTab} />}
          {tab === 'realisations' && <RealisationsTab toast={showToast} />}
          {tab === 'services'     && <ServicesTab toast={showToast} />}
          {tab === 'temoignages'  && <TestimonialsTab toast={showToast} />}
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  )
}
