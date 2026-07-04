# Dolphin Nettoyage — Site web marketing

Site web single-page marketing pour **Dolphin Nettoyage**, expert du nettoyage à domicile dans le Canton de Vaud.

## Stack technique

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (configuration personnalisée)
- **Framer Motion** — micro-animations et reveal on scroll
- **GSAP + ScrollTrigger** — animations hero et stagger cards
- **lucide-react** — icônes

## Démarrage rapide

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Logo

Placez votre logo à `src/assets/logo-dolphin.png`. Si absent, un emoji 🐬 s'affiche en fallback automatique.

## Déploiement sur Vercel

1. Poussez ce dépôt sur GitHub
2. Importez dans [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Cliquez **Deploy** — aucune variable d'environnement requise

## Structure

```
src/
  components/     # Header, WaveBackground, FloatingWhatsApp
  sections/       # Hero, Services, WhyUs, OfferBanner, ZoneIntervention, Testimonials, Contact, Footer
  assets/         # Logo et images statiques
  index.css       # Styles globaux + utilitaires glassmorphism
```

## Contenu à personnaliser

- Remplacez les avis clients dans `src/sections/Testimonials.tsx` par de vrais témoignages
- Ajoutez votre logo PNG à `src/assets/logo-dolphin.png`
- Complétez les mentions légales dans `src/sections/Footer.tsx`
