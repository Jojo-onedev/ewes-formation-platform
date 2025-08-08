import { PAYMENT_CONFIG, PaymentRequest, PaymentResponse } from '../payment'

export class PayDunyaInternationalService {
  // Pays supportés par PayDunya
  private static supportedCountries = {
    'BF': { name: 'Burkina Faso', currency: 'XOF', mobileMoney: ['Orange Money', 'Moov Money'] },
    'CI': { name: 'Côte d\'Ivoire', currency: 'XOF', mobileMoney: ['Orange Money', 'MTN Money', 'Moov Money'] },
    'SN': { name: 'Sénégal', currency: 'XOF', mobileMoney: ['Orange Money', 'Free Money', 'Wave'] },
    'ML': { name: 'Mali', currency: 'XOF', mobileMoney: ['Orange Money', 'Moov Money'] },
    'TG': { name: 'Togo', currency: 'XOF', mobileMoney: ['Togocel Money', 'Moov Money'] },
    'BJ': { name: 'Bénin', currency: 'XOF', mobileMoney: ['MTN Money', 'Moov Money'] },
    'NE': { name: 'Niger', currency: 'XOF', mobileMoney: ['Orange Money', 'Moov Money'] },
    'GH': { name: 'Ghana', currency: 'GHS', mobileMoney: ['MTN Money', 'Vodafone Cash', 'AirtelTigo Money'] },
    'NG': { name: 'Nigeria', currency: 'NGN', mobileMoney: ['MTN Money', 'Airtel Money'] },
    'CM': { name: 'Cameroun', currency: 'XAF', mobileMoney: ['Orange Money', 'MTN Money'] },
    'INTL': { name: 'International', currency: 'USD', mobileMoney: ['Cartes bancaires'] }
  }

  // Détecter le pays à partir du numéro de téléphone
  private static detectCountryFromPhone(phone: string): string {
    const cleanPhone = phone.replace(/[\s\-\+]/g, '')
    
    // Indicatifs téléphoniques
    const countryPrefixes: { [key: string]: string } = {
      '226': 'BF', // Burkina Faso
      '225': 'CI', // Côte d'Ivoire  
      '221': 'SN', // Sénégal
      '223': 'ML', // Mali
      '228': 'TG', // Togo
      '229': 'BJ', // Bénin
      '227': 'NE', // Niger
      '233': 'GH', // Ghana
      '234': 'NG', // Nigeria
      '237': 'CM', // Cameroun
    }

    for (const [prefix, country] of Object.entries(countryPrefixes)) {
      if (cleanPhone.startsWith(prefix)) {
        return country
      }
    }

    return 'INTL' // International par défaut
  }

  static async initiateInternationalPayment(request: PaymentRequest & { 
    customerCountry?: string 
  }): Promise<PaymentResponse> {
    try {
      // Détecter le pays du client
      const detectedCountry = request.customerCountry || 
                            this.detectCountryFromPhone(request.customerPhone)
      
      const countryInfo = this.supportedCountries[detectedCountry as keyof typeof this.supportedCountries] || 
                         this.supportedCountries['INTL']

      console.log(`Paiement international détecté: ${countryInfo.name} (${detectedCountry})`)

      // Configuration adaptée au pays
      const storeData = {
        name: 'EWES Formation',
        tagline: 'Formation Professionnelle en Électricité - International',
        phone: '22656630358',
        postal_address: 'Burkina Faso',
        website_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ewes-formation.vercel.app',
        logo_url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-ewes.png`
      }

      // Conversion de devise si nécessaire
      let finalAmount = request.amount
      let finalCurrency = 'XOF' // Franc CFA par défaut

      if (countryInfo.currency !== 'XOF') {
        // Conversion automatique par PayDunya
        finalCurrency = countryInfo.currency
        if (countryInfo.currency === 'USD') {
          // Conversion approximative XOF vers USD (1 USD ≈ 600 XOF)
          finalAmount = Math.round(request.amount / 600)
        } else if (countryInfo.currency === 'GHS') {
          // Conversion XOF vers GHS (1 GHS ≈ 100 XOF)
          finalAmount = Math.round(request.amount / 100)
        } else if (countryInfo.currency === 'NGN') {
          // Conversion XOF vers NGN (1 NGN ≈ 1.5 XOF)
          finalAmount = Math.round(request.amount / 1.5)
        }
      }

      const invoiceData = {
        invoice: {
          total_amount: finalAmount,
          description: `${request.description} - Paiement depuis ${countryInfo.name}`,
          invoice_id: `EWES-INTL-${request.formationId}-${Date.now()}`
        },
        store: storeData,
        customer: {
          name: request.customerName,
          phone: request.customerPhone,
          email: request.customerEmail || `${request.customerPhone.replace(/\D/g, '')}@ewes-formation.com`,
          country: detectedCountry
        },
        custom_data: {
          formation_id: request.formationId,
          customer_name: request.customerName,
          customer_phone: request.customerPhone,
          customer_country: detectedCountry,
          original_amount: request.amount,
          original_currency: 'XOF',
          final_amount: finalAmount,
          final_currency: finalCurrency,
          available_methods: countryInfo.mobileMoney.join(', ')
        },
        actions: {
          return_url: request.returnUrl,
          cancel_url: request.cancelUrl,
          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook/paydunya`
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
        body: JSON.stringify(invoiceData)
      })

      const result = await response.json()

      if (result.response_code === '00' || result.response_code === 200) {
        return {
          success: true,
          transactionId: result.token,
          paymentUrl: result.response_text,
          message: `Paiement initié pour ${countryInfo.name}. Moyens disponibles: ${countryInfo.mobileMoney.join(', ')}, Cartes bancaires.`,
          provider: 'paydunya-international'
        }
      } else {
        return {
          success: false,
          message: result.response_text || 'Erreur lors de l\'initiation du paiement international',
          provider: 'paydunya-international'
        }
      }
    } catch (error) {
      console.error('Erreur paiement international:', error)
      return {
        success: false,
        message: 'Erreur technique lors du paiement international',
        provider: 'paydunya-international'
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
                       this.supportedCountries['INTL']

    return {
      country: detectedCountry,
      countryName: countryInfo.name,
      currency: countryInfo.currency,
      methods: [...countryInfo.mobileMoney, 'Cartes Visa/Mastercard']
    }
  }
}
