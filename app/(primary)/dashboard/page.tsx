'use client'

import { useSession } from 'next-auth/react'
import DashboardGreeting from '@/components/dashboard/DashboardGreeting'
import QuickLinksGrid from '@/components/dashboard/QuickLinksGrid'
import RecentActivitySection from '@/components/dashboard/RecentActivitySection'
import {
  quickLinks,
  recentActivity,
} from '@/components/dashboard/dashboard-data'
import useDashboardUser from '@/hooks/useDashboardUser'

export default function DashboardPage() {
  const { data: session } = useSession()
  const userName = useDashboardUser(session)

  return (
    <div>
      <DashboardGreeting userName={userName} />
      <QuickLinksGrid links={quickLinks} />
      <RecentActivitySection activity={recentActivity} />
    </div>
  )
}
