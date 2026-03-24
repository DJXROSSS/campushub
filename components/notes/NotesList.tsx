import { AnimatePresence, motion } from 'motion/react'
import {
  Download,
  FileText,
  Flag,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import { Note } from '@/components/notes/types'

interface NotesListProps {
  notes: Note[]
  onVote: (noteId: number, vote: 'up' | 'down') => void
  onReport: (noteId: number) => void
}

export default function NotesList({ notes, onVote, onReport }: NotesListProps) {
  return (
    <>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <FileText
                    size={22}
                    className="text-neutral-600 dark:text-neutral-300"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-black dark:text-white">
                      {note.title}
                    </h3>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                      {note.subject}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {note.description}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                    <span>by {note.uploadedBy}</span>
                    <span>·</span>
                    <span>{note.date}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {note.type === 'community' && (
                    <>
                      <button
                        onClick={() => onVote(note.id, 'up')}
                        className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                          note.userVote === 'up'
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white'
                        }`}
                      >
                        <ThumbsUp size={14} />
                        {note.upvotes}
                      </button>

                      <button
                        onClick={() => onVote(note.id, 'down')}
                        className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                          note.userVote === 'down'
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white'
                        }`}
                      >
                        <ThumbsDown size={14} />
                        {note.downvotes}
                      </button>

                      <button
                        onClick={() => onReport(note.id)}
                        className="rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                        title="Report"
                      >
                        <Flag size={14} />
                      </button>
                    </>
                  )}

                  <a
                    href={note.fileUrl}
                    className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                    title="Download"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText size={40} className="mb-4 text-neutral-300 dark:text-neutral-600" />
          <p className="text-neutral-500 dark:text-neutral-400">No notes found</p>
        </div>
      )}
    </>
  )
}
