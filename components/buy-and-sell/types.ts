export type Category = 'all' | 'stationery' | 'books' | 'tech' | 'other'

export interface Product {
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

export interface SellProductForm {
  title: string
  price: string
  category: Exclude<Category, 'all'>
  description: string
  whatsapp: string
}
