import { useState } from 'react'
import { LostFoundForm } from '@/components/lost-and-found/types'

export default function useLostFoundForm() {
  const [form, setForm] = useState<LostFoundForm>({
    title: '',
    description: '',
    location: '',
    contact: '',
  })

  const updateField = <K extends keyof LostFoundForm>(
    key: K,
    value: LostFoundForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm({ title: '', description: '', location: '', contact: '' })
  }

  return { form, updateField, resetForm }
}
