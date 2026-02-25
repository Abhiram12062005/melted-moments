import emailjs from '@emailjs/browser'
import type { OrderData } from './whatsapp'

// Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_w5o6qhu'
const EMAILJS_TEMPLATE_ID = 'template_y3kaosv'
const EMAILJS_PUBLIC_KEY = '9MFZ38yfVVYfeLdiW'

export async function sendOrderEmail(order: OrderData): Promise<boolean> {
  try {
    const templateParams = {
      from_name: order.fullName,
      from_email: order.email,
      phone: order.phone,
      cookie_type: order.cookieType,
      quantity: order.quantity,
      delivery_date: order.deliveryDate,
      payment_mode: order.paymentMode,
      custom_message: order.customMessage || 'None',
      to_name: 'Melted Moments Team',
    }

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    return true
  } catch (error) {
    console.error('EmailJS error:', error)
    return false
  }
}
