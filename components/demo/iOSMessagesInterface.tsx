'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, Camera, CirclePlus } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export function IOSMessagesInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationStarted, setConversationStarted] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const startConversation = async () => {
    setConversationStarted(true)
    setIsTyping(true)

    try {
      // Use REAL AI engine via API - John Smith (Upsell demo customer)
      const response = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+15551234567', // John Smith - upsell demo
          message: 'START_UPSELL'
        })
      })

      const data = await response.json()

      if (data.success && data.messages && data.messages.length > 0) {
        // Get the AI's first message
        const aiMessages = data.messages.filter((m: any) => m.sender === 'ai')
        if (aiMessages.length > 0) {
          const lastAiMessage = aiMessages[aiMessages.length - 1]
          const firstMessage: Message = {
            id: lastAiMessage.id,
            text: lastAiMessage.text,
            sender: 'ai',
            timestamp: new Date(lastAiMessage.timestamp)
          }
          setMessages([firstMessage])
        }
      }
    } catch (error) {
      console.error('Failed to start conversation:', error)
      // Fallback message
      const firstMessage: Message = {
        id: '1',
        text: "Hi! I'm Anna from PestCtrl. I noticed you haven't scheduled your quarterly treatment. We have an opening this Thursday at 2pm. Would that work for you?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages([firstMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim()) return

    const messageToSend = inputText
    setInputText('')

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Show typing indicator
    setIsTyping(true)

    try {
      // Use REAL AI engine via API - John Smith (Upsell demo customer)
      const response = await fetch('/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+15551234567', // John Smith - upsell demo
          message: messageToSend
        })
      })

      const data = await response.json()

      if (data.success && data.messages && data.messages.length > 0) {
        // Get the latest AI message
        const aiMessages = data.messages.filter((m: any) => m.sender === 'ai')
        if (aiMessages.length > 0) {
          const lastAiMessage = aiMessages[aiMessages.length - 1]
          const aiMessage: Message = {
            id: lastAiMessage.id,
            text: lastAiMessage.text,
            sender: 'ai',
            timestamp: new Date(lastAiMessage.timestamp)
          }
          setMessages(prev => [...prev, aiMessage])
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      // Fallback response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand! Let me help you with that. Could you tell me more about what you're looking for?",
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-black" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {/* Status bar - accounts for Dynamic Island */}
      <div className="h-[59px] bg-[#f6f6f6] flex items-end justify-between px-6 pb-2">
        <div className="text-[15px] font-semibold text-black">9:41</div>
        <div className="flex items-center space-x-1">
          <svg width="18" height="12" viewBox="0 0 18 12" className="fill-black">
            <path d="M0 0h4v12H0zM6 2h4v10H6zM12 4h4v8h-4z" opacity="0.4"/>
            <path d="M0 0h4v12H0zM6 2h4v10H6z"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" className="fill-black ml-1">
            <path d="M14.5 2c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5h-13C.7 10 0 9.3 0 8.5v-5C0 2.7.7 2 1.5 2h13zM1 3v6h13V3H1z"/>
            <rect x="1.5" y="3.5" width="11" height="5" rx="0.5"/>
          </svg>
          <div className="w-[27px] h-[13px] border-2 border-black rounded-[4px] flex items-center justify-end pr-[2px] ml-1">
            <div className="w-[18px] h-[9px] bg-black rounded-[2px]" />
          </div>
        </div>
      </div>

      {/* Messages header */}
      <div className="h-[44px] bg-[#f6f6f6] border-b border-[#d1d1d6] flex items-center justify-between px-4">
        <ChevronLeft className="w-6 h-6 text-[#007AFF]" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#86efac] to-[#22c55e] flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div>
            <div className="text-[17px] font-semibold text-black">Anna - PestCtrl</div>
          </div>
        </div>
        <div className="w-6" />
      </div>

      {/* Messages area - Scrollable INSIDE the phone */}
      <div
        className="flex-1 bg-white overflow-y-auto overflow-x-hidden px-4 py-3"
        style={{
          maxHeight: 'calc(100% - 147px)', // Account for header (59+44) + input area (44)
          minHeight: 'calc(100% - 147px)',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          overscrollBehavior: 'contain', // Prevent parent scroll
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }
        `}</style>

        {/* Show "Begin Demo" button when conversation hasn't started */}
        {!conversationStarted && messages.length === 0 && !isTyping && (
          <div className="flex items-center justify-center h-full">
            <button
              onClick={startConversation}
              className="px-8 py-4 bg-[#007AFF] text-white font-semibold text-[17px] rounded-full shadow-lg hover:bg-[#0051D5] transition-all duration-300 active:scale-95"
            >
              Begin Demo
            </button>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[260px] px-4 py-2 rounded-[18px] ${
                message.sender === 'user'
                  ? 'bg-[#007AFF] text-white rounded-br-[4px]'
                  : 'bg-[#e5e5ea] text-black rounded-bl-[4px]'
              }`}
              style={{
                fontSize: '17px',
                lineHeight: '22px',
                letterSpacing: '-0.41px'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-2 flex justify-start">
            <div className="bg-[#e5e5ea] px-4 py-3 rounded-[18px] rounded-bl-[4px] flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#8e8e93] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#8e8e93] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#8e8e93] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-[#f6f6f6] border-t border-[#d1d1d6] px-2 py-2">
        <div className="bg-white rounded-[20px] border border-[#d1d1d6] flex items-center px-3 py-1">
          <CirclePlus className="w-6 h-6 text-[#8e8e93] mr-2" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={conversationStarted ? "Text Message" : "Click 'Begin Demo' to start"}
            disabled={!conversationStarted}
            className="flex-1 bg-transparent text-[17px] text-black placeholder-[#8e8e93] outline-none py-2 disabled:opacity-50"
            style={{ letterSpacing: '-0.41px' }}
          />
          {inputText.trim() ? (
            <button
              onClick={handleSend}
              className="ml-2 text-[#007AFF] font-semibold text-[17px]"
            >
              ↑
            </button>
          ) : (
            <Camera className="w-6 h-6 text-[#8e8e93] ml-2" />
          )}
        </div>
      </div>
    </div>
  )
}
