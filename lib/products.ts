export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  tag?: string
  color: string
  accentColor: string
}

export const products: Product[] = [
  {
    id: 'classic-choco-chip',
    name: 'Classic Choco Chip',
    description:
      'Our OG cookie — golden-edged, gooey center, packed with premium dark chocolate chips. A timeless classic done perfectly.',
    price: 79,
    image: 'https://handletheheat.com/wp-content/uploads/2022/12/soft-chocolate-chip-cookie-recipe-SQUARE.jpg',
    tag: 'Best Seller',
    color: '#8B5E3C',
    accentColor: '#D4AF37',
  },
  {
    id: 'double-chocolate',
    name: 'Double Chocolate',
    description:
      'For the true chocolate lover. Intense cocoa cookie base loaded with milk and dark chocolate chips. Dangerously good.',
    price: 89,
    image: 'https://tastesbetterfromscratch.com/wp-content/uploads/2020/02/Double-Chocolate-Cookies24-Thumbnail-1.jpg',
    tag: 'Fan Favorite',
    color: '#3E2723',
    accentColor: '#D4AF37',
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    description:
      'Velvet-smooth, strikingly beautiful red cookie with a hint of cocoa and white chocolate chips that melt in your mouth.',
    price: 99,
    image: 'https://bakingamoment.com/wp-content/uploads/2023/12/IMG_0082-red-velvet-chocolate-chip-cookies.jpg',
    color: '#8B0000',
    accentColor: '#ff6b6b',
  },
  {
    id: 'almond-crunch',
    name: 'Almond Crunch',
    description:
      'Buttery soft cookie with a satisfying crunch. Roasted almonds, toffee bits, and a touch of sea salt. Absolute perfection.',
    price: 99,
    image: 'https://handletheheat.com/wp-content/uploads/2022/12/soft-chocolate-chip-cookie-recipe-SQUARE.jpg',
    color: '#6F4E37',
    accentColor: '#f4a261',
  },
]