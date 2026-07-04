import { useState } from 'react'
import { useSiteData, type Realisation, type TestimonialData } from '../context/SiteDataContext'

const ADMIN_PASSWORD = 'dolphin2024'

const CATEGORIES = ['Textile', 'Voiture', 'Industriel', 'Surfaces', 'Autre']

const SERVICE_LABELS: Record<string, string> = {
  textile: 'Nettoyage Textile',
  voiture: 'Voiture',
  industriel: 'Nettoyage Industriel',
  surfaces: 'Surfaces spécialisées',
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('dolphin_admin_auth', '1')
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#EEF4FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 400, boxShadow: '0 8px 40px rgba(30,96,145,0.12)', border: '1px solid rgba(30,96,145,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 40 }}>🐬</span>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 800, color: '#0B1B2E', marginTop: 12 }}>Dolphin Admin</h1>
          <p style={{ color: '#5A6B80', fontSize: 14, marginTop: 6 }}>Accès réservé</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            autoFocus
            style={{
              padding: '14px 16px', borderRadius: 12, fontSize: 15,
              border: `1.5px solid ${error ? '#e55' : 'rgba(30,96,145,0.2)'}`,
              outline: 'none', color: '#0B1B2E', width: '100%', boxSizing: 'border-box',
            }}
          />
          {error && <p style={{ color: '#e55', fontSize: 13, margin: 0 }}>Mot de passe incorrect</p>}
          <button type="submit" style={{
            background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff',
            border: 'none', borderRadius: 12, padding: '14px', fontSize: 15,
            fontWeight: 700, cursor: 'pointer',
          }}>Se connecter</button>
        </form>
      </div>
    </div>
  )
}

// ── Reusable input/textarea styles
const inputStyle: React.CSSProperties = {
  padding: '10px 14px', borderRadius: 10, fontSize: 14,
  border: '1.5px solid rgba(30,96,145,0.2)', outline: 'none',
  color: '#0B1B2E', width: '100%', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
}
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#14304D', marginBottom: 4, display: 'block' }

