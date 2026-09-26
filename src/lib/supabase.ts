import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string
          role: 'user' | 'owner'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone: string
          role: 'user' | 'owner'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string
          role?: 'user' | 'owner'
          created_at?: string
          updated_at?: string
        }
      }
      messes: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string
          address: string
          latitude: number
          longitude: number
          phone: string
          image_url: string
          rating: number
          review_count: number
          is_vegetarian: boolean
          facilities: string[]
          meal_types: string[]
          lunch_capacity: number
          dinner_capacity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description: string
          address: string
          latitude: number
          longitude: number
          phone: string
          image_url: string
          rating?: number
          review_count?: number
          is_vegetarian?: boolean
          facilities?: string[]
          meal_types?: string[]
          lunch_capacity: number
          dinner_capacity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string
          address?: string
          latitude?: number
          longitude?: number
          phone?: string
          image_url?: string
          rating?: number
          review_count?: number
          is_vegetarian?: boolean
          facilities?: string[]
          meal_types?: string[]
          lunch_capacity?: number
          dinner_capacity?: number
          created_at?: string
          updated_at?: string
        }
      }
      menus: {
        Row: {
          id: string
          mess_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          image_url: string
          updated_at: string
        }
        Insert: {
          id?: string
          mess_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          image_url: string
          updated_at?: string
        }
        Update: {
          id?: string
          mess_id?: string
          meal_type?: 'breakfast' | 'lunch' | 'dinner'
          date?: string
          image_url?: string
          updated_at?: string
        }
      }
      dishes: {
        Row: {
          id: string
          menu_id: string
          name: string
          price: number
          image_url: string
          is_available: boolean
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          menu_id: string
          name: string
          price: number
          image_url: string
          is_available?: boolean
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          menu_id?: string
          name?: string
          price?: number
          image_url?: string
          is_available?: boolean
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          mess_id: string
          menu_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          quantity: number
          total_amount: number
          platform_fee: number
          status: 'confirmed' | 'completed' | 'cancelled'
          payment_method: string
          payment_status: string
          booking_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mess_id: string
          menu_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          quantity: number
          total_amount: number
          platform_fee: number
          status?: 'confirmed' | 'completed' | 'cancelled'
          payment_method: string
          payment_status: string
          booking_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mess_id?: string
          menu_id?: string
          meal_type?: 'breakfast' | 'lunch' | 'dinner'
          date?: string
          quantity?: number
          total_amount?: number
          platform_fee?: number
          status?: 'confirmed' | 'completed' | 'cancelled'
          payment_method?: string
          payment_status?: string
          booking_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          mess_id: string
          booking_id: string
          rating: number
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mess_id: string
          booking_id: string
          rating: number
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mess_id?: string
          booking_id?: string
          rating?: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          mess_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          capacity: number
          booked: number
          remaining: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mess_id: string
          meal_type: 'breakfast' | 'lunch' | 'dinner'
          date: string
          capacity: number
          booked: number
          remaining: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mess_id?: string
          meal_type?: 'breakfast' | 'lunch' | 'dinner'
          date?: string
          capacity?: number
          booked?: number
          remaining?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
