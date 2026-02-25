'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, ArrowRight } from 'lucide-react'

export default function InstagramBanner() {
  return (
    <section className="py-24 px-6 bg-brown-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-warm-brown via-chocolate to-brown-700 rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            {['🍪', '✨', '❤️', '🍫', '⭐'].map((emoji, i) => (
              <span
                key={i}
                className="absolute text-4xl select-none"
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${10 + (i % 2) * 60}%`,
                  transform: `rotate(${i * 25 - 30}deg)`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>

          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Instagram size={28} className="text-white" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl text-cream font-bold mb-4">
              Follow Our Journey
            </h2>
            <p className="font-body text-cream/70 text-lg mb-8 max-w-md mx-auto">
              Behind-the-scenes baking, new flavors, and cookie drops — all on Instagram.
            </p>

            <a
              href="https://www.instagram.com/melted_movt?igsh=MTFhMHJiOWM5cmw4Ng=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-chocolate px-8 py-4 rounded-full font-semibold font-body text-base
              hover:bg-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-chocolate/30 group"
            >
              <Instagram size={20} />
              @meltedmoments
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-10 flex items-center justify-center gap-8">
              {[
                // { label: 'Posts', value: '48' },
                // { label: 'Followers', value: '1.2k' },
                { label: 'Cookie Lovers', value: '∞' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-gold">{s.value}</p>
                  <p className="font-body text-xs text-cream/50 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