// ─── Tab: Réalisations ───────────────────────────────────────────────────────
function RealisationsTab() {
  const { realisations, setRealisations } = useSiteData()
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Realisation, 'id'>>({ title: '', description: '', category: 'Textile', image: '', date: new Date().toISOString().slice(0, 10) })

  const openAdd = () => {
    setEditId(null)
    setForm({ title: '', description: '', category: 'Textile', image: '', date: new Date().toISOString().slice(0, 10) })
    setShowForm(true)
  }

  const openEdit = (r: Realisation) => {
    setEditId(r.id)
    setForm({ title: r.title, description: r.description, category: r.category, image: r.image, date: r.date })
    setShowForm(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      setRealisations(realisations.map(r => r.id === editId ? { ...r, ...form } : r))
    } else {
      setRealisations([{ id: genId(), ...form }, ...realisations])
    }
    setShowForm(false)
  }

  const del = (id: string) => {
    if (confirm('Supprimer cette réalisation ?')) setRealisations(realisations.filter(r => r.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 800, color: '#0B1B2E', margin: 0 }}>Réalisations ({realisations.length})</h2>
        <button onClick={openAdd} style={{ background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#EEF4FA', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid rgba(30,96,145,0.15)' }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1B2E', marginBottom: 20 }}>
            {editId ? 'Modifier la réalisation' : 'Nouvelle réalisation'}
          </h3>
          <form onSubmit={save} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Titre *</label>
              <input required style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Nettoyage canapé cuir..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Catégorie</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: '1/-1' }}>
              <label style={labelStyle}>URL de l'image *</label>
              <input required style={inputStyle} value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: '1/-1' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Décrivez le travail effectué..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Date</label>
              <input type="date" style={inputStyle} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div />
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12 }}>
              <button type="submit" style={{ background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {editId ? 'Enregistrer' : 'Ajouter'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: 'rgba(30,96,145,0.08)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.2)', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {realisations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#5A6B80' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
          <p style={{ fontSize: 15 }}>Aucune réalisation pour l'instant.<br />Ajoutez vos premières photos de travaux !</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {realisations.map(r => (
            <div key={r.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(30,96,145,0.1)', boxShadow: '0 2px 12px rgba(11,27,46,0.06)' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#EEF4FA' }}>
                {r.image ? (
                  <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#5A6B80', fontSize: 30 }}>📷</div>
                )}
              </div>
              <div style={{ padding: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2E86AB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.category}</span>
                <h4 style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, color: '#0B1B2E', margin: '6px 0 4px' }}>{r.title}</h4>
                {r.description && <p style={{ fontSize: 13, color: '#5A6B80', margin: 0, lineHeight: 1.5 }}>{r.description}</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button onClick={() => openEdit(r)} style={{ flex: 1, background: 'rgba(30,96,145,0.07)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.18)', borderRadius: 8, padding: '8px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Modifier</button>
                  <button onClick={() => del(r.id)} style={{ flex: 1, background: 'rgba(220,50,50,0.06)', color: '#c0392b', border: '1.5px solid rgba(220,50,50,0.18)', borderRadius: 8, padding: '8px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Tab: Services ───────────────────────────────────────────────────────────
function ServicesTab() {
  const { serviceImages, setServiceImages } = useSiteData()
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const startEdit = (key: string) => {
    setEditing(key)
    setDraft(serviceImages[key] || '')
  }

  const save = (key: string) => {
    setServiceImages({ ...serviceImages, [key]: draft })
    setEditing(null)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 800, color: '#0B1B2E', marginBottom: 8 }}>Images des services</h2>
      <p style={{ fontSize: 14, color: '#5A6B80', marginBottom: 24 }}>Modifiez les URLs des images affichées dans la section services du site.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.keys(SERVICE_LABELS).map(key => (
          <div key={key} style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(30,96,145,0.1)', overflow: 'hidden', display: 'flex', gap: 0 }}>
            <div style={{ width: 120, flexShrink: 0 }}>
              <img
                src={serviceImages[key] || ''}
                alt={SERVICE_LABELS[key]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 90 }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div style={{ flex: 1, padding: '16px 20px' }}>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 700, color: '#0B1B2E', margin: '0 0 10px' }}>{SERVICE_LABELS[key]}</p>
              {editing === key ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="https://..."
                    autoFocus
                  />
                  <button onClick={() => save(key)} style={{ background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>OK</button>
                  <button onClick={() => setEditing(null)} style={{ background: 'rgba(30,96,145,0.07)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.18)', borderRadius: 8, padding: '0 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>✕</button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: '#5A6B80', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{serviceImages[key] || '—'}</span>
                  <button onClick={() => startEdit(key)} style={{ background: 'rgba(30,96,145,0.07)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.18)', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Changer l'image</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tab: Témoignages ─────────────────────────────────────────────────────────
function TestimonialsTab() {
  const { testimonials, setTestimonials } = useSiteData()
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<TestimonialData, 'id'>>({ name: '', location: '', text: '', service: '', avatar: '' })

  const openAdd = () => {
    setEditId(null)
    setForm({ name: '', location: '', text: '', service: '', avatar: '' })
    setShowForm(true)
  }

  const openEdit = (t: TestimonialData) => {
    setEditId(t.id)
    setForm({ name: t.name, location: t.location, text: t.text, service: t.service, avatar: t.avatar })
    setShowForm(true)
  }

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    const avatarVal = form.avatar || form.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    if (editId) {
      setTestimonials(testimonials.map(t => t.id === editId ? { ...t, ...form, avatar: avatarVal } : t))
    } else {
      setTestimonials([...testimonials, { id: genId(), ...form, avatar: avatarVal }])
    }
    setShowForm(false)
  }

  const del = (id: string) => {
    if (confirm('Supprimer ce témoignage ?')) setTestimonials(testimonials.filter(t => t.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: 20, fontWeight: 800, color: '#0B1B2E', margin: 0 }}>Témoignages ({testimonials.length})</h2>
        <button onClick={openAdd} style={{ background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#EEF4FA', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid rgba(30,96,145,0.15)' }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1B2E', marginBottom: 20 }}>
            {editId ? 'Modifier le témoignage' : 'Nouveau témoignage'}
          </h3>
          <form onSubmit={save} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Nom *</label>
              <input required style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Sophie M." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Ville</label>
              <input style={inputStyle} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Ex: Lausanne" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Service</label>
              <input style={inputStyle} value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} placeholder="Ex: Nettoyage Textile" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={labelStyle}>Initiales (optionnel)</label>
              <input style={inputStyle} value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="Ex: SM (auto si vide)" maxLength={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: '1/-1' }}>
              <label style={labelStyle}>Avis *</label>
              <textarea required style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Texte du témoignage..." />
            </div>
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12 }}>
              <button type="submit" style={{ background: 'linear-gradient(135deg,#2E86AB,#1E6091)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {editId ? 'Enregistrer' : 'Ajouter'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: 'rgba(30,96,145,0.08)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.2)', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {testimonials.map(t => (
          <div key={t.id} style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid rgba(30,96,145,0.1)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(46,134,171,0.1)', border: '1.5px solid rgba(46,134,171,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1E6091', fontSize: 14, flexShrink: 0 }}>
              {t.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 14, fontWeight: 700, color: '#0B1B2E' }}>{t.name}</span>
                <span style={{ fontSize: 12, color: '#5A6B80' }}>{t.location}</span>
                {t.service && <span style={{ fontSize: 11, color: '#2E86AB', background: 'rgba(46,134,171,0.08)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{t.service}</span>}
              </div>
              <p style={{ fontSize: 13, color: '#5A6B80', margin: 0, lineHeight: 1.6 }}>"{t.text}"</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(t)} style={{ background: 'rgba(30,96,145,0.07)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.18)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Modifier</button>
              <button onClick={() => del(t.id)} style={{ background: 'rgba(220,50,50,0.06)', color: '#c0392b', border: '1.5px solid rgba(220,50,50,0.18)', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
type Tab = 'realisations' | 'services' | 'temoignages'

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('dolphin_admin_auth') === '1')
  const [tab, setTab] = useState<Tab>('realisations')

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const logout = () => {
    sessionStorage.removeItem('dolphin_admin_auth')
    setAuthed(false)
  }

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'realisations', label: 'Réalisations', emoji: '📸' },
    { id: 'services', label: 'Services', emoji: '🖼️' },
    { id: 'temoignages', label: 'Témoignages', emoji: '⭐' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#EEF4FA', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(30,96,145,0.12)', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 26 }}>🐬</span>
          <div>
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 15, color: '#0B1B2E', lineHeight: 1.2 }}>DOLPHIN</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#2E86AB', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/" style={{ fontSize: 13, color: '#1E6091', textDecoration: 'none', fontWeight: 600 }}>← Voir le site</a>
          <button onClick={logout} style={{ background: 'rgba(30,96,145,0.07)', color: '#1E6091', border: '1.5px solid rgba(30,96,145,0.18)', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? 'linear-gradient(135deg,#2E86AB,#1E6091)' : '#fff',
                color: tab === t.id ? '#fff' : '#5A6B80',
                border: tab === t.id ? 'none' : '1.5px solid rgba(30,96,145,0.18)',
                borderRadius: 10, padding: '10px 20px', fontSize: 14,
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: tab === t.id ? '0 4px 16px rgba(30,96,145,0.2)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '28px 28px', boxShadow: '0 4px 24px rgba(11,27,46,0.06)', border: '1px solid rgba(30,96,145,0.08)', minHeight: 400 }}>
          {tab === 'realisations' && <RealisationsTab />}
          {tab === 'services' && <ServicesTab />}
          {tab === 'temoignages' && <TestimonialsTab />}
        </div>
      </div>
    </div>
  )
}
