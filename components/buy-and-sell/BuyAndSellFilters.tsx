import { Search } from 'lucide-react'
import AnimatedTabs from '@/components/forgeui/animated-tabs'
import { Category } from '@/components/buy-and-sell/types'

interface BuyAndSellFiltersProps {
  categories: { label: string; value: Category }[]
  activeCategory: Category
  onCategoryChange: (category: Category) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function BuyAndSellFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BuyAndSellFiltersProps) {
  const tabItems = categories.map((cat) => ({
    label: cat.label,
    value: cat.value,
  }))

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <AnimatedTabs
        tabs={tabItems}
        activeTab={activeCategory}
        onTabChange={onCategoryChange}
        className="mx-0"
      />
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none sm:w-64 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
        />
      </div>
    </div>
  )
}
