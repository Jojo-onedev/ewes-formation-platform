import { supabase } from './supabase'
import type { Formation } from './supabase'

export class FormationService {
  // Récupérer toutes les formations
  static async getAll(): Promise<Formation[]> {
    const { data, error } = await supabase
      .from('formations')
      .select('*')
      .order('date_creation', { ascending: false })

    if (error) {
      console.error('Erreur lors de la récupération des formations:', error)
      return []
    }

    return data || []
  }

  // Récupérer une formation par ID
  static async getById(id: number): Promise<Formation | null> {
    const { data, error } = await supabase
      .from('formations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erreur lors de la récupération de la formation:', error)
      return null
    }

    return data
  }

  // Ajouter une nouvelle formation
  static async create(formation: Omit<Formation, 'id' | 'date_creation'>): Promise<Formation | null> {
    const { data, error } = await supabase
      .from('formations')
      .insert([formation])
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la création de la formation:', error)
      return null
    }

    return data
  }

  // Mettre à jour une formation
  static async update(id: number, formation: Omit<Formation, 'id' | 'date_creation'>): Promise<Formation | null> {
    const { data, error } = await supabase
      .from('formations')
      .update(formation)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error)
      return null
    }

    return data
  }

  // Supprimer une formation
  static async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('formations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erreur lors de la suppression de la formation:', error)
      return false
    }

    return true
  }
}
