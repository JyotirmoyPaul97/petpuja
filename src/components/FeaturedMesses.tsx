import Link from 'next/link'
import { mockMesses } from '@/lib/mock-data'

export default function FeaturedMesses() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Today's Popular Messes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Highly-rated messes serving delicious home-style meals near you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMesses.slice(0, 3).map((mess) => (
            <div key={mess.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={mess.image_url}
                  alt={mess.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {mess.is_vegetarian ? '🟢 Veg' : '🔴 Non-Veg'}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{mess.name}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-900 font-medium">{mess.rating}</span>
                    <span className="text-gray-500 text-sm">({mess.review_count})</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mess.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">~₹80 / meal</span>
                  <Link
                    href={`/mess/${mess.id}`}
                    className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                  >
                    View Menu →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/discover"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold"
          >
            View All Messes
          </Link>
        </div>
      </div>
    </section>
  )
}
