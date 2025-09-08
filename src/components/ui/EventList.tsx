// src\components\ui\EventList.tsx
'use client'
import { useState } from 'react'
import { FunnelIcon } from '@heroicons/react/16/solid'

export interface Event {
  id: string
  title: string
  description: string
  category: string
  location: { type: string; venue: string }
  schedule: { startDate: string; endDate: string }
  pricing: { currency: string; vip?: number; premium?: number; general?: number; student?: number }
  images: { thumbnail: string }
}

interface Props {
  initialEvents: Event[]
}

export default function EventList({ initialEvents }: Props) {
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [location, setLocation] = useState('')
  const [sort, setSort] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = initialEvents
    .filter(e => (category ? e.category === category : true))
    .filter(e => {
      if (!priceRange) return true
      const [min, max] = priceRange.split('-').map(Number)
      const prices = Object.values(e.pricing).filter(p => typeof p === 'number' && p > 0) as number[]
      if (prices.length === 0) return false
      const minPrice = Math.min(...prices)
      return minPrice >= min && (max ? minPrice <= max : true)
    })
    .filter(e => (location ? e.location.type === location : true))
    .sort((a, b) => {
      if (!sort) return 0
      const getMinPrice = (pricing: Event['pricing']) => {
        const vals = Object.values(pricing).filter(p => typeof p === 'number' && p > 0) as number[]
        return vals.length > 0 ? Math.min(...vals) : 0
      }
      if (sort === 'date-asc') return new Date(a.schedule.startDate).getTime() - new Date(b.schedule.startDate).getTime()
      if (sort === 'date-desc') return new Date(b.schedule.startDate).getTime() - new Date(a.schedule.startDate).getTime()
      if (sort === 'price-asc') return getMinPrice(a.pricing) - getMinPrice(b.pricing)
      if (sort === 'price-desc') return getMinPrice(b.pricing) - getMinPrice(a.pricing)
      return 0
    })

  return (
    <div className="flex flex-col md:flex-row gap-6">

      {/* ปุ่มเปิด/ปิด Filter สำหรับมือถือ */}
      <div className="md:hidden mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FunnelIcon height={20}/>
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`
          ${showFilters ? 'block' : 'hidden'} md:block 
          w-full md:w-64 bg-white p-4 rounded-lg shadow-md min-h-screen
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="flex flex-col gap-4">
          <select className="p-2 border rounded" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">-- Category --</option>
            <option value="workshop">Workshop & Training</option>
            <option value="conference">Conference & Seminar</option>
            <option value="networking">Networking Event</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports & Fitness</option>
            <option value="cultural">Cultural Event</option>
          </select>

          <select className="p-2 border rounded" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
            <option value="">-- Price Range --</option>
            <option value="0-1000">0 - 1000</option>
            <option value="1001-3000">1001 - 3000</option>
            <option value="3001-6000">3001 - 6000</option>
            <option value="6001-15000">6001 - 15000</option>
            <option value="15001-">15001+</option>
          </select>

          <select className="p-2 border rounded" value={location} onChange={e => setLocation(e.target.value)}>
            <option value="">-- Location --</option>
            <option value="onsite">Onsite</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <select className="p-2 border rounded" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">-- Sort --</option>
            <option value="date-asc">วันที่ (เร็วสุด)</option>
            <option value="date-desc">วันที่ (ล่าสุด)</option>
            <option value="price-asc">ราคา (ต่ำสุด)</option>
            <option value="price-desc">ราคา (สูงสุด)</option>
          </select>
        </div>
      </aside>

      {/* Event Cards */}
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map(event => {
            const prices = Object.values(event.pricing).filter(p => typeof p === 'number' && p > 0) as number[]
            if (!prices.length) return null
            const min = Math.min(...prices)
            const max = Math.max(...prices)
            const priceText = min === max ? `${min.toLocaleString()} ${event.pricing.currency}` : `${min.toLocaleString()} - ${max.toLocaleString()} ${event.pricing.currency}`
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={event.images.thumbnail} alt={event.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-gray-500 text-sm">{new Date(event.schedule.startDate).toLocaleDateString()} - {new Date(event.schedule.endDate).toLocaleDateString()}</p>
                  <h2 className="text-lg font-bold">{event.title}</h2>
                  <p className="text-gray-600 text-sm">{event.location.venue}</p>
                  <p className="mt-2 text-blue-600 font-semibold">{priceText}</p>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
