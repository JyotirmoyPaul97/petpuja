'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMessById, getMenuByMessAndMeal, getAvailability } from '@/lib/mock-data'
import type { Mess, Menu, Availability } from '@/lib/mock-data'

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [mess, setMess] = useState<Mess | null>(null)
  const [lunchMenu, setLunchMenu] = useState<Menu | null>(null)
  const [dinnerMenu, setDinnerMenu] = useState<Menu | null>(null)
  const [lunchAvailability, setLunchAvailability] = useState<Availability | null>(null)
  const [dinnerAvailability, setDinnerAvailability] = useState<Availability | null>(null)
  const [loading, setLoading] = useState(true)

  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const today = new Date().toISOString().split('T')[0]

      const [messData, lunch, dinner, lunchAvail, dinnerAvail] = await Promise.all([
        getMessById(params.messId as string),
        getMenuByMessAndMeal(params.messId as string, 'lunch', today),
        getMenuByMessAndMeal(params.messId as string, 'dinner', today),
        getAvailability(params.messId as string, 'lunch', today),
        getAvailability(params.messId as string, 'dinner', today),
      ])

      setMess(messData || null)
      setLunchMenu(lunch || null)
      setDinnerMenu(dinner || null)
      setLunchAvailability(lunchAvail || null)
      setDinnerAvailability(dinnerAvail || null)
      setLoading(false)
    }
    loadData()
  }, [params.messId])

  const currentAvailability = selectedMeal === 'lunch' ? lunchAvailability : dinnerAvailability
  const mealPrice = 80 // Fixed price for demo
  const platformFee = 5
  const totalAmount = (mealPrice * quantity) + platformFee

  const handleProceed = () => {
    router.push(`/book/${params.messId}/payment?meal=${selectedMeal}&quantity=${quantity}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-48 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!mess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mess Not Found</h3>
            <a
              href="/discover"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              Browse Other Messes
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isMealAvailable = currentAvailability && currentAvailability.remaining >= quantity

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Meal</h1>
          <p className="text-gray-600">{mess.name}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Meal</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedMeal('lunch')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedMeal === 'lunch'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg font-semibold text-gray-900 mb-1">Lunch</div>
              <div className="text-sm text-gray-600">12:30 PM – 2:30 PM</div>
              {lunchAvailability && (
                <div className="mt-2 text-sm">
                  <span className={lunchAvailability.remaining > 0 ? 'text-green-600' : 'text-red-600'}>
                    {lunchAvailability.remaining} meals available
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => setSelectedMeal('dinner')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedMeal === 'dinner'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-lg font-semibold text-gray-900 mb-1">Dinner</div>
              <div className="text-sm text-gray-600">7:30 PM – 9:30 PM</div>
              {dinnerAvailability && (
                <div className="mt-2 text-sm">
                  <span className={dinnerAvailability.remaining > 0 ? 'text-green-600' : 'text-red-600'}>
                    {dinnerAvailability.remaining} meals available
                  </span>
                </div>
              )}
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Quantity</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-2xl font-semibold text-gray-900 w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(currentAvailability?.remaining || 1, quantity + 1))}
              disabled={!currentAvailability || quantity >= currentAvailability.remaining}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Mess</span>
              <span className="font-medium text-gray-900">{mess.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meal</span>
              <span className="font-medium text-gray-900 capitalize">{selectedMeal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium text-gray-900">{quantity} meal{quantity > 1 ? 's' : ''}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Meal price</span>
                <span className="font-medium text-gray-900">₹{mealPrice * quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform fee</span>
                <span className="font-medium text-gray-900">₹{platformFee}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-orange-600">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={!isMealAvailable}
          className="w-full bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {!isMealAvailable ? 'Not Available' : 'Proceed to Payment'}
        </button>

        {!isMealAvailable && (
          <p className="text-center text-red-600 mt-4">
            Selected meal is not available in the requested quantity.
          </p>
        )}
      </main>
      <Footer />
    </div>
  )
}
