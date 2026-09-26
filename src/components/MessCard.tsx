'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { Mess } from '@/lib/mock-data'
import { getMenuByMessAndMeal, getAvailability } from '@/lib/mock-data'

interface MessCardProps {
  mess: Mess
}

export default function MessCard({ mess }: MessCardProps) {
  const [todayMenu, setTodayMenu] = useState<any>(null)
  const [availability, setAvailability] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const today = new Date().toISOString().split('T')[0]
      const [menu, avail] = await Promise.all([
        getMenuByMessAndMeal(mess.id, 'lunch', today),
        getAvailability(mess.id, 'lunch', today),
      ])
      setTodayMenu(menu)
      setAvailability(avail)
      setLoading(false)
    }
    loadData()
  }, [mess.id])

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={mess.image_url}
          alt={mess.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            {mess.is_vegetarian ? '🟢 Veg' : '🔴 Non-Veg'}
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            ~₹80 / meal
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{mess.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                0.8 km away
              </span>
              <span>•</span>
              <span className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                {mess.rating} · {mess.review_count} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Today's Meal Preview */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Today's Lunch</div>
          {!loading && todayMenu ? (
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">
                Dal · Rice · Roti · Sabzi · Salad
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-green-600 font-medium">
                  🟢 {availability?.remaining || 18} meals available
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/mess/${mess.id}`}
            className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-center"
          >
            Book Meal
          </Link>
          <Link
            href={`/mess/${mess.id}`}
            className="flex-1 border-2 border-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors font-medium text-center"
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  )
}
