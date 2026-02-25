export interface OrderData {
  fullName: string
  phone: string
  email: string
  cookieType: string
  quantity: number
  deliveryDate: string
  customMessage: string
  paymentMode: 'COD' | 'UPI'
}

// Replace with your actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '918660360712'

export function generateWhatsAppLink(order: OrderData): string {
  const text = `
🍪 *New Order — Melted Moments*

👤 *Name:* ${order.fullName}
📞 *Phone:* ${order.phone}
📧 *Email:* ${order.email}

🍪 *Cookie Type:* ${order.cookieType}
🔢 *Quantity:* ${order.quantity} box(es)
📅 *Delivery Date:* ${order.deliveryDate}
💳 *Payment Mode:* ${order.paymentMode}

${order.customMessage ? `💬 *Message:* ${order.customMessage}` : ''}

---
_Order placed via meltedmoments.in_
  `.trim()

  const encoded = encodeURIComponent(text)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function openWhatsAppOrder(order: OrderData) {
  const link = generateWhatsAppLink(order)
  window.open(link, '_blank', 'noopener,noreferrer')
}
