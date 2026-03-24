import { Eye, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { ItemType } from '@/components/lost-and-found/types'

export const LOST_FOUND_LAYOUT_IDS: Record<ItemType, string> = {
  found: 'lost-found-expandable-found-card',
  lost: 'lost-found-expandable-lost-card',
}

interface LostFoundHeaderProps {
  onCreate: (type: ItemType) => void
}

export default function LostFoundHeader({ onCreate }: LostFoundHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Lost & Found
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Report or find lost items on campus
        </p>
      </div>
      <div className="flex gap-2">
        <motion.button
          layoutId={LOST_FOUND_LAYOUT_IDS.found}
          onClick={() => onCreate('found')}
          className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          <Plus size={16} />
          Post Found Item
        </motion.button>
        <motion.button
          layoutId={LOST_FOUND_LAYOUT_IDS.lost}
          onClick={() => onCreate('lost')}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
        >
          <Eye size={16} />
          Post Lost Request
        </motion.button>
      </div>
    </div>
  )
}
