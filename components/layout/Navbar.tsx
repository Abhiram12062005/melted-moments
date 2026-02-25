'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Menu' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-chocolate/95 backdrop-blur-md shadow-xl shadow-chocolate/20 py-1'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl font-bold text-cream tracking-wide group-hover:text-gold transition-colors duration-300">
              Melted
            </span>
            <span className="font-accent text-xs text-gold tracking-[0.3em] uppercase italic -mt-1">
              Moments
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 group ${
                  pathname === link.href ? 'text-gold' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 bg-gold text-chocolate px-5 py-2.5 rounded-full text-sm font-semibold 
              hover:bg-yellow-400 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
            >
              <ShoppingBag size={15} />
              Order Now
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-cream p-2 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-chocolate flex flex-col items-center justify-center gap-10"
          >
            {/* Decorative */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-brown-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
            </div>

            <div className="font-accent text-gold/40 text-8xl font-light absolute top-10 left-8 pointer-events-none">
              MM
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className={`font-display text-5xl font-bold transition-colors duration-300 ${
                    pathname === link.href ? 'text-gold' : 'text-cream hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/products"
                className="mt-4 flex items-center gap-2 bg-gold text-chocolate px-8 py-4 rounded-full text-base font-semibold hover:bg-yellow-400 transition-colors"
              >
                <ShoppingBag size={18} />
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
