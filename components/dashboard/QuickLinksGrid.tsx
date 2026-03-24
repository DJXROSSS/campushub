import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { QuickLinkItem } from '@/components/dashboard/dashboard-data'

interface QuickLinksGridProps {
  links: QuickLinkItem[]
}

export default function QuickLinksGrid({ links }: QuickLinksGridProps) {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link, i) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <Link href={link.href} className="group block">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <link.icon size={20} className="text-black dark:text-white" />
              </div>
              <h3 className="mb-1 text-base font-semibold text-black dark:text-white">
                {link.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {link.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-neutral-400 transition-colors group-hover:text-black dark:group-hover:text-white">
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
