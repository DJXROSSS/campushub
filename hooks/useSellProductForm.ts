import { useState } from 'react'
import { SellProductForm } from '@/components/buy-and-sell/types'

export default function useSellProductForm() {
  const [form, setForm] = useState<SellProductForm>({
    title: '',
    price: '',
    category: 'stationery',
    description: '',
    whatsapp: '',
  })

  const updateField = <K extends keyof SellProductForm>(
    key: K,
    value: SellProductForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm((prev) => ({
      ...prev,
      title: '',
      price: '',
      description: '',
      whatsapp: '',
    }))
  }

  return { form, updateField, resetForm }
}
