import AboutStory from '@/components/sections/AboutStory'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story — Melted Moments',
  description: 'From a classroom project to a premium cookie brand. Learn about the passionate student entrepreneurs behind Melted Moments.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brown-50 pt-24">
      <AboutStory />
    </div>
  )
}
