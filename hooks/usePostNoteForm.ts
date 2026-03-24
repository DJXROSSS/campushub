import { useState } from 'react'
import { PostNoteForm } from '@/components/notes/types'

export default function usePostNoteForm() {
  const [form, setForm] = useState<PostNoteForm>({
    title: '',
    subject: '',
    description: '',
  })

  const updateField = <K extends keyof PostNoteForm>(
    key: K,
    value: PostNoteForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm({ title: '', subject: '', description: '' })
  }

  return { form, updateField, resetForm }
}
