'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Star } from 'lucide-react'
import { products } from '@/lib/products'
import OrderModal from '@/components/ui/OrderModal'

function ProductCard({
  product,
  index,
  onOrder,
}: {
  product: (typeof products)[0]
  index: number
  onOrder: (name: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brown-500/15 transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Tag */}
        {product.tag && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold font-body"
            style={{ background: product.accentColor, color: '#3E2723' }}
          >
            {product.tag}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="font-display text-sm font-bold text-chocolate">
            ₹{product.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl font-bold text-chocolate leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className="text-gold fill-gold" />
            ))}
          </div>
        </div>

        <p className="font-body text-sm text-brown-500 leading-relaxed flex-1 mb-5">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-body text-xs text-brown-400 uppercase tracking-wide">
              Per box
            </span>
            <p className="font-display text-2xl font-bold text-chocolate">
              ₹{product.price}
            </p>
          </div>

          <button
            onClick={() => onOrder(product.name)}
            className="flex items-center gap-2 bg-warm-brown text-cream px-5 py-2.5 rounded-full text-sm font-medium font-body
            hover:bg-chocolate transition-all duration-300 hover:shadow-lg hover:shadow-brown-500/30 hover:-translate-y-0.5"
          >
            <ShoppingBag size={14} />
            Order
          </button>
        </div>
      </div>
    </motion.div>
  )
}
export default function ProductsGrid() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCookie, setSelectedCookie] = useState('')

  const handleOrder = (cookieName: string) => {
    setSelectedCookie(cookieName)
    setModalOpen(true)
  }

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-3">Handcrafted with love</p>
          <h1 className="section-title mb-5">Our Cookie Menu</h1>
          <p className="font-body text-brown-500 max-w-xl mx-auto leading-relaxed">
            Every cookie is baked fresh in small batches. No preservatives, no shortcuts — just premium ingredients and a whole lot of passion.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-px w-12 bg-gold/40" />
            <span className="font-body text-xs text-gold uppercase tracking-widest">Fresh Daily</span>
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onOrder={handleOrder}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-chocolate rounded-3xl"
        >
          <p className="font-display text-cream text-xl mb-2">Want a custom flavor or bulk order?</p>
          <p className="font-body text-cream/60 text-sm mb-6">
            We do custom corporate orders, gifting, and event packages too!
          </p>
          <button
            onClick={() => handleOrder('')}
            className="btn-gold"
          >
            Place Custom Order
          </button>
        </motion.div>
      </div>

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedCookie={selectedCookie}
      />
    </section>
  )
}
