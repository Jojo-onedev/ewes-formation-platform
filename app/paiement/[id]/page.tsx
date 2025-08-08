'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../src/components/Layout'
import CountryPaymentInfo from '../../../src/components/CountryPaymentInfo'
import { useFormations } from '../../../src/context/FormationContext'
import { CreditCard, Smartphone, Check, ArrowLeft, Loader2, Shield, Zap, Globe } from 'lucide-react'

export default function PaiementPage() {
  const params = useParams()
  const { getFormation } = useFormations()
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    country: ''
  })
  
  const formationId = parseInt(params.id as string)
  const formation = getFormation(formationId)

  if (!formation) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
          <Link href="/" className="text-ewes-primary hover:text-ewes-green">
            <ArrowLeft className="inline mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </Layout>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const handleCinetPayPayment = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Veuillez remplir vos informations (nom et téléphone obligatoires)')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formationId: formation.id,
          paymentMethod: 'cinetpay',
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerEmail: customerInfo.email,
          customerCountry: customerInfo.country
        })
      })

      const result = await response.json()

      if (result.success && result.paymentUrl) {
        // Rediriger vers CinetPay
        window.location.href = result.paymentUrl
      } else {
        alert(result.message || 'Erreur lors de l\'initiation du paiement')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur technique lors du paiement. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <Globe className="inline mr-2 h-8 w-8 text-green-600" />
            Paiement Sécurisé CinetPay
          </h1>
          <p className="text-lg text-gray-600">Formation: <strong>{formation.titre}</strong></p>
          <p className="text-3xl font-bold text-ewes-primary mt-2">{formatPrice(formation.prix)} FCFA</p>
          <p className="text-sm text-gray-500 mt-1">🇨🇮 Powered by CinetPay - #1 en Afrique de l'Ouest</p>
        </div>

        {/* Informations client */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-ewes-primary" />
            Vos informations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
              <input
                type="text"
                placeholder="Ex: Jean Ouédraogo"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
              <input
                type="tel"
                placeholder="Ex: +22670123456"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Avec indicatif pays (+226, +225, etc.)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optionnel)</label>
              <input
                type="email"
                placeholder="Ex: jean@email.com"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays (optionnel)</label>
              <select
                value={customerInfo.country}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, country: e.target.value }))}
                className="input-field"
              >
                <option value="">Détection automatique</option>
                <option value="BF">🇧🇫 Burkina Faso</option>
                <option value="CI">🇨🇮 Côte d'Ivoire</option>
                <option value="SN">🇸🇳 Sénégal</option>
                <option value="ML">🇲🇱 Mali</option>
                <option value="TG">🇹🇬 Togo</option>
                <option value="BJ">🇧🇯 Bénin</option>
                <option value="NE">🇳🇪 Niger</option>
                <option value="GH">🇬🇭 Ghana</option>
                <option value="CM">🇨🇲 Cameroun</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informations de paiement par pays */}
        {customerInfo.phone && (
          <CountryPaymentInfo 
            phone={customerInfo.phone} 
            amount={formation.prix} 
          />
        )}
        
        {/* CinetPay - Option principale */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">🇨🇮 CinetPay</h3>
              <p className="text-white text-opacity-90">Solution de paiement #1 en Afrique de l'Ouest</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <Smartphone className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold">Mobile Money</h4>
                <p className="text-sm text-white text-opacity-80">Orange, MTN, Moov, Wave</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold">Cartes bancaires</h4>
                <p className="text-sm text-white text-opacity-80">Visa, Mastercard</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold">Multi-pays</h4>
                <p className="text-sm text-white text-opacity-80">9 pays africains</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-white">
                <Check className="mr-3 h-5 w-5" />
                <span>🇨🇮 Basé en Côte d'Ivoire - Support local</span>
              </div>
              <div className="flex items-center text-white">
                <Check className="mr-3 h-5 w-5" />
                <span>🇧🇫 Très populaire au Burkina Faso</span>
              </div>
              <div className="flex items-center text-white">
                <Check className="mr-3 h-5 w-5" />
                <span>⚡ Paiement instantané et sécurisé</span>
              </div>
              <div className="flex items-center text-white">
                <Check className="mr-3 h-5 w-5" />
                <span>🎓 Accès immédiat à la formation</span>
              </div>
            </div>
            
            <button 
              onClick={handleCinetPayPayment}
              disabled={loading || !customerInfo.name || !customerInfo.phone}
              className="w-full bg-white text-green-600 py-4 px-6 rounded-lg hover:bg-gray-100 transition duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirection vers CinetPay...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Payer {formatPrice(formation.prix)} FCFA
                </>
              )}
            </button>
          </div>

          {/* Pays supportés */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-center">🌍 Pays supportés par CinetPay</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-center">
              <div className="p-2 bg-green-100 rounded">🇧🇫 Burkina Faso</div>
              <div className="p-2 bg-green-100 rounded">🇨🇮 Côte d'Ivoire</div>
              <div className="p-2 bg-green-100 rounded">🇸🇳 Sénégal</div>
              <div className="p-2 bg-green-100 rounded">🇲🇱 Mali</div>
              <div className="p-2 bg-green-100 rounded">🇹🇬 Togo</div>
              <div className="p-2 bg-green-100 rounded">🇧🇯 Bénin</div>
              <div className="p-2 bg-green-100 rounded">🇳🇪 Niger</div>
              <div className="p-2 bg-green-100 rounded">🇬🇭 Ghana</div>
              <div className="p-2 bg-green-100 rounded">🇨🇲 Cameroun</div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2">
              + Cartes bancaires internationales acceptées partout
            </p>
          </div>

          {/* Option alternative - Paiement manuel */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Problème avec le paiement en ligne ?</h3>
            <p className="text-gray-600 mb-4">Contactez-nous directement pour un paiement personnalisé</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href={`https://wa.me/22656630358?text=Bonjour, je souhaite acheter la formation "${formation.titre}" avec CinetPay. Pouvez-vous m'aider ?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                💬 Support WhatsApp
              </a>
              <Link 
                href={`/paiement/${formation.id}/orange-money`}
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300"
              >
                📱 Paiement Orange Money
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href={`/formation/${formation.id}`}
            className="text-gray-600 hover:text-ewes-primary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux détails de la formation
          </Link>
        </div>

        {/* Informations de sécurité */}
        <div className="mt-8 bg-green-50 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">🔒 Paiement 100% Sécurisé avec CinetPay</p>
              <p>CinetPay est la solution de paiement de référence en Afrique de l'Ouest, certifiée PCI DSS. Basée en Côte d'Ivoire avec un support local en français. Vos données sont protégées par un cryptage SSL de niveau bancaire.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
