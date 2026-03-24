'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useSession } from 'next-auth/react'
import { Search, ShoppingBag, FileText, ArrowRight } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const quickLinks = [
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

const recentActivity = [
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

export default function DashboardPage() {
  const { data: session } = useSession()
  const [userName, setUserName] = useState('there')

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name.split(' ')[0])
    } else {
      try {
        const stored = localStorage.getItem('campushub_user')
        if (stored) {
          const parsed = JSON.parse(stored)
          setUserName(parsed.name?.split(' ')[0] || 'there')
        }
      } catch {
        // ignore
      }
    }
  }, [session])

  return (
    <div>
      {/* Greeting */}
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

      {/* Quick Links */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Link href={link.href} className="group block">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <link.icon
                    size={20}
                    className="text-black dark:text-white"
                  />
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

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
          Recent Activity
        </h2>
        <div className="rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          {recentActivity.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-5 py-4 ${
                i < recentActivity.length - 1
                  ? 'border-b border-neutral-100 dark:border-neutral-800'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.type === 'buy-sell'
                      ? 'bg-neutral-800 dark:bg-neutral-200'
                      : item.type === 'notes'
                        ? 'bg-neutral-500'
                        : 'bg-neutral-400 dark:bg-neutral-500'
                  }`}
                />
                <span className="text-sm text-black dark:text-white">
                  {item.text}
                </span>
              </div>
              <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
