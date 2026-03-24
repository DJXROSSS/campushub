import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

interface ReportNoteModalProps {
  open: boolean
  reasons: string[]
  onClose: () => void
  onReport: (reason: string) => void
}

export default function ReportNoteModal({
  open,
  reasons,
  onClose,
  onReport,
}: ReportNoteModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Report Notes
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
              Select a reason for reporting:
            </p>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => onReport(reason)}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-left text-sm font-medium text-black transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
                >
                  {reason}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
