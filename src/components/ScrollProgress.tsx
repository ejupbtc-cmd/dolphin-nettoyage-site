import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      bar.style.width = `${pct}%`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={barRef}
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '0%',
        height: '3px',
        zIndex: 200,
        background: 'linear-gradient(90deg, #1E6091, #2E86AB 50%, #7FDBFF)',
        boxShadow: '0 0 6px 1px rgba(91,192,222,0.55), 0 0 16px 2px rgba(46,134,171,0.35)',
        transformOrigin: 'left',
        willChange: 'width',
      }}
    />
  )
}
