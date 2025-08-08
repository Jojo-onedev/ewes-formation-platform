import Link from 'next/link'
import { Download, User, CreditCard, Eye } from 'lucide-react'
import { Formation } from '../context/FormationContext'

interface FormationCardProps {
  formation: Formation
}

export default function FormationCard({ formation }: FormationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{formation.titre}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{formation.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-ewes-primary">
            {formatPrice(formation.prix)} FCFA
          </span>
          <span className="text-sm text-gray-500 flex items-center">
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
        
        <div className="flex gap-2">
          <Link 
            href={`/formation/${formation.id}`}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-center hover:bg-gray-200 transition duration-300 flex items-center justify-center"
          >
            <Eye className="mr-2 h-4 w-4" />
            Détails
          </Link>
          <Link 
            href={`/paiement/${formation.id}`}
            className="flex-1 bg-ewes-primary text-white px-4 py-2 rounded-md text-center hover:bg-ewes-green transition duration-300 flex items-center justify-center"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payer
          </Link>
        </div>
      </div>
    </div>
  )
}
