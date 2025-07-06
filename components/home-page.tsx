"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Gift, Tag, Heart, Search, MapPin, Smartphone, Shirt, Watch, Star, Home, ChevronRight, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const categories = [
  { icon: <Smartphone className="w-6 h-6 text-pink-400" />, label: "Phones" },
  { icon: <Shirt className="w-6 h-6 text-yellow-500" />, label: "Fashion" },
  { icon: <Watch className="w-6 h-6 text-blue-400" />, label: "Watches" },
  { icon: <Star className="w-6 h-6 text-purple-400" />, label: "Beauty" },
  { icon: <Gift className="w-6 h-6 text-green-400" />, label: "Gifts" },
  { icon: <Tag className="w-6 h-6 text-orange-400" />, label: "Deals" },
  { icon: <Heart className="w-6 h-6 text-red-400" />, label: "Saved" },
]

const productCategories = [
  { image: "/placeholder.svg", label: "Candy & gifts" },
  { image: "/placeholder.svg", label: "Flowers" },
  { image: "/placeholder.svg", label: "Perfume sets" },
  { image: "/placeholder.svg", label: "Electronics" },
  { image: "/placeholder.svg", label: "Fashion" },
  { image: "/placeholder.svg", label: "Home" },
]

const RAPIDAPI_HOST = "real-time-product-search.p.rapidapi.com"
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

function NearbyDeals() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!location) return
    setLoading(true)
    setError("")
    // Example: fetch deals using RapidAPI (mocked for now, as their API may not support lat/lng directly)
    fetch("/api/nearby-deals?lat=" + location.lat + "&lng=" + location.lng)
      .then((res) => res.json())
      .then((data) => setDeals(data.offers || []))
      .catch(() => setError("Could not load deals."))
      .finally(() => setLoading(false))
  }, [location])

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setError("Location access denied.")
      )
    } else {
      setError("Geolocation not supported.")
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="w-full flex flex-col items-center px-0 pb-4">
      {/* Google Map */}
      <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gray-200">
        {location && (
          <iframe
            title="Nearby Deals Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_API_KEY}&q=shopping&center=${location.lat},${location.lng}&zoom=13`}
          />
        )}
        {!location && <div className="flex items-center justify-center h-full text-gray-500">Getting location...</div>}
      </div>
      {/* Deals List */}
      {loading && <div className="text-center text-gray-500">Loading deals...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="w-full space-y-3">
        {deals.map((deal) => (
          <a
            key={deal.offer_id}
            href={deal.offer_page_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white/90 rounded-xl shadow p-3 gap-3"
          >
            <img src={deal.store_favicon} alt={deal.store_name} className="w-8 h-8 rounded" />
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{deal.offer_title}</div>
              <div className="text-xs text-gray-500">{deal.store_name}</div>
            </div>
            <div className="text-pink-600 font-semibold text-base">{deal.price}</div>
          </a>
        ))}
        {!loading && deals.length === 0 && !error && (
          <div className="text-center text-gray-500">No deals found nearby.</div>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [tab, setTab] = useState("products")

  const recentScans = [
    {
      id: "1",
      name: "e.l.f. Lip Plumping Pen",
      price: "$8.00",
      image: "/placeholder.svg?height=60&width=60",
      scannedAt: "2 hours ago",
    },
    {
      id: "2",
      name: "Neutrogena Face Wash",
      price: "$12.99",
      image: "/placeholder.svg?height=60&width=60",
      scannedAt: "1 day ago",
    },
  ]

  const featuredDeals = [
    {
      id: "1",
      name: "CeraVe Moisturizer",
      originalPrice: "$19.99",
      salePrice: "$14.99",
      discount: "25% off",
      image: "/placeholder.svg?height=120&width=120",
      rating: 4.8,
    },
    {
      id: "2",
      name: "The Ordinary Serum",
      originalPrice: "$8.90",
      salePrice: "$6.70",
      discount: "25% off",
      image: "/placeholder.svg?height=120&width=120",
      rating: 4.6,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fbe4e5] via-[#fbe7b2] to-[#e7c585] p-0 flex flex-col items-center">
      {/* Tabs */}
      <div className="w-full flex items-center justify-between px-4 pt-6 pb-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Shopping</span>
        <div className="flex gap-3">
          <button className="bg-white/80 rounded-full p-2 shadow"><MapPin className="w-5 h-5 text-gray-700" /></button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 px-4 mb-4">
        <button
          className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${tab === "products" ? "bg-white/90 text-gray-900 shadow" : "bg-white/40 text-gray-500"}`}
          onClick={() => setTab("products")}
        >
          Products
        </button>
        <button
          className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${tab === "deals" ? "bg-white/90 text-gray-900 shadow" : "bg-white/40 text-gray-500"}`}
          onClick={() => setTab("deals")}
        >
          Nearby Deals
        </button>
      </div>
      {tab === "products" ? (
        <>
          {/* Featured Banner/Card */}
          <div className="w-full px-4 mb-6">
            <div className="flex items-center bg-white/90 rounded-xl px-4 py-3 shadow border border-yellow-100">
              <img src="/placeholder-logo.png" alt="Banner" className="w-12 h-12 rounded-lg mr-3" />
              <div className="flex-1">
                <span className="block text-sm font-bold text-gray-800">Latest Smartphones</span>
                <span className="block text-xs text-gray-500">Find a new phone or upgrade your device.</span>
              </div>
              <button className="ml-2 text-xs text-yellow-600 font-semibold">See more</button>
            </div>
          </div>
          {/* Cards Section */}
          <div className="w-full px-4 grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/90 rounded-2xl p-4 flex flex-col items-start shadow">
              <span className="text-xs text-gray-500 mb-1">How much can I spend?</span>
              <span className="text-xl font-bold text-gray-900">$0</span>
              <span className="text-xs text-gray-400">Nothing to pay</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-4 flex flex-col items-start shadow">
              <span className="text-xs text-gray-500 mb-1">Orders</span>
              <span className="text-xl font-bold text-gray-900">0</span>
              <span className="text-xs text-gray-400">No orders yet</span>
            </div>
          </div>
          {/* Orders Navigation */}
          <div className="w-full px-4 mb-6">
            <div className="flex items-center bg-white/90 rounded-xl px-4 py-3 shadow">
              <Box className="w-6 h-6 text-purple-400 mr-3" />
              <div className="flex-1 flex justify-between">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">All orders</span>
                  <span className="text-sm font-bold text-gray-800">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">On its way</span>
                  <span className="text-sm font-bold text-gray-800">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Delivered</span>
                  <span className="text-sm font-bold text-gray-800">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">Returns</span>
                  <span className="text-sm font-bold text-gray-800">0</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NearbyDeals />
      )}
    </div>
  )
}
