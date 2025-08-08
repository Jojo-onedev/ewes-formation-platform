import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'

export class WaveService {
  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const paymentData = {
        amount: request.amount,
        currency: request.currency,
        error_url: request.cancelUrl,
        success_url: request.returnUrl,
        checkout_intent: {
          id: `ewes_${request.formationId}_${Date.now()}`
        },
        client_reference: `EWES-FORMATION-${request.formationId}`,
        payment_method: 'wave_senegal' // Adapter selon le pays
      }

      const response = await fetch(`${PAYMENT_CONFIG.wave.baseUrl}/checkout/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PAYMENT_CONFIG.wave.apiKey}`
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (response.ok && result.wave_launch_url) {
        return {
          success: true,
          transactionId: result.id,
          paymentUrl: result.wave_launch_url,
          message: 'Paiement Wave initié avec succès',
          provider: 'wave'
        }
      } else {
        return {
          success: false,
          message: result.message || 'Erreur lors de l\'initiation du paiement Wave',
          provider: 'wave'
        }
      }
    } catch (error) {
      console.error('Erreur Wave:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement Wave',
        provider: 'wave'
      }
    }
  }

  static async verifyPayment(sessionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${PAYMENT_CONFIG.wave.baseUrl}/checkout/sessions/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${PAYMENT_CONFIG.wave.apiKey}`
        }
      })

      const result = await response.json()
      return result.payment_status === 'succeeded'
    } catch (error) {
      console.error('Erreur vérification Wave:', error)
      return false
    }
  }
}
