'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Instagram, MessageCircle, Send, Loader2, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi Melted Moments! 🍪\n\nI'd like to get in touch.\n\nName: ${form.name || 'Not provided'}`)
    window.open(`https://wa.me/918660360712?text=${text}`, '_blank')
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-subtitle mb-3">We'd love to hear from you</p>
            <h1 className="section-title mb-5">Say Hello 👋</h1>
            <p className="font-body text-brown-500 max-w-lg mx-auto leading-relaxed">
              Got a question, a custom order, or just want to gush about cookies? We're always happy to chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick contacts */}
              {[
                {
                  icon: Phone,
                  label: 'Phone / WhatsApp',
                  value: '+91 8660360712',
                  href: 'tel:+918660360712',
                  color: '#22c55e',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'meltedmomentscookiesshop@gmail.com',
                  href: 'mailto:meltedmomentscookiesshop@gmail.com',
                  color: '#D4AF37',
                },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  value: '@meltedmoments',
                  href: 'https://www.instagram.com/melted_movt?igsh=MTFhMHJiOWM5cmw4Ng==',
                  color: '#e1306c',
                },
              ].map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-brown-100 hover:border-warm-brown/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${contact.color}18` }}
                  >
                    <contact.icon size={20} style={{ color: contact.color }} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-brown-400 uppercase tracking-wide">{contact.label}</p>
                    <p className="font-body text-sm font-medium text-chocolate group-hover:text-warm-brown transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center"
              >
                <MessageCircle size={28} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-display text-chocolate text-lg font-bold mb-1">Chat on WhatsApp</h3>
                <p className="font-body text-sm text-brown-400 mb-4">Fastest response. Usually reply within minutes!</p>
                <a
                  href="https://wa.me/918660360712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold font-body hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={16} />
                  Open WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-3 bg-white rounded-3xl border border-brown-100 p-8 shadow-sm"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle size={56} className="text-green-500" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-chocolate font-bold">Message Sent! 🎉</h3>
                  <p className="font-body text-brown-400 text-sm max-w-xs">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="btn-outline text-sm px-6 py-2.5"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-chocolate font-bold mb-1">Send us a message</h2>
                  <p className="font-body text-sm text-brown-400 mb-7">Fill the form below and we'll get back to you soon!</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-body text-xs font-medium text-brown-500 uppercase tracking-wide block mb-1.5">Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full bg-brown-50 border border-brown-100 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/15 transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-brown-500 uppercase tracking-wide block mb-1.5">Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@email.com"
                          className="w-full bg-brown-50 border border-brown-100 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/15 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-xs font-medium text-brown-500 uppercase tracking-wide block mb-1.5">Subject</label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What's on your mind?"
                        className="w-full bg-brown-50 border border-brown-100 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/15 transition-all"
                      />
                    </div>

                    <div>
                      <label className="font-body text-xs font-medium text-brown-500 uppercase tracking-wide block mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your order, question, or just say hi..."
                        className="w-full bg-brown-50 border border-brown-100 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/15 transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2.5 bg-warm-brown text-cream py-4 rounded-2xl font-body font-semibold
                        hover:bg-chocolate transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brown-500/25"
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="flex items-center justify-center gap-2.5 bg-green-500 text-white px-6 py-4 rounded-2xl font-body font-semibold
                        hover:bg-green-600 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <MessageCircle size={18} />
                        WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
