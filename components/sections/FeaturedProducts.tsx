'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import OrderModal from '@/components/ui/OrderModal'
import Image from 'next/image'

const featured = products.slice(0, 4)

export default function FeaturedProducts() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCookie, setSelectedCookie] = useState('')

  const handleOrder = (name: string) => {
    setSelectedCookie(name)
    setModalOpen(true)
  }

  return (
    <section className="py-24 px-6 bg-brown-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-subtitle mb-2"
            >
              Most loved
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Fan Favorites
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="flex items-center gap-2 text-warm-brown font-body font-medium hover:text-gold transition-colors duration-300 group"
            >
              View Full Menu
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brown-300/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Visual */}
              <div
                className="h-44 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${product.color}15 0%, ${product.color}30 100%)` }}
              >
                {product.tag && (
                  <span className="absolute top-3 left-3 text-xs font-semibold font-body px-2.5 py-1 rounded-full"
                    style={{ background: product.accentColor, color: '#3E2723' }}>
                    {product.tag}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-chocolate mb-1">{product.name}</h3>
                <p className="font-body text-xs text-brown-400 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-chocolate">₹{product.price}</span>
                  <button
                    onClick={() => handleOrder(product.name)}
                    className="flex items-center gap-1.5 bg-cream border border-brown-200 text-warm-brown px-4 py-2 rounded-full text-xs font-medium font-body
                    hover:bg-warm-brown hover:text-cream hover:border-warm-brown transition-all duration-300"
                  >
                    <ShoppingBag size={12} />
                    Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} preSelectedCookie={selectedCookie} />
    </section>
  )
}
