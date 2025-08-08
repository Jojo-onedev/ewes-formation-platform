'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../../../src/components/Layout'
import { useFormations } from '../../../../src/context/FormationContext'
import { Smartphone, MessageCircle, Info, ArrowLeft } from 'lucide-react'

export default function OrangeMoneyPage() {
  const params = useParams()
  const { getFormation } = useFormations()
  
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement Orange Money</h1>
            <p className="text-lg text-gray-600">Formation: <strong>{formation.titre}</strong></p>
            <p className="text-2xl font-bold text-ewes-primary mt-2">{formatPrice(formation.prix)} FCFA</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instructions de paiement */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Instructions de paiement</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Composez #144#</p>
                    <p className="text-sm text-gray-600">Sur votre téléphone Orange Money</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Choisissez "Transfert d'argent"</p>
                    <p className="text-sm text-gray-600">Option 1 dans le menu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Entrez le numéro destinataire</p>
                    <div className="bg-orange-50 p-2 rounded mt-1">
                      <p className="font-bold text-orange-800">56 63 03 58</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">4</div>
                  <div>
                    <p className="font-medium">Entrez le montant</p>
                    <div className="bg-orange-50 p-2 rounded mt-1">
                      <p className="font-bold text-orange-800">{formatPrice(formation.prix)} FCFA</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">5</div>
                  <div>
                    <p className="font-medium">Confirmez avec votre code PIN</p>
                    <p className="text-sm text-gray-600">Vous recevrez un SMS de confirmation</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Envoi de la preuve */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Envoyez votre preuve de paiement</h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <MessageCircle className="mx-auto h-12 w-12 text-green-600 mb-2" />
                  <p className="font-semibold">Envoyez votre SMS de confirmation sur WhatsApp</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Smartphone className="text-green-600 mr-3 h-5 w-5" />
                    <span className="font-bold">+226 56 63 03 58</span>
                  </div>
                  <div className="flex items-start">
                    <MessageCircle className="text-green-600 mr-3 h-5 w-5 mt-1" />
                    <div>
                      <p className="font-medium">Message à envoyer :</p>
                      <div className="bg-white p-3 rounded border mt-2 text-sm">
                        "Bonjour, j'ai effectué le paiement pour la formation : {formation.titre}. Voici ma preuve de paiement Orange Money. [Joindre le SMS de confirmation]"
                      </div>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={`https://wa.me/22656630358?text=Bonjour, j'ai effectué le paiement pour la formation : ${formation.titre}. Voici ma preuve de paiement Orange Money.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300 font-semibold text-center block"
                >
                  <MessageCircle className="mr-2 h-4 w-4 inline" />
                  Envoyer sur WhatsApp
                </a>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  Important
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Vous recevrez le lien de formation sous 24h maximum</li>
                  <li>• Gardez votre SMS de confirmation Orange Money</li>
                  <li>• Notre équipe vérifiera votre paiement rapidement</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center border-t pt-6">
            <Link 
              href={`/paiement/${formation.id}`}
              className="text-gray-600 hover:text-ewes-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Choisir un autre mode de paiement
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
