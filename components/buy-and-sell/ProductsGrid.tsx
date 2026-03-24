import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { Product } from '@/components/buy-and-sell/types'

interface ProductsGridProps {
  products: Product[]
  onContact: (whatsapp: string) => void
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

export default function ProductsGrid({ products, onContact }: ProductsGridProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              className="group rounded-2xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div className="flex h-40 items-center justify-center rounded-t-2xl bg-neutral-100 text-5xl dark:bg-neutral-800">
                {product.image}
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {product.category}
                  </span>
                  <span className="text-xs text-neutral-400">{product.date}</span>
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
                  <span className="text-xs text-neutral-400">by {product.sellerName}</span>
                </div>

                <button
                  onClick={() => onContact(product.whatsapp)}
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

      {products.length === 0 && (
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
    </>
  )
}
