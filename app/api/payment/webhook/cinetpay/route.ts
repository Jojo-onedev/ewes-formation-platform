import { NextRequest, NextResponse } from 'next/server'
import { CinetPayService } from '@/src/lib/payments/cinetpay'
import crypto from 'crypto'

// Webhook CinetPay pour les notifications de paiement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Webhook CinetPay reçu:', body)

    // Vérifier la signature du webhook (sécurité)
    const receivedSignature = request.headers.get('x-cinetpay-signature')
    const expectedSignature = crypto
      .createHash('sha256')
      .update(JSON.stringify(body) + process.env.CINETPAY_SECRET_KEY)
      .digest('hex')

    if (receivedSignature !== expectedSignature) {
      console.error('Signature webhook invalide')
      return NextResponse.json({ status: 'invalid_signature' }, { status: 400 })
    }

    const { cpm_trans_id, cpm_result, cpm_trans_status } = body
    
    if (cpm_trans_id && cpm_result === '00' && cpm_trans_status === 'ACCEPTED') {
      // Vérifier le paiement
      const verification = await CinetPayService.verifyPayment(cpm_trans_id)
      
      if (verification.verified) {
        console.log('Paiement confirmé via webhook CinetPay:', cpm_trans_id)
        
        // Ici vous pouvez :
        // 1. Marquer la commande comme payée dans votre base de données
        // 2. Envoyer un email de confirmation
        // 3. Débloquer l'accès à la formation
        // 4. Envoyer une notification WhatsApp
        
        // Exemple : Envoyer le lien de formation par WhatsApp
        if (verification.data && verification.data.metadata) {
          const metadata = JSON.parse(verification.data.metadata)
          await sendFormationLinkViaWhatsApp(
            verification.data.customer_phone_number,
            metadata.formation_id,
            verification.data.customer_name
          )
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Erreur webhook CinetPay:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}

// Fonction pour envoyer le lien de formation via WhatsApp (optionnel)
async function sendFormationLinkViaWhatsApp(phone: string, formationId: number, customerName: string) {
  // Ici vous pouvez intégrer l'API WhatsApp Business
  // Ou simplement logger pour traitement manuel
  console.log(`Envoyer lien formation ${formationId} à ${customerName} (${phone})`)
}
