import { AnimatePresence, motion } from 'motion/react'
import { MapPin, Phone, Search } from 'lucide-react'
import { ItemType, LostFoundItem } from '@/components/lost-and-found/types'

interface LostFoundGridProps {
  items: LostFoundItem[]
  activeTab: ItemType
}

export default function LostFoundGrid({ items, activeTab }: LostFoundGridProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-4 flex h-20 w-full items-center justify-center rounded-xl bg-neutral-100 text-4xl dark:bg-neutral-800">
                {item.image}
              </div>

              <div className="mb-1 flex items-center justify-between">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    item.type === 'found'
                      ? 'bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
                      : 'border border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {item.type === 'found' ? 'Found' : 'Lost'}
                </span>
                <span className="text-xs text-neutral-400">{item.date}</span>
              </div>

              <h3 className="mt-2 text-base font-semibold text-black dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                {item.description}
              </p>

              {item.location && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <MapPin size={12} />
                  {item.location}
                </div>
              )}

              {item.contact && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <Phone size={12} />
                  {item.contact}
                </div>
              )}

              <div className="mt-3 border-t border-neutral-100 pt-3 text-xs text-neutral-400 dark:border-neutral-800">
                Posted by {item.postedBy}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search size={40} className="mb-4 text-neutral-300 dark:text-neutral-600" />
          <p className="text-neutral-500 dark:text-neutral-400">
            No {activeTab} items found
          </p>
        </div>
      )}
    </>
  )
}
