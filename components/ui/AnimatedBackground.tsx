'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // New concept: Flowing waves with subtle lime green accent
    const waves: Array<{
      y: number
      amplitude: number
      frequency: number
      speed: number
      phase: number
      opacity: number
    }> = []

    // Create multiple wave layers
    for (let i = 0; i < 4; i++) {
      waves.push({
        y: canvas.height * (0.3 + i * 0.2),
        amplitude: 40 + i * 15,
        frequency: 0.003 - i * 0.0005,
        speed: 0.0008 + i * 0.0002,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.015 - i * 0.003
      })
    }

    // Floating elements - organic shapes
    const floaters: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      pulse: number
      pulseSpeed: number
    }> = []

    for (let i = 0; i < 12; i++) {
      floaters.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: 3 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: 0.03 + Math.random() * 0.05,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02
      })
    }

    let time = 0
    let animationFrameId: number

    const animate = () => {
      time += 0.01
      const isDark = document.documentElement.classList.contains('dark')

      // Clear canvas
      ctx.fillStyle = isDark ? 'oklch(0.12 0 0)' : 'oklch(1 0 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw flowing waves
      waves.forEach((wave) => {
        wave.phase += wave.speed

        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
          ctx.lineTo(x, y)
        }

        // Create gradient for wave
        const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude)
        gradient.addColorStop(0, isDark
          ? `oklch(0.75 0.10 130 / 0)`
          : `oklch(0.75 0.08 130 / 0)`)
        gradient.addColorStop(0.5, isDark
          ? `oklch(0.75 0.10 130 / ${wave.opacity})`
          : `oklch(0.75 0.08 130 / ${wave.opacity})`)
        gradient.addColorStop(1, isDark
          ? `oklch(0.75 0.10 130 / 0)`
          : `oklch(0.75 0.08 130 / 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // Draw floating organic elements
      floaters.forEach((floater) => {
        // Update position
        floater.x += floater.vx
        floater.y += floater.vy

        // Wrap around edges
        if (floater.x < -20) floater.x = canvas.width + 20
        if (floater.x > canvas.width + 20) floater.x = -20
        if (floater.y < -20) floater.y = canvas.height + 20
        if (floater.y > canvas.height + 20) floater.y = -20

        // Update rotation
        floater.rotation += floater.rotationSpeed

        // Update pulse
        floater.pulse += floater.pulseSpeed
        const pulseScale = 1 + Math.sin(floater.pulse) * 0.3
        const currentSize = floater.size * pulseScale

        // Draw organic shape with glow
        const gradient = ctx.createRadialGradient(
          floater.x, floater.y, 0,
          floater.x, floater.y, currentSize * 3
        )
        gradient.addColorStop(0, isDark
          ? `oklch(0.75 0.12 130 / ${floater.opacity})`
          : `oklch(0.75 0.10 130 / ${floater.opacity * 0.8})`)
        gradient.addColorStop(0.5, isDark
          ? `oklch(0.75 0.10 130 / ${floater.opacity * 0.4})`
          : `oklch(0.75 0.08 130 / ${floater.opacity * 0.3})`)
        gradient.addColorStop(1, 'transparent')

        ctx.save()
        ctx.translate(floater.x, floater.y)
        ctx.rotate(floater.rotation)

        // Draw soft blob shape
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2
          const r = currentSize * (1 + Math.sin(angle * 3 + time) * 0.2)
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
