# 🍪 Melted Moments — Premium Cookie Brand Website

A full-stack Next.js 14 website for Melted Moments, a student-run premium cookie startup.

---

## 🚀 Tech Stack

| Tech | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Three Fiber + Three.js | 3D Cookie Scene |
| @react-three/drei | 3D Helpers |
| EmailJS | Order email notifications |
| Lucide React | Icons |
| Google Fonts | Playfair Display, DM Sans, Cormorant |

---

## 📁 Folder Structure

```
melted-moments/
├── app/
│   ├── layout.tsx          # Root layout with fonts, Navbar, Footer
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Home page
│   ├── products/
│   │   └── page.tsx        # Products/Menu page
│   ├── about/
│   │   └── page.tsx        # Our Story page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── 3d/
│   │   └── CookieScene.tsx # Three.js 3D cookie break animation
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navbar + animated mobile menu
│   │   └── Footer.tsx      # Footer with links
│   ├── sections/
│   │   ├── HeroSection.tsx       # Full-screen hero with 3D + Framer Motion
│   │   ├── FeaturedProducts.tsx  # Home page featured products
│   │   ├── WhyChooseUs.tsx       # Features + stats section
│   │   ├── InstagramBanner.tsx   # Instagram CTA
│   │   ├── ProductsGrid.tsx      # Full products page grid
│   │   ├── AboutStory.tsx        # Timeline + mission/vision
│   │   └── ContactSection.tsx    # Contact form + info
│   └── ui/
│       ├── LoadingScreen.tsx     # Animated loading screen
│       └── OrderModal.tsx        # Order booking modal
├── lib/
│   ├── products.ts         # Product data
│   ├── whatsapp.ts         # WhatsApp order link generator
│   └── emailjs.ts          # EmailJS helper
├── public/
│   └── images/             # Place your cookie images here
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```
- `app/about/page.tsx` — About page metadata
- `app/contact/page.tsx` — Contact page metadata

---

Made with ❤️ by Melted Moments Team
