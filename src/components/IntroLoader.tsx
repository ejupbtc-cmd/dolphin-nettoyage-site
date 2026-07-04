import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroLoader() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('dolphin-intro-seen'))

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => {
      sessionStorage.setItem('dolphin-intro-seen', '1')
      setShow(false)
    }, 1300)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: '#FFFFFF' }}
          aria-label="Chargement Dolphin Nettoyage"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.08, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center select-none"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 0.9, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.15 }}
              style={{ fontSize: '3.5rem', lineHeight: 1 }}
            >
              🐬
            </motion.div>
            <div
              className="mt-4 font-black tracking-tight"
              style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.25rem', color: '#0B2545' }}
            >
              DOLPHIN{' '}
              <span style={{ color: '#2E86AB' }}>NETTOYAGE</span>
            </div>
            <div className="mt-3 flex justify-center gap-1">
              {[0, 0.15, 0.3].map(delay => (
                <motion.div
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#5BC0DE' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
