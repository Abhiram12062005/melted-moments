'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Mail, Phone, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-chocolate text-cream/80">
      {/* Main footer */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-3xl font-bold text-cream block">Melted</span>
              <span className="font-accent text-gold italic tracking-[0.3em] text-xs uppercase">Moments</span>
            </div>
            <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">
              Handcrafted premium cookies baked fresh in small batches by passionate student entrepreneurs.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/melted_movt?igsh=MTFhMHJiOWM5cmw4Ng=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-chocolate transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/918660360712"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-chocolate transition-all duration-300"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:meltedmomentscookiesshop@gmail.com"
                className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-chocolate transition-all duration-300"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-cream text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Our Menu' },
                { href: '/about', label: 'Our Story' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gold/40 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display text-cream text-lg mb-5">Our Cookies</h4>
            <ul className="space-y-3">
              {[
                'Classic Choco Chip',
                'Double Chocolate',
                'Red Velvet',
                'Almond Crunch',
                'Caramel Sea Salt',
                'White Choco Macadamia',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-cream text-lg mb-5">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-cream/40 uppercase tracking-wide">Phone / WhatsApp</p>
                  <a href="tel:+918660360712" className="font-body text-sm text-cream/80 hover:text-gold transition-colors">
                    +91 86603 60712
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-cream/40 uppercase tracking-wide">Email</p>
                  <a href="mailto:meltedmomentscookiesshop@gmail.com" className="font-body text-sm text-cream/80 hover:text-gold transition-colors">
                    meltedmomentscookiesshop@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cream/10 flex items-center justify-center flex-shrink-0">
                  <Instagram size={14} className="text-gold" />
                </div>
                <div>
                  <p className="font-body text-xs text-cream/40 uppercase tracking-wide">Instagram</p>
                  <a
                    href="https://www.instagram.com/melted_movt?igsh=MTFhMHJiOWM5cmw4Ng=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-cream/80 hover:text-gold transition-colors"
                  >
                    @meltedmoments
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/40 text-center">
            © {new Date().getFullYear()} Melted Moments. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/40 flex items-center gap-1.5">
            Made with <Heart size={12} className="text-gold fill-gold" /> by student entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  )
}
