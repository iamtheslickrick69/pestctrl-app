'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { IPhone16ProFrame } from './iPhone16ProFrame'
import { IOSMessagesInterface } from './iOSMessagesInterface'

export function InteractiveiPhoneDemo() {
  return (
    <div className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN - Value Proposition */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Where We Add Value
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our software allows for end to end sales management. We handle the entire sales process from start to finish with personalized and dynamic AI driven conversations.
              </p>
            </div>

            <div className="border-t border-border pt-8" />

            {/* Value Points */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-foreground">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-lg font-mono uppercase tracking-wider">Winback Cancelled Customers</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-lg font-mono uppercase tracking-wider">Overcome Objections</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-lg font-mono uppercase tracking-wider">Get Signatures on Agreements</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-lg font-mono uppercase tracking-wider">Collect Payment</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-lg font-mono uppercase tracking-wider">Get the Customer Scheduled</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="px-8 py-4 bg-primary text-background font-semibold text-lg rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                GET STARTED
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - iPhone Demo */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 rounded-[70px] blur-3xl opacity-50" />

              {/* iPhone Container - Increased height for better visibility */}
              <div
                className="relative overflow-hidden rounded-[60px] shadow-2xl"
                style={{
                  width: '393px',
                  height: '800px'
                }}
              >
                <IPhone16ProFrame>
                  <IOSMessagesInterface />
                </IPhone16ProFrame>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
