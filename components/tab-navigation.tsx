"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Scan, ShoppingBag, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function TabNavigation() {
  const pathname = usePathname()

  const tabs = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/scanner", icon: Scan, label: "Scanner" },
    { href: "/orders", icon: ShoppingBag, label: "Orders" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-gray-100 px-6 py-4">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 transition-colors",
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600",
              )}
            >
              <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-xs font-light">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
