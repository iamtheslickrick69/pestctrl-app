'use client'

import { useEffect, useRef } from 'react'

interface LogoProps {
  size?: number
  className?: string
  showGlow?: boolean
}

export function Logo({ size = 32, className = '', showGlow = true }: LogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      })
    }
  }, [])

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* White glow background */}
      {showGlow && (
        <div
          className="absolute inset-0 bg-white rounded-full blur-xl opacity-40"
          style={{
            transform: 'scale(1.2)',
            zIndex: 0
          }}
        />
      )}

      {/* Circular video container */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          zIndex: 1
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scale(1.5)', // Zoom in to crop black edges
            transformOrigin: 'center'
          }}
        >
          <source src="/logo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
