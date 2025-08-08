'use client'

import Layout from '../src/components/Layout'
import FormationCard from '../src/components/FormationCard'
import { useFormations } from '../src/context/FormationContext'
import { GraduationCap, Wrench, Users, ArrowDown, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const { formations, loading } = useFormations()

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ewes-blue to-ewes-green text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
              <Image 
                src="/images/logo.jpeg" 
                alt="EWES Logo" 
                fill 
                className="rounded-full object-cover"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              EWES
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl mb-6">Entreprise Wendinmanegdé Electricité Sebgo</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Formez-vous aux métiers de l'électricité avec nos experts. 
            Des formations pratiques et certifiantes pour devenir un électricien professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#formations" 
              className="bg-white text-ewes-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center"
            >
              <ArrowDown className="mr-2 h-5 w-5" />
              Voir nos formations
            </a>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-ewes-primary transition duration-300"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>

      {/* À propos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir EWES ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre expertise et notre passion pour l'électricité nous permettent de former 
              les meilleurs électriciens du Burkina Faso.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Formation Professionnelle</h3>
              <p className="text-gray-600">Apprenez les techniques d'électricité avec nos formateurs expérimentés</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Formation Pratique</h3>
              <p className="text-gray-600">Apprenez avec des cas concrets et des exercices pratiques</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experts Qualifiés</h3>
              <p className="text-gray-600">Formateurs expérimentés avec plus de 10 ans d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section id="formations" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Formations</h2>
            <p className="text-lg text-gray-600">Découvrez nos formations spécialisées en électricité</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-ewes-primary" />
              <span className="ml-2 text-gray-600">Chargement des formations...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((formation) => (
                <FormationCard key={formation.id} formation={formation} />
              ))}
            </div>
          )}
          
          {!loading && formations.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-24 w-24 text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">Aucune formation disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
