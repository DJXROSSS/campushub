import { LostFoundItem } from '@/components/lost-and-found/types'

export const mockItems: LostFoundItem[] = [
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
    contact: "Prof. Sharma's Office",
    image: '🔢',
    postedBy: 'Priya M.',
    date: '5 hours ago',
  },
  {
    id: 3,
    type: 'lost',
    title: 'Black Wireless Earbuds',
    description:
      'Lost my black JBL earbuds somewhere between the canteen and CS block. Has a small scratch on the case.',
    image: '🎧',
    postedBy: 'Rahul K.',
    date: '1 day ago',
  },
  {
    id: 4,
    type: 'found',
    title: 'Student ID Card',
    description:
      'Found a student ID card near parking area B. Name starts with "S".',
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
    description:
      'A4 sized spiral notebook with DS notes. Has my name on the first page. Very important for exams!',
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
