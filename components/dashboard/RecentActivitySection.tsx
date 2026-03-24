import { motion } from 'motion/react'
import {
  ActivityType,
  RecentActivityItem,
} from '@/components/dashboard/dashboard-data'

function getDotClass(type: ActivityType) {
  if (type === 'buy-sell') return 'bg-neutral-800 dark:bg-neutral-200'
  if (type === 'notes') return 'bg-neutral-500'
  return 'bg-neutral-400 dark:bg-neutral-500'
}

interface RecentActivitySectionProps {
  activity: RecentActivityItem[]
}

export default function RecentActivitySection({
  activity,
}: RecentActivitySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
        Recent Activity
      </h2>
      <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {activity.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center justify-between px-5 py-4 ${
              i < activity.length - 1
                ? 'border-b border-neutral-100 dark:border-neutral-800'
                : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${getDotClass(item.type)}`} />
              <span className="text-sm text-black dark:text-white">{item.text}</span>
            </div>
            <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
