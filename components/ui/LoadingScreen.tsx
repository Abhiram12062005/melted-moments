'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-chocolate flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-cream text-6xl select-none"
                style={{
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                  opacity: 0.3,
                  transform: `rotate(${i * 18}deg)`,
                }}
              >
                🍪
              </div>
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-6">
            {/* Cookie animation */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: 1 }}
              className="text-7xl"
            >
              🍪
            </motion.div>

            {/* Logo text */}
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-5xl font-bold text-cream"
              >
                Melted
              </motion.span>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-accent text-gold italic text-sm uppercase"
              >
                Moments
              </motion.span>
            </div>

            {/* Progress bar */}
            <motion.div className="w-48 h-0.5 bg-cream/10 rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full bg-gold rounded-full"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-body text-xs text-cream/40 tracking-widest uppercase"
            >
              Baking something special...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
