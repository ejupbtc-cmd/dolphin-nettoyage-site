import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Realisation {
  id: string
  title: string
  description: string
  category: string
  image: string
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

  useEffect(() => {
    localStorage.setItem('dolphin_realisations', JSON.stringify(realisations))
  }, [realisations])

  useEffect(() => {
    localStorage.setItem('dolphin_service_images', JSON.stringify(serviceImages))
  }, [serviceImages])

  useEffect(() => {
    localStorage.setItem('dolphin_testimonials', JSON.stringify(testimonials))
  }, [testimonials])

  const setRealisations = (r: Realisation[]) => setRealisationsState(r)
  const setServiceImages = (s: Record<string, string>) => setServiceImagesState(s)
  const setTestimonials = (t: TestimonialData[]) => setTestimonialsState(t)

  return (
    <SiteDataContext.Provider value={{ realisations, serviceImages, testimonials, setRealisations, setServiceImages, setTestimonials }}>
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
