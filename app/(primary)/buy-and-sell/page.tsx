'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Plus,
  X,
  ImageIcon,
  ChevronDown,
  MessageCircle,
} from 'lucide-react'

type Category = 'all' | 'stationery' | 'books' | 'tech' | 'other'

interface Product {
  id: number
  title: string
  price: number
  category: Exclude<Category, 'all'>
  description: string
  image: string
  sellerName: string
  whatsapp: string
  date: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Casio FX-991EX Calculator',
    price: 800,
    category: 'stationery',
    description: 'Used for 1 semester. Works perfectly, no scratches. Original box included.',
    image: '🔢',
    sellerName: 'Aman S.',
    whatsapp: '919876543210',
    date: '3 hours ago',
  },
  {
    id: 2,
    title: 'Data Structures by Cormen (CLRS)',
    price: 350,
    category: 'books',
    description: 'Hardcover, 3rd edition. Some highlights in the first few chapters. Great condition.',
    image: '📘',
    sellerName: 'Priya M.',
    whatsapp: '919876543211',
    date: '6 hours ago',
  },
  {
    id: 3,
    title: 'Logitech Wireless Mouse',
    price: 500,
    category: 'tech',
    description: 'M331 silent mouse. Battery lasts 12 months. Used for 3 months.',
    image: '🖱️',
    sellerName: 'Rahul K.',
    whatsapp: '919876543212',
    date: '1 day ago',
  },
  {
    id: 4,
    title: 'Engineering Drawing Kit',
    price: 200,
    category: 'stationery',
    description: 'Complete drawing set with compass, divider, rulers. Used for first year only.',
    image: '📐',
    sellerName: 'Dev P.',
    whatsapp: '919876543213',
    date: '1 day ago',
  },
  {
    id: 5,
    title: 'Operating Systems by Galvin',
    price: 250,
    category: 'books',
    description: '9th edition, paperback. Clean copy with no marks.',
    image: '📗',
    sellerName: 'Sneha R.',
    whatsapp: '919876543214',
    date: '2 days ago',
  },
  {
    id: 6,
    title: 'USB-C Hub 7-in-1',
    price: 1200,
    category: 'tech',
    description: 'Supports HDMI, USB 3.0, SD card. Used with MacBook for 4 months.',
    image: '🔌',
    sellerName: 'Kiran T.',
    whatsapp: '919876543215',
    date: '3 days ago',
  },
  {
    id: 7,
    title: 'Whiteboard Markers Set',
    price: 100,
    category: 'stationery',
    description: 'Pack of 10 assorted colors. Brand new, unopened.',
    image: '🖊️',
    sellerName: 'Meera J.',
    whatsapp: '919876543216',
    date: '3 days ago',
  },
  {
    id: 8,
    title: 'Raspberry Pi 4 (4GB)',
    price: 3500,
    category: 'tech',
    description: 'Comes with case, power supply, and 32GB SD card. Used for one project.',
    image: '🍓',
    sellerName: 'Arjun V.',
    whatsapp: '919876543217',
    date: '4 days ago',
  },
]

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Stationery', value: 'stationery' },
  { label: 'Books', value: 'books' },
  { label: 'Tech', value: 'tech' },
  { label: 'Other', value: 'other' },
]

export default function BuyAndSellPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState(mockProducts)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [formCategory, setFormCategory] = useState<Exclude<Category, 'all'>>('stationery')
  const [formDescription, setFormDescription] = useState('')
  const [formWhatsapp, setFormWhatsapp] = useState('')

  const filteredProducts = products
    .filter(
      (p) => activeCategory === 'all' || p.category === activeCategory
    )
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(),
      title: formTitle,
      price: Number(formPrice),
      category: formCategory,
      description: formDescription,
      image: '📦',
      sellerName: 'You',
      whatsapp: formWhatsapp.replace(/[^0-9]/g, ''),
      date: 'Just now',
    }
    setProducts([newProduct, ...products])
    setShowModal(false)
    setFormTitle('')
    setFormPrice('')
    setFormDescription('')
    setFormWhatsapp('')
  }

  const handleBuy = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp}`, '_blank')
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
              Buy & Sell
            </h1>
            <p className="mt-1 text-neutral-500 dark:text-neutral-400">
              Buy or sell second-hand items within your campus
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            <Plus size={16} />
            Sell an Item
          </button>
        </div>

        {/* Filters + Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-black dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
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

        {/* Products Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="group rounded-2xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                {/* Product Image */}
                <div className="flex h-40 items-center justify-center rounded-t-2xl bg-neutral-100 text-5xl dark:bg-neutral-800">
                  {product.image}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                      {product.category}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {product.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    {product.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-black dark:text-white">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-neutral-400">
                      by {product.sellerName}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBuy(product.whatsapp)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  >
                    <MessageCircle size={14} />
                    Contact on WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag
              size={40}
              className="mb-4 text-neutral-300 dark:text-neutral-600"
            />
            <p className="text-neutral-500 dark:text-neutral-400">
              No items found in this category
            </p>
          </div>
        )}
      </motion.div>

      {/* Sell Modal */}
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
                  Sell an Item
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image */}
                <div className="flex h-32 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600">
                  <div className="flex flex-col items-center gap-1 text-neutral-400">
                    <ImageIcon size={24} />
                    <span className="text-xs">Upload product image</span>
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
                    placeholder="e.g., Casio Scientific Calculator"
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={formCategory}
                        onChange={(e) =>
                          setFormCategory(
                            e.target.value as Exclude<Category, 'all'>
                          )
                        }
                        className="h-10 w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 pr-10 text-sm text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                      >
                        <option value="stationery">Stationery</option>
                        <option value="books">Books</option>
                        <option value="tech">Tech</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="e.g., 500"
                      className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe your item..."
                    rows={3}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black dark:text-white">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formWhatsapp}
                    onChange={(e) => setFormWhatsapp(e.target.value)}
                    placeholder="e.g., +91 98765 43210"
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
                  />
                </div>
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
                  disabled={!formTitle || !formPrice || !formWhatsapp}
                  className="flex-1 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Post for Sale
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ShoppingBag({ size, className }: { size: number; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
