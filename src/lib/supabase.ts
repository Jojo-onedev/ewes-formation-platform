import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Formation = {
  id: number
  titre: string
  description: string
  prix: number
  mode_livraison: 'auto' | 'manuel'
  lien_video: string
  date_creation: string
}
