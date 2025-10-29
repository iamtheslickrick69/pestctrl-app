import { NextRequest, NextResponse } from 'next/server'
import { getCustomersByRevenueStream, Customer } from '@/lib/mockCustomers'
import { SalesBotEngine } from '@/lib/salesBotEngine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { revenueStream } = body as { revenueStream: Customer['revenueStream'] }

    if (!revenueStream) {
      return NextResponse.json({
        success: false,
        error: 'Revenue stream required'
      }, { status: 400 })
    }

    // Get customers for this revenue stream
    const customers = getCustomersByRevenueStream(revenueStream)

    // Generate initial messages for each customer
    const initiatedConversations = customers.map(customer => {
      const initialMessage = SalesBotEngine.generateResponse(customer, `START_${revenueStream.toUpperCase()}`)

      return {
        customerId: customer.id,
        customerName: customer.name,
        customerPhone: customer.phone,
        revenueStream,
        initialMessage,
        status: 'sent',
        timestamp: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      revenueStream,
      customersContacted: customers.length,
      conversations: initiatedConversations
    })

  } catch (error) {
    console.error('Campaign start error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
