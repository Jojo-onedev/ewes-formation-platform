import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FormationProvider } from '../src/context/FormationContext'
import { AdminProvider } from '../src/context/AdminContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EWES - Entreprise Wendinmanegdé Electricité Sebgo',
  description: 'Formation professionnelle en électricité au Burkina Faso',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <AdminProvider>
          <FormationProvider>
            {children}
          </FormationProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
