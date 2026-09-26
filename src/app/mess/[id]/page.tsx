'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMessById, getMenuByMessAndMeal, getDishesByMenu, getAvailability, getReviewsByMess } from '@/lib/mock-data'
import type { Mess, Menu, Dish, Availability, Review } from '@/lib/mock-data'

export default function MessDetailPage() {
  const params = useParams()
  const [mess, setMess] = useState<Mess | null>(null)
  const [lunchMenu, setLunchMenu] = useState<Menu | null>(null)
  const [dinnerMenu, setDinnerMenu] = useState<Menu | null>(null)
  const [lunchDishes, setLunchDishes] = useState<Dish[]>([])
  const [dinnerDishes, setDinnerDishes] = useState<Dish[]>([])
  const [lunchAvailability, setLunchAvailability] = useState<Availability | null>(null)
  const [dinnerAvailability, setDinnerAvailability] = useState<Availability | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch')

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const today = new Date().toISOString().split('T')[0]

      const [messData, lunch, dinner, lunchAvail, dinnerAvail, reviewData] = await Promise.all([
        getMessById(params.id as string),
        getMenuByMessAndMeal(params.id as string, 'lunch', today),
        getMenuByMessAndMeal(params.id as string, 'dinner', today),
        getAvailability(params.id as string, 'lunch', today),
        getAvailability(params.id as string, 'dinner', today),
        getReviewsByMess(params.id as string),
      ])

      setMess(messData || null)
      setLunchMenu(lunch || null)
      setDinnerMenu(dinner || null)
      setLunchAvailability(lunchAvail || null)
      setDinnerAvailability(dinnerAvail || null)
      setReviews(reviewData)

      if (lunch) {
        const dishes = await getDishesByMenu(lunch.id)
        setLunchDishes(dishes)
      }

      if (dinner) {
        const dishes = await getDishesByMenu(dinner.id)
        setDinnerDishes(dishes)
      }

      setLoading(false)
    }
    loadData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mess Not Found</h3>
            <p className="text-gray-600 mb-6">
              The mess you're looking for doesn't exist or has been removed.
            </p>
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

  const currentMenu = selectedMeal === 'lunch' ? lunchMenu : dinnerMenu
  const currentDishes = selectedMeal === 'lunch' ? lunchDishes : dinnerDishes
  const currentAvailability = selectedMeal === 'lunch' ? lunchAvailability : dinnerAvailability

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80">
            <img
              src={mess.image_url}
              alt={mess.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {mess.is_vegetarian ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
                </span>
                <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{mess.rating}</span>
                  <span className="text-gray-600 ml-1">({mess.review_count} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{mess.name}</h1>
              <p className="text-white/90 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {mess.address}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Open Now</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">~₹80 / meal</span>
              </div>
              <button className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold">
                Book Today's Meal
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Menu */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Today's Menu</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedMeal('lunch')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMeal === 'lunch'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Lunch
                  </button>
                  <button
                    onClick={() => setSelectedMeal('dinner')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedMeal === 'dinner'
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dinner
                  </button>
                </div>
              </div>

              {currentMenu ? (
                <>
                  <div className="mb-6">
                    <img
                      src={currentMenu.image_url}
                      alt={`Today's ${selectedMeal}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      Updated {Math.floor((Date.now() - new Date(currentMenu.updated_at).getTime()) / 60000)} minutes ago
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {currentDishes.map((dish) => (
                      <div key={dish.id} className="bg-gray-50 rounded-lg p-4">
                        <img
                          src={dish.image_url}
                          alt={dish.name}
                          className="w-full h-24 object-cover rounded mb-3"
                        />
                        <h4 className="font-medium text-gray-900 mb-1">{dish.name}</h4>
                        <p className="text-orange-600 font-semibold">₹{dish.price}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No menu available for {selectedMeal} today.</p>
                </div>
              )}
            </div>

            {/* Meal Availability */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Meal Availability</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Lunch</span>
                    <span className="text-sm text-gray-600">
                      {lunchAvailability ? `${lunchAvailability.booked} / ${lunchAvailability.capacity}` : 'Not available'}
                    </span>
                  </div>
                  {lunchAvailability && (
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full transition-all"
                        style={{ width: `${(lunchAvailability.booked / lunchAvailability.capacity) * 100}%` }}
                      />
                    </div>
                  )}
                  {lunchAvailability && (
                    <p className="text-sm text-green-600 mt-1">
                      {lunchAvailability.remaining} meals remaining
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Dinner</span>
                    <span className="text-sm text-gray-600">
                      {dinnerAvailability ? `${dinnerAvailability.booked} / ${dinnerAvailability.capacity}` : 'Not available'}
                    </span>
                  </div>
                  {dinnerAvailability && (
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full transition-all"
                        style={{ width: `${(dinnerAvailability.booked / dinnerAvailability.capacity) * 100}%` }}
                      />
                    </div>
                  )}
                  {dinnerAvailability && (
                    <p className="text-sm text-green-600 mt-1">
                      {dinnerAvailability.remaining} meals remaining
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{mess.description}</p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mess.facilities.map((facility) => (
                  <div key={facility} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {facility}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
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
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">Map integration coming soon</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{mess.address}</p>
              <button className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Get Directions
              </button>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${mess.phone}`}
                  className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {mess.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
