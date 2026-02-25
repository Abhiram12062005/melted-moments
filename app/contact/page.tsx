import ContactSection from '@/components/sections/ContactSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — Melted Moments',
  description: 'Get in touch with Melted Moments for orders, inquiries, or just to say hi!',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brown-50 pt-24">
      <ContactSection />
    </div>
  )
}
