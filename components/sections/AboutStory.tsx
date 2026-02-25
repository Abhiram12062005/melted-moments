'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Clock, Flame, Layers, Award, Smile } from 'lucide-react'

const timeline = [
  {
    date: 'Jan 2024',
    title: 'The Assignment',
    description: 'Our entrepreneurship professor assigned us to ideate a real business. We brainstormed for days and kept coming back to one thing — really, really good cookies.',
    icon: '📚',
  },
  {
    date: 'Feb 2024',
    title: 'First Batch Ever',
    description: 'Baked our first test batch in a tiny hostel kitchen. Friends devoured them in minutes and demanded more. We knew we were onto something.',
    icon: '🍳',
  },
  {
    date: 'Mar 2024',
    title: 'Campus Launch',
    description: 'Set up a small pop-up stall at our college fest. Sold out in 45 minutes. The line was longer than the snack bar. We were in disbelief.',
    icon: '🚀',
  },
  {
    date: 'May 2024',
    title: 'Going Online',
    description: 'Built our ordering system and Instagram page. First week got 200+ followers and 50 orders. No looking back after that.',
    icon: '📱',
  },
  {
    date: 'Now',
    title: 'Melted Moments',
    description: 'What started as an assignment is now a brand. We bake 200+ cookies weekly, ship across campus, and have 8 signature flavors. This is just the beginning.',
    icon: '⭐',
  },
]

const pillars = [
  { icon: Flame, title: 'Made Fresh', text: 'Every order is baked fresh, never stored. We batch on demand.' },
  { icon: Layers, title: 'Premium Ingredients', text: 'Belgian chocolate, real butter, pure vanilla. The good stuff.' },
  { icon: Award, title: 'No Shortcuts', text: 'We chill our dough, never rush. Patience makes the texture perfect.' },
  { icon: Smile, title: 'For Everyone', text: 'Premium taste, student-friendly prices. Luxury shouldn\'t be exclusive.' },
]

export default function AboutStory() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-brown-50 pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-subtitle mb-3">The people behind the cookies</p>
            <h1 className="section-title mb-6">Our Story</h1>
            <p className="font-body text-brown-500 text-lg leading-relaxed max-w-2xl mx-auto">
              We are a team of 3rd year students who turned a classroom entrepreneurship project into a real bakery brand.
              What started as an assignment became a passion to bake fresh, premium cookies for our campus community.
              Every cookie is handmade in small batches to ensure softness, freshness, and flavor perfection.
            </p>
          </motion.div>

          {/* Team emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            {['👨‍🍳', '👩‍🍳', '🧑‍🍳'].map((emoji, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl"
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-chocolate font-bold text-center mb-14"
          >
            How It All Started
          </motion.h2>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-warm-brown to-brown-300 opacity-30" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-16 timeline-item"
                >
                  {/* Dot */}
                  <div className="absolute left-0 w-12 h-12 rounded-2xl bg-cream border-2 border-brown-200 flex items-center justify-center text-xl shadow-sm">
                    {item.icon}
                  </div>

                  <div className="bg-brown-50 rounded-2xl p-6 border border-brown-100">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-body text-xs text-gold font-semibold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-chocolate font-bold mb-2">{item.title}</h3>
                    <p className="font-body text-brown-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-chocolate">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                title: 'Bake Joy Into Every Bite',
                text: 'To create premium, handcrafted cookies that make everyday moments feel special — without breaking the bank. We believe great cookies should be accessible, honest, and made with real ingredients by real people who care.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                title: 'India\'s Most Loved Cookie Brand',
                text: 'To grow Melted Moments from a campus brand into a household name — a symbol of quality, warmth, and the entrepreneurial spirit of young India. One cookie, one smile, one melted moment at a time.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-gold" />
                </div>
                <span className="font-body text-xs text-gold uppercase tracking-widest font-medium">{item.label}</span>
                <h3 className="font-display text-2xl text-cream font-bold mt-2 mb-4">{item.title}</h3>
                <p className="font-body text-cream/60 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us pillars */}
      <section className="py-20 px-6 bg-brown-50">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl text-chocolate text-center font-bold mb-12"
          >
            The Melted Moments Difference
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center p-7 bg-white rounded-3xl border border-brown-100 hover:border-warm-brown/30 hover:shadow-lg hover:shadow-brown-200/40 transition-all duration-400 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-warm-brown/10 transition-colors">
                  <pillar.icon size={24} className="text-warm-brown" />
                </div>
                <h3 className="font-display text-lg text-chocolate font-bold mb-2">{pillar.title}</h3>
                <p className="font-body text-sm text-brown-400 leading-relaxed">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
