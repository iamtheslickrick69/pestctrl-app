'use client'

import { useState, useEffect } from 'react'
import { Phone, Mic, Volume2, Plus, Video, PhoneOff } from 'lucide-react'

type CallState = 'incoming' | 'active' | 'ended'

export function IOSPhoneInterface() {
  const [callState, setCallState] = useState<CallState>('incoming')
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (callState === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [callState])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = () => {
    setCallState('active')
  }

  const handleDecline = () => {
    setCallState('ended')
    setTimeout(() => {
      setCallState('incoming')
      setCallDuration(0)
    }, 3000)
  }

  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
        background: 'linear-gradient(to bottom, #1a1a1a 0%, #000000 100%)'
      }}
    >
      {/* Status bar */}
      <div className="h-[54px] flex items-center justify-between px-6 pt-3">
        <div className="text-[15px] font-semibold text-white">9:41</div>
        <div className="flex items-center space-x-1">
          <svg width="18" height="12" viewBox="0 0 18 12" className="fill-white">
            <path d="M0 0h4v12H0zM6 2h4v10H6zM12 4h4v8h-4z" opacity="0.4"/>
            <path d="M0 0h4v12H0zM6 2h4v10H6z"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" className="fill-white ml-1">
            <path d="M14.5 2c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5h-13C.7 10 0 9.3 0 8.5v-5C0 2.7.7 2 1.5 2h13zM1 3v6h13V3H1z"/>
            <rect x="1.5" y="3.5" width="11" height="5" rx="0.5"/>
          </svg>
          <div className="w-[27px] h-[13px] border-2 border-white rounded-[4px] flex items-center justify-end pr-[2px] ml-1">
            <div className="w-[18px] h-[9px] bg-white rounded-[2px]" />
          </div>
        </div>
      </div>

      {callState === 'incoming' && (
        <>
          {/* Incoming call content */}
          <div className="flex-1 flex flex-col items-center justify-start pt-20">
            <div className="text-[#8e8e93] text-[15px] mb-4">PestCtrl AI</div>

            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#86efac] to-[#22c55e] flex items-center justify-center text-white text-5xl font-medium mb-8 shadow-2xl">
              A
            </div>

            <div className="text-white text-[34px] font-semibold mb-2">Anna</div>
            <div className="text-[#8e8e93] text-[17px] mb-1">PestCtrl Customer Service</div>
            <div className="text-[#8e8e93] text-[15px]">calling...</div>
          </div>

          {/* Incoming call buttons */}
          <div className="pb-12 px-8 flex items-center justify-center space-x-24">
            {/* Decline */}
            <button
              onClick={handleDecline}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#ff3b30] flex items-center justify-center mb-2 shadow-lg">
                <PhoneOff className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-[13px]">Decline</span>
            </button>

            {/* Answer */}
            <button
              onClick={handleAnswer}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#34c759] flex items-center justify-center mb-2 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-[13px]">Accept</span>
            </button>
          </div>
        </>
      )}

      {callState === 'active' && (
        <>
          {/* Active call content */}
          <div className="flex-1 flex flex-col items-center justify-start pt-20">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#86efac] to-[#22c55e] flex items-center justify-center text-white text-5xl font-medium mb-8 shadow-2xl">
              A
            </div>

            <div className="text-white text-[34px] font-semibold mb-2">Anna</div>
            <div className="text-[#34c759] text-[17px] font-medium mb-8">{formatDuration(callDuration)}</div>

            {/* Simulated conversation text */}
            <div className="px-8 text-center space-y-3">
              {callDuration > 3 && (
                <div className="text-[#8e8e93] text-[15px] animate-fade-in">
                  "Hi! This is Anna from PestCtrl..."
                </div>
              )}
              {callDuration > 8 && (
                <div className="text-[#8e8e93] text-[15px] animate-fade-in">
                  "I'm calling about your quarterly treatment..."
                </div>
              )}
            </div>
          </div>

          {/* Active call controls */}
          <div className="pb-12 px-8">
            {/* Top row controls */}
            <div className="flex items-center justify-center space-x-12 mb-8">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${isMuted ? 'bg-white' : 'bg-[#2c2c2e]'}`}>
                  <Mic className={`w-6 h-6 ${isMuted ? 'text-black' : 'text-white'}`} />
                </div>
                <span className="text-white text-[12px]">mute</span>
              </button>

              <button className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 rounded-full bg-[#2c2c2e] flex items-center justify-center mb-2">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-[12px]">add call</span>
              </button>

              <button
                onClick={() => setIsSpeaker(!isSpeaker)}
                className="flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${isSpeaker ? 'bg-white' : 'bg-[#2c2c2e]'}`}>
                  <Volume2 className={`w-6 h-6 ${isSpeaker ? 'text-black' : 'text-white'}`} />
                </div>
                <span className="text-white text-[12px]">speaker</span>
              </button>
            </div>

            {/* End call button */}
            <div className="flex justify-center">
              <button
                onClick={handleDecline}
                className="w-20 h-20 rounded-full bg-[#ff3b30] flex items-center justify-center shadow-lg"
              >
                <PhoneOff className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </>
      )}

      {callState === 'ended' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#86efac] to-[#22c55e] flex items-center justify-center text-white text-5xl font-medium mb-8 shadow-2xl opacity-60">
            A
          </div>
          <div className="text-white text-[34px] font-semibold mb-2">Call Ended</div>
          <div className="text-[#8e8e93] text-[17px]">{formatDuration(callDuration)}</div>
        </div>
      )}
    </div>
  )
}
