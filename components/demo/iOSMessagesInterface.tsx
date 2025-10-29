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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Anna from PestCtrl. I noticed you haven't scheduled your quarterly treatment. We have an opening this Thursday at 2pm. Would that work for you?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      text: "Thursday works! What time again?",
      sender: 'user',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      text: "Perfect! 2pm on Thursday. Our technician will text you 30 minutes before arrival. Also, with mosquito season starting, would you like to add our mosquito barrier treatment? It's just $39/month and you'll see 90% fewer mosquitoes!",
      sender: 'ai',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '4',
      text: "How much is my regular service?",
      sender: 'user',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '5',
      text: "Your quarterly treatment is $89, same as always. With the mosquito barrier, your total would be $128/month. Most customers tell us the mosquito treatment pays for itself - no more expensive bug spray that doesn't even work!",
      sender: 'ai',
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Simulate AI typing and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      // AI responses based on context
      let aiResponse = "Great! I've scheduled your treatment for Thursday at 2pm. Our technician will text you 30 minutes before arrival. Is there anything specific you'd like us to focus on?"

      if (inputText.toLowerCase().includes('price') || inputText.toLowerCase().includes('cost')) {
        aiResponse = "Your quarterly treatment is $89, same as always. We also have a special on mosquito barrier treatment - add it for just $39. Would you like to include that?"
      } else if (inputText.toLowerCase().includes('mosquito')) {
        aiResponse = "Perfect! I've added mosquito barrier treatment to your Thursday appointment. Your new total is $128. You'll love the results - most customers see 90% fewer mosquitoes!"
      } else if (inputText.toLowerCase().includes('cancel') || inputText.toLowerCase().includes('no thanks')) {
        aiResponse = "I understand! No problem at all. When would be a better time for you? I have openings next week on Monday, Wednesday, and Friday."
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1500 + Math.random() * 1000)
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-black" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {/* Status bar */}
      <div className="h-[54px] bg-[#f6f6f6] flex items-center justify-between px-6 pt-3">
        <div className="text-[15px] font-semibold text-black">9:41</div>
        <div className="flex items-center space-x-1">
          <svg width="18" height="12" viewBox="0 0 18 12" className="dark:fill-white">
            <path d="M0 0h4v12H0zM6 2h4v10H6zM12 4h4v8h-4z" opacity="0.4"/>
            <path d="M0 0h4v12H0zM6 2h4v10H6z"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" className="dark:fill-white ml-1">
            <path d="M14.5 2c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5h-13C.7 10 0 9.3 0 8.5v-5C0 2.7.7 2 1.5 2h13zM1 3v6h13V3H1z"/>
            <rect x="1.5" y="3.5" width="11" height="5" rx="0.5"/>
          </svg>
          <div className="w-[27px] h-[13px] border-2 border-black dark:border-white rounded-[4px] flex items-center justify-end pr-[2px] ml-1">
            <div className="w-[18px] h-[9px] bg-black dark:bg-white rounded-[2px]" />
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
      <div className="flex-1 bg-white overflow-y-auto overflow-x-hidden px-4 py-3" style={{
        maxHeight: 'calc(100% - 142px)', // Account for header + status + input areas
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }
        `}</style>

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
            placeholder="Text Message"
            className="flex-1 bg-transparent text-[17px] text-black placeholder-[#8e8e93] outline-none py-2"
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
