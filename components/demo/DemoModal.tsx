'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { IPhone16ProFrame } from './iPhone16ProFrame'
import { IOSMessagesInterface } from './iOSMessagesInterface'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

      {/* Modal Content */}
      <div
        className="relative z-10 flex flex-col items-center max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors group"
          aria-label="Close demo"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* iPhone Demo - Scaled to fit */}
        <div className="relative flex items-center justify-center">
          {/* Premium glow effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-[80px] opacity-40" />

          {/* iPhone Container - Scaled down to 65% */}
          <div
            className="relative scale-[0.65] origin-center"
            style={{
              width: '393px',
              height: '852px',
            }}
          >
            <IPhone16ProFrame>
              <IOSMessagesInterface />
            </IPhone16ProFrame>
          </div>
        </div>

        {/* Instructions */}
        <div className="-mt-32 text-center text-white/90 text-sm max-w-md px-4">
          <p className="font-medium">Click "Begin Demo" to start the conversation</p>
          <p className="mt-1 text-white/60 text-xs">Press ESC or click outside to close</p>
        </div>
      </div>
    </div>
  )
}
