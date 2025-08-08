'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../src/components/Layout'
import { useAdmin } from '../../src/context/AdminContext'
import { useFormations } from '../../src/context/FormationContext'
import { Plus, Book, Download, User, Edit, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function SecretAdminDashboardPage() {
  const { isAuthenticated } = useAdmin()
  const { formations, loading, deleteFormation } = useFormations()
  const router = useRouter()
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleDelete = async (id: number, titre: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la formation "${titre}" ?`)) {
      setDeleting(id)
      const success = await deleteFormation(id)
      if (!success) {
        alert('Erreur lors de la suppression de la formation')
      }
      setDeleting(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }

  const autoFormations = formations.filter(f => f.mode_livraison === 'auto')
  const manuelFormations = formations.filter(f => f.mode_livraison === 'manuel')

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-ewes-primary" />
            <span className="ml-2 text-gray-600">Chargement du dashboard...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administration EWES</h1>
            <p className="text-gray-600">Gestion des formations - Base de données Supabase</p>
          </div>
          <Link 
            href="/dashboard-admin/formation/add"
            className="btn-primary flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Ajouter une formation
          </Link>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total formations</p>
                <p className="text-2xl font-bold text-gray-900">{formations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Livraison automatique</p>
                <p className="text-2xl font-bold text-gray-900">{autoFormations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <User className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Livraison manuelle</p>
                <p className="text-2xl font-bold text-gray-900">{manuelFormations.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Liste des formations */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Formations disponibles</h2>
          </div>
          
          {formations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livraison</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formations.map((formation) => (
                    <tr key={formation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{formation.titre}</div>
                          <div className="text-sm text-gray-500">
                            {formation.description.length > 100 
                              ? `${formation.description.substring(0, 100)}...` 
                              : formation.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {formatPrice(formation.prix)} FCFA
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formation.mode_livraison === 'auto' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Download className="mr-1 h-3 w-3" />
                            Automatique
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <User className="mr-1 h-3 w-3" />
                            Manuelle
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(formation.date_creation).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/dashboard-admin/formation/edit/${formation.id}`}
                            className="text-ewes-primary hover:text-ewes-green"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(formation.id, formation.titre)}
                            disabled={deleting === formation.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {deleting === formation.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Book className="mx-auto h-24 w-24 text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-4">Aucune formation disponible</p>
              <Link 
                href="/dashboard-admin/formation/add"
                className="btn-primary"
              >
                Ajouter la première formation
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
