"use client"

import { Package, Clock, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: "$24.99",
      items: [
        {
          name: "e.l.f. Lip Plumping Pen",
          price: "$8.00",
          quantity: 2,
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          name: "CeraVe Moisturizer",
          price: "$8.99",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      total: "$15.99",
      items: [
        {
          name: "The Ordinary Serum",
          price: "$15.99",
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "shipped":
        return <Package className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fbe4e5] via-[#fbe7b2] to-[#e7c585] flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 pt-6 pb-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Orders</span>
        <div className="flex gap-3">
          <span className="bg-white/80 rounded-full p-2 shadow"><Package className="w-5 h-5 text-purple-500" /></span>
        </div>
      </div>
      <div className="w-full px-4 py-4">
        <p className="text-gray-700 text-base font-semibold mb-4">Track your purchases and deliveries</p>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/90 rounded-2xl shadow p-4">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{order.id}</h3>
                    <p className="text-xs text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="font-bold text-indigo-600 text-lg">{order.total}</p>
                  </div>
                </div>
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover border border-purple-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-bold text-pink-500 text-base">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/90 rounded-2xl shadow p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Start scanning products to find great deals and make your first purchase!</p>
          </div>
        )}
      </div>
    </div>
  )
}
