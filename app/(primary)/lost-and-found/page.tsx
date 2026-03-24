'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Plus,
  MapPin,
  Phone,
  X,
  ImageIcon,
  Eye,
} from 'lucide-react'

type ItemType = 'found' | 'lost'

interface LostFoundItem {
  id: number
  type: ItemType
  title: string
  description: string
  location?: string
  contact?: string
  image?: string
  postedBy: string
  date: string
}

const mockItems: LostFoundItem[] = [
  {
    id: 1,
    type: 'found',
    title: 'Blue Water Bottle',
    description: 'Found near the main library entrance. Steel bottle with stickers.',
    location: 'Main Library',
    contact: 'Room 204, Admin Block',
    image: '💧',
    postedBy: 'Aman S.',
    date: '2 hours ago',
  },
  {
    id: 2,
    type: 'found',
    title: 'Scientific Calculator',
    description: 'Casio FX-991EX found in Lecture Hall 3 after the morning session.',
    location: 'Lecture Hall 3',
    contact: 'Prof. Sharma\'s Office',
    image: '🔢',
    postedBy: 'Priya M.',
    date: '5 hours ago',
  },
  {
    id: 3,
    type: 'lost',
    title: 'Black Wireless Earbuds',
    description: 'Lost my black JBL earbuds somewhere between the canteen and CS block. Has a small scratch on the case.',
    image: '🎧',
    postedBy: 'Rahul K.',
    date: '1 day ago',
  },
  {
    id: 4,
    type: 'found',
    title: 'Student ID Card',
    description: 'Found a student ID card near parking area B. Name starts with "S".',
    location: 'Parking B',
    contact: 'Security Office',
    image: '🪪',
    postedBy: 'Security Dept.',
    date: '1 day ago',
  },
  {
    id: 5,
    type: 'lost',
    title: 'Notebook - Data Structures',
    description: 'A4 sized spiral notebook with DS notes. Has my name on the first page. Very important for exams!',
    image: '📓',
    postedBy: 'Sneha R.',
    date: '2 days ago',
  },
  {
    id: 6,
    type: 'found',
    title: 'Umbrella',
    description: 'Black folding umbrella found at the bus stop inside campus.',
    location: 'Campus Bus Stop',
    contact: 'Admin Office',
    image: '☂️',
    postedBy: 'Dev P.',
    date: '3 days ago',
  },
]

export default function LostAndFoundPage() {
  const [activeTab, setActiveTab] = useState<ItemType>('found')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ItemType>('found')
  const [items, setItems] = useState(mockItems)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formContact, setFormContact] = useState('')

  const filteredItems = items
    .filter((item) => item.type === activeTab)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const openModal = (type: ItemType) => {
    setModalType(type)
    setFormTitle('')
    setFormDescription('')
    setFormLocation('')
    setFormContact('')
    setShowModal(true)
  }

  const handleSubmit = () => {
    const newItem: LostFoundItem = {
      id: Date.now(),
      type: modalType,
      title: formTitle,
      description: formDescription,
      location: formLocation || undefined,
      contact: formContact || undefined,
      image: modalType === 'found' ? '📦' : '❓',
      postedBy: 'You',
      date: 'Just now',
    }
    setItems([newItem, ...items])
    setShowModal(false)
    setActiveTab(modalType)
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
              Lost & Found
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Report or find lost items on campus
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => openModal('found')}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <Plus size={16} />
              Post Found Item
            </button>
            <button
              onClick={() => openModal('lost')}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900"
            >
              <Eye size={16} />
              Post Lost Request
            </button>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex rounded-xl border border-neutral-200 p-1 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('found')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'found'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Found Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'lost'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Lost Requests
            </button>
          </div>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none sm:w-64 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                {/* Emoji as image placeholder */}
                <div className="mb-4 flex h-20 w-full items-center justify-center rounded-xl bg-neutral-100 text-4xl dark:bg-neutral-800">
                  {item.image}
                </div>

                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      item.type === 'found'
                        ? 'bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'
                        : 'border border-neutral-300 text-neutral-600 dark:border-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {item.type === 'found' ? 'Found' : 'Lost'}
                  </span>
                  <span className="text-xs text-neutral-400">{item.date}</span>
                </div>

                <h3 className="mt-2 text-base font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>

                {item.location && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <MapPin size={12} />
                    {item.location}
                  </div>
                )}

                {item.contact && (
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <Phone size={12} />
                    {item.contact}
                  </div>
                )}

                <div className="mt-3 border-t border-neutral-100 pt-3 text-xs text-neutral-400 dark:border-neutral-800">
                  Posted by {item.postedBy}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search
              size={40}
              className="mb-4 text-neutral-300 dark:text-neutral-600"
            />
            <p className="text-neutral-500 dark:text-neutral-400">
              No {activeTab} items found
            </p>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
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
                  {modalType === 'found'
                    ? 'Post a Found Item'
                    : 'Post a Lost Request'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image placeholder */}
                <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600">
                  <div className="flex flex-col items-center gap-1 text-neutral-400">
                    <ImageIcon size={24} />
                    <span className="text-xs">
                      {modalType === 'found'
                        ? 'Upload image'
                        : 'Upload image (optional)'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Blue water bottle"
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the item in detail..."
                    rows={3}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>

                {modalType === 'found' && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                        Location Found
                      </label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="e.g., Main Library"
                        className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                        Where to Collect
                      </label>
                      <input
                        type="text"
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                        placeholder="e.g., Room 204, Admin Block"
                        className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formTitle || !formDescription}
                  className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
