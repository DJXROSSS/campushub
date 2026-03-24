export type NoteType = 'official' | 'community'

export interface Note {
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

export interface PostNoteForm {
  title: string
  subject: string
  description: string
}
