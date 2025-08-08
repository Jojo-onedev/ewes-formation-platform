import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'

export class PayDunyaService {
  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const paymentData = {
        invoice: {
          total_amount: request.amount,
          description: request.description
        },
        store: {
          name: 'EWES Formation',
          tagline: 'Formation en Électricité',
          phone: '22656630358',
          postal_address: 'Burkina Faso',
          website_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ewes-formation.vercel.app'
        },
        custom_data: {
          formation_id: request.formationId,
          customer_name: request.customerName,
          customer_phone: request.customerPhone
        },
        actions: {
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl
        }
      }

      const response = await fetch(`${PAYMENT_CONFIG.payDunya.baseUrl}/checkout-invoice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYDUNYA-MASTER-KEY': PAYMENT_CONFIG.payDunya.masterKey!,
          'PAYDUNYA-PRIVATE-KEY': PAYMENT_CONFIG.payDunya.privateKey!,
          'PAYDUNYA-TOKEN': PAYMENT_CONFIG.payDunya.token!
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.response_code === '00') {
        return {
          success: true,
          transactionId: result.token,
          paymentUrl: result.response_text,
          message: 'Paiement PayDunya initié avec succès',
          provider: 'paydunya'
        }
      } else {
        return {
          success: false,
          message: result.response_text || 'Erreur lors de l\'initiation du paiement PayDunya',
          provider: 'paydunya'
        }
      }
    } catch (error) {
      console.error('Erreur PayDunya:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement PayDunya',
        provider: 'paydunya'
      }
    }
  }

  static async verifyPayment(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${PAYMENT_CONFIG.payDunya.baseUrl}/checkout-invoice/confirm/${token}`, {
        headers: {
          'PAYDUNYA-MASTER-KEY': PAYMENT_CONFIG.payDunya.masterKey!,
          'PAYDUNYA-PRIVATE-KEY': PAYMENT_CONFIG.payDunya.privateKey!,
          'PAYDUNYA-TOKEN': PAYMENT_CONFIG.payDunya.token!
        }
      })

      const result = await response.json()
      return result.response_code === '00' && result.status === 'completed'
    } catch (error) {
      console.error('Erreur vérification PayDunya:', error)
      return false
    }
  }
}
