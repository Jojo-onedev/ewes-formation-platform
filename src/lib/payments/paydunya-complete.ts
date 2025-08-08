import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'

export class PayDunyaService {
  // Configuration PayDunya pour le Burkina Faso
  private static config = {
    masterKey: process.env.PAYDUNYA_MASTER_KEY!,
    privateKey: process.env.PAYDUNYA_PRIVATE_KEY!,
    publicKey: process.env.PAYDUNYA_PUBLIC_KEY!,
    token: process.env.PAYDUNYA_TOKEN!,
    mode: process.env.PAYDUNYA_MODE || 'live', // 'test' ou 'live'
    baseUrl: process.env.PAYDUNYA_MODE === 'test' 
      ? 'https://app.paydunya.com/sandbox-api/v1' 
      : 'https://app.paydunya.com/api/v1'
  }

  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Configuration du magasin EWES
      const storeData = {
        name: 'EWES Formation',
        tagline: 'Formation Professionnelle en Électricité',
        phone: '22656630358',
        postal_address: 'Burkina Faso',
        website_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ewes-formation.vercel.app',
        logo_url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-ewes.png`
      }

      // Données de la facture
      const invoiceData = {
        invoice: {
          total_amount: request.amount,
          description: request.description,
          // Référence unique pour éviter les doublons
          invoice_id: `EWES-${request.formationId}-${Date.now()}`
        },
        store: storeData,
        // Informations client
        customer: {
          name: request.customerName,
          phone: request.customerPhone,
          email: request.customerEmail || `${request.customerPhone}@ewes-formation.bf`
        },
        // Données personnalisées pour le suivi
        custom_data: {
          formation_id: request.formationId,
          customer_name: request.customerName,
          customer_phone: request.customerPhone,
          payment_method: 'paydunya_all' // Orange Money + Moov + Cartes
        },
        // URLs de retour
        actions: {
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl,
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook/paydunya`
        }
      }

      console.log('Initiation paiement PayDunya:', {
        amount: request.amount,
        formation: request.formationId,
        customer: request.customerName
      })

      const response = await fetch(`${this.config.baseUrl}/checkout-invoice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYDUNYA-MASTER-KEY': this.config.masterKey,
          'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          'PAYDUNYA-TOKEN': this.config.token
        },
        body: JSON.stringify(invoiceData)
      })

      const result = await response.json()
      console.log('Réponse PayDunya:', result)

      if (result.response_code === '00' || result.response_code === 200) {
        return {
          success: true,
          transactionId: result.token,
          paymentUrl: result.response_text, // URL de paiement PayDunya
          message: 'Paiement PayDunya initié avec succès. Vous pouvez payer avec Orange Money, Moov Money ou carte bancaire.',
          provider: 'paydunya'
        }
      } else {
        console.error('Erreur PayDunya:', result)
        return {
          success: false,
          message: result.response_text || 'Erreur lors de l\'initiation du paiement PayDunya',
          provider: 'paydunya'
        }
      }
    } catch (error) {
      console.error('Erreur technique PayDunya:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement. Veuillez réessayer.',
        provider: 'paydunya'
      }
    }
  }

  static async verifyPayment(token: string): Promise<{ verified: boolean, status?: string, data?: any }> {
    try {
      console.log('Vérification paiement PayDunya:', token)

      const response = await fetch(`${this.config.baseUrl}/checkout-invoice/confirm/${token}`, {
        method: 'GET',
        headers: {
          'PAYDUNYA-MASTER-KEY': this.config.masterKey,
          'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          'PAYDUNYA-TOKEN': this.config.token
        }
      })

      const result = await response.json()
      console.log('Vérification PayDunya résultat:', result)

      const isVerified = result.response_code === '00' && 
                        (result.status === 'completed' || result.status === 'paid')

      return {
        verified: isVerified,
        status: result.status,
        data: result
      }
    } catch (error) {
      console.error('Erreur vérification PayDunya:', error)
      return {
        verified: false,
        status: 'error'
      }
    }
  }

  // Méthode pour obtenir les détails d'une transaction
  static async getTransactionDetails(token: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/checkout-invoice/confirm/${token}`, {
        headers: {
          'PAYDUNYA-MASTER-KEY': this.config.masterKey,
          'PAYDUNYA-PRIVATE-KEY': this.config.privateKey,
          'PAYDUNYA-TOKEN': this.config.token
        }
      })

      return await response.json()
    } catch (error) {
      console.error('Erreur détails transaction:', error)
      return null
    }
  }
}
