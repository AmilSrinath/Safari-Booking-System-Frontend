"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Users, MapPin, Truck, DollarSign, BarChart3, Settings, Menu, X, LogOut, Shield } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout?: () => void
}

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "guests", label: "Guests", icon: Users },
    { id: "agents", label: "Agents", icon: Users },
    { id: "suppliers", label: "Suppliers", icon: MapPin },
    { id: "excursions", label: "Excursions", icon: Truck },
    { id: "vehicles", label: "Vehicles", icon: Truck },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary">Safari Booking</h1>
            <p className="text-sm text-muted-foreground">Management System</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="space-y-3 pt-4 border-t border-border">
            {onLogout && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={onLogout}
              >
                <LogOut size={18} />
                Logout
              </Button>
            )}
            <div className="text-xs text-muted-foreground">
              <p>© 2026 Safari Booking</p>
              <p>All rights reserved</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="md:ml-64" />
    </>
  )
}
