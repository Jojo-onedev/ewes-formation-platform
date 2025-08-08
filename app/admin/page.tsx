'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '../../src/components/Layout'
import { useAdmin } from '../../src/context/AdminContext'
import { Shield, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAdmin()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (login(password)) {
      router.push('/dashboard-admin')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="text-center">
              <Shield className="mx-auto h-16 w-16 text-ewes-primary mb-4" />
              <h2 className="text-3xl font-bold text-gray-900">Administration EWES</h2>
              <p className="mt-2 text-sm text-gray-600">Accès sécurisé - Administrateurs uniquement</p>
            </div>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-ewes-primary focus:border-ewes-primary focus:z-10 sm:text-sm"
                placeholder="Mot de passe administrateur"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
            <div>
              <button 
                type="submit" 
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-ewes-primary hover:bg-ewes-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ewes-primary transition duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-ewes-green group-hover:text-ewes-primary" />
                </span>
                Accéder au dashboard
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <Link href="/" className="text-ewes-primary hover:text-ewes-green inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
