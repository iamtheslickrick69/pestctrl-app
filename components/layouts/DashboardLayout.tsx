'use client'

import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import Sidebar from './Sidebar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={cn("transition-all", sidebarCollapsed ? "pl-0" : "pl-[240px]")}>
        {/* Header */}
        <header className="h-14 border-b border-border bg-background sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="text-sm text-muted-foreground">
            Dashboard
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
