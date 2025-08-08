'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useAdmin } from '../context/AdminContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAdmin()

  const isActive = (path: string) => pathname === path
  
  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/" className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <Image 
                      src="/images/logo.jpeg" 
                      alt="EWES Logo" 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-ewes-primary">
                      EWES
                    </h1>
                  </div>
                  <p className="hidden md:block text-sm text-gray-600">Entreprise Wendinmanegdé Electricité Sebgo</p>
                </div>
              </Link>
              
              {/* Bouton menu mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-ewes-primary focus:outline-none"
                  aria-label="Menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Navigation desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActive('/') 
                      ? 'text-ewes-primary bg-ewes-primary bg-opacity-10' 
                      : 'text-gray-700 hover:text-ewes-primary'
                  }`}
                >
                  Accueil
                </Link>
                <Link 
                  href="/a-propos" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActive('/a-propos') 
                      ? 'text-ewes-primary bg-ewes-primary bg-opacity-10' 
                      : 'text-gray-700 hover:text-ewes-primary'
                  }`}
                >
                  À propos
                </Link>
                <Link 
                  href="/contact" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActive('/contact') 
                      ? 'text-ewes-primary bg-ewes-primary bg-opacity-10' 
                      : 'text-gray-700 hover:text-ewes-primary'
                  }`}
                >
                  Contact
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link 
                      href="/dashboard-admin" 
                      className="bg-ewes-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-ewes-green transition duration-300"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={logout}
                      className="text-gray-700 hover:text-ewes-primary px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                    >
                      Déconnexion
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Menu mobile */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/')
                    ? 'bg-ewes-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-ewes-primary'
                }`}
              >
                Accueil
              </Link>
              <Link 
                href="/a-propos" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/a-propos')
                    ? 'bg-ewes-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-ewes-primary'
                }`}
              >
                À propos
              </Link>
              <Link 
                href="/contact" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/contact')
                    ? 'bg-ewes-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-ewes-primary'
                }`}
              >
                Contact
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    href="/dashboard-admin" 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-ewes-primary hover:bg-ewes-green transition duration-300"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-ewes-primary transition duration-300"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EWES</h3>
              <p className="text-gray-300">Entreprise Wendinmanegdé Electricité Sebgo</p>
              <p className="text-gray-300 mt-2">Formation professionnelle en électricité</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                68 84 92 72 / 51 40 07 55
              </p>
              <p className="text-gray-300 mt-2 flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                +226 56 63 03 58
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Paiement</h3>
              <p className="text-gray-300">Orange Money: +226 56 63 03 58</p>
              <p className="text-gray-300 mt-2">Cinetpay accepté</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© {new Date().getFullYear()} EWES. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
