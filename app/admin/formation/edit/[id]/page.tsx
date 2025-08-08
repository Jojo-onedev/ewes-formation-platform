'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Layout from '../../../../../components/Layout'
import { useAdmin } from '../../../../../context/AdminContext'
import { useFormations } from '../../../../../context/FormationContext'
import { Save, X } from 'lucide-react'
import Link from 'next/link'

export default function EditFormationPage() {
  const { isAuthenticated } = useAdmin()
  const { getFormation, updateFormation } = useFormations()
  const params = useParams()
  const router = useRouter()
  
  const formationId = parseInt(params.id as string)
  const formation = getFormation(formationId)
  
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    mode_livraison: '' as 'auto' | 'manuel' | '',
    lien_video: ''
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }
    
    if (formation) {
      setFormData({
        titre: formation.titre,
        description: formation.description,
        prix: formation.prix.toString(),
        mode_livraison: formation.mode_livraison,
        lien_video: formation.lien_video
      })
    }
  }, [isAuthenticated, formation, router])

  if (!isAuthenticated) {
    return null
  }

  if (!formation) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
          <Link href="/admin" className="text-ewes-primary hover:text-ewes-green">
            Retour à l'administration
          </Link>
        </div>
      </Layout>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    updateFormation(formationId, {
      titre: formData.titre,
      description: formData.description,
      prix: parseFloat(formData.prix),
      mode_livraison: formData.mode_livraison as 'auto' | 'manuel',
      lien_video: formData.lien_video
    })
    
    router.push('/admin')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Modifier la formation</h1>
          <p className="text-gray-600">{formation.titre}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la formation *
              </label>
              <input 
                type="text" 
                id="titre" 
                name="titre" 
                required
                value={formData.titre}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea 
                id="description" 
                name="description" 
                rows={4} 
                required
                value={formData.description}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (FCFA) *
                </label>
                <input 
                  type="number" 
                  id="prix" 
                  name="prix" 
                  required 
                  min="0" 
                  step="1000"
                  value={formData.prix}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="mode_livraison" className="block text-sm font-medium text-gray-700 mb-2">
                  Mode de livraison *
                </label>
                <select 
                  id="mode_livraison" 
                  name="mode_livraison" 
                  required
                  value={formData.mode_livraison}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="auto">Automatique (accès immédiat)</option>
                  <option value="manuel">Manuel (validation admin)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="lien_video" className="block text-sm font-medium text-gray-700 mb-2">
                Lien de la vidéo *
              </label>
              <input 
                type="url" 
                id="lien_video" 
                name="lien_video" 
                required
                value={formData.lien_video}
                onChange={handleChange}
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Lien vers Google Drive, Dropbox ou autre plateforme de stockage
              </p>
            </div>
            
            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les modifications
              </button>
              <Link 
                href="/admin"
                className="flex-1 btn-secondary text-center flex items-center justify-center"
              >
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
