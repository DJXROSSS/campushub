'use client'

import { useState } from 'react'
import { LayoutGroup, motion } from 'motion/react'
import BuyAndSellHeader from '@/components/buy-and-sell/BuyAndSellHeader'
import BuyAndSellFilters from '@/components/buy-and-sell/BuyAndSellFilters'
import ProductsGrid from '@/components/buy-and-sell/ProductsGrid'
import SellItemModal from '@/components/buy-and-sell/SellItemModal'
import { categories, mockProducts } from '@/components/buy-and-sell/data'
import { Category, Product } from '@/components/buy-and-sell/types'
import useSellProductForm from '@/hooks/useSellProductForm'

export default function BuyAndSellView() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState(mockProducts)
  const { form, updateField, resetForm } = useSellProductForm()

  const filteredProducts = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handleSubmit = () => {
    const newProduct: Product = {
      id: Date.now(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      image: '📦',
      sellerName: 'You',
      whatsapp: form.whatsapp.replace(/[^0-9]/g, ''),
      date: 'Just now',
    }
    setProducts((prev) => [newProduct, ...prev])
    setShowModal(false)
    resetForm()
  }

  const handleBuy = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp}`, '_blank')
  }

  return (
    <LayoutGroup>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BuyAndSellHeader onSellClick={() => setShowModal(true)} />
          <BuyAndSellFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <ProductsGrid products={filteredProducts} onContact={handleBuy} />
        </motion.div>

        <SellItemModal
          open={showModal}
          form={form}
          onClose={() => setShowModal(false)}
          onFieldChange={updateField}
          onSubmit={handleSubmit}
        />
      </div>
    </LayoutGroup>
  )
}
