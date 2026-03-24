export type ItemType = 'found' | 'lost'

export interface LostFoundItem {
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

export interface LostFoundForm {
  title: string
  description: string
  location: string
  contact: string
}
