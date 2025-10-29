'use client'

import { ArrowRight, DollarSign, Users, TrendingUp, Target, Check, Zap } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { InteractiveiPhoneDemo } from '@/components/demo/InteractiveiPhoneDemo'

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-background" />
            </div>
            <span className="text-base font-medium">PestCtrl.ai</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <Link
              href="/"
              className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-background hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Same-day deployment • 25% commission vs 45%</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight">
            AI that makes your pest control business money
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Automate upsells, win-backs, collections, and retention.
            Deploy in minutes. Pay only when we generate revenue.
          </p>

          <div className="flex items-center justify-center space-x-4">
            <a
              href="#demo"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-primary text-background font-medium hover:bg-primary/90 transition-colors"
            >
              <span>Try the demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-md border border-border text-foreground font-medium hover:bg-accent transition-colors"
            >
              <span>See pricing</span>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-medium text-foreground mb-1">40%</div>
              <div className="text-sm text-muted-foreground">Response rate</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-foreground mb-1">5%</div>
              <div className="text-sm text-muted-foreground">Conversion rate</div>
            </div>
            <div>
              <div className="text-3xl font-medium text-foreground mb-1">25%</div>
              <div className="text-sm text-muted-foreground">Commission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 px-6 bg-muted/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-3">
              See it in action
            </h2>
            <p className="text-lg text-muted-foreground">
              Try our AI right now. Fully interactive iPhone demo.
            </p>
          </div>

          <InteractiveiPhoneDemo />
        </div>
      </section>

      {/* Four Revenue Streams */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-3">
              Four ways we make you money
            </h2>
            <p className="text-lg text-muted-foreground">
              Every conversation is designed to generate or protect revenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Upsell Current Customers',
                description: 'AI identifies and offers additional services at the perfect time. 15% conversion rate on seasonal treatments and premium add-ons.',
                metric: '+$468/customer/year'
              },
              {
                icon: Users,
                title: 'Win Back Lost Customers',
                description: 'Intelligent re-engagement campaigns that bring back 12% of dormant customers with personalized offers.',
                metric: '$5,400 per 100 customers'
              },
              {
                icon: DollarSign,
                title: 'Collections & Payments',
                description: 'Diplomatic payment recovery that maintains relationships. 70% recovery rate within 48 hours.',
                metric: '8-12% faster cash flow'
              },
              {
                icon: Target,
                title: 'Retention & Prevention',
                description: 'Proactive check-ins catch issues early. 25% reduction in cancellations through timely intervention.',
                metric: '$50K saved annually'
              }
            ].map((stream, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <stream.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {stream.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {stream.description}
                </p>
                <div className="text-sm font-medium text-primary">
                  {stream.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-muted/30 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-foreground mb-3">
              Simple, performance-based pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Pay only when we generate revenue. No setup fees, no monthly minimums.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                commission: '30%',
                revenue: '<$1M',
                features: [
                  'Up to 1,000 conversations/month',
                  'Choose 2 revenue streams',
                  'Basic analytics',
                  'Email support',
                  'Same-day deployment'
                ]
              },
              {
                name: 'Growth',
                commission: '27.5%',
                revenue: '$1M-$5M',
                features: [
                  'Up to 5,000 conversations/month',
                  'All 4 revenue streams',
                  'Advanced analytics',
                  'Priority support',
                  'CRM integration',
                  'Same-day deployment'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                commission: '25%',
                revenue: '$5M+',
                features: [
                  'Unlimited conversations',
                  'All 4 revenue streams',
                  'Custom AI training',
                  'Dedicated success manager',
                  'All integrations',
                  'SLA guarantee'
                ]
              }
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg border ${
                  tier.popular
                    ? 'border-primary bg-background shadow-lg scale-105'
                    : 'border-border bg-background'
                }`}
              >
                {tier.popular && (
                  <div className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium mb-4">
                    Most popular
                  </div>
                )}

                <h3 className="text-xl font-medium text-foreground mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Annual revenue {tier.revenue}
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-medium text-foreground">
                    {tier.commission}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    commission on generated revenue
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-2 rounded-md font-medium transition-colors ${
                  tier.popular
                    ? 'bg-primary text-background hover:bg-primary/90'
                    : 'border border-border text-foreground hover:bg-accent'
                }`}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-medium text-foreground mb-4">
            Deploy today. Earn tomorrow.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join pest control companies generating $10,000+ monthly in additional revenue
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-primary text-background font-medium hover:bg-primary/90 transition-colors">
              <span>Start free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-md border border-border text-foreground font-medium hover:bg-accent transition-colors">
              <span>Schedule demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div>© 2024 PestCtrl.ai. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
