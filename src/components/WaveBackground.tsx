import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WaveBackground() {
  const w1 = useRef<SVGPathElement>(null)
  const w2 = useRef<SVGPathElement>(null)
  const w3 = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!w1.current || !w2.current || !w3.current) return
    gsap.to(w1.current, { y: -18, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(w2.current, { y: -12, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8 })
    gsap.to(w3.current, { y: -8, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Deep radial glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,134,171,0.18) 0%, transparent 70%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-[70%]" style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(11,37,69,0.9) 0%, transparent 70%)',
      }} />

      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full opacity-30"
        style={{ height: '40%' }}
      >
        <path ref={w3} fill="rgba(46,134,171,0.25)"
          d="M0,192 C360,256 720,128 1080,192 C1260,224 1350,208 1440,192 L1440,320 L0,320 Z" />
        <path ref={w2} fill="rgba(30,96,145,0.4)"
          d="M0,224 C240,192 480,256 720,224 C960,192 1200,240 1440,224 L1440,320 L0,320 Z" />
        <path ref={w1} fill="rgba(11,37,69,0.85)"
          d="M0,256 C360,240 720,272 1080,256 C1260,248 1350,260 1440,256 L1440,320 L0,320 Z" />
      </svg>

      {/* Subtle particle dots */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 20}%`,
            background: `rgba(127, 219, 255, ${0.1 + Math.random() * 0.2})`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}
