import { Database } from './supabase'

export type User = Database['public']['Tables']['users']['Row']
export type Mess = Database['public']['Tables']['messes']['Row']
export type Menu = Database['public']['Tables']['menus']['Row']
export type Dish = Database['public']['Tables']['dishes']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Availability = Database['public']['Tables']['availability']['Row']

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'rahul@example.com',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    role: 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'owner-1',
    email: 'shreemess@example.com',
    name: 'Priya Patel',
    phone: '+91 98765 43211',
    role: 'owner',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockMesses: Mess[] = [
  {
    id: 'mess-1',
    owner_id: 'owner-1',
    name: 'Shree Home Mess',
    description: 'Authentic home-style vegetarian meals prepared fresh daily. Specializing in North Indian cuisine with generous portions and homely taste.',
    address: '123, College Road, Near Central Library, Pune',
    latitude: 18.5204,
    longitude: 73.8567,
    phone: '+91 98765 43211',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    rating: 4.6,
    review_count: 128,
    is_vegetarian: true,
    facilities: ['Home-style food', 'Vegetarian options', 'Seating available', 'Takeaway', 'UPI accepted'],
    meal_types: ['lunch', 'dinner'],
    lunch_capacity: 50,
    dinner_capacity: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mess-2',
    owner_id: 'owner-2',
    name: 'Maa Kitchen',
    description: 'Homely non-vegetarian and vegetarian meals. Known for authentic flavors and hygiene.',
    address: '45, PG Area, FC Road, Pune',
    latitude: 18.5294,
    longitude: 73.8495,
    phone: '+91 98765 43212',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    rating: 4.4,
    review_count: 89,
    is_vegetarian: false,
    facilities: ['Non-vegetarian', 'Vegetarian options', 'Home delivery', 'UPI accepted'],
    meal_types: ['breakfast', 'lunch', 'dinner'],
    lunch_capacity: 40,
    dinner_capacity: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mess-3',
    owner_id: 'owner-3',
    name: 'Ghar Ka Khana',
    description: 'Simple, wholesome vegetarian meals at student-friendly prices. Clean and hygienic environment.',
    address: '78, Hostel Lane, Viman Nagar, Pune',
    latitude: 18.5590,
    longitude: 73.9160,
    phone: '+91 98765 43213',
    image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
    rating: 4.2,
    review_count: 156,
    is_vegetarian: true,
    facilities: ['Vegetarian only', 'Student-friendly', 'Seating available', 'Cash accepted'],
    meal_types: ['lunch', 'dinner'],
    lunch_capacity: 60,
    dinner_capacity: 70,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockMenus: Menu[] = [
  {
    id: 'menu-1',
    mess_id: 'mess-1',
    meal_type: 'lunch',
    date: new Date().toISOString().split('T')[0],
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'menu-2',
    mess_id: 'mess-1',
    meal_type: 'dinner',
    date: new Date().toISOString().split('T')[0],
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'menu-3',
    mess_id: 'mess-2',
    meal_type: 'lunch',
    date: new Date().toISOString().split('T')[0],
    image_url: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800',
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

export const mockDishes: Dish[] = [
  {
    id: 'dish-1',
    menu_id: 'menu-1',
    name: 'Dal Tadka',
    price: 30,
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    is_available: true,
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dish-2',
    menu_id: 'menu-1',
    name: 'Jeera Rice',
    price: 30,
    image_url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400',
    is_available: true,
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dish-3',
    menu_id: 'menu-1',
    name: 'Mixed Veg Sabzi',
    price: 35,
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
    is_available: true,
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dish-4',
    menu_id: 'menu-1',
    name: '4 Roti',
    price: 20,
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    is_available: true,
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dish-5',
    menu_id: 'menu-1',
    name: 'Salad',
    price: 10,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    is_available: true,
    quantity: 50,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    user_id: 'user-1',
    mess_id: 'mess-1',
    menu_id: 'menu-1',
    meal_type: 'lunch',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
    total_amount: 85,
    platform_fee: 5,
    status: 'confirmed',
    payment_method: 'UPI',
    payment_status: 'completed',
    booking_id: 'MNM-28491',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    user_id: 'user-1',
    mess_id: 'mess-1',
    booking_id: 'booking-1',
    rating: 5,
    comment: 'Amazing food! Tastes just like home. The dal tadka was perfect.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'review-2',
    user_id: 'user-2',
    mess_id: 'mess-1',
    booking_id: 'booking-2',
    rating: 4,
    comment: 'Good portions and fresh food. Will definitely come back.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockAvailability: Availability[] = [
  {
    id: 'avail-1',
    mess_id: 'mess-1',
    meal_type: 'lunch',
    date: new Date().toISOString().split('T')[0],
    capacity: 50,
    booked: 32,
    remaining: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'avail-2',
    mess_id: 'mess-1',
    meal_type: 'dinner',
    date: new Date().toISOString().split('T')[0],
    capacity: 60,
    booked: 18,
    remaining: 42,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Helper functions to get mock data
export const getMesses = async (filters?: {
  distance?: number
  mealType?: string
  priceRange?: string
  foodType?: string
}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockMesses
}

export const getMessById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockMesses.find(mess => mess.id === id)
}

export const getMenuByMessAndMeal = async (messId: string, mealType: string, date: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockMenus.find(menu => menu.mess_id === messId && menu.meal_type === mealType && menu.date === date)
}

export const getDishesByMenu = async (menuId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockDishes.filter(dish => dish.menu_id === menuId)
}

export const getAvailability = async (messId: string, mealType: string, date: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockAvailability.find(avail => avail.mess_id === messId && avail.meal_type === mealType && avail.date === date)
}

export const getReviewsByMess = async (messId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockReviews.filter(review => review.mess_id === messId)
}

export const getUserBookings = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockBookings.filter(booking => booking.user_id === userId)
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  mockBookings.push(newBooking)
  return newBooking
}
