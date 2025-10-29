'use client'

import { DollarSign, MessageSquare, TrendingUp, Target, BarChart3, Users2 } from 'lucide-react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { MetricCard } from '@/components/dashboard/MetricCard'

export default function HomePage() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: 1278470,
      change: '+23.5%',
      trend: 'up' as const,
      icon: DollarSign,
      gradient: 'lime'
    },
    {
      title: 'Active Conversations',
      value: 342,
      change: '+12',
      trend: 'up' as const,
      icon: MessageSquare,
      gradient: 'lime'
    },
    {
      title: 'Conversion Rate',
      value: '5.2%',
      change: '+0.8%',
      trend: 'up' as const,
      icon: TrendingUp,
      gradient: 'lime'
    },
    {
      title: 'Customer LTV',
      value: '$3,845',
      change: '+15.3%',
      trend: 'up' as const,
      icon: Target,
      gradient: 'lime'
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-medium text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Revenue operations and performance metrics
          </p>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              {...metric}
            />
          ))}
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Analytics */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-medium text-foreground">Revenue Performance</h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly breakdown by revenue stream</p>
              </div>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-sm text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </div>
          </div>

          {/* Campaign Breakdown */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-medium text-foreground">Revenue Streams</h3>
              <div className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
                Q4 2024
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Upselling', value: '$452K', percentage: 35 },
                { name: 'Win-back', value: '$328K', percentage: 26 },
                { name: 'Collections', value: '$281K', percentage: 22 },
                { name: 'Retention', value: '$217K', percentage: 17 }
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-medium text-foreground">Activity Feed</h3>
              <p className="text-sm text-muted-foreground mt-1">Real-time conversation monitoring</p>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 rounded bg-muted">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-xs font-medium text-muted-foreground">Live</span>
            </div>
          </div>
          <div className="flex items-center justify-center h-[200px] border border-dashed border-border rounded-lg">
            <div className="text-center">
              <Users2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
              <p className="text-sm text-muted-foreground">Activity feed coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
