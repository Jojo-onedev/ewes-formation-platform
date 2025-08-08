'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../../../components/Layout'
import { useAdmin } from '../../../../context/AdminContext'
import { useFormations } from '../../../../context/FormationContext'
import { Save, X, Info } from 'lucide-react'
import Link from 'next/link'

export default function AddFormationPage() {
  const { isAuthenticated } = useAdmin()
  const { addFormation } = useFormations()
  const router = useRouter()
  
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
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    addFormation({
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter une nouvelle formation</h1>
          <p className="text-gray-600">Remplissez les informations de la formation</p>
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
                placeholder="Ex: Installation Électrique Résidentielle"
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
                placeholder="Décrivez le contenu et les objectifs de la formation..."
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
                  placeholder="25000"
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
                  <option value="">Choisissez le mode</option>
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
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Lien vers Google Drive, Dropbox ou autre plateforme de stockage
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Info className="text-blue-500 mr-2 h-5 w-5" />
                Information sur les modes de livraison
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Automatique :</strong> L'utilisateur accède immédiatement au lien après paiement PayDunya</li>
                <li><strong>Manuel :</strong> L'administrateur doit valider le paiement et envoyer le lien manuellement</li>
              </ul>
            </div>
            
            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Ajouter la formation
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
