import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TabNavigation } from "@/components/tab-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agnes 2.1 - Price Scanner",
  description: "Compare prices and find the best deals with camera scanning",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <main className="pb-20">{children}</main>
          <TabNavigation />
        </div>
      </body>
    </html>
  )
}
