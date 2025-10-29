import { NextRequest, NextResponse } from 'next/server'
import { getCustomerByPhone } from '@/lib/mockCustomers'
import { SalesBotEngine } from '@/lib/salesBotEngine'

// In-memory conversation storage for demo
const conversations = new Map<string, any[]>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, message } = body

    // Look up customer
    const customer = getCustomerByPhone(phone)

    if (!customer) {
      return NextResponse.json({
        success: false,
        error: 'Customer not found'
      }, { status: 404 })
    }

    // Get or create conversation history
    if (!conversations.has(customer.id)) {
      conversations.set(customer.id, [])
    }

    const history = conversations.get(customer.id)!

    // Add customer message
    const customerMessage = {
      id: Date.now().toString(),
      customerId: customer.id,
      sender: 'customer',
      text: message,
      timestamp: new Date(),
      revenueStream: customer.revenueStream
    }
    history.push(customerMessage)

    // Generate AI response
    const aiResponseText = SalesBotEngine.generateResponse(customer, message)

    // Detect conversion
    const { converted, value } = SalesBotEngine.detectConversion(message, customer.revenueStream)

    // Add AI response
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      customerId: customer.id,
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date(),
      revenueStream: customer.revenueStream,
      conversionValue: converted ? value : undefined
    }
    history.push(aiMessage)

    return NextResponse.json({
      success: true,
      customer,
      messages: history,
      converted,
      conversionValue: value
    })

  } catch (error) {
    console.error('SMS API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Get conversation history
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const customerId = searchParams.get('customerId')

  if (customerId) {
    const history = conversations.get(customerId) || []
    return NextResponse.json({ success: true, messages: history })
  }

  // Return all conversations
  const allConversations = Array.from(conversations.entries()).map(([customerId, messages]) => ({
    customerId,
    messages,
    lastMessage: messages[messages.length - 1],
    messageCount: messages.length
  }))

  return NextResponse.json({ success: true, conversations: allConversations })
}
