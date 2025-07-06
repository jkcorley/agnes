import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, barcode } = await request.json()

    // Mock SerpAPI Google Shopping integration
    // In production, you would use the actual SerpAPI with your API key
    const mockResults = [
      {
        id: "1",
        title: "e.l.f. Pout Clout Lip Plumping Pen, Toasted, 0.07oz",
        price: "$8.00",
        originalPrice: "$10.00",
        store: "Walmart",
        rating: 4.8,
        reviews: 1250,
        image: "/placeholder.svg?height=100&width=100",
        inStock: true,
        shipping: "Free shipping",
        url: "#",
      },
      {
        id: "2",
        title: "e.l.f. Pout Clout Lip Plumping Pen, Toasted, 0.07oz",
        price: "$8.50",
        store: "Target",
        rating: 4.7,
        reviews: 890,
        image: "/placeholder.svg?height=100&width=100",
        inStock: true,
        shipping: "$5.99 shipping",
        url: "#",
      },
      {
        id: "3",
        title: "e.l.f. Pout Clout Lip Plumping Pen, Toasted, 0.07oz",
        price: "$9.99",
        store: "Amazon",
        rating: 4.6,
        reviews: 2100,
        image: "/placeholder.svg?height=100&width=100",
        inStock: true,
        shipping: "Prime shipping",
        url: "#",
      },
      {
        id: "4",
        title: "e.l.f. Pout Clout Lip Plumping Pen, Toasted, 0.07oz",
        price: "$7.99",
        store: "CVS",
        rating: 4.5,
        reviews: 456,
        image: "/placeholder.svg?height=100&width=100",
        inStock: false,
        shipping: "In-store pickup",
        url: "#",
      },
    ]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      results: mockResults,
      query: query || `Barcode: ${barcode}`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to search products" }, { status: 500 })
  }
}
