// Mock Customer Database for MVP Demo

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  status: 'active' | 'inactive' | 'past_due' | 'cancelled'
  services: string[]
  monthlyValue: number
  lastService: string
  nextService: string
  balance: number
  revenueStream: 'upsell' | 'winback' | 'collections' | 'retention'
  notes: string
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+15551234567',
    email: 'john.smith@example.com',
    status: 'active',
    services: ['General Pest Control'],
    monthlyValue: 89,
    lastService: '2024-10-15',
    nextService: '2024-11-15',
    balance: 0,
    revenueStream: 'upsell',
    notes: 'Good candidate for mosquito treatment upsell - has large backyard'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+15559876543',
    email: 'sarah.j@example.com',
    status: 'inactive',
    services: ['General Pest Control', 'Termite Inspection'],
    monthlyValue: 0,
    lastService: '2024-04-10',
    nextService: '',
    balance: 0,
    revenueStream: 'winback',
    notes: 'Cancelled 6 months ago due to pricing - good win-back candidate'
  },
  {
    id: '3',
    name: 'Mark Davis',
    phone: '+15555551234',
    email: 'mark.davis@example.com',
    status: 'past_due',
    services: ['General Pest Control', 'Mosquito Barrier'],
    monthlyValue: 128,
    lastService: '2024-10-01',
    nextService: '2024-11-01',
    balance: 256,
    revenueStream: 'collections',
    notes: 'Payment failed last 2 months - card likely expired'
  },
  {
    id: '4',
    name: 'Jennifer Martinez',
    phone: '+15554443333',
    email: 'jennifer.m@example.com',
    status: 'active',
    services: ['General Pest Control'],
    monthlyValue: 89,
    lastService: '2024-10-28',
    nextService: '2024-11-28',
    balance: 0,
    revenueStream: 'retention',
    notes: 'Recent service had issues - ants still visible in kitchen'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    phone: '+15556667777',
    email: 'rob.wilson@example.com',
    status: 'active',
    services: ['General Pest Control'],
    monthlyValue: 89,
    lastService: '2024-10-10',
    nextService: '2024-11-10',
    balance: 0,
    revenueStream: 'upsell',
    notes: 'Spring season - perfect for mosquito barrier upsell'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    phone: '+15558889999',
    email: 'lisa.a@example.com',
    status: 'cancelled',
    services: ['General Pest Control'],
    monthlyValue: 0,
    lastService: '2024-01-15',
    nextService: '',
    balance: 0,
    revenueStream: 'winback',
    notes: 'Cancelled 9 months ago - pest issue resolved. Good re-engagement candidate'
  },
  {
    id: '7',
    name: 'David Brown',
    phone: '+15552221111',
    email: 'david.b@example.com',
    status: 'past_due',
    services: ['General Pest Control', 'Termite Protection'],
    monthlyValue: 145,
    lastService: '2024-09-20',
    nextService: '2024-10-20',
    balance: 145,
    revenueStream: 'collections',
    notes: 'First missed payment - probably just needs reminder'
  },
  {
    id: '8',
    name: 'Emily Taylor',
    phone: '+15553334444',
    email: 'emily.t@example.com',
    status: 'active',
    services: ['General Pest Control', 'Rodent Control'],
    monthlyValue: 135,
    lastService: '2024-10-25',
    nextService: '2024-11-25',
    balance: 0,
    revenueStream: 'retention',
    notes: 'Recent complaint about service time - follow up needed'
  }
]

export function getCustomerByPhone(phone: string): Customer | undefined {
  return mockCustomers.find(c => c.phone === phone)
}

export function getCustomersByRevenueStream(stream: Customer['revenueStream']): Customer[] {
  return mockCustomers.filter(c => c.revenueStream === stream)
}
