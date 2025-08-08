'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Layout from '../../../../src/components/Layout'
import { useFormations } from '../../../../src/context/FormationContext'
import { CheckCircle, ExternalLink, MessageCircle, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { getFormation } = useFormations()
  const [verifying, setVerifying] = useState(true)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [error, setError] = useState('')
  
  const formationId = parseInt(params.id as string)
  const formation = getFormation(formationId)
  const transactionId = searchParams.get('transaction_id') || searchParams.get('cpm_trans_id') // CinetPay

  useEffect(() => {
    if (transactionId) {
      verifyPayment()
    } else {
      setVerifying(false)
      setError('ID de transaction manquant')
    }
  }, [transactionId])

  const verifyPayment = async () => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transactionId: transactionId,
          provider: 'cinetpay'
        })
      })

      const result = await response.json()
      
      if (result.verified) {
        setPaymentVerified(true)
      } else {
        setError('Paiement non confirmé. Veuillez contacter le support.')
      }
    } catch (error) {
      console.error('Erreur vérification:', error)
      setError('Erreur lors de la vérification du paiement')
    } finally {
      setVerifying(false)
    }
  }

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

  if (verifying) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vérification du paiement CinetPay...</h1>
            <p className="text-gray-600">Veuillez patienter pendant que nous confirmons votre paiement.</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Problème avec le paiement</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            
            <div className="space-y-4">
              <a 
                href={`https://wa.me/22656630358?text=Bonjour, j'ai un problème avec mon paiement CinetPay pour la formation ${formation.titre}. Transaction: ${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
              >
                <MessageCircle className="mr-2 h-4 w-4 inline" />
                Contacter le support WhatsApp
              </a>
              
              <div className="block">
                <Link 
                  href={`/paiement/${formation.id}`}
                  className="text-ewes-primary hover:text-ewes-green"
                >
                  Réessayer le paiement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🎉 Paiement CinetPay confirmé !</h1>
            <p className="text-lg text-gray-600">Merci pour votre achat de la formation</p>
            <p className="text-xl font-semibold text-ewes-primary mt-2">{formation.titre}</p>
            <p className="text-sm text-gray-500 mt-2">Transaction ID: {transactionId}</p>
          </div>
          
          {formation.mode_livraison === 'auto' ? (
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">🚀 Accédez immédiatement à votre formation</h2>
              <p className="mb-4">Votre paiement CinetPay a été confirmé avec succès ! Cliquez ci-dessous pour commencer :</p>
              
              <a 
                href={formation.lien_video} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-md hover:bg-gray-100 transition duration-300 font-semibold"
              >
                <ExternalLink className="mr-2 h-5 w-5 inline" />
                Commencer la formation
              </a>
              
              <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-md">
                <p className="text-sm text-white flex items-start">
                  💡 <span className="ml-2">Sauvegardez ce lien pour accéder à votre formation à tout moment. Un email de confirmation vous sera envoyé.</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">📋 Formation en cours de préparation</h2>
              <p className="text-gray-600 mb-4">
                Votre paiement CinetPay a été confirmé avec succès ! Notre équipe va préparer votre accès personnalisé et vous contacter sous 24h maximum.
              </p>
              <div className="p-4 bg-orange-100 rounded-md">
                <p className="text-sm text-orange-800">
                  ⏰ Vous recevrez le lien de formation par WhatsApp très bientôt.
                </p>
              </div>
            </div>
          )}
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">📞 Support client EWES</h3>
            <p className="text-gray-600 mb-4">Une question ? Notre équipe est là pour vous aider !</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/22656630358?text=Bonjour, j'ai acheté la formation ${formation.titre} via CinetPay et j'aimerais avoir des informations.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                <MessageCircle className="mr-2 h-4 w-4 inline" />
                WhatsApp Support
              </a>
              
              <a 
                href="tel:+22656630358"
                className="inline-block bg-ewes-primary text-white px-6 py-2 rounded-md hover:bg-ewes-green transition duration-300"
              >
                📞 +226 56 63 03 58
              </a>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/" 
              className="text-ewes-primary hover:text-ewes-green inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
