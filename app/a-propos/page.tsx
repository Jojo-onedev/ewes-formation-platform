'use client'

import Layout from '../../src/components/Layout'
import { Users, Award, Target, CheckCircle, Calendar, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ewes-blue to-ewes-green text-white">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center">
            {/* Emplacement pour le logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="EWES Logo" 
                  fill 
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos d'EWES</h1>
            <h2 className="text-xl md:text-2xl mb-6">Entreprise Wendinmanegdé Electricité Sebgo</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Votre partenaire de confiance pour la formation professionnelle en électricité au Burkina Faso
            </p>
          </div>
        </div>
      </div>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  EWES (Entreprise Wendinmanegdé Electricité Sebgo) est née de la passion et de l'expertise 
                  de professionnels dévoués au développement des compétences en électricité au Burkina Faso.
                </p>
                <p>
                  Fondée avec la vision de démocratiser l'accès à une formation de qualité en électricité, 
                  notre entreprise s'est rapidement imposée comme une référence dans le domaine de la 
                  formation professionnelle.
                </p>
                <p>
                  Nous croyons fermement que l'électricité est un secteur d'avenir qui offre de nombreuses 
                  opportunités d'emploi et d'entrepreneuriat. C'est pourquoi nous nous engageons à former 
                  les électriciens de demain avec les meilleures pratiques et les normes internationales.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">Nos Chiffres</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ewes-primary mb-2">10+</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ewes-primary mb-2">500+</div>
                  <div className="text-sm text-gray-600">Étudiants formés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ewes-primary mb-2">95%</div>
                  <div className="text-sm text-gray-600">Taux de satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-ewes-primary mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support disponible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous nous engageons à fournir une formation de qualité supérieure qui prépare nos étudiants 
              aux défis du monde professionnel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence Pédagogique</h3>
              <p className="text-gray-600">
                Offrir des formations de haute qualité basées sur les meilleures pratiques 
                et les standards internationaux de l'électricité.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Accompagnement Personnalisé</h3>
              <p className="text-gray-600">
                Fournir un accompagnement individualisé à chaque apprenant pour garantir 
                sa réussite et son épanouissement professionnel.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-ewes-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation Continue</h3>
              <p className="text-gray-600">
                Intégrer les dernières technologies et méthodes d'enseignement pour 
                rester à la pointe de la formation professionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600">Les principes qui guident notre action au quotidien</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-ewes-green text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Qualité</h3>
              <p className="text-sm text-gray-600">Excellence dans tout ce que nous faisons</p>
            </div>
            
            <div className="text-center">
              <div className="bg-ewes-green text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Proximité</h3>
              <p className="text-sm text-gray-600">Relation humaine et accompagnement personnalisé</p>
            </div>
            
            <div className="text-center">
              <div className="bg-ewes-green text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="relative w-6 h-6">
                  <Image 
                    src="/images/logo.jpeg" 
                    alt="EWES" 
                    fill 
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Méthodes modernes et technologies avancées</p>
            </div>
            
            <div className="text-center">
              <div className="bg-ewes-green text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Intégrité</h3>
              <p className="text-sm text-gray-600">Transparence et honnêteté dans nos relations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600">Des professionnels expérimentés à votre service</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Formateurs Experts</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-ewes-primary mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Plus de 10 ans d'expérience</p>
                      <p className="text-sm text-gray-600">Dans le domaine de l'électricité industrielle et résidentielle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="text-ewes-primary mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Certifications internationales</p>
                      <p className="text-sm text-gray-600">Formés aux normes et standards internationaux</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="text-ewes-primary mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Pédagogie adaptée</p>
                      <p className="text-sm text-gray-600">Méthodes d'enseignement modernes et efficaces</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Domaines d'expertise</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="relative w-4 h-4 mr-2 flex-shrink-0">
                      <Image 
                        src="/images/logo.jpeg" 
                        alt="" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm">Installation électrique résidentielle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-4 h-4 mr-2 flex-shrink-0">
                      <Image 
                        src="/images/logo.jpeg" 
                        alt="" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm">Électricité industrielle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-4 h-4 mr-2 flex-shrink-0">
                      <Image 
                        src="/images/logo.jpeg" 
                        alt="" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm">Maintenance préventive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-4 h-4 mr-2 flex-shrink-0">
                      <Image 
                        src="/images/logo.jpeg" 
                        alt="" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm">Normes de sécurité</span>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-4 h-4 mr-2 flex-shrink-0">
                      <Image 
                        src="/images/logo.jpeg" 
                        alt="" 
                        fill 
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm">Énergies renouvelables</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Engagements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Engagements</h2>
            <p className="text-lg text-gray-600">Ce que nous promettons à nos étudiants</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-ewes-blue to-ewes-green text-white p-8 rounded-lg">
              <Calendar className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Formation Continue</h3>
              <p className="text-white text-opacity-90">
                Nous nous engageons à mettre à jour régulièrement nos contenus pour rester 
                en phase avec les évolutions technologiques et réglementaires du secteur.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border-2 border-ewes-primary">
              <Phone className="h-12 w-12 text-ewes-primary mb-4" />
              <h3 className="text-xl font-semibold mb-4">Support Permanent</h3>
              <p className="text-gray-700">
                Un accompagnement personnalisé avant, pendant et après la formation. 
                Notre équipe reste disponible pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Rejoignez-nous</h2>
          <p className="text-lg text-gray-600 mb-8">
            Prêt à commencer votre parcours de formation en électricité ? 
            Contactez-nous dès aujourd'hui !
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center">
              <Phone className="text-ewes-primary mr-2 h-5 w-5" />
              <span>68 84 92 72</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="text-ewes-primary mr-2 h-5 w-5" />
              <span>51 40 07 55</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="text-ewes-primary mr-2 h-5 w-5" />
              <span>Burkina Faso</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-ewes-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-ewes-green transition duration-300"
            >
              Nous contacter
            </a>
            <a 
              href="/#formations" 
              className="border-2 border-ewes-primary text-ewes-primary px-8 py-3 rounded-lg font-semibold hover:bg-ewes-primary hover:text-white transition duration-300"
            >
              Voir nos formations
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
