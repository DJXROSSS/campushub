'use client'

import { useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import LostFoundHeader from '@/components/lost-and-found/LostFoundHeader'
import LostFoundFilters from '@/components/lost-and-found/LostFoundFilters'
import LostFoundGrid from '@/components/lost-and-found/LostFoundGrid'
import LostFoundModal from '@/components/lost-and-found/LostFoundModal'
import { mockItems } from '@/components/lost-and-found/data'
import { ItemType, LostFoundItem } from '@/components/lost-and-found/types'
import useLostFoundForm from '@/hooks/useLostFoundForm'

export default function LostAndFoundView() {
  const [activeTab, setActiveTab] = useState<ItemType>('found')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ItemType>('found')
  const [items, setItems] = useState(mockItems)
  const { form, updateField, resetForm } = useLostFoundForm()

  const filteredItems = items
    .filter((item) => item.type === activeTab)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const openModal = (type: ItemType) => {
    setModalType(type)
    resetForm()
    setShowModal(true)
  }

  const handleSubmit = () => {
    const newItem: LostFoundItem = {
      id: Date.now(),
      type: modalType,
      title: form.title,
      description: form.description,
      location: form.location || undefined,
      contact: form.contact || undefined,
      image: modalType === 'found' ? '📦' : '❓',
      postedBy: 'You',
      date: 'Just now',
    }
    setItems((prev) => [newItem, ...prev])
    setShowModal(false)
    setActiveTab(modalType)
  }

  return (
    <LayoutGroup>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LostFoundHeader onCreate={openModal} />
          <LostFoundFilters
            activeTab={activeTab}
            searchQuery={searchQuery}
            onTabChange={setActiveTab}
            onSearchChange={setSearchQuery}
          />
          <LostFoundGrid items={filteredItems} activeTab={activeTab} />
        </motion.div>

        <LostFoundModal
          open={showModal}
          modalType={modalType}
          form={form}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          onFieldChange={updateField}
        />
      </div>
    </LayoutGroup>
  )
}
