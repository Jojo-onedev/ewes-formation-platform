import { NextRequest, NextResponse } from 'next/server'
import { CinetPayService } from '@/src/lib/payments/cinetpay'
import { FormationService } from '@/src/lib/formations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      formationId, 
      paymentMethod, 
      customerName, 
      customerPhone, 
      customerEmail 
    } = body

    // Récupérer les détails de la formation
    const formation = await FormationService.getById(formationId)
    if (!formation) {
      return NextResponse.json(
        { error: 'Formation non trouvée' },
        { status: 404 }
      )
    }

    // Préparer la requête de paiement
    const paymentRequest = {
      amount: formation.prix,
      currency: 'XOF' as const,
      description: `Formation EWES: ${formation.titre}`,
      customerName,
      customerPhone,
      customerEmail,
      formationId: formation.id,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/${formation.id}/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/paiement/${formation.id}/cancel`,
      notifyUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook/cinetpay`
    }

    let paymentResponse

    // Initier le paiement avec CinetPay
    if (paymentMethod === 'cinetpay') {
      paymentResponse = await CinetPayService.initiatePayment(paymentRequest)
    } else {
      return NextResponse.json(
        { error: 'Méthode de paiement non supportée' },
        { status: 400 }
      )
    }

    return NextResponse.json(paymentResponse)

  } catch (error) {
    console.error('Erreur lors de l\'initiation du paiement:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors du paiement' },
      { status: 500 }
    )
  }
}
