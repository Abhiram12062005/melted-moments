import ProductsGrid from '@/components/sections/ProductsGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Menu — Melted Moments',
  description: 'Explore our premium handcrafted cookies. Classic Choco Chip, Double Chocolate, Red Velvet, Almond Crunch, and more.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-brown-50 pt-24">
      <ProductsGrid />
    </div>
  )
}
