import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 z-[100] h-[3px]"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #2E86AB, #7FDBFF)',
        boxShadow: '0 0 8px rgba(127, 219, 255, 0.6)',
        transition: 'width 80ms linear',
      }}
    />
  )
}
