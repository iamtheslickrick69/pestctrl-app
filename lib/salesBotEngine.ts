// PestCtrl AI Sales Bot Engine - Demonstrates all 4 revenue streams

import { Customer } from './mockCustomers'

export interface ConversationMessage {
  id: string
  customerId: string
  sender: 'customer' | 'ai'
  text: string
  timestamp: Date
  revenueStream: Customer['revenueStream']
  intent?: string
  conversionValue?: number
}

export class SalesBotEngine {
  // Revenue Stream 1: Upselling Current Customers
  static generateUpsellResponse(customer: Customer, message: string): string {
    const lowerMessage = message.toLowerCase()
    const firstName = customer.name.split(' ')[0]

    // Initial outreach - natural and helpful tone
    if (!message || message === 'START_UPSELL') {
      return `Hi ${firstName}! It's Anna from PestCtrl. I noticed you haven't scheduled your quarterly treatment yet. ${customer.notes.includes('backyard') ? 'With your backyard, have you thought about adding mosquito control?' : 'Would you be interested in adding mosquito barrier treatment?'} It's $39/month and we can do it during your next visit. Interested?`
    }

    // Positive responses - confirm and provide details
    if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('interested') || lowerMessage.includes('add it')) {
      return `Perfect! I'll add mosquito barrier to your account at $39/month. Your new total will be $${customer.monthlyValue + 39}/month. We'll take care of it during your visit on ${customer.nextService}. You should see results within 24 hours.`
    }

