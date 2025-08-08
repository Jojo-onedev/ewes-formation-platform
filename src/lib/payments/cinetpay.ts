import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'
import crypto from 'crypto'

export class CinetPayService {
  // Pays supportés par CinetPay
  private static supportedCountries = {
    'BF': { name: 'Burkina Faso', currency: 'XOF', operators: ['ORANGE_MONEY_BF', 'MOOV_MONEY_BF'] },
    'CI': { name: 'Côte d\'Ivoire', currency: 'XOF', operators: ['ORANGE_MONEY_CI', 'MTN_MONEY_CI', 'MOOV_MONEY_CI'] },
    'SN': { name: 'Sénégal', currency: 'XOF', operators: ['ORANGE_MONEY_SN', 'FREE_MONEY_SN', 'WAVE_SN'] },
    'ML': { name: 'Mali', currency: 'XOF', operators: ['ORANGE_MONEY_ML', 'MOOV_MONEY_ML'] },
    'TG': { name: 'Togo', currency: 'XOF', operators: ['TOGOCEL_MONEY', 'MOOV_MONEY_TG'] },
    'BJ': { name: 'Bénin', currency: 'XOF', operators: ['MTN_MONEY_BJ', 'MOOV_MONEY_BJ'] },
    'NE': { name: 'Niger', currency: 'XOF', operators: ['ORANGE_MONEY_NE', 'MOOV_MONEY_NE'] },
    'GH': { name: 'Ghana', currency: 'GHS', operators: ['MTN_MONEY_GH', 'VODAFONE_CASH_GH'] },
    'CM': { name: 'Cameroun', currency: 'XAF', operators: ['ORANGE_MONEY_CM', 'MTN_MONEY_CM'] },
    'INTL': { name: 'International', currency: 'XOF', operators: ['CARD'] }
  }

  // Détecter le pays à partir du numéro de téléphone
  private static detectCountryFromPhone(phone: string): string {
    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    
    const countryPrefixes: { [key: string]: string } = {
      '226': 'BF', // Burkina Faso
      '225': 'CI', // Côte d'Ivoire  
      '221': 'SN', // Sénégal
      '223': 'ML', // Mali
      '228': 'TG', // Togo
      '229': 'BJ', // Bénin
      '227': 'NE', // Niger
      '233': 'GH', // Ghana
      '237': 'CM', // Cameroun
    }

    for (const [prefix, country] of Object.entries(countryPrefixes)) {
      if (cleanPhone.startsWith(prefix)) {
        return country
      }
    }

    return 'INTL' // International par défaut
  }

