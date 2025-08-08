'use client'

import { useState } from 'react'
import Layout from '../../src/components/Layout'
import { Phone, MessageCircle, MapPin, CreditCard } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    formation: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const whatsappMessage = `Bonjour EWES,\n\nNom: ${formData.nom}\nTéléphone: ${formData.telephone}\nFormation d'intérêt: ${formData.formation}\n\nMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/22656630358?text=${encodeURIComponent(whatsappMessage)}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-lg text-gray-600">Nous sommes là pour répondre à toutes vos questions</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-ewes-primary text-white p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Téléphone</h3>
                  <p className="text-gray-600">68 84 92 72</p>
                  <p className="text-gray-600">51 40 07 55</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-ewes-primary text-white p-3 rounded-full mr-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">+226 56 63 03 58</p>
                  <p className="text-sm text-gray-500">Pour le support et les questions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-ewes-primary text-white p-3 rounded-full mr-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Paiement Orange Money</h3>
                  <p className="text-gray-600">+226 56 63 03 58</p>
                  <p className="text-sm text-gray-500">Envoyez votre preuve de paiement par WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-ewes-primary text-white p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Localisation</h3>
                  <p className="text-gray-600">Burkina Faso</p>
                  <p className="text-sm text-gray-500">Formations disponibles en ligne</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input 
                  type="text" 
                  id="nom" 
                  name="nom" 
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input 
                  type="tel" 
                  id="telephone" 
                  name="telephone" 
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="formation" className="block text-sm font-medium text-gray-700 mb-2">
                  Formation d'intérêt
                </label>
                <select 
                  id="formation" 
                  name="formation"
                  value={formData.formation}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Sélectionnez une formation</option>
                  <option value="installation">Installation Électrique Résidentielle</option>
                  <option value="maintenance">Maintenance des Équipements Industriels</option>
                  <option value="securite">Sécurité Électrique et Normes</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Décrivez votre demande..."
                />
              </div>
              
              <button type="submit" className="w-full btn-primary flex items-center justify-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Envoyer via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
