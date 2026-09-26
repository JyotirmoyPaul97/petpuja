'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getMesses } from '@/lib/mock-data'
import type { Mess } from '@/lib/mock-data'

export default function MapPage() {
  const [messes, setMesses] = useState<Mess[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMess, setSelectedMess] = useState<Mess | null>(null)

  useEffect(() => {
    async function loadMesses() {
      setLoading(true)
      const data = await getMesses()
      setMesses(data)
      setLoading(false)
    }
    loadMesses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="h-[calc(100vh-64px)]">
        <div className="flex h-full">
          {/* Map Area */}
          <div className="flex-1 relative bg-gray-200">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <>
                {/* Placeholder Map */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-gray-600 font-medium">Map Integration Coming Soon</p>
                    <p className="text-gray-500 text-sm mt-2">Will connect to Google Maps / Mapbox</p>
                  </div>
                </div>

                {/* Map Markers (Simulated) */}
                {messes.map((mess, index) => (
                  <div
                    key={mess.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedMess(mess)}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-2 text-center min-w-[80px]">
                      <div className="text-sm font-bold text-gray-900">₹80</div>
                      <div className="text-xs text-gray-600">{mess.is_vegetarian ? '🟢' : '🔴'} {mess.rating}★</div>
                    </div>
                  </div>
                ))}

                {/* Selected Mess Preview */}
                {selectedMess && (
                  <div className="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-xl p-6 max-w-md">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={selectedMess.image_url}
                          alt={selectedMess.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{selectedMess.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              {selectedMess.rating}
                            </span>
                            <span>•</span>
                            <span>~₹80 / meal</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{selectedMess.address}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMess(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`https://maps.google.com/?q=${selectedMess.latitude},${selectedMess.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
                      >
                        Open in Maps
                      </a>
                      <a
                        href={`/mess/${selectedMess.id}`}
                        className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-center"
                      >
                        View Mess
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar with Mess List */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto hidden lg:block">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Nearby Messes</h2>
              <p className="text-sm text-gray-600">{messes.length} messes found</p>
            </div>
            <div className="p-4 space-y-4">
              {messes.map((mess) => (
                <div
                  key={mess.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedMess(mess)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={mess.image_url}
                      alt={mess.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{mess.name}</h3>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span>{mess.rating}</span>
                        <span>•</span>
                        <span>~₹80</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{mess.is_vegetarian ? '🟢 Veg' : '🔴 Non-Veg'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
