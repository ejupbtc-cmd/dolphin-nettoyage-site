import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface Realisation {
  id: string
  title: string
  description: string
  category: string
  image: string
  video?: string
  date: string
}

export interface ServiceImage {
  id: string
  image: string
}

export interface TestimonialData {
  id: string
  name: string
  location: string
  text: string
  service: string
  avatar: string
}

interface SiteData {
  realisations: Realisation[]
  serviceImages: Record<string, string>
  testimonials: TestimonialData[]
}

interface SiteDataContextValue extends SiteData {
  setRealisations: (r: Realisation[]) => void
  setServiceImages: (s: Record<string, string>) => void
  setTestimonials: (t: TestimonialData[]) => void
  storageError: string | null
  clearStorageError: () => void
  exportData: () => void
  importData: (json: string) => boolean
  getStorageUsage: () => { usedKB: number; percentUsed: number }
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'Sophie M.',
    location: 'Yverdon-les-Bains',
    text: 'Service impeccable ! Mon canapé semblait neuf après le nettoyage. Équipe professionnelle, ponctuelle et très soigneuse. Je recommande vivement.',
    service: 'Nettoyage Textile',
    avatar: 'SM',
  },
  {
    id: '2',
    name: 'Marc R.',
    location: 'Lausanne',
    text: 'Nettoyage de fin de chantier réalisé rapidement et avec soin. Résultat parfait, prix honnête et devis reçu en moins de 2h. Très sérieux.',
    service: 'Nettoyage Industriel',
    avatar: 'MR',
  },
  {
    id: '3',
    name: 'Isabelle V.',
    location: 'Morges',
    text: "J'ai fait nettoyer l'intérieur de ma voiture — résultat bluffant ! Comme sortie du concessionnaire. Le nettoyage sans eau est vraiment efficace.",
    service: 'Voiture',
    avatar: 'IV',
  },
]

const defaultServiceImages: Record<string, string> = {
  textile: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
  voiture: 'https://images.unsplash.com/photo-1610647752529-41b7b3f68bfd?w=600&q=80&auto=format&fit=crop',
  industriel: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
  surfaces: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80&auto=format&fit=crop',
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function safeSave(key: string, value: unknown): string | null {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return null
  } catch {
    return `Espace de stockage plein — les modifications ne peuvent pas être sauvegardées. Exportez vos données pour ne pas les perdre.`
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [realisations, setRealisationsState] = useState<Realisation[]>(() =>
    loadFromStorage('dolphin_realisations', [])
  )
  const [serviceImages, setServiceImagesState] = useState<Record<string, string>>(() =>
    loadFromStorage('dolphin_service_images', defaultServiceImages)
  )
  const [testimonials, setTestimonialsState] = useState<TestimonialData[]>(() =>
    loadFromStorage('dolphin_testimonials', defaultTestimonials)
  )
  const [storageError, setStorageError] = useState<string | null>(null)

  useEffect(() => {
    const err = safeSave('dolphin_realisations', realisations)
    if (err) setStorageError(err)
  }, [realisations])

  useEffect(() => {
    const err = safeSave('dolphin_service_images', serviceImages)
    if (err) setStorageError(err)
  }, [serviceImages])

  useEffect(() => {
    const err = safeSave('dolphin_testimonials', testimonials)
    if (err) setStorageError(err)
  }, [testimonials])

  const setRealisations = (r: Realisation[]) => setRealisationsState(r)
  const setServiceImages = (s: Record<string, string>) => setServiceImagesState(s)
  const setTestimonials = (t: TestimonialData[]) => setTestimonialsState(t)

  const clearStorageError = useCallback(() => setStorageError(null), [])

  const exportData = useCallback(() => {
    const data = { realisations, serviceImages, testimonials, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dolphin-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [realisations, serviceImages, testimonials])

  const importData = useCallback((json: string): boolean => {
    try {
      const data = JSON.parse(json)
      if (data.realisations) setRealisationsState(data.realisations)
      if (data.serviceImages) setServiceImagesState(data.serviceImages)
      if (data.testimonials) setTestimonialsState(data.testimonials)
      return true
    } catch {
      return false
    }
  }, [])

  const getStorageUsage = useCallback(() => {
    try {
      const keys = ['dolphin_realisations', 'dolphin_service_images', 'dolphin_testimonials']
      const usedBytes = keys.reduce((sum, k) => sum + (localStorage.getItem(k) || '').length, 0)
      const maxBytes = 5 * 1024 * 1024
      return { usedKB: Math.round(usedBytes / 1024), percentUsed: Math.min(100, Math.round(usedBytes / maxBytes * 100)) }
    } catch {
      return { usedKB: 0, percentUsed: 0 }
    }
  }, [realisations, serviceImages, testimonials])

  return (
    <SiteDataContext.Provider value={{
      realisations, serviceImages, testimonials,
      setRealisations, setServiceImages, setTestimonials,
      storageError, clearStorageError, exportData, importData, getStorageUsage,
    }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}

export { defaultTestimonials, defaultServiceImages }
