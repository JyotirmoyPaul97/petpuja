'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMessById } from '@/lib/mock-data'
import type { Mess } from '@/lib/mock-data'

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mess, setMess] = useState<Mess | null>(null)
  const [loading, setLoading] = useState(true)

  const meal = searchParams.get('meal') as 'lunch' | 'dinner'
  const quantity = parseInt(searchParams.get('quantity') || '1')
  const bookingId = `MNM-${Math.floor(10000 + Math.random() * 90000)}`

  useEffect(() => {
    async function loadData() {
      const messData = await getMessById(params.messId as string)
      setMess(messData || null)
      setLoading(false)
    }
    loadData()
  }, [params.messId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h1>
            <p className="text-gray-600">Your meal is reserved</p>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <div className="mb-6">
              <label className="text-sm text-gray-600">Booking ID</label>
              <div className="text-2xl font-bold text-gray-900">{bookingId}</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Mess</span>
                <span className="font-medium text-gray-900">{mess.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Meal</span>
                <span className="font-medium text-gray-900 capitalize">{meal}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Time</span>
                <span className="font-medium text-gray-900">
                  {meal === 'lunch' ? '12:30 PM – 2:30 PM' : '7:30 PM – 9:30 PM'}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">Today</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium text-gray-900">{quantity} meal{quantity > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Confirmed</span>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
              <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Show this QR code at the mess</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Get Directions
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors font-medium"
              >
                View Booking
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/discover')}
            className="text-gray-600 hover:text-gray-900"
          >
            Browse Other Messes
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
