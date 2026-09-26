'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMessById } from '@/lib/mock-data'
import type { Mess } from '@/lib/mock-data'

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mess, setMess] = useState<Mess | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const meal = searchParams.get('meal') as 'lunch' | 'dinner'
  const quantity = parseInt(searchParams.get('quantity') || '1')
  const mealPrice = 80
  const platformFee = 5
  const totalAmount = (mealPrice * quantity) + platformFee

  const [paymentMethod, setPaymentMethod] = useState('upi')

  useEffect(() => {
    async function loadData() {
      const messData = await getMessById(params.messId as string)
      setMess(messData || null)
      setLoading(false)
    }
    loadData()
  }, [params.messId])

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push(`/book/${params.messId}/confirmation?meal=${meal}&quantity=${quantity}`)
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
          <p className="text-gray-600">Complete your booking</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>
            <div className="space-y-4">
              <label
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">UPI</div>
                  <div className="text-sm text-gray-600">Pay using any UPI app</div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Net Banking</div>
                  <div className="text-sm text-gray-600">All major banks supported</div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">Wallets</div>
                  <div className="text-sm text-gray-600">Paytm, PhonePe, Amazon Pay</div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                <img
                  src={mess.image_url}
                  alt={mess.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{mess.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{meal}</p>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meal price (₹{mealPrice} × {quantity})</span>
                  <span className="text-gray-900">₹{mealPrice * quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="text-gray-900">₹{platformFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-orange-600 text-lg">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full mt-6 bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              By proceeding, you agree to our Terms of Service and Cancellation Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
