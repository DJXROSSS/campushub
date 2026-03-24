import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ImageIcon, X } from 'lucide-react'
import { SellProductForm } from '@/components/buy-and-sell/types'
import { SELL_ITEM_LAYOUT_ID } from '@/components/buy-and-sell/BuyAndSellHeader'

interface SellItemModalProps {
  open: boolean
  form: SellProductForm
  onClose: () => void
  onFieldChange: <K extends keyof SellProductForm>(
    key: K,
    value: SellProductForm[K]
  ) => void
  onSubmit: () => void
}

export default function SellItemModal({
  open,
  form,
  onClose,
  onFieldChange,
  onSubmit,
}: SellItemModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            layoutId={SELL_ITEM_LAYOUT_ID}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Sell an Item
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600">
                <div className="flex flex-col items-center gap-1 text-neutral-400">
                  <ImageIcon size={24} />
                  <span className="text-xs">Upload product image</span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => onFieldChange('title', e.target.value)}
                  placeholder="e.g., Casio Scientific Calculator"
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) =>
                        onFieldChange(
                          'category',
                          e.target.value as SellProductForm['category']
                        )
                      }
                      className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                    >
                      <option value="stationery">Stationery</option>
                      <option value="books">Books</option>
                      <option value="tech">Tech</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => onFieldChange('price', e.target.value)}
                    placeholder="e.g., 500"
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => onFieldChange('description', e.target.value)}
                  placeholder="Describe your item..."
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => onFieldChange('whatsapp', e.target.value)}
                  placeholder="e.g., +91 98765 43210"
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!form.title || !form.price || !form.whatsapp}
                className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Post for Sale
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
