'use client'

import { IPhone16ProFrame } from './iPhone16ProFrame'
import { IOSMessagesInterface } from './iOSMessagesInterface'

export function InteractiveiPhoneDemo() {
  return (
    <div className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero Title - Clean & Bold */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm font-medium mb-6 border border-primary/10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-foreground">Live Interactive Demo</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            See it in action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click <span className="font-bold text-primary">"Begin Demo"</span> to experience a real sales conversation
          </p>
        </div>

        {/* iPhone Demo - Perfectly Centered */}
        <div className="flex justify-center items-center mb-20">
          <div className="relative">
            {/* Premium glow effect */}
            <div className="absolute -inset-20 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-full blur-[120px] opacity-40" />

            {/* iPhone - Full size, no scaling issues */}
            <div className="relative" style={{
              width: '393px',
              height: '800px',
            }}>
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30 rounded-[60px] pointer-events-none z-10" />

              <IPhone16ProFrame>
                <IOSMessagesInterface />
              </IPhone16ProFrame>
            </div>
          </div>
        </div>

        {/* Bottom Stats - Minimal & Clean */}
        <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <div className="text-5xl font-bold text-foreground">40%</div>
            <div className="text-sm text-muted-foreground font-medium">Response Rate</div>
          </div>
          <div className="text-center space-y-3">
            <div className="text-5xl font-bold text-foreground">5%</div>
            <div className="text-sm text-muted-foreground font-medium">Conversion Rate</div>
          </div>
          <div className="text-center space-y-3">
            <div className="text-5xl font-bold text-foreground">25%</div>
            <div className="text-sm text-muted-foreground font-medium">Commission</div>
          </div>
        </div>

      </div>
    </div>
  )
}
