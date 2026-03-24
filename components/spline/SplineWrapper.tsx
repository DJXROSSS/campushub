'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const SplineBackground = dynamic(
  () => import('@/components/spline/SplineBackground'),
  { ssr: false }
)

const SPLINE_ROUTES = ['/', '/signin']

export default function SplineWrapper() {
  const pathname = usePathname()
  const showSpline = SPLINE_ROUTES.includes(pathname)

  if (!showSpline) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <SplineBackground />
    </div>
  )
}
