'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'
import { getUserBookings, getMessById } from '@/lib/mock-data'
import type { Booking, Mess } from '@/lib/mock-data'

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messes, setMesses] = useState<Record<string, Mess>>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous' | 'saved'>('upcoming')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const userBookings = await getUserBookings('user-1')
      setBookings(userBookings)

      // Load mess details for each booking
      const messData: Record<string, Mess> = {}
      for (const booking of userBookings) {
        const mess = await getMessById(booking.mess_id)
        if (mess) {
          messData[booking.mess_id] = mess
        }
      }
      setMesses(messData)
      setLoading(false)
    }
    loadData()
  }, [])

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed')
  const previousBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, Rahul</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'upcoming'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming Bookings
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'previous'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Previous Meals
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'saved'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Saved Messes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : activeTab === 'upcoming' ? (
              upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => {
                    const mess = messes[booking.mess_id]
                    if (!mess) return null
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start space-x-4">
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
                          <div className="flex flex-col sm:items-end gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                            <div className="flex space-x-2">
                              <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                                View Booking
                              </button>
                              <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                Get Directions
                              </button>
                              <a
                                href={`/cancel/${booking.id}`}
                                className="text-red-500 hover:text-red-600 text-sm font-medium"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Bookings</h3>
                  <p className="text-gray-600 mb-6">Your next meal is waiting to be discovered.</p>
                  <a
                    href="/discover"
                    className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium"
                  >
                    Find Messes
                  </a>
                </div>
              )
            ) : activeTab === 'previous' ? (
              previousBookings.length > 0 ? (
                <div className="space-y-4">
                  {previousBookings.map((booking) => {
                    const mess = messes[booking.mess_id]
                    if (!mess) return null
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={mess.image_url}
                              alt={mess.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{mess.name}</h3>
                              <p className="text-sm text-gray-600 capitalize">{booking.meal_type}</p>
                              <p className="text-sm text-gray-600">Quantity: {booking.quantity}</p>
                              <p className="text-sm text-gray-600">₹{booking.total_amount}</p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                              Book Again
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Previous Meals</h3>
                  <p className="text-gray-600">Start exploring messes near you.</p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Messes</h3>
                <p className="text-gray-600 mb-6">Save your favorite messes for quick access.</p>
                <a
                  href="/discover"
                  className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium"
                >
                  Discover Messes
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                defaultValue="Rahul Sharma"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="rahul@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
              <input
                type="text"
                defaultValue="Pune"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
