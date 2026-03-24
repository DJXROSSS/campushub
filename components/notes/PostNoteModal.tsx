import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Upload, X } from 'lucide-react'
import { UPLOAD_NOTES_LAYOUT_ID } from '@/components/notes/NotesHeader'
import { PostNoteForm } from '@/components/notes/types'

interface PostNoteModalProps {
  open: boolean
  form: PostNoteForm
  subjects: string[]
  onClose: () => void
  onSubmit: () => void
  onFieldChange: <K extends keyof PostNoteForm>(
    key: K,
    value: PostNoteForm[K]
  ) => void
}

export default function PostNoteModal({
  open,
  form,
  subjects,
  onClose,
  onSubmit,
  onFieldChange,
}: PostNoteModalProps) {
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
            layoutId={UPLOAD_NOTES_LAYOUT_ID}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Upload Community Notes
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => onFieldChange('title', e.target.value)}
                  placeholder="e.g., OS Unit 3 Handwritten Notes"
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={form.subject}
                    onChange={(e) => onFieldChange('subject', e.target.value)}
                    className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  >
                    <option value="" disabled>
                      Select subject
                    </option>
                    {subjects.slice(1).map((s) => (
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
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  File
                </label>
                <div className="flex h-28 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600">
                  <div className="flex flex-col items-center gap-1 text-neutral-400">
                    <Upload size={24} />
                    <span className="text-xs">Upload PDF, DOC, or images</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => onFieldChange('description', e.target.value)}
                  placeholder="Brief description of the notes..."
                  rows={3}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
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
                disabled={!form.title || !form.subject}
                className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Upload
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
