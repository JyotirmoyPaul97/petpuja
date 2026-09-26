'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mockMesses, mockBookings, mockAvailability } from '@/lib/mock-data'

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'bookings' | 'availability' | 'earnings' | 'reviews'>('overview')
  const [loading, setLoading] = useState(false)

  const todayBookings = mockBookings.filter(b => b.status === 'confirmed').length
  const lunchRemaining = mockAvailability.find(a => a.meal_type === 'lunch')?.remaining || 0
  const dinnerRemaining = mockAvailability.find(a => a.meal_type === 'dinner')?.remaining || 0
  const todayRevenue = mockBookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.total_amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Welcome back, Priya</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-md p-4 sticky top-20">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition-colors ${
                  activeTab === 'menu'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Today's Menu
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition-colors ${
                  activeTab === 'availability'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Availability
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-medium transition-colors ${
                  activeTab === 'earnings'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Earnings
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Reviews
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{todayBookings}</h3>
                    <p className="text-gray-600 text-sm">Today's Bookings</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{lunchRemaining}</h3>
                    <p className="text-gray-600 text-sm">Meals Remaining</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">₹{todayRevenue}</h3>
                    <p className="text-gray-600 text-sm">Today's Revenue</p>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">4.6</h3>
                    <p className="text-gray-600 text-sm">Average Rating</p>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Booking ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Meal</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBookings.slice(0, 5).map((booking) => (
                          <tr key={booking.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-sm text-gray-900">{booking.booking_id}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">Rahul</td>
                            <td className="py-3 px-4 text-sm text-gray-900 capitalize">{booking.meal_type}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">{booking.quantity}</td>
                            <td className="py-3 px-4 text-sm text-gray-900">₹{booking.total_amount}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Today's Menu</h2>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    + Add Dish
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Today's Food Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Dal Tadka', price: 30, available: true, quantity: 50 },
                    { name: 'Jeera Rice', price: 30, available: true, quantity: 50 },
                    { name: 'Mixed Veg Sabzi', price: 35, available: true, quantity: 50 },
                    { name: '4 Roti', price: 20, available: true, quantity: 50 },
                    { name: 'Salad', price: 10, available: true, quantity: 50 },
                  ].map((dish, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{dish.name}</h4>
                          <p className="text-sm text-gray-600">₹{dish.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Qty:</span>
                          <input
                            type="number"
                            defaultValue={dish.quantity}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-sm"
                          />
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={dish.available}
                            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Available</span>
                        </label>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Bookings</h2>
                <div className="mb-6 flex flex-wrap gap-4">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    <option>All Meals</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Booking ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Meal</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Time</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-900">{booking.booking_id}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">Rahul</td>
                          <td className="py-3 px-4 text-sm text-gray-900 capitalize">{booking.meal_type}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">{booking.quantity}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">₹{booking.total_amount}</td>
                          <td className="py-3 px-4 text-sm text-gray-900">12:45 PM</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Availability Management</h2>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lunch Capacity</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Capacity</label>
                        <input
                          type="number"
                          defaultValue={50}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Booked</label>
                        <input
                          type="number"
                          defaultValue={32}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remaining</label>
                        <input
                          type="number"
                          defaultValue={18}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: '64%' }}
                      />
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dinner Capacity</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Capacity</label>
                        <input
                          type="number"
                          defaultValue={60}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Booked</label>
                        <input
                          type="number"
                          defaultValue={18}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Remaining</label>
                        <input
                          type="number"
                          defaultValue={42}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: '30%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Today</h3>
                    <p className="text-3xl font-bold text-gray-900">₹3,240</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
                    <p className="text-3xl font-bold text-gray-900">₹18,450</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
                    <p className="text-3xl font-bold text-gray-900">₹72,800</p>
                  </div>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Earnings chart integration coming soon</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {[
                    { rating: 5, comment: 'Amazing food! Tastes just like home. The dal tadka was perfect.', customer: 'Rahul' },
                    { rating: 4, comment: 'Good portions and fresh food. Will definitely come back.', customer: 'Amit' },
                    { rating: 5, comment: 'Best mess in the area. Consistent quality and taste.', customer: 'Priya' },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-3 text-sm text-gray-600">{review.customer}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
