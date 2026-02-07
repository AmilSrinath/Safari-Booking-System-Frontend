"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export function ReportsTab() {
  const [exportFormat, setExportFormat] = useState("pdf")

  const bookings = store.getBookings()
  const payments = store.getPayments()
  const guests = store.getGuests()
  const agents = store.getAgents()

  // Revenue by agent
  const agentRevenueData = agents.map((agent) => {
    const agentBookings = bookings.filter((b) => b.agentId === agent.id)
    const revenue = payments
      .filter((p) => agentBookings.some((b) => b.id === p.bookingId))
      .reduce((sum, p) => sum + p.amount, 0)
    return {
      name: agent.name,
      revenue,
      bookings: agentBookings.length,
    }
  })

  // Booking trends
  const bookingTrendData = []
  for (let i = 0; i < 12; i++) {
    const bookingsForMonth = store.getBookingsByMonth(i, new Date().getFullYear())
    bookingTrendData.push({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      bookings: bookingsForMonth.length,
    })
  }

  // Payment status breakdown
  const paymentStatusData = [
    { name: "Paid", value: bookings.filter((b) => b.paymentStatus === "paid").length },
    { name: "Partially Paid", value: bookings.filter((b) => b.paymentStatus === "partially_paid").length },
    { name: "Unpaid", value: bookings.filter((b) => b.paymentStatus === "unpaid").length },
  ]

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

  const handleExport = () => {
    const reportData = {
      generatedDate: new Date().toLocaleDateString(),
      totalRevenue: store.getTotalRevenue(),
      totalBookings: bookings.length,
      totalGuests: guests.length,
      totalAgents: agents.length,
      confirmedBookings: store.getConfirmedBookings(),
      pendingBookings: store.getPendingBookings(),
      bookings: bookings.map((b) => ({
        ...b,
        guest: store.getGuestById(b.guestId),
        agent: store.getAgentById(b.agentId),
      })),
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `booking_report_${new Date().getTime()}.json`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-2">Analytics and reporting dashboard</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download size={20} />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">${store.getTotalRevenue().toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="text-3xl font-bold mt-2">{bookings.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Guests</p>
          <p className="text-3xl font-bold mt-2">{guests.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Agents</p>
          <p className="text-3xl font-bold mt-2">{agents.length}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue by Agent</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Booking Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Agents */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Top Performing Agents</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Agent Name</th>
                <th className="pb-3 font-semibold">Bookings</th>
                <th className="pb-3 font-semibold">Total Revenue</th>
                <th className="pb-3 font-semibold">Commission Rate</th>
              </tr>
            </thead>
            <tbody>
              {agentRevenueData
                .sort((a, b) => b.revenue - a.revenue)
                .map((agent, idx) => {
                  const agentData = agents.find((a) => a.name === agent.name)
                  return (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 font-medium">{agent.name}</td>
                      <td className="py-3">{agent.bookings}</td>
                      <td className="py-3 font-semibold">${agent.revenue.toLocaleString()}</td>
                      <td className="py-3">{agentData?.commission}%</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
