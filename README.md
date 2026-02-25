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

---

## ⚡ Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

---

## 📱 WhatsApp Integration

The order form auto-generates a WhatsApp message with all order details.

**To configure your WhatsApp number:**

1. Open `lib/whatsapp.ts`
2. Replace the number:

```ts
const WHATSAPP_NUMBER = '919999999999'
// Format: country code + number, no + or spaces
// Example India: '919876543210'
```

**How it works:**
- User fills the order form
- Clicks "Order via WhatsApp"
- Opens WhatsApp with pre-filled message containing all order details
- You confirm and process the order

---

## 📧 EmailJS Setup

### Step 1: Create EmailJS Account
Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account.

### Step 2: Create an Email Service
1. Dashboard → Email Services → Add New Service
2. Connect your Gmail/Outlook/etc.
3. Copy the **Service ID**

### Step 3: Create an Email Template
1. Dashboard → Email Templates → Create New Template
2. Use these template variables:

```
Subject: New Cookie Order from {{from_name}}

New order from Melted Moments website!

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Cookie: {{cookie_type}}
Quantity: {{quantity}}
Delivery Date: {{delivery_date}}
Payment: {{payment_mode}}
Message: {{custom_message}}
```

3. Copy the **Template ID**

### Step 4: Get Public Key
1. Dashboard → Account → General → Public Key
2. Copy it

### Step 5: Configure in Code
Open `lib/emailjs.ts` and replace:

```ts
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'    // from Step 2
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'   // from Step 3
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'      // from Step 4
```

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
```js
colors: {
  'warm-brown': '#6F4E37',   // Primary brand color
  cream: '#F5E6D3',          // Background
  chocolate: '#3E2723',      // Dark text/bg
  gold: '#D4AF37',           // Accent color
}
```

### Products
Edit `lib/products.ts` to add/edit cookie flavors:
```ts
{
  id: 'your-cookie-id',
  name: 'Cookie Name',
  description: 'Description...',
  price: 99,
  emoji: '🍪',
  tag: 'Best Seller',  // Optional
  color: '#8B5E3C',
  accentColor: '#D4AF37',
}
```

### Contact Info
Update these in:
- `components/layout/Navbar.tsx` — Order Now button
- `components/layout/Footer.tsx` — Phone, email, Instagram
- `components/sections/ContactSection.tsx` — Contact details
- `lib/whatsapp.ts` — WhatsApp number

### Brand Info
- Brand name: Search for "Melted Moments" and replace
- Instagram: Search for "@meltedmoments" and replace with your handle
- Phone: Replace `+91 99999 99999` with your number

---

## 🍪 3D Cookie Animation

The hero section features a Three.js cookie that:
1. **Loads** floating with a bounce animation (1.5s)
2. **Breaks** into realistic pieces that fly outward with gravity
3. **Reveals** the hero text after the break

The animation is in `components/3d/CookieScene.tsx`.

To adjust timing, edit the delay in `HeroSection.tsx`:
```ts
const timer = setTimeout(() => {
  // Break happens after this delay (ms)
}, 1500)  // ← change this
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for auto-deploy.

### Environment Variables
No env variables required for basic setup. 
If you want to add environment variables for EmailJS, create `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update `lib/emailjs.ts` to use `process.env.NEXT_PUBLIC_EMAILJS_*`.

---

## 📊 SEO

Each page has its own metadata in the `page.tsx` file. Update them in:
- `app/layout.tsx` — Global site metadata
- `app/products/page.tsx` — Products page metadata
- `app/about/page.tsx` — About page metadata
- `app/contact/page.tsx` — Contact page metadata

---

Made with ❤️ by Melted Moments Team
