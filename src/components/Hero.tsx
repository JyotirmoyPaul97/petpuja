'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [location, setLocation] = useState('Use my location')
  const [distance, setDistance] = useState('2 km')
  const [meal, setMeal] = useState('Lunch')
  const [date, setDate] = useState('Today')

  return (
    <section className="relative bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find your next home-style meal nearby.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover local messes, check today's real menu, and pre-book your meal before you arrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/discover"
                className="bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Find Messes Near Me
              </Link>
              <Link
                href="/for-owners"
                className="bg-white text-gray-900 px-8 py-4 rounded-full border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-colors font-semibold text-lg"
              >
                List Your Mess
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                alt="Delicious home-style Indian meal"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Search Module */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Messes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Use my location</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                <select
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>500 m</option>
                  <option>1 km</option>
                  <option>2 km</option>
                  <option>5 km</option>
                </select>
              </div>

              {/* Meal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal</label>
                <select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                </select>
              </div>
            </div>

            <Link
              href="/discover"
              className="mt-6 w-full block bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-center"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
