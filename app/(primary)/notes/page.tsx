'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Plus,
  X,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Download,
  FileText,
  ChevronDown,
  Upload,
} from 'lucide-react'

type NoteType = 'official' | 'community'

interface Note {
  id: number
  type: NoteType
  title: string
  subject: string
  description: string
  uploadedBy: string
  date: string
  upvotes: number
  downvotes: number
  userVote: 'up' | 'down' | null
  fileUrl: string
}

const subjects = [
  'All Subjects',
  'Data Structures',
  'Operating Systems',
  'DBMS',
  'Computer Networks',
  'Digital Logic',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Engineering Drawing',
  'Software Engineering',
]

const mockNotes: Note[] = [
  {
    id: 1,
    type: 'official',
    title: 'Unit 1 - Introduction to Data Structures',
    subject: 'Data Structures',
    description: 'Covers arrays, linked lists, stacks, and queues with implementation details.',
    uploadedBy: 'Prof. Sharma',
    date: '1 day ago',
    upvotes: 0,
    downvotes: 0,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 2,
    type: 'official',
    title: 'Process Management - Complete Notes',
    subject: 'Operating Systems',
    description: 'Process lifecycle, scheduling algorithms, inter-process communication.',
    uploadedBy: 'Prof. Gupta',
    date: '3 days ago',
    upvotes: 0,
    downvotes: 0,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 3,
    type: 'official',
    title: 'ER Model and Normalization',
    subject: 'DBMS',
    description: 'Entity-Relationship diagrams, 1NF to BCNF normalization with examples.',
    uploadedBy: 'Prof. Verma',
    date: '1 week ago',
    upvotes: 0,
    downvotes: 0,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 4,
    type: 'community',
    title: 'Short notes - Trees & BST (with diagrams)',
    subject: 'Data Structures',
    description: 'Handwritten notes with clear diagrams for binary trees, BST operations, AVL trees.',
    uploadedBy: 'Rahul K.',
    date: '2 days ago',
    upvotes: 24,
    downvotes: 2,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 5,
    type: 'community',
    title: 'OS Previous Year Solved Questions',
    subject: 'Operating Systems',
    description: 'Solved PYQs from 2020-2025 with step-by-step explanations.',
    uploadedBy: 'Priya M.',
    date: '4 days ago',
    upvotes: 45,
    downvotes: 1,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 6,
    type: 'community',
    title: 'SQL Cheat Sheet',
    subject: 'DBMS',
    description: 'Quick reference for all SQL commands, joins, subqueries, and aggregate functions.',
    uploadedBy: 'Aman S.',
    date: '5 days ago',
    upvotes: 31,
    downvotes: 3,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 7,
    type: 'community',
    title: 'Computer Networks - One Shot Notes',
    subject: 'Computer Networks',
    description: 'All 5 units covered in concise format. Great for last-minute revision.',
    uploadedBy: 'Dev P.',
    date: '1 week ago',
    upvotes: 52,
    downvotes: 5,
    userVote: null,
    fileUrl: '#',
  },
  {
    id: 8,
    type: 'community',
    title: 'Boolean Algebra Simplified',
    subject: 'Digital Logic',
    description: 'K-maps, Boolean expressions, minimization techniques with solved examples.',
    uploadedBy: 'Sneha R.',
    date: '1 week ago',
    upvotes: 18,
    downvotes: 0,
    userVote: null,
    fileUrl: '#',
  },
]

const reportReasons = [
  'Wrong subject',
  'Offensive content',
  'Obscene content',
  'Spam',
  'Copyright violation',
]

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<NoteType>('official')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [showPostModal, setShowPostModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportNoteId, setReportNoteId] = useState<number | null>(null)
  const [notes, setNotes] = useState(mockNotes)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formSubject, setFormSubject] = useState('')
  const [formDescription, setFormDescription] = useState('')

  const filteredNotes = notes
    .filter((n) => n.type === activeTab)
    .filter(
      (n) =>
        selectedSubject === 'All Subjects' || n.subject === selectedSubject
    )
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleVote = (noteId: number, vote: 'up' | 'down') => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n
        let { upvotes, downvotes, userVote } = n
        // Remove previous vote
        if (userVote === 'up') upvotes--
        if (userVote === 'down') downvotes--
        // Apply new vote (toggle if same)
        if (userVote === vote) {
          userVote = null
        } else {
          userVote = vote
          if (vote === 'up') upvotes++
          else downvotes++
        }
        return { ...n, upvotes, downvotes, userVote }
      })
    )
  }

  const handlePost = () => {
    const newNote: Note = {
      id: Date.now(),
      type: 'community',
      title: formTitle,
      subject: formSubject || 'Other',
      description: formDescription,
      uploadedBy: 'You',
      date: 'Just now',
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      fileUrl: '#',
    }
    setNotes([newNote, ...notes])
    setShowPostModal(false)
    setActiveTab('community')
    setFormTitle('')
    setFormSubject('')
    setFormDescription('')
  }

  const openReport = (noteId: number) => {
    setReportNoteId(noteId)
    setShowReportModal(true)
  }

  const handleReport = (reason: string) => {
    // In a real app, this would send to the backend
    console.log(`Reported note ${reportNoteId} for: ${reason}`)
    setShowReportModal(false)
    setReportNoteId(null)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
              Notes
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Access official and community-contributed notes
            </p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <Plus size={16} />
            Upload Notes
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex rounded-xl border border-neutral-200 p-1 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('official')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'official'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Official Notes
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'community'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Community Notes
            </button>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none sm:w-56 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
              />
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note, i) => (
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
                  {/* File icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <FileText
                      size={22}
                      className="text-neutral-600 dark:text-neutral-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
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

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    {note.type === 'community' && (
                      <>
                        {/* Upvote */}
                        <button
                          onClick={() => handleVote(note.id, 'up')}
                          className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                            note.userVote === 'up'
                              ? 'bg-black text-white dark:bg-white dark:text-black'
                              : 'text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={14} />
                          {note.upvotes}
                        </button>

                        {/* Downvote */}
                        <button
                          onClick={() => handleVote(note.id, 'down')}
                          className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                            note.userVote === 'down'
                              ? 'bg-black text-white dark:bg-white dark:text-black'
                              : 'text-neutral-400 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsDown size={14} />
                          {note.downvotes}
                        </button>

                        {/* Report */}
                        <button
                          onClick={() => openReport(note.id)}
                          className="rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                          title="Report"
                        >
                          <Flag size={14} />
                        </button>
                      </>
                    )}

                    {/* Download */}
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

        {filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText
              size={40}
              className="mb-4 text-neutral-300 dark:text-neutral-600"
            />
            <p className="text-neutral-500 dark:text-neutral-400">
              No notes found
            </p>
          </div>
        )}
      </motion.div>

      {/* Post Notes Modal */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Upload Community Notes
                </h2>
                <button
                  onClick={() => setShowPostModal(false)}
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
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
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
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
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

                {/* File upload */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    File
                  </label>
                  <div className="flex h-28 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600">
                    <div className="flex flex-col items-center gap-1 text-neutral-400">
                      <Upload size={24} />
                      <span className="text-xs">
                        Upload PDF, DOC, or images
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief description of the notes..."
                    rows={3}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!formTitle || !formSubject}
                  className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowReportModal(false)}
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
                  onClick={() => setShowReportModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                Select a reason for reporting:
              </p>
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReport(reason)}
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
    </div>
  )
}
