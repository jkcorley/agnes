"use client"

import { useState, useEffect } from "react"
import { X, Star, ShoppingCart, Heart, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductResult {
  id: string
  title: string
  price: string
  originalPrice?: string
  store: string
  rating: number
  reviews: number
  image: string
  inStock: boolean
  shipping: string
  url: string
}

interface ProductResultsModalProps {
  isOpen: boolean
  onClose: () => void
  scannedCode?: string
}

export function ProductResultsModal({ isOpen, onClose, scannedCode }: ProductResultsModalProps) {
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) {
      fetchResults()
    }
  }, [isOpen])

  const fetchResults = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/search-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: scannedCode || "093332829" }),
      })
      const data = await response.json()
      if (data.success) {
        setResults(data.results)
      }
    } catch (error) {
      console.error("Error fetching results:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const bestPrice = results.length > 0 ? results[0] : null

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-hidden">
        {/* Header - Clean */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-light text-gray-900">Price Comparison</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400 mr-3" strokeWidth={1.5} />
              <span className="text-gray-600 font-light">Finding best prices...</span>
            </div>
          ) : (
            <>
              {/* Best Price Card - Much cleaner */}
              {bestPrice && (
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={bestPrice.image || "/placeholder.svg"}
                      alt={bestPrice.title}
                      width={100}
                      height={100}
                      className="rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="inline-block bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                        Best Price
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2 text-lg">{bestPrice.title}</h3>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(bestPrice.rating) ? "text-gray-900 fill-current" : "text-gray-300"
                              }`}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2 font-light">
                          {bestPrice.rating} ({bestPrice.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-3xl font-light text-gray-900">{bestPrice.price}</span>
                        {bestPrice.originalPrice && (
                          <span className="text-gray-400 line-through font-light">{bestPrice.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-4 font-light">
                        {bestPrice.shipping} • {bestPrice.store}
                      </p>

                      {/* Quantity Selector - Minimal */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center bg-gray-100 rounded-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                          >
                            −
                          </Button>
                          <span className="px-4 py-2 font-light text-gray-900">{selectedQuantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-light">
                          <ShoppingCart className="w-4 h-4 mr-2" strokeWidth={1.5} />
                          Add to Cart
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-3">
                          <Heart className="w-5 h-5" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* All Results - Clean list */}
              <div className="p-6">
                <h3 className="font-light text-gray-900 mb-6 text-lg">All Prices ({results.length} stores)</h3>
                <div className="space-y-4">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Image
                        src={result.image || "/placeholder.svg"}
                        alt={result.title}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{result.store}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-lg text-gray-900">{result.price}</span>
                              {result.originalPrice && (
                                <span className="text-gray-400 line-through text-sm font-light">
                                  {result.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                          </Button>
                        </div>

                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(result.rating) ? "text-gray-900 fill-current" : "text-gray-300"
                                }`}
                                strokeWidth={1.5}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1 font-light">
                            {result.rating} ({result.reviews})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${result.inStock ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <span className="text-xs text-gray-500 font-light">
                              {result.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                            <span className="text-xs text-gray-400 font-light">• {result.shipping}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
