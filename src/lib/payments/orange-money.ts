import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'

export class OrangeMoneyService {
  private static async getAccessToken(): Promise<string | null> {
    try {
      const response = await fetch(`${PAYMENT_CONFIG.orangeMoney.baseUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${process.env.ORANGE_MONEY_CLIENT_ID}:${process.env.ORANGE_MONEY_CLIENT_SECRET}`).toString('base64')}`
        },
        body: 'grant_type=client_credentials'
      })

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Erreur lors de l\'obtention du token Orange Money:', error)
      return null
    }
  }

  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const token = await this.getAccessToken()
      if (!token) {
        return {
          success: false,
          message: 'Impossible d\'obtenir le token d\'authentification',
          provider: 'orange-money'
        }
      }

      const paymentData = {
        merchant: {
          country: 'BF',
          currency: request.currency,
          reference: `EWES-${request.formationId}-${Date.now()}`
        },
        customer: {
          name: request.customerName,
          phone: request.customerPhone,
          email: request.customerEmail
        },
        transaction: {
          amount: request.amount,
          description: request.description
        },
        urls: {
          return: request.returnUrl,
          cancel: request.cancelUrl
        }
      }

      const response = await fetch(`${PAYMENT_CONFIG.orangeMoney.baseUrl}/webpayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (response.ok && result.payment_url) {
        return {
          success: true,
          transactionId: result.transaction_id,
          paymentUrl: result.payment_url,
          message: 'Paiement initié avec succès',
          provider: 'orange-money'
        }
      } else {
        return {
          success: false,
          message: result.message || 'Erreur lors de l\'initiation du paiement',
          provider: 'orange-money'
        }
      }
    } catch (error) {
      console.error('Erreur Orange Money:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement',
        provider: 'orange-money'
      }
    }
  }

  static async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      const token = await this.getAccessToken()
      if (!token) return false

      const response = await fetch(`${PAYMENT_CONFIG.orangeMoney.baseUrl}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      return result.status === 'SUCCESS'
    } catch (error) {
      console.error('Erreur vérification Orange Money:', error)
      return false
    }
  }
}