    // Price questions - straightforward value
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return `It's $39/month, which brings your total to $${customer.monthlyValue + 39}/month (currently $${customer.monthlyValue}). It includes barrier treatment around your property perimeter and breeding areas. We guarantee results or we'll re-treat at no charge. Would you like to try it?`
    }

    // Effectiveness questions - honest and detailed
    if (lowerMessage.includes('effective') || lowerMessage.includes('work') || lowerMessage.includes('results') || lowerMessage.includes('how does')) {
      return `We spray a barrier treatment around your property that targets mosquitoes at rest. It's effective for about 3 weeks and safe for pets and kids once dry. Most customers see a significant reduction in mosquitoes. If you're not satisfied, we'll re-treat or refund it. Want to add it to your next service?`
    }

    // Objections - respectful exit
    if (lowerMessage.includes('no') || lowerMessage.includes('not interested') || lowerMessage.includes('maybe later')) {
      return `No problem, ${firstName}! If you change your mind later just let me know. Have a great day!`
    }

    // Default - clarifying question
    return `I understand. Is there anything specific you'd like to know about the mosquito treatment? Or would you prefer to stick with just your regular service for now?`
  }

  // Revenue Stream 2: Win-Back Lost Customers
  static generateWinbackResponse(customer: Customer, message: string): string {
    const lowerMessage = message.toLowerCase()
    const firstName = customer.name.split(' ')[0]
    // Get the last service they had - use a reasonable default price if monthlyValue is 0
    const estimatedMonthlyRate = customer.services.length > 1 ? 135 : 89
    const originalRate = estimatedMonthlyRate
    const discountedRate = Math.floor(originalRate * 0.5)
    const savings = (originalRate - 74) * 12  // Assuming $74 locked rate

    // Initial outreach - address pain point immediately
    if (!message || message === 'START_WINBACK') {
      return `Hi ${firstName}! Anna from PestCtrl - we've missed you! I know price was a concern last time, so here's what I can do: 50% OFF first 2 months ($${discountedRate} instead of $${originalRate}), PLUS lock you in at $74/month for the year (instead of our new $89 rate). That's $${savings} saved total! Plus eco-friendly options now. Want me to schedule you for this week? 🌿`
    }

    // Positive responses
    if (lowerMessage.includes('yes') || lowerMessage.includes('interested') || lowerMessage.includes('tell me more') || lowerMessage.includes('restart')) {
      return `Awesome, ${firstName}! So here's what I'll do: First 2 months at $${discountedRate}/month, then locked in at $74/month for the remaining 10 months. Total first year = $${(discountedRate * 2) + (74 * 10)}. Compare that to $${originalRate * 12} normally - you're saving $${savings}! I have a slot this Thursday or Friday. Which works better?`
    }

    // Price objections (why they left)
    if (lowerMessage.includes('price') || lowerMessage.includes('expensive') || lowerMessage.includes('cost') || lowerMessage.includes('left because')) {
      return `I totally understand - that's EXACTLY why I'm calling! This offer is specifically for valued former customers like you. $74/month locked in for the year is $15/month less than our current $89 rate. Over 12 months, that's $180 saved, PLUS the 50% discount on months 1-2. We really want you back! I can even start you on eco-friendly treatment at no extra charge. Fair deal?`
    }

    // Questioning need
    if (lowerMessage.includes('don\'t need') || lowerMessage.includes('no pests') || lowerMessage.includes('resolved') || lowerMessage.includes('fine now')) {
      return `I'm glad it's resolved now! Here's the thing though - pests come back seasonally. Spring and summer are peak season. The customers who DON'T have problems? They're on preventive service. Think of it like car maintenance - way cheaper to prevent than to fix a major issue. At $${discountedRate} for 2 months, it's basically risk-free to try again. Want to lock in the rate before spring hits?`
    }

    // Negative response
    if (lowerMessage.includes('no thanks') || lowerMessage.includes('not interested') || lowerMessage.includes('not right now')) {
      return `No worries, ${firstName}! I get it. Just know this offer is good for the next 30 days if you change your mind. And hey - if you ever have a pest emergency, text me directly and I'll get you priority scheduling. Fair? Take care! 👋`
    }

    // Default
    return `I really want you back, ${firstName}! Here's the bottom line: $${savings} saved over the year, 50% off to start, locked-in pricing. Plus, if after 2 months you're not happy, I'll refund you personally. Zero risk. Can I schedule you for this week?`
  }

  // Revenue Stream 3: Collections & Payment Recovery
  static generateCollectionsResponse(customer: Customer, message: string): string {
    const lowerMessage = message.toLowerCase()
    const firstName = customer.name.split(' ')[0]

    // Initial outreach - friendly, assume best intent
    if (!message || message === 'START_COLLECTIONS') {
      return `Hi ${firstName}, this is Anna from PestCtrl. Your payment of $${customer.balance} didn't go through - it might be an expired card. Would you like me to send you a secure link to update your payment info?`
    }

    // Wants to pay
    if (lowerMessage.includes('yes') || lowerMessage.includes('update') || lowerMessage.includes('new card') || lowerMessage.includes('send') || lowerMessage.includes('link')) {
      return `Great, I'll send you the secure link right now. Once you update your card info, I'll process the $${customer.balance} payment and you'll be all set. Your service will continue as normal.`
    }

    // Financial difficulty - empathetic and solution-focused
    if (lowerMessage.includes('can\'t') || lowerMessage.includes('tight') || lowerMessage.includes('money') || lowerMessage.includes('difficult') || lowerMessage.includes('afford')) {
      const halfPayment = Math.floor(customer.balance / 2)
      return `I understand, ${firstName}. I can split this into two payments of $${halfPayment} each. Would that work better for you? I can process the first payment now and schedule the second for the 15th.`
    }

    // Card issue - make it easy
    if (lowerMessage.includes('expired') || lowerMessage.includes('card') || lowerMessage.includes('declined') || lowerMessage.includes('try again')) {
      return `No problem - that happens. I can either send you a link to update your card, or I can try running it again. Which would you prefer?`
    }

    // Questioning charge - transparent breakdown
    if (lowerMessage.includes('why') || lowerMessage.includes('charge') || lowerMessage.includes('what for') || lowerMessage.includes('balance')) {
      const monthlyRate = customer.monthlyValue
      const months = Math.ceil(customer.balance / monthlyRate)
      return `This is for your pest control service: $${monthlyRate}/month for ${months} months = $${customer.balance}. The last ${months} payments didn't process. I can set up a payment plan if that would help?`
    }

    // Default - options without pressure
    return `${firstName}, I can help you with this. You can either update your card and pay now, split it into two payments, or we can set up a custom payment plan. What would work best for you?`
  }

  // Revenue Stream 4: Retention & Preventive Save
  static generateRetentionResponse(customer: Customer, message: string): string {
    const lowerMessage = message.toLowerCase()
    const firstName = customer.name.split(' ')[0]

    // Initial outreach - proactive and specific
    if (!message || message === 'START_RETENTION') {
      return `Hi ${firstName}, this is Anna from PestCtrl. Just checking in after ${customer.lastService.includes('10-28') ? 'yesterday\'s' : 'your recent'} service. How did everything go? Any issues I should know about?`
    }

    // Positive feedback - reinforce relationship
    if (lowerMessage.includes('yes') || lowerMessage.includes('great') || lowerMessage.includes('good') || lowerMessage.includes('perfect') || lowerMessage.includes('satisfied')) {
      return `Great to hear, ${firstName}! Your next service is scheduled for ${customer.nextService}. If you notice any pests between now and then, just let me know and we'll come back at no charge. That's our guarantee.`
    }

    // Issue reported - immediate action
    if (lowerMessage.includes('still seeing') || lowerMessage.includes('still') || lowerMessage.includes('problem') || lowerMessage.includes('ants') || lowerMessage.includes('bugs') || lowerMessage.includes('pests')) {
      return `I'm sorry to hear that, ${firstName}. I'll schedule a free re-treatment for you as soon as possible - tomorrow morning work for you? We'll focus on the ${lowerMessage.includes('kitchen') ? 'kitchen' : 'affected areas'} and make sure this gets resolved.`
    }

    // Service quality concern - acknowledge and fix
    if (lowerMessage.includes('late') || lowerMessage.includes('time') || lowerMessage.includes('rushed') || lowerMessage.includes('didn\'t') || lowerMessage.includes('unprofessional')) {
      return `${firstName}, I apologize for that experience. That's not our standard. I'm noting this in your file to ensure on-time service going forward, and I'll credit your account 30% off the next two months. Would you like me to assign a specific technician to your account?`
    }

    // Considering cancellation - understand and address
    if (lowerMessage.includes('cancel') || lowerMessage.includes('discontinue') || lowerMessage.includes('stop') || lowerMessage.includes('done')) {
      return `I'm sorry to hear that, ${firstName}. Can I ask what's prompting this decision? If it's something we can fix, I'd like to try. If not, I understand and want to make sure we part on good terms.`
    }

    // Default - open for feedback
    return `${firstName}, I want to make sure you're completely satisfied with our service. If there's anything that isn't meeting your expectations, please let me know so I can address it right away.`
  }

  // Main routing function
  static generateResponse(customer: Customer, message: string): string {
    switch (customer.revenueStream) {
      case 'upsell':
        return this.generateUpsellResponse(customer, message)
      case 'winback':
        return this.generateWinbackResponse(customer, message)
      case 'collections':
        return this.generateCollectionsResponse(customer, message)
      case 'retention':
        return this.generateRetentionResponse(customer, message)
      default:
        return "Hi! I'm Anna from PestCtrl. How can I help you today?"
    }
  }

  // Detect conversion/success
  static detectConversion(message: string, revenueStream: Customer['revenueStream']): { converted: boolean; value: number } {
    const lowerMessage = message.toLowerCase()

    switch (revenueStream) {
      case 'upsell':
        if (lowerMessage.includes('yes') || lowerMessage.includes('schedule') || lowerMessage.includes('add it')) {
          return { converted: true, value: 468 } // $39/month x 12 months
        }
        break
      case 'winback':
        if (lowerMessage.includes('yes') || lowerMessage.includes('schedule') || lowerMessage.includes('restart')) {
          return { converted: true, value: 1068 } // $89/month x 12 months
        }
        break
      case 'collections':
        if (lowerMessage.includes('yes') || lowerMessage.includes('pay') || lowerMessage.includes('update card')) {
          return { converted: true, value: 256 } // Average past due amount
        }
        break
      case 'retention':
        if (lowerMessage.includes('tomorrow') || lowerMessage.includes('yes') || lowerMessage.includes('schedule')) {
          return { converted: true, value: 1068 } // Saved customer lifetime value
        }
        break
    }

    return { converted: false, value: 0 }
  }
}
