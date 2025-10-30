'use client'

import { useEffect, useRef, useState } from 'react'

interface LoopingOrbProps {
  size?: number
  className?: string
}

export function LoopingOrb({ size = 160, className = '' }: LoopingOrbProps) {
  const forwardVideoRef = useRef<HTMLVideoElement>(null)
  const reverseVideoRef = useRef<HTMLVideoElement>(null)
  const [isReverse, setIsReverse] = useState(false)

  useEffect(() => {
    const forwardVideo = forwardVideoRef.current
    const reverseVideo = reverseVideoRef.current
    if (!forwardVideo || !reverseVideo) return

    const handleForwardEnded = () => {
      setIsReverse(true)
      reverseVideo.currentTime = 0
      reverseVideo.play().catch(() => {})
    }

    const handleReverseEnded = () => {
      setIsReverse(false)
      forwardVideo.currentTime = 0
      forwardVideo.play().catch(() => {})
    }

    forwardVideo.addEventListener('ended', handleForwardEnded)
    reverseVideo.addEventListener('ended', handleReverseEnded)

    // Start with forward video
    forwardVideo.play().catch(() => {})

    return () => {
      forwardVideo.removeEventListener('ended', handleForwardEnded)
      reverseVideo.removeEventListener('ended', handleReverseEnded)
    }
  }, [])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="rounded-full overflow-hidden relative" style={{ width: size, height: size }}>
        {/* Forward video */}
        <video
          ref={forwardVideoRef}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover scale-150 transition-opacity duration-300 ${isReverse ? 'opacity-0' : 'opacity-100'}`}
          style={{
            mixBlendMode: 'screen',
            filter: 'brightness(1.2) contrast(1.1)'
          }}
        >
          <source src="/newicon.mp4" type="video/mp4" />
        </video>

        {/* Reverse video */}
        <video
          ref={reverseVideoRef}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover scale-150 transition-opacity duration-300 ${isReverse ? 'opacity-100' : 'opacity-0'}`}
          style={{
            mixBlendMode: 'screen',
            filter: 'brightness(1.2) contrast(1.1)'
          }}
        >
          <source src="/newicon-reverse.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
