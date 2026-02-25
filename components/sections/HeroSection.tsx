'use client'

import { useState, Suspense, lazy } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ShoppingBag, UtensilsCrossed } from 'lucide-react'

const CookieScene = lazy(() => import('@/components/3d/CookieScene'))

export default function HeroSection() {
  const [broken, setBroken] = useState(false)

  return (
    <section
      className="relative w-screen min-h-screen overflow-hidden bg-chocolate"
      style={{ marginLeft: 0, paddingLeft: 0, left: 0 }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate via-chocolate/95 to-chocolate" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-800/20 blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-yellow-600/10 blur-[60px]" />
      </div>

      {/* 3D Canvas — true full screen, behind everything */}
      <div className="absolute inset-0 w-full h-full">
        <Suspense fallback={null}>
          <CookieScene onBreakComplete={() => setTimeout(() => setBroken(true), 300)} />
        </Suspense>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-chocolate/20 pointer-events-none" />

      {/* Content overlay — centered on screen */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center px-6 pb-28 text-center">
        {/* Badge */}
        <AnimatePresence>
          {broken && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 bg-yellow-900/30 backdrop-blur-sm border border-yellow-600/30 rounded-full px-4 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="font-body text-xs text-yellow-400 tracking-widest uppercase font-medium">
                Freshly Baked Today
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main headline */}
        <AnimatePresence>
          {broken && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-cream leading-none mb-6"
              >
                Fresh.
                <br />
                <span className="text-gold italic">Soft.</span>
                <br />
                Premium.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="font-body text-cream/70 text-base sm:text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
              >
                Mouth-Melting Cookies Made by Passionate{' '}
                <span className="text-gold font-medium">Student Entrepreneurs</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href="/products"
                  className="flex items-center gap-2.5 bg-gold text-chocolate px-8 py-4 rounded-full font-body font-semibold 
                  hover:bg-yellow-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/30 text-base"
                >
                  <ShoppingBag size={18} />
                  Order Now
                </Link>
                <Link
                  href="/products"
                  className="flex items-center gap-2.5 border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-body font-medium 
                  hover:border-cream hover:bg-cream/10 transition-all duration-300 hover:-translate-y-1 text-base backdrop-blur-sm"
                >
                  <UtensilsCrossed size={18} />
                  View Menu
                </Link>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator — pinned to bottom, full width centered, pointer-events-none so it never blocks clicks */}
      <AnimatePresence>
        {broken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-body text-xs text-cream/40 tracking-widest uppercase">Scroll to explore</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown size={16} className="text-yellow-500/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 fill-brown-50">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}