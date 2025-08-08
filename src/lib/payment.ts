// Configuration des moyens de paiement - CinetPay
export const PAYMENT_CONFIG = {
  // CinetPay (Remplace PayDunya)
  cinetPay: {
    apiKey: process.env.CINETPAY_API_KEY,
    siteId: process.env.CINETPAY_SITE_ID,
    secretKey: process.env.CINETPAY_SECRET_KEY,
    baseUrl: process.env.CINETPAY_MODE === 'test' 
      ? 'https://api-checkout.cinetpay.com/v2' 
      : 'https://api-checkout.cinetpay.com/v2',
    mode: process.env.CINETPAY_MODE || 'test' // 'test' ou 'live'
  },
  
  // Orange Money Burkina Faso (Backup manuel)
  orangeMoney: {
    merchantNumber: process.env.ORANGE_MONEY_MERCHANT || '56630358',
    apiKey: process.env.ORANGE_MONEY_API_KEY,
    baseUrl: 'https://api.orange.com/orange-money-webpay/bf/v1'
  }
}

// Types pour les paiements
export interface PaymentRequest {
  amount: number
  currency: 'XOF' // Franc CFA
  description: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  formationId: number
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  paymentUrl?: string
  message: string
  provider: string
}
