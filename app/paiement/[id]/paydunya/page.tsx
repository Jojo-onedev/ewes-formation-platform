'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Layout from '../../../../src/components/Layout'
import { useFormations } from '../../../../src/context/FormationContext'
import { CheckCircle, ExternalLink, Info, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PayDunyaSuccessPage() {
  const params = useParams()
  const router = useRouter()
  const { getFormation } = useFormations()
  const [isLoading, setIsLoading] = useState(true)
  
  const formationId = parseInt(params.id as string)
  const formation = getFormation(formationId)

  useEffect(() => {
    // Simulation du traitement PayDunya
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ewes-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Traitement du paiement...</h1>
            <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre paiement.</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement réussi !</h1>
            <p className="text-lg text-gray-600">Merci pour votre achat de la formation</p>
            <p className="text-xl font-semibold text-ewes-primary mt-2">{formation.titre}</p>
          </div>
          
          {formation.mode_livraison === 'auto' ? (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Accédez à votre formation</h2>
              <p className="text-gray-600 mb-4">Cliquez sur le lien ci-dessous pour accéder à votre formation :</p>
              
              <a 
                href={formation.lien_video} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-ewes-primary text-white px-8 py-3 rounded-md hover:bg-ewes-green transition duration-300 font-semibold"
              >
                <ExternalLink className="mr-2 h-5 w-5 inline" />
                Accéder à la formation
              </a>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800 flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  Sauvegardez ce lien pour accéder à votre formation à tout moment.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Formation en cours de préparation</h2>
              <p className="text-gray-600 mb-4">
                Votre paiement a été confirmé. Vous recevrez le lien de formation par WhatsApp sous 24h maximum.
              </p>
              <div className="p-4 bg-orange-100 rounded-md">
                <p className="text-sm text-orange-800">
                  Notre équipe va préparer votre accès et vous contacter très bientôt.
                </p>
              </div>
            </div>
          )}
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
            <p className="text-gray-600 mb-4">Contactez-nous sur WhatsApp pour toute question</p>
            
            <a 
              href={`https://wa.me/22656630358?text=Bonjour, j'ai acheté la formation ${formation.titre} et j'ai besoin d'aide.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              <MessageCircle className="mr-2 h-4 w-4 inline" />
              Contacter le support
            </a>
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
