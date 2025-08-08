'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '../../../src/components/Layout'
import { useFormations } from '../../../src/context/FormationContext'
import { ArrowLeft, Check, Clock, Video, Award, Headphones, Download, User, CreditCard } from 'lucide-react'

export default function FormationDetailPage() {
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-ewes-blue to-ewes-green text-white p-8">
            <h1 className="text-3xl font-bold mb-4">{formation.titre}</h1>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{formatPrice(formation.prix)} FCFA</span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm flex items-center">
                {formation.mode_livraison === 'auto' ? (
                  <>
                    <Download className="mr-1 h-4 w-4" />
                    Accès immédiat
                  </>
                ) : (
                  <>
                    <User className="mr-1 h-4 w-4" />
                    Livraison manuelle
                  </>
                )}
              </span>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Description de la formation</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{formation.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Ce que vous apprendrez</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="text-ewes-primary mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    Techniques professionnelles d'électricité
                  </li>
                  <li className="flex items-start">
                    <Check className="text-ewes-primary mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    Normes de sécurité et réglementations
                  </li>
                  <li className="flex items-start">
                    <Check className="text-ewes-primary mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    Exercices pratiques et cas d'étude
                  </li>
                  <li className="flex items-start">
                    <Check className="text-ewes-primary mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    Certification à la fin de la formation
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Informations pratiques</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center">
                    <Clock className="text-ewes-primary mr-3 h-5 w-5" />
                    <span>Formation en ligne, à votre rythme</span>
                  </div>
                  <div className="flex items-center">
                    <Video className="text-ewes-primary mr-3 h-5 w-5" />
                    <span>Contenu vidéo de haute qualité</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-ewes-primary mr-3 h-5 w-5" />
                    <span>Certificat de completion</span>
                  </div>
                  <div className="flex items-center">
                    <Headphones className="text-ewes-primary mr-3 h-5 w-5" />
                    <span>Support WhatsApp inclus</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/" 
                  className="flex-1 btn-secondary text-center flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux formations
                </Link>
                <Link 
                  href={`/paiement/${formation.id}`}
                  className="flex-1 btn-primary text-center flex items-center justify-center"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Procéder au paiement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
