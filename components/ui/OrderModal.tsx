'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Mail, Loader2, CheckCircle } from 'lucide-react'
import { products } from '@/lib/products'
import { openWhatsAppOrder, type OrderData } from '@/lib/whatsapp'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  preSelectedCookie?: string
}

const EMPTY_FORM: OrderData = {
  fullName: '',
  phone: '',
  email: '',
  cookieType: '',
  quantity: 1,
  deliveryDate: '',
  customMessage: '',
  paymentMode: 'COD',
}

export default function OrderModal({ isOpen, onClose, preSelectedCookie }: OrderModalProps) {
  const [form, setForm] = useState<OrderData>({
    ...EMPTY_FORM,
    cookieType: preSelectedCookie || '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitMode, setSubmitMode] = useState<'whatsapp' | 'email'>('whatsapp')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (submitMode === 'whatsapp') {
        openWhatsAppOrder(form)
        setSuccess(true)
      } else {
        // EmailJS path
        const { sendOrderEmail } = await import('@/lib/emailjs')
        const ok = await sendOrderEmail(form)
        if (ok) setSuccess(true)
        else alert('Failed to send email. Please try WhatsApp instead.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setForm({ ...EMPTY_FORM, cookieType: preSelectedCookie || '' })
    setSuccess(false)
    onClose()
  }

  // Get tomorrow's date as minimum
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-chocolate/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-brown-50 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-chocolate px-6 py-5 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-display text-2xl text-cream font-bold">Place Your Order</h2>
                <p className="font-body text-cream/50 text-sm mt-0.5">Fresh cookies, delivered with love 🍪</p>
              </div>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:text-cream hover:bg-cream/20 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success state */}
            {success ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle size={64} className="text-green-500" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl text-chocolate mb-2">Order Sent! 🎉</h3>
                  <p className="font-body text-brown-500 text-sm leading-relaxed">
                    {submitMode === 'whatsapp'
                      ? 'WhatsApp opened with your order details. We\'ll confirm your order shortly!'
                      : 'Your order email has been sent. We\'ll get back to you soon!'}
                  </p>
                </div>
                <button onClick={handleClose} className="btn-primary">
                  Great, Thanks!
                </button>
              </div>
            ) : (
              <>
                {/* Submit mode toggle */}
                <div className="px-6 pt-5 flex-shrink-0">
                  <div className="flex bg-brown-100/50 rounded-xl p-1 gap-1 border border-brown-200">
                    <button
                      onClick={() => setSubmitMode('whatsapp')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        submitMode === 'whatsapp'
                          ? 'bg-green-500 text-white shadow-md'
                          : 'text-brown-500 hover:text-chocolate'
                      }`}
                    >
                      <MessageCircle size={15} />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setSubmitMode('email')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        submitMode === 'email'
                          ? 'bg-warm-brown text-cream shadow-md'
                          : 'text-brown-500 hover:text-chocolate'
                      }`}
                    >
                      <Mail size={15} />
                      Email
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="overflow-y-auto flex-1 px-6 pb-6">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Phone *
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@email.com"
                        className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Cookie Type *
                        </label>
                        <select
                          name="cookieType"
                          value={form.cookieType}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select...</option>
                          {products.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Quantity *
                        </label>
                        <input
                          name="quantity"
                          type="number"
                          min={1}
                          max={50}
                          value={form.quantity}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Delivery Date *
                        </label>
                        <input
                          name="deliveryDate"
                          type="date"
                          min={minDate}
                          value={form.deliveryDate}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                          Payment *
                        </label>
                        <select
                          name="paymentMode"
                          value={form.paymentMode}
                          onChange={handleChange}
                          className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="COD">Cash on Delivery</option>
                          <option value="UPI">UPI</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-xs font-medium text-brown-600 uppercase tracking-wide block mb-1.5">
                        Custom Message
                      </label>
                      <textarea
                        name="customMessage"
                        value={form.customMessage}
                        onChange={handleChange}
                        placeholder="Any special requests, dietary preferences, gifting notes..."
                        rows={3}
                        className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 font-body text-sm text-chocolate placeholder-brown-300 focus:outline-none focus:border-warm-brown focus:ring-2 focus:ring-warm-brown/20 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-semibold text-base transition-all duration-300 ${
                        submitMode === 'whatsapp'
                          ? 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                          : 'bg-warm-brown hover:bg-chocolate text-cream hover:shadow-lg hover:shadow-brown-500/30'
                      } disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5`}
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : submitMode === 'whatsapp' ? (
                        <>
                          <MessageCircle size={18} />
                          Order via WhatsApp
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          Send Order by Email
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
