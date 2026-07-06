import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

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
  loading: boolean
  dbError: string | null
  clearDbError: () => void
  setRealisations: (r: Realisation[]) => void
  setServiceImages: (s: Record<string, string>) => void
  setTestimonials: (t: TestimonialData[]) => void
  exportData: () => void
  importData: (json: string) => boolean
}

export const defaultTestimonials: TestimonialData[] = [
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

export const defaultServiceImages: Record<string, string> = {
  textile:    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
  voiture:    'https://images.unsplash.com/photo-1610647752529-41b7b3f68bfd?w=600&q=80&auto=format&fit=crop',
  industriel: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
  surfaces:   'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80&auto=format&fit=crop',
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [realisations, setRealisationsState] = useState<Realisation[]>([])
  const [serviceImages, setServiceImagesState] = useState<Record<string, string>>(defaultServiceImages)
  const [testimonials, setTestimonialsState] = useState<TestimonialData[]>(defaultTestimonials)
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)

  const prevRealisations = useRef<Realisation[]>([])
  const prevTestimonials = useRef<TestimonialData[]>([])

  // Load all data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [{ data: r, error: re }, { data: s, error: se }, { data: t, error: te }] = await Promise.all([
          supabase.from('realisations').select('*').order('order_index', { ascending: true }),
          supabase.from('service_images').select('*'),
          supabase.from('testimonials').select('*'),
        ])

        if (re || se || te) throw new Error('Supabase fetch error')

        if (r) {
          setRealisationsState(r)
          prevRealisations.current = r
        }
        if (s && s.length > 0) {
          const imgs: Record<string, string> = {}
          s.forEach((row: { key: string; url: string }) => { imgs[row.key] = row.url })
          setServiceImagesState(imgs)
        }
        if (t) {
          const list = t.length > 0 ? t : defaultTestimonials
          setTestimonialsState(list)
          prevTestimonials.current = list
        }
      } catch {
        setDbError('Connexion à la base de données échouée. Vérifiez votre connexion.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const setRealisations = useCallback((newList: Realisation[]) => {
    const old = prevRealisations.current
    prevRealisations.current = newList
    setRealisationsState(newList)

    ;(async () => {
      try {
        const newIds = new Set(newList.map(r => r.id))
        const toDelete = old.filter(r => !newIds.has(r.id))

        if (toDelete.length > 0) {
          const { error } = await supabase.from('realisations').delete().in('id', toDelete.map(r => r.id))
          if (error) throw error
        }
        if (newList.length > 0) {
          const { error } = await supabase.from('realisations').upsert(
            newList.map((r, i) => ({ ...r, order_index: i }))
          )
          if (error) throw error
        }
      } catch {
        setDbError('Erreur sauvegarde réalisations — réessayez.')
      }
    })()
  }, [])

  const setServiceImages = useCallback((images: Record<string, string>) => {
    setServiceImagesState(images)

    ;(async () => {
      try {
        const rows = Object.entries(images).map(([key, url]) => ({ key, url }))
        const { error } = await supabase.from('service_images').upsert(rows, { onConflict: 'key' })
        if (error) throw error
      } catch {
        setDbError('Erreur sauvegarde images services — réessayez.')
      }
    })()
  }, [])

  const setTestimonials = useCallback((newList: TestimonialData[]) => {
    const old = prevTestimonials.current
    prevTestimonials.current = newList
    setTestimonialsState(newList)

    ;(async () => {
      try {
        const newIds = new Set(newList.map(t => t.id))
        const toDelete = old.filter(t => !newIds.has(t.id))

        if (toDelete.length > 0) {
          const { error } = await supabase.from('testimonials').delete().in('id', toDelete.map(t => t.id))
          if (error) throw error
        }
        if (newList.length > 0) {
          const { error } = await supabase.from('testimonials').upsert(newList)
          if (error) throw error
        }
      } catch {
        setDbError('Erreur sauvegarde témoignages — réessayez.')
      }
    })()
  }, [])

  const clearDbError = useCallback(() => setDbError(null), [])

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
      if (data.realisations) setRealisations(data.realisations)
      if (data.serviceImages) setServiceImages(data.serviceImages)
      if (data.testimonials) setTestimonials(data.testimonials)
      return true
    } catch {
      return false
    }
  }, [setRealisations, setServiceImages, setTestimonials])

  return (
    <SiteDataContext.Provider value={{
      realisations, serviceImages, testimonials,
      loading, dbError, clearDbError,
      setRealisations, setServiceImages, setTestimonials,
      exportData, importData,
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
