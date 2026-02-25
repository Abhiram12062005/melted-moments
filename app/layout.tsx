import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Melted Moments — Fresh. Soft. Premium Cookies.',
  description: 'Handcrafted premium cookies baked with love by passionate student entrepreneurs. Soft, fresh, mouth-melting cookies delivered to your doorstep.',
  keywords: 'cookies, premium cookies, handmade cookies, college bakery, fresh cookies, melted moments',
  openGraph: {
    title: 'Melted Moments — Fresh. Soft. Premium Cookies.',
    description: 'Handcrafted premium cookies baked with love by passionate student entrepreneurs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melted Moments — Fresh. Soft. Premium Cookies.',
    description: 'Handcrafted premium cookies baked with love by passionate student entrepreneurs.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} font-body bg-brown-50 text-chocolate antialiased`}>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
