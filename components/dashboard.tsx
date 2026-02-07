"use client"

import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import {
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
import { Calendar, DollarSign, TrendingUp, Users } from "lucide-react"

export function Dashboard() {
  const bookings = store.getBookings()
  const payments = store.getPayments()
  const agents = store.getAgents()
  const guests = store.getGuests()

  const totalRevenue = store.getTotalRevenue()
  const totalBookings = store.getTotalBookings()
  const confirmedBookings = store.getConfirmedBookings()
  const pendingBookings = store.getPendingBookings()

  // Booking status distribution
  const statusData = [
    { name: "Confirmed", value: confirmedBookings },
    { name: "Pending", value: pendingBookings },
    { name: "Completed", value: bookings.filter((b) => b.status === "completed").length },
    { name: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length },
  ]

  // Monthly revenue
  const monthlyData = []
  for (let i = 0; i < 12; i++) {
    const bookingsForMonth = store.getBookingsByMonth(i, new Date().getFullYear())
    const revenue = bookingsForMonth.reduce((sum, b) => {
      const paymentsForBooking = payments.filter((p) => p.bookingId === b.id)
      return sum + paymentsForBooking.reduce((s, p) => s + p.amount, 0)
    }, 0)
    monthlyData.push({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      revenue,
    })
  }

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your booking overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-3xl font-bold mt-2">{totalBookings}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-3xl font-bold mt-2">{confirmedBookings}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-amber-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Guests</p>
              <p className="text-3xl font-bold mt-2">{guests.length}</p>
            </div>
            <Users className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Booking Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Booking #</th>
                <th className="pb-3 font-semibold">Guest</th>
                <th className="pb-3 font-semibold">Tour Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .slice(-5)
                .reverse()
                .map((booking) => {
                  const guest = store.getGuestById(booking.guestId)
                  return (
                    <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 font-medium">{booking.bookingNumber}</td>
                      <td className="py-3">{guest ? `${guest.firstName} ${guest.lastName}` : "N/A"}</td>
                      <td className="py-3">{new Date(booking.tourDate).toLocaleDateString()}</td>
                      <td className="py-3 font-semibold">${booking.totalPrice}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : booking.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
                        >
                          {booking.status}
                        </span>
                      </td>
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
