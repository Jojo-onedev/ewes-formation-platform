import { NextRequest, NextResponse } from 'next/server'
import { CinetPayService } from '@/src/lib/payments/cinetpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, provider } = body

    let isVerified = false

    if (provider === 'cinetpay') {
      const verification = await CinetPayService.verifyPayment(transactionId)
      isVerified = verification.verified
    } else {
      return NextResponse.json(
        { error: 'Provider non supporté' },
        { status: 400 }
      )
    }

    return NextResponse.json({ verified: isVerified })

  } catch (error) {
    console.error('Erreur lors de la vérification du paiement:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la vérification' },
      { status: 500 }
    )
  }
}
