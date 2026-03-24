import { AnimatePresence, motion } from 'motion/react'
import { ImageIcon, X } from 'lucide-react'
import { LOST_FOUND_LAYOUT_IDS } from '@/components/lost-and-found/LostFoundHeader'
import { ItemType, LostFoundForm } from '@/components/lost-and-found/types'

interface LostFoundModalProps {
  open: boolean
  modalType: ItemType
  form: LostFoundForm
  onClose: () => void
  onSubmit: () => void
  onFieldChange: <K extends keyof LostFoundForm>(
    key: K,
    value: LostFoundForm[K]
  ) => void
}

export default function LostFoundModal({
  open,
  modalType,
  form,
  onClose,
  onSubmit,
  onFieldChange,
}: LostFoundModalProps) {
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
            layoutId={LOST_FOUND_LAYOUT_IDS[modalType]}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {modalType === 'found' ? 'Post a Found Item' : 'Post a Lost Request'}
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
                  <span className="text-xs">
                    {modalType === 'found' ? 'Upload image' : 'Upload image (optional)'}
                  </span>
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
                  placeholder="e.g., Blue water bottle"
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => onFieldChange('description', e.target.value)}
                  placeholder="Describe the item in detail..."
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              {modalType === 'found' && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                      Location Found
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => onFieldChange('location', e.target.value)}
                      placeholder="e.g., Main Library"
                      className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                      Where to Collect
                    </label>
                    <input
                      type="text"
                      value={form.contact}
                      onChange={(e) => onFieldChange('contact', e.target.value)}
                      placeholder="e.g., Room 204, Admin Block"
                      className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                    />
                  </div>
                </>
              )}
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
                disabled={!form.title || !form.description}
                className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Post
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
