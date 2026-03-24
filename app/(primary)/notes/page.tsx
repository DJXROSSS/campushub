'use client'

import { useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import NotesHeader from '@/components/notes/NotesHeader'
import NotesFilters from '@/components/notes/NotesFilters'
import NotesList from '@/components/notes/NotesList'
import PostNoteModal from '@/components/notes/PostNoteModal'
import ReportNoteModal from '@/components/notes/ReportNoteModal'
import { mockNotes, reportReasons, subjects } from '@/components/notes/data'
import { Note, NoteType } from '@/components/notes/types'
import usePostNoteForm from '@/hooks/usePostNoteForm'

export default function NotesView() {
  const [activeTab, setActiveTab] = useState<NoteType>('official')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [showPostModal, setShowPostModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportNoteId, setReportNoteId] = useState<number | null>(null)
  const [notes, setNotes] = useState(mockNotes)
  const { form, updateField, resetForm } = usePostNoteForm()

  const filteredNotes = notes
    .filter((n) => n.type === activeTab)
    .filter((n) => selectedSubject === 'All Subjects' || n.subject === selectedSubject)
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
        if (userVote === 'up') upvotes--
        if (userVote === 'down') downvotes--
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
      title: form.title,
      subject: form.subject || 'Other',
      description: form.description,
      uploadedBy: 'You',
      date: 'Just now',
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      fileUrl: '#',
    }
    setNotes((prev) => [newNote, ...prev])
    setShowPostModal(false)
    setActiveTab('community')
    resetForm()
  }

  const openReport = (noteId: number) => {
    setReportNoteId(noteId)
    setShowReportModal(true)
  }

  const handleReport = (reason: string) => {
    console.log(`Reported note ${reportNoteId} for: ${reason}`)
    setShowReportModal(false)
    setReportNoteId(null)
  }

  return (
    <LayoutGroup>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NotesHeader onUploadClick={() => setShowPostModal(true)} />
          <NotesFilters
            activeTab={activeTab}
            selectedSubject={selectedSubject}
            subjects={subjects}
            searchQuery={searchQuery}
            onTabChange={setActiveTab}
            onSubjectChange={setSelectedSubject}
            onSearchChange={setSearchQuery}
          />
          <NotesList notes={filteredNotes} onVote={handleVote} onReport={openReport} />
        </motion.div>

        <PostNoteModal
          open={showPostModal}
          form={form}
          subjects={subjects}
          onClose={() => setShowPostModal(false)}
          onSubmit={handlePost}
          onFieldChange={updateField}
        />

        <ReportNoteModal
          open={showReportModal}
          reasons={reportReasons}
          onClose={() => setShowReportModal(false)}
          onReport={handleReport}
        />
      </div>
    </LayoutGroup>
  )
}
