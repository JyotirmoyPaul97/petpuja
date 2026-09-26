'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getUserBookings, getMessById } from '@/lib/mock-data'
import type { Booking, Mess } from '@/lib/mock-data'

export default function CancelBookingPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [mess, setMess] = useState<Mess | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const bookings = await getUserBookings('user-1')
      const foundBooking = bookings.find(b => b.id === params.bookingId)
      setBooking(foundBooking || null)

      if (foundBooking) {
        const messData = await getMessById(foundBooking.mess_id)
        setMess(messData || null)
      }
      setLoading(false)
    }
    loadData()
  }, [params.bookingId])

  // Calculate cancellation fee based on time
  const calculateCancellationFee = () => {
    if (!booking) return 0

    const mealTime = booking.meal_type === 'lunch' ? '12:30' : '19:30'
    const now = new Date()
    const [hours, minutes] = mealTime.split(':').map(Number)
    const mealDate = new Date()
    mealDate.setHours(hours, minutes, 0, 0)

    const timeDiff = mealDate.getTime() - now.getTime()
    const hoursUntilMeal = timeDiff / (1000 * 60 * 60)

    let feePercentage = 0
    if (hoursUntilMeal < 2) {
      feePercentage = 10 // Last-minute: 10% fee
    } else if (hoursUntilMeal < 6) {
      feePercentage = 7 // Closer to meal: 7% fee
    } else {
      feePercentage = 4 // Early cancellation: 4% fee
    }

    return Math.round(booking.total_amount * (feePercentage / 100))
  }

  const handleCancel = async () => {
    setCancelling(true)
    // Simulate cancellation
    await new Promise(resolve => setTimeout(resolve, 1500))
    setCancelling(false)
    router.push('/dashboard?cancelled=true')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!booking || !mess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Not Found</h3>
            <a
              href="/dashboard"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              Back to Dashboard
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const cancellationFee = calculateCancellationFee()
  const refundAmount = booking.total_amount - cancellationFee

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancel Booking?</h1>
          <p className="text-gray-600">Review the cancellation details below</p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={mess.image_url}
              alt={mess.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{mess.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{booking.meal_type}</p>
              <p className="text-sm text-gray-600">
                {booking.meal_type === 'lunch' ? '12:30 PM – 2:30 PM' : '7:30 PM – 9:30 PM'}
              </p>
              <p className="text-sm text-gray-600">Quantity: {booking.quantity}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium text-gray-900">{booking.booking_id}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-medium text-gray-900">₹{booking.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancellation Policy</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Early cancellation</p>
                <p className="text-gray-600">4% cancellation fee</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Closer to meal time</p>
                <p className="text-gray-600">Higher applicable cancellation fee</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Last-minute cancellation</p>
                <p className="text-gray-600">10% cancellation fee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Calculation */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Calculation</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Original payment</span>
              <span className="font-medium text-gray-900">₹{booking.total_amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancellation fee</span>
              <span className="font-medium text-red-600">-₹{cancellationFee}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
              <span className="font-semibold text-gray-900">Refund amount</span>
              <span className="font-bold text-green-600">₹{refundAmount}</span>
            </div>
          </div>
        </div>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600 transition-colors font-semibold text-lg"
          >
            Proceed to Cancellation
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-gray-300 transition-colors font-semibold"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
