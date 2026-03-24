import { Plus } from 'lucide-react'
import { motion } from 'motion/react'

export const UPLOAD_NOTES_LAYOUT_ID = 'notes-upload-expandable-card'

interface NotesHeaderProps {
  onUploadClick: () => void
}

export default function NotesHeader({ onUploadClick }: NotesHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
          Notes
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Access official and community-contributed notes
        </p>
      </div>
      <motion.button
        layoutId={UPLOAD_NOTES_LAYOUT_ID}
        onClick={onUploadClick}
        className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        <Plus size={16} />
        Upload Notes
      </motion.button>
    </div>
  )
}
