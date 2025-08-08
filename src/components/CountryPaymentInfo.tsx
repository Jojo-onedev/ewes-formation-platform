'use client'

import { useState, useEffect } from 'react'
import { Globe, CreditCard, Smartphone, Info } from 'lucide-react'

interface CountryPaymentInfoProps {
  phone: string
  amount: number
}

export default function CountryPaymentInfo({ phone, amount }: CountryPaymentInfoProps) {
  const [paymentInfo, setPaymentInfo] = useState<{
    country: string
    countryName: string
    currency: string
    methods: string[]
    convertedAmount?: number
  } | null>(null)

  useEffect(() => {
    if (phone && phone.length > 6) {
      // Simuler la détection du pays pour CinetPay
      const detectCountry = () => {
        const cleanPhone = phone.replace(/[\s\-\+]/g, '')
        
        const countries: { [key: string]: { name: string, currency: string, rate: number, methods: string[] } } = {
          '226': { name: 'Burkina Faso', currency: 'XOF', rate: 1, methods: ['Orange Money', 'Moov Money'] },
          '225': { name: 'Côte d\'Ivoire', currency: 'XOF', rate: 1, methods: ['Orange Money', 'MTN Money', 'Moov Money'] },
          '221': { name: 'Sénégal', currency: 'XOF', rate: 1, methods: ['Orange Money', 'Free Money', 'Wave'] },
          '223': { name: 'Mali', currency: 'XOF', rate: 1, methods: ['Orange Money', 'Moov Money'] },
          '228': { name: 'Togo', currency: 'XOF', rate: 1, methods: ['Togocel Money', 'Moov Money'] },
          '229': { name: 'Bénin', currency: 'XOF', rate: 1, methods: ['MTN Money', 'Moov Money'] },
          '227': { name: 'Niger', currency: 'XOF', rate: 1, methods: ['Orange Money', 'Moov Money'] },
          '233': { name: 'Ghana', currency: 'GHS', rate: 0.01, methods: ['MTN Money', 'Vodafone Cash'] },
          '237': { name: 'Cameroun', currency: 'XAF', rate: 1, methods: ['Orange Money', 'MTN Money'] }
        }

        for (const [prefix, info] of Object.entries(countries)) {
          if (cleanPhone.startsWith(prefix)) {
            return {
              country: prefix,
              countryName: info.name,
              currency: info.currency,
              methods: [...info.methods, 'Cartes Visa/Mastercard'],
              convertedAmount: info.currency !== 'XOF' ? Math.round(amount * info.rate) : amount
            }
          }
        }

        // Burkina Faso par défaut
        return {
          country: 'BF',
          countryName: 'Burkina Faso',
          currency: 'XOF',
          methods: ['Orange Money', 'Moov Money', 'Cartes Visa/Mastercard'],
          convertedAmount: amount
        }
      }

      setPaymentInfo(detectCountry())
    }
  }, [phone, amount])

  if (!paymentInfo || !phone) {
    return null
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-green-50 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <Globe className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 mb-2">
            🇨🇮 Paiement CinetPay - {paymentInfo.countryName}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-800 mb-2">
                <strong>Montant à payer :</strong>
              </p>
              {paymentInfo.currency !== 'XOF' && paymentInfo.convertedAmount ? (
                <div>
                  <p className="text-gray-600 line-through">
                    {formatAmount(amount, 'XOF')}
                  </p>
                  <p className="text-lg font-bold text-green-900">
                    {formatAmount(paymentInfo.convertedAmount, paymentInfo.currency)}
                  </p>
                  <p className="text-xs text-green-600">
                    Conversion automatique par CinetPay
                  </p>
                </div>
              ) : (
                <p className="text-lg font-bold text-green-900">
                  {formatAmount(amount, 'XOF')}
                </p>
              )}
            </div>
            
            <div>
              <p className="text-green-800 mb-2">
                <strong>Moyens de paiement CinetPay :</strong>
              </p>
              <div className="space-y-1">
                {paymentInfo.methods.map((method, index) => (
                  <div key={index} className="flex items-center text-green-700">
                    {method.includes('Carte') ? (
                      <CreditCard className="h-3 w-3 mr-1" />
                    ) : (
                      <Smartphone className="h-3 w-3 mr-1" />
                    )}
                    <span className="text-xs">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
            <Info className="h-3 w-3 inline mr-1" />
            CinetPay - Solution de paiement #1 en Afrique de l'Ouest 🇨🇮
          </div>
        </div>
      </div>
    </div>
  )
}
