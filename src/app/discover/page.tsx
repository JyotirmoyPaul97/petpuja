'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileNav from '@/components/MobileNav'
import MessCard from '@/components/MessCard'
import { getMesses, mockMesses } from '@/lib/mock-data'
import type { Mess } from '@/lib/mock-data'

export default function DiscoverPage() {
  const [messes, setMesses] = useState<Mess[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    distance: '2 km',
    mealType: 'all',
    priceRange: 'all',
    foodType: 'all',
    availability: 'all',
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    async function loadMesses() {
      setLoading(true)
      const data = await getMesses(filters)
      setMesses(data)
      setLoading(false)
    }
    loadMesses()
  }, [filters])

  const filteredMesses = messes.filter(mess => {
    if (filters.foodType === 'vegetarian' && !mess.is_vegetarian) return false
    if (filters.foodType === 'non-vegetarian' && mess.is_vegetarian) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Messes Near You</h1>
          <p className="text-gray-600">
            {filteredMesses.length} messes found near you
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setFilters({
                    distance: '2 km',
                    mealType: 'all',
                    priceRange: 'all',
                    foodType: 'all',
                    availability: 'all',
                  })}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  Clear all
                </button>
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Distance
                </label>
                <div className="space-y-2">
                  {['500 m', '1 km', '2 km', '5 km'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="distance"
                        value={option}
                        checked={filters.distance === option}
                        onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Meal
                </label>
                <div className="space-y-2">
                  {['all', 'Breakfast', 'Lunch', 'Dinner'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="mealType"
                        value={option}
                        checked={filters.mealType === option.toLowerCase()}
                        onChange={(e) => setFilters({ ...filters, mealType: e.target.value })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">
                        {option === 'all' ? 'All meals' : option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any price' },
                    { value: '50-80', label: '₹50–₹80' },
                    { value: '80-120', label: '₹80–₹120' },
                    { value: '120+', label: '₹120+' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.value}
                        checked={filters.priceRange === option.value}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Food Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Food Type
                </label>
                <div className="space-y-2">
                  {['all', 'vegetarian', 'non-vegetarian'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="foodType"
                        value={option}
                        checked={filters.foodType === option}
                        onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">
                        {option === 'all' ? 'All types' : option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Availability
                </label>
                <div className="space-y-2">
                  {['all', 'available', 'pre-booking'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={option}
                        checked={filters.availability === option}
                        onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600 capitalize">
                        {option === 'all' ? 'Any' : option === 'available' ? 'Available now' : 'Pre-booking available'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mess Cards */}
          <div className="flex-1">
            {/* Sort */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Showing {filteredMesses.length} messes
              </span>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Sort by: Distance</option>
                <option>Sort by: Price</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Availability</option>
              </select>
            </div>

            {/* Mess Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm h-80 animate-pulse" />
                ))}
              </div>
            ) : filteredMesses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messes Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find a mess within this distance.
                </p>
                <button
                  onClick={() => setFilters({ ...filters, distance: '5 km' })}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium"
                >
                  Search Within 5 km
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMesses.map((mess) => (
                  <MessCard key={mess.id} mess={mess} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
