'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { FormationService } from '../lib/formations'
import type { Formation } from '../lib/supabase'

interface FormationContextType {
  formations: Formation[]
  loading: boolean
  addFormation: (formation: Omit<Formation, 'id' | 'date_creation'>) => Promise<boolean>
  updateFormation: (id: number, formation: Omit<Formation, 'id' | 'date_creation'>) => Promise<boolean>
  deleteFormation: (id: number) => Promise<boolean>
  getFormation: (id: number) => Formation | undefined
  refreshFormations: () => Promise<void>
}

const FormationContext = createContext<FormationContextType | undefined>(undefined)

export function FormationProvider({ children }: { children: React.ReactNode }) {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)

  // Charger les formations au démarrage
  const refreshFormations = async () => {
    setLoading(true)
    try {
      const data = await FormationService.getAll()
      setFormations(data)
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshFormations()
  }, [])

  const addFormation = async (formationData: Omit<Formation, 'id' | 'date_creation'>): Promise<boolean> => {
    try {
      const newFormation = await FormationService.create(formationData)
      if (newFormation) {
        setFormations(prev => [newFormation, ...prev])
        return true
      }
      return false
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la formation:', error)
      return false
    }
  }

  const updateFormation = async (id: number, formationData: Omit<Formation, 'id' | 'date_creation'>): Promise<boolean> => {
    try {
      const updatedFormation = await FormationService.update(id, formationData)
      if (updatedFormation) {
        setFormations(prev => prev.map(formation => 
          formation.id === id ? updatedFormation : formation
        ))
        return true
      }
      return false
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error)
      return false
    }
  }

  const deleteFormation = async (id: number): Promise<boolean> => {
    try {
      const success = await FormationService.delete(id)
      if (success) {
        setFormations(prev => prev.filter(formation => formation.id !== id))
        return true
      }
      return false
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error)
      return false
    }
  }

  const getFormation = (id: number) => {
    return formations.find(formation => formation.id === id)
  }

  return (
    <FormationContext.Provider value={{
      formations,
      loading,
      addFormation,
      updateFormation,
      deleteFormation,
      getFormation,
      refreshFormations
    }}>
      {children}
    </FormationContext.Provider>
  )
}

export function useFormations() {
  const context = useContext(FormationContext)
  if (context === undefined) {
    throw new Error('useFormations must be used within a FormationProvider')
  }
  return context
}
