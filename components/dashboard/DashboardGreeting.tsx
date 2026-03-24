import { motion } from 'motion/react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface DashboardGreetingProps {
  userName: string
}

export default function DashboardGreeting({ userName }: DashboardGreetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-10"
    >
      <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
        {getGreeting()}, {userName}!
      </h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">
        Here&apos;s what&apos;s happening on campus today.
      </p>
    </motion.div>
  )
}
