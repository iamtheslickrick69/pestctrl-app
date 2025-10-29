'use client'

import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  gradient: string
  delay?: number
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="p-6 border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-medium text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="mt-4 flex items-center text-sm">
        {trend === 'up' ? (
          <TrendingUp className="w-4 h-4 metric-positive mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 metric-negative mr-1" />
        )}
        <span className={cn(
          "font-medium",
          trend === 'up' ? "metric-positive" : "metric-negative"
        )}>
          {change}
        </span>
        <span className="text-muted-foreground ml-2">vs last period</span>
      </div>
    </Card>
  )
}
