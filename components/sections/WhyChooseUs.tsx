'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, Leaf } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'We source only the finest ingredients — premium chocolate, real butter, farm-fresh eggs. No compromise, ever.',
    color: '#4ade80',
  },
  {
    icon: Sparkles,
    title: 'Small Batch Baking',
    description: 'Every batch is baked to order in small quantities, ensuring each cookie is as fresh and soft as the first.',
    color: '#D4AF37',
  },
  {
    icon: Users,
    title: 'Student-Run Brand',
    description: 'Real people, real passion. We\'re 3rd year students who turned a project into a bakery brand you can trust.',
    color: '#60a5fa',
  },
  {
    icon: Heart,
    title: 'Affordable Premium',
    description: 'Luxury cookies shouldn\'t cost a fortune. Premium quality at campus-friendly prices — that\'s the Melted Moments promise.',
    color: '#f87171',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-chocolate relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 text-[200px] font-display text-cream leading-none select-none">
          MM
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brown-500/10 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-accent text-gold italic text-xl mb-3"
          >
            Why we're different
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-cream font-bold mb-5"
          >
            Baked with Purpose
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-cream/60 max-w-md mx-auto"
          >
            We don't just bake cookies. We craft moments of joy, one bite at a time.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}20` }}
              >
                <feature.icon size={22} style={{ color: feature.color }} />
              </div>
              <h3 className="font-display text-xl text-cream font-bold mb-3">{feature.title}</h3>
              <p className="font-body text-sm text-cream/55 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            // { number: '500+', label: 'Cookies Baked' },
            { number: '4', label: 'Unique Flavors' },
            { number: '100%', label: 'Fresh Ingredients' },
            { number: '5', label: 'Passionate Bakers' },
            { number: '100%', label: 'hygiene' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">{stat.number}</p>
              <p className="font-body text-sm text-cream/50 uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 fill-brown-50">
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  )
}