  // Générer la signature CinetPay
  private static generateSignature(data: any): string {
    const secretKey = PAYMENT_CONFIG.cinetPay.secretKey!
    
    // Trier les clés par ordre alphabétique
    const sortedKeys = Object.keys(data).sort()
    let signatureString = ''
    
    sortedKeys.forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        signatureString += `${key}=${data[key]}&`
      }
    })
    
    // Ajouter la clé secrète à la fin
    signatureString += `secret_key=${secretKey}`
    
    // Générer le hash SHA256
    return crypto.createHash('sha256').update(signatureString).digest('hex')
  }

  static async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Détecter le pays du client
      const detectedCountry = this.detectCountryFromPhone(request.customerPhone)
      const countryInfo = this.supportedCountries[detectedCountry as keyof typeof this.supportedCountries] || 
                         this.supportedCountries['BF'] // Burkina par défaut

      console.log(`Paiement CinetPay détecté: ${countryInfo.name} (${detectedCountry})`)

      // Générer un ID de transaction unique
      const transactionId = `EWES_${request.formationId}_${Date.now()}`

      // Données de la transaction
      const transactionData = {
        amount: request.amount,
        currency: countryInfo.currency,
        transaction_id: transactionId,
        description: request.description,
        return_url: request.returnUrl,
        notify_url: request.notifyUrl,
        cancel_url: request.cancelUrl,
        customer_name: request.customerName,
        customer_surname: '', // Optionnel
        customer_email: request.customerEmail || `${request.customerPhone.replace(/\D/g, '')}@ewes-formation.bf`,
        customer_phone_number: request.customerPhone,
        customer_address: 'Burkina Faso',
        customer_city: 'Ouagadougou',
        customer_country: detectedCountry,
        customer_state: 'Centre',
        customer_zip_code: '01000',
        // Métadonnées personnalisées
        metadata: JSON.stringify({
          formation_id: request.formationId,
          customer_country: detectedCountry,
          platform: 'EWES Formation'
        })
      }

      // Ajouter les clés API
      const paymentData = {
        ...transactionData,
        apikey: PAYMENT_CONFIG.cinetPay.apiKey,
        site_id: PAYMENT_CONFIG.cinetPay.siteId
      }

      // Générer la signature
      paymentData.signature = this.generateSignature(paymentData)

      console.log('Données CinetPay:', {
        transaction_id: transactionId,
        amount: request.amount,
        country: countryInfo.name
      })

      const response = await fetch(`${PAYMENT_CONFIG.cinetPay.baseUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()
      console.log('Réponse CinetPay:', result)

      if (result.code === '201' && result.data && result.data.payment_url) {
        return {
          success: true,
          transactionId: transactionId,
          paymentUrl: result.data.payment_url,
          message: `Paiement CinetPay initié pour ${countryInfo.name}. Moyens disponibles: ${countryInfo.operators.join(', ')}, Cartes bancaires.`,
          provider: 'cinetpay'
        }
      } else {
        console.error('Erreur CinetPay:', result)
        return {
          success: false,
          message: result.message || 'Erreur lors de l\'initiation du paiement CinetPay',
          provider: 'cinetpay'
        }
      }
    } catch (error) {
      console.error('Erreur technique CinetPay:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement CinetPay. Veuillez réessayer.',
        provider: 'cinetpay'
      }
    }
  }

  static async verifyPayment(transactionId: string): Promise<{ verified: boolean, status?: string, data?: any }> {
    try {
      console.log('Vérification paiement CinetPay:', transactionId)

      const verificationData = {
        apikey: PAYMENT_CONFIG.cinetPay.apiKey,
        site_id: PAYMENT_CONFIG.cinetPay.siteId,
        transaction_id: transactionId
      }

      // Générer la signature pour la vérification
      verificationData.signature = this.generateSignature(verificationData)

      const response = await fetch(`${PAYMENT_CONFIG.cinetPay.baseUrl}/payment/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(verificationData)
      })

      const result = await response.json()
      console.log('Vérification CinetPay résultat:', result)

      const isVerified = result.code === '00' && 
                        (result.data.status === 'ACCEPTED' || result.data.status === 'COMPLETED')

      return {
        verified: isVerified,
        status: result.data?.status,
        data: result.data
      }
    } catch (error) {
      console.error('Erreur vérification CinetPay:', error)
      return {
        verified: false,
        status: 'error'
      }
    }
  }

  // Obtenir les moyens de paiement disponibles par pays
  static getAvailablePaymentMethods(phone: string): {
    country: string,
    countryName: string,
    currency: string,
    methods: string[]
  } {
    const detectedCountry = this.detectCountryFromPhone(phone)
    const countryInfo = this.supportedCountries[detectedCountry as keyof typeof this.supportedCountries] || 
                       this.supportedCountries['BF']

    // Convertir les codes opérateurs en noms lisibles
    const methodNames = countryInfo.operators.map(op => {
      switch(op) {
        case 'ORANGE_MONEY_BF': return 'Orange Money'
        case 'MOOV_MONEY_BF': return 'Moov Money'
        case 'MTN_MONEY_CI': return 'MTN Money'
        case 'WAVE_SN': return 'Wave'
        case 'FREE_MONEY_SN': return 'Free Money'
        case 'CARD': return 'Cartes bancaires'
        default: return op.replace(/_/g, ' ')
      }
    })

    return {
      country: detectedCountry,
      countryName: countryInfo.name,
      currency: countryInfo.currency,
      methods: [...methodNames, 'Cartes Visa/Mastercard']
    }
  }
}
