'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { mockCustomers, Customer } from '@/lib/mockCustomers'
import { MessageSquare, TrendingUp, Users, DollarSign, Target, Send, Sparkles } from 'lucide-react'

interface Message {
  id: string
  sender: 'customer' | 'ai'
  text: string
  timestamp: Date
}

export default function ConversationsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalConversations: 0,
    conversions: 0,
    revenue: 0
  })

  const revenueStreamColors = {
    upsell: 'bg-green-500/10 text-green-600 border-green-500/20',
    winback: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    collections: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    retention: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  }

  const revenueStreamIcons = {
    upsell: TrendingUp,
    winback: Users,
    collections: DollarSign,
    retention: Target
  }

  const revenueStreamLabels = {
    upsell: 'Upsell',
    winback: 'Win-Back',
    collections: 'Collections',
    retention: 'Retention'
  }

  const startConversation = async (customer: Customer) => {
    setSelectedCustomer(customer)
    setLoading(true)

    try {
      // Start conversation with initial AI message
      const response = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer.phone,
          message: `START_${customer.revenueStream.toUpperCase()}`
        })
      })

      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)
        // Increment total conversations on first start
        setStats(prev => ({
          ...prev,
          totalConversations: prev.totalConversations + 1
        }))
      }
    } catch (error) {
      console.error('Error starting conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!selectedCustomer || !inputMessage.trim()) return

    setLoading(true)
    const userMessage = inputMessage
    setInputMessage('')

    try {
      const response = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: selectedCustomer.phone,
          message: userMessage
        })
      })

      const data = await response.json()
      if (data.success) {
        setMessages(data.messages)

        // Update stats if conversion happened
        if (data.converted) {
          setStats(prev => ({
            totalConversations: prev.totalConversations,
            conversions: prev.conversions + 1,
            revenue: prev.revenue + data.conversionValue
          }))
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground mb-2">AI Sales Conversations</h1>
          <p className="text-muted-foreground">
            Demonstrating all 4 revenue streams with intelligent AI responses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Conversations</span>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-medium text-foreground">{stats.totalConversations}</div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Conversions</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-medium text-foreground">{stats.conversions}</div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Revenue Generated</span>
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="text-3xl font-medium text-primary">${stats.revenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Main conversation interface */}
        <div className="grid grid-cols-[320px_1fr] gap-6">
          {/* Customer List */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 px-3">
              Select Customer to Demo
            </h2>

            {mockCustomers.map((customer) => {
              const Icon = revenueStreamIcons[customer.revenueStream]
              const isSelected = selectedCustomer?.id === customer.id

              return (
                <button
                  key={customer.id}
                  onClick={() => startConversation(customer)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-foreground text-sm">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.phone}</div>
                    </div>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs border ${revenueStreamColors[customer.revenueStream]}`}>
                    <span>{revenueStreamLabels[customer.revenueStream]}</span>
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {customer.notes}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Conversation View */}
          <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col h-[600px]">
            {selectedCustomer ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{selectedCustomer.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {revenueStreamLabels[selectedCustomer.revenueStream]} Campaign • ${selectedCustomer.monthlyValue}/mo
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-md text-xs font-medium border ${revenueStreamColors[selectedCustomer.revenueStream]}`}>
                      {revenueStreamLabels[selectedCustomer.revenueStream]}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          msg.sender === 'customer'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type customer's response..."
                      className="flex-1 px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={loading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading || !inputMessage.trim()}
                      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Simulating customer responses to demonstrate AI sales capability
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Select a customer to start a conversation demo</p>
                  <p className="text-xs mt-2">Try all 4 revenue streams!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
