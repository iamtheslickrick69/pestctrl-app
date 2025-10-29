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

    // Initial outreach - more persuasive with urgency and social proof
    if (!message || message === 'START_UPSELL') {
      return `Hi ${firstName}! Anna from PestCtrl here. Quick heads up - we're booking mosquito treatments for your area this week. ${customer.notes.includes('backyard') ? 'With your large backyard, you\'d LOVE the results' : 'Perfect timing for spring'}! 90% fewer mosquitos guaranteed. 15 neighbors on your street already signed up. Only $39/month. Want me to add it to Thursday's visit?`
    }

    // Positive responses - reinforce decision with specifics
    if (lowerMessage.includes('yes') || lowerMessage.includes('sure') || lowerMessage.includes('interested') || lowerMessage.includes('add it')) {
      return `Excellent choice, ${firstName}! I'm adding mosquito barrier ($39/mo) to your account. Your new total is $${customer.monthlyValue + 39}/month. We'll handle it during your next visit on ${customer.nextService}. You'll notice results within 24 hours. Most customers tell us their backyard became usable again! 🎉`
    }

    // Price questions - frame as savings/value
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      return `Just $39/month - that's only $1.30/day for a mosquito-free yard! Your total would be $${customer.monthlyValue + 39}/month (currently $${customer.monthlyValue}). Here's the thing: most customers spend $50-80 on bug spray that doesn't even work. This actually solves the problem. Plus, we guarantee results or your money back! Worth trying?`
    }

    // Effectiveness questions - specific data + guarantee
    if (lowerMessage.includes('effective') || lowerMessage.includes('work') || lowerMessage.includes('results') || lowerMessage.includes('how does')) {
      return `Great question! Our barrier treatment kills 90% of mosquitos on contact and keeps working for 3 weeks. We spray your property perimeter, breeding areas, and under decks/porches. It's pet and kid-safe once dry (about 30 minutes). Plus we guarantee it - if you're not thrilled, we'll refund it or re-treat free. Can't lose! Should I add it to your ${customer.nextService} appointment?`
    }

    // Objections - soft close with scarcity
    if (lowerMessage.includes('no') || lowerMessage.includes('not interested') || lowerMessage.includes('maybe later')) {
      return `Totally understand, ${firstName}! Just so you know, we're fully booked by mid-May usually, so if you change your mind, text me ASAP to secure a spot. I'll keep your file flagged. Enjoy your day! 😊`
    }

    // Default - reframe with urgency
    return `I get it! Here's the thing though - we only have 3 slots left this week for your area, and summer is when mosquitos get BAD. $39/month is less than dinner out, and your whole family benefits. Want to lock in a spot before we're booked?`
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
      return `Hi ${firstName}! Quick heads-up from PestCtrl - your $${customer.balance} payment didn't process (probably just an expired card?). No worries! Want me to send you a secure link to update it? Takes 30 seconds, then you're all set. Or I can try the card again if you'd prefer? 💳`
    }

    // Wants to pay
    if (lowerMessage.includes('yes') || lowerMessage.includes('update') || lowerMessage.includes('new card') || lowerMessage.includes('send') || lowerMessage.includes('link')) {
      return `Perfect, ${firstName}! Sending you the secure link now. Just click it, update your card (30 seconds max), and I'll process the $${customer.balance} automatically. Your service continues without interruption and you're all caught up! Easy peasy. 🔒`
    }

    // Financial difficulty - empathetic and solution-focused
    if (lowerMessage.includes('can\'t') || lowerMessage.includes('tight') || lowerMessage.includes('money') || lowerMessage.includes('difficult') || lowerMessage.includes('afford')) {
      const halfPayment = Math.floor(customer.balance / 2)
      return `${firstName}, I totally get it - life happens! Here's what I can do: Split it in two payments of $${halfPayment}. I'll process the first half now, second half on the 15th. Your service stays active, no late fees, no stress. Fair? I've done this for tons of customers - no judgment! 😊`
    }

    // Card issue - make it super easy
    if (lowerMessage.includes('expired') || lowerMessage.includes('card') || lowerMessage.includes('declined') || lowerMessage.includes('try again')) {
      return `No problem, ${firstName} - happens all the time! I'll send you a secure link to update your payment info. Takes literally 30 seconds. Or want me to just try the card again? Sometimes it works the second time. Either way, super easy fix! Which do you prefer?`
    }

    // Questioning charge - transparent breakdown
    if (lowerMessage.includes('why') || lowerMessage.includes('charge') || lowerMessage.includes('what for') || lowerMessage.includes('balance')) {
      const monthlyRate = customer.monthlyValue
      const months = Math.ceil(customer.balance / monthlyRate)
      return `Good question! It's for your pest control service: $${monthlyRate}/month × ${months} months = $${customer.balance}. The last ${months} payment attempts didn't go through. Nothing shady - just want to keep you protected! Want me to break it down more, or shall we just get it sorted? Happy to set up a payment plan if needed!`
    }

    // Default - options without pressure
    return `Hey ${firstName}, I want to make this easy for you. Three options: (1) Update card and pay now, (2) Split payment in two, or (3) Set up a custom plan. No pressure - what works best for your situation? We're here to help! 😊`
  }

  // Revenue Stream 4: Retention & Preventive Save
  static generateRetentionResponse(customer: Customer, message: string): string {
    const lowerMessage = message.toLowerCase()
    const firstName = customer.name.split(' ')[0]

    // Initial outreach - proactive and specific
    if (!message || message === 'START_RETENTION') {
      return `Hi ${firstName}! Quick check-in after ${customer.lastService.includes('10-28') ? 'yesterday\'s' : 'your recent'} service. Everything looking good? Any pests still hanging around? If so, I'll get you a FREE re-treatment within 24 hours - we guarantee it! 🏠`
    }

    // Positive feedback - lock in loyalty
    if (lowerMessage.includes('yes') || lowerMessage.includes('great') || lowerMessage.includes('good') || lowerMessage.includes('perfect') || lowerMessage.includes('satisfied')) {
      return `Awesome, ${firstName}! That's what we like to hear! Your next service is ${customer.nextService}. Pro tip: If you ever see ANYTHING between visits, text me immediately and we'll come back FREE. That's our guarantee! Have an amazing day! 😊`
    }

    // Issue reported - IMMEDIATE action
    if (lowerMessage.includes('still seeing') || lowerMessage.includes('still') || lowerMessage.includes('problem') || lowerMessage.includes('ants') || lowerMessage.includes('bugs') || lowerMessage.includes('pests')) {
      return `${firstName}, I'm SO sorry about that! This is unacceptable. I'm scheduling you for a FREE re-treatment tomorrow morning (or today if you prefer!). Our senior technician will focus on the ${lowerMessage.includes('kitchen') ? 'kitchen' : 'affected areas'} and use our industrial-strength treatment. We WILL get this handled. Plus, I'm crediting you 50% off next month. Sound good? 🔧`
    }

    // Service quality concern - over-compensate
    if (lowerMessage.includes('late') || lowerMessage.includes('time') || lowerMessage.includes('rushed') || lowerMessage.includes('didn\'t') || lowerMessage.includes('unprofessional')) {
      return `${firstName}, I'm truly sorry about that experience. That's not the PestCtrl standard AT ALL. Here's what I'm doing: (1) Noting this in your file - guaranteed on-time service moving forward, (2) Giving you 30% off your next 2 months, (3) Assigning you our top-rated technician. We messed up, and I'm going to make it right. Fair? 🙏`
    }

    // Considering cancellation - find root cause
    if (lowerMessage.includes('cancel') || lowerMessage.includes('discontinue') || lowerMessage.includes('stop') || lowerMessage.includes('done')) {
      return `${firstName}, I'm really sorry to hear that! Before you go, can I ask what's driving this? Is it the service, the price, or something else? I might be able to fix it right now. And honestly, if we messed up, I want to know so we can improve. Would you give me 2 minutes to try to make it right? 💚`
    }

    // Default - proactive problem solving
    return `${firstName}, your satisfaction is EVERYTHING to us. If even the tiniest thing isn't perfect, tell me and I'll fix it immediately. We guarantee our work - you should NEVER see pests. Deal? 😊`
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
