"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { BookingsTab } from "@/components/bookings"
import { GuestsTab } from "@/components/guests"
import { AgentsTab } from "@/components/agents"
import { SuppliersTab } from "@/components/suppliers"
import { ExcursionsTab } from "@/components/excursions"
import { VehiclesTab } from "@/components/vehicles"
import { PaymentsTab } from "@/components/payments"
import { ReportsTab } from "@/components/reports"
import { SettingsTab } from "@/components/settings"
import { UsersTab } from "@/components/users"
import { LoginPage } from "@/components/login"
import { store } from "@/lib/store"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if user was previously logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (username: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (store.authenticate(username, password)) {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("username", username)
      } else {
        alert("Invalid username or password")
      }
      setIsLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    setActiveTab("dashboard")
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} isLoading={isLoading} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "bookings":
        return <BookingsTab />
      case "guests":
        return <GuestsTab />
      case "agents":
        return <AgentsTab />
      case "suppliers":
        return <SuppliersTab />
      case "excursions":
        return <ExcursionsTab />
      case "vehicles":
        return <VehiclesTab />
      case "payments":
        return <PaymentsTab />
      case "reports":
        return <ReportsTab />
      case "users":
        return <UsersTab />
      case "settings":
        return <SettingsTab />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      <main className="flex-1 pt-16 md:pt-0">
        <div className="p-4 md:p-8">{renderContent()}</div>
      </main>
    </div>
  )
}
