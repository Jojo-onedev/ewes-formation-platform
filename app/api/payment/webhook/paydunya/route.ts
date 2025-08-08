import { NextRequest, NextResponse } from 'next/server'
import { PayDunyaService } from '@/src/lib/payments/paydunya-complete'

// Webhook PayDunya pour les notifications de paiement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Webhook PayDunya reçu:', body)

    const { data } = body
    
    if (data && data.token) {
      // Vérifier le paiement
      const verification = await PayDunyaService.verifyPayment(data.token)
      
      if (verification.verified) {
        console.log('Paiement confirmé via webhook:', data.token)
        
        // Ici vous pouvez :
        // 1. Marquer la commande comme payée dans votre base de données
        // 2. Envoyer un email de confirmation
        // 3. Débloquer l'accès à la formation
        // 4. Envoyer une notification WhatsApp
        
        // Exemple : Envoyer le lien de formation par WhatsApp
        if (data.custom_data && data.custom_data.customer_phone) {
          await sendFormationLinkViaWhatsApp(
            data.custom_data.customer_phone,
            data.custom_data.formation_id,
            data.custom_data.customer_name
          )
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Erreur webhook PayDunya:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}

// Fonction pour envoyer le lien de formation via WhatsApp (optionnel)
async function sendFormationLinkViaWhatsApp(phone: string, formationId: number, customerName: string) {
  // Ici vous pouvez intégrer l'API WhatsApp Business
  // Ou simplement logger pour traitement manuel
  console.log(`Envoyer lien formation ${formationId} à ${customerName} (${phone})`)
}
