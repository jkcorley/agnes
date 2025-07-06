"use client"

import { Bell, Shield, HelpCircle, Star, Share2, LogOut, ChevronRight, User, CreditCard, MapPin, Settings, Home } from "lucide-react"

export function SettingsPage() {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", hasChevron: true },
        { icon: CreditCard, label: "Payment Methods", hasChevron: true },
        { icon: MapPin, label: "Addresses", hasChevron: true },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", hasSwitch: true, enabled: true },
        { icon: Shield, label: "Privacy Settings", hasChevron: true },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", hasChevron: true },
        { icon: Star, label: "Rate Agnes 2.1", hasChevron: true },
        { icon: Share2, label: "Share App", hasChevron: true },
      ],
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fbe4e5] via-[#fbe7b2] to-[#e7c585] flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 pt-6 pb-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">Settings</span>
        <div className="flex gap-3">
          <span className="bg-white/80 rounded-full p-2 shadow"><Settings className="w-5 h-5 text-yellow-600" /></span>
        </div>
      </div>
      {/* Profile Card */}
      <div className="w-full px-4 mt-4">
        <div className="bg-white/90 rounded-2xl shadow p-4 flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Agnes User</h3>
            <p className="text-gray-500">agnes.user@example.com</p>
            <p className="text-sm text-yellow-600 mt-1 font-semibold">Premium Member</p>
          </div>
        </div>
        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3 px-2">{group.title}</h2>
              <div className="bg-white/90 rounded-2xl shadow">
                {group.items.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-4 ${index !== group.items.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-gray-900">{item.label}</span>
                    </div>
                    {item.hasSwitch && (
                      <input type="checkbox" defaultChecked={item.enabled} className="accent-yellow-500 w-5 h-5 rounded-full" />
                    )}
                    {item.hasChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Sign Out */}
        <div className="bg-white/90 rounded-2xl shadow mt-6 p-4">
          <button className="flex items-center space-x-3 w-full text-red-600 font-semibold">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
        {/* App Info */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-500 text-sm font-semibold">Agnes 2.1</p>
          <p className="text-gray-400 text-xs mt-1">Version 2.1.0</p>
        </div>
      </div>
    </div>
  )
}
