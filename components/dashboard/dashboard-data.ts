import { FileText, Search, ShoppingBag } from 'lucide-react'

export type ActivityType = 'buy-sell' | 'notes' | 'lost-found'

export interface QuickLinkItem {
  title: string
  description: string
  href: string
  icon: typeof Search
}

export interface RecentActivityItem {
  id: number
  text: string
  time: string
  type: ActivityType
}

export const quickLinks: QuickLinkItem[] = [
  {
    title: 'Lost & Found',
    description: 'Report or find lost items on campus',
    href: '/lost-and-found',
    icon: Search,
  },
  {
    title: 'Buy & Sell',
    description: 'Buy or sell second-hand items',
    href: '/buy-and-sell',
    icon: ShoppingBag,
  },
  {
    title: 'Notes',
    description: 'Access official and community notes',
    href: '/notes',
    icon: FileText,
  },
]

export const recentActivity: RecentActivityItem[] = [
  {
    id: 1,
    text: 'New calculator listed in Buy & Sell',
    time: '2 hours ago',
    type: 'buy-sell',
  },
  {
    id: 2,
    text: 'Data Structures notes uploaded by Rahul K.',
    time: '4 hours ago',
    type: 'notes',
  },
  {
    id: 3,
    text: 'Found: Blue water bottle near Library',
    time: '5 hours ago',
    type: 'lost-found',
  },
  {
    id: 4,
    text: 'Official OS notes published by Prof. Sharma',
    time: '1 day ago',
    type: 'notes',
  },
  {
    id: 5,
    text: 'Lost: Black earbuds near Canteen',
    time: '1 day ago',
    type: 'lost-found',
  },
]
