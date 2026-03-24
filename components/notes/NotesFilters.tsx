import { ChevronDown, Search } from 'lucide-react'
import AnimatedTabs from '@/components/forgeui/animated-tabs'
import { NoteType } from '@/components/notes/types'

interface NotesFiltersProps {
  activeTab: NoteType
  selectedSubject: string
  subjects: string[]
  searchQuery: string
  onTabChange: (tab: NoteType) => void
  onSubjectChange: (subject: string) => void
  onSearchChange: (value: string) => void
}

export default function NotesFilters({
  activeTab,
  selectedSubject,
  subjects,
  searchQuery,
  onTabChange,
  onSubjectChange,
  onSearchChange,
}: NotesFiltersProps) {
  const tabs = [
    { label: 'Official Notes', value: 'official' as const },
    { label: 'Community Notes', value: 'community' as const },
  ]

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <AnimatedTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="mx-0"
      />

      <div className="flex gap-3">
        <div className="relative">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="h-10 appearance-none rounded-xl border border-neutral-200 bg-white pl-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        </div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none sm:w-56 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>
    </div>
  )
}
