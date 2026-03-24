'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Logo } from '@/components/ui/logo'
import { ChevronDown } from 'lucide-react'

const courses = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Chemical',
  'Biotechnology',
  'Data Science',
  'AI & ML',
  'Other',
]

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function OnboardingPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')

  const handleContinue = () => {
    const userData = JSON.parse(
      localStorage.getItem('campushub_user') ||
        '{"name":"Demo User","email":"demo@college.edu","image":null}'
    )
    userData.name = name || userData.name
    userData.course = course
    userData.year = year
    userData.onboarded = true
    localStorage.setItem('campushub_user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  const handleSkip = () => {
    const userData = JSON.parse(
      localStorage.getItem('campushub_user') ||
        '{"name":"Demo User","email":"demo@college.edu","image":null}'
    )
    userData.onboarded = true
    localStorage.setItem('campushub_user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white/80 p-8 backdrop-blur-sm dark:bg-black/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            Set up your profile
          </h2>
          <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
            Tell us a bit about yourself so we can personalize your experience.
          </p>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-white"
              />
            </div>

            {/* Course */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                Course
              </label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                >
                  <option value="" disabled>
                    Select your course
                  </option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                Year
              </label>
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                >
                  <option value="" disabled>
                    Select your year
                  </option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleContinue}
              className="h-11 w-full rounded-xl bg-black text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Continue to Dashboard →
            </button>
            <button
              onClick={handleSkip}
              className="h-11 w-full rounded-xl text-sm font-medium text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
            >
              Skip for now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
