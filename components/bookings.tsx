"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { BookingModal } from "@/components/modals/booking-modal"
import type { Booking } from "@/lib/types"

export function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>(store.getBookings())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredBookings = bookings.filter(
    (b) =>
      b.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.getGuestById(b.guestId)?.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteBooking = (id: string) => {
    store.deleteBooking(id)
    setBookings(store.getBookings())
  }

  const handleOpenModal = (booking?: Booking) => {
    setSelectedBooking(booking || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
    setBookings(store.getBookings())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-2">Manage all tour bookings</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          New Booking
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search bookings by number or guest name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Booking #</th>
                <th className="pb-3 font-semibold">Guest</th>
                <th className="pb-3 font-semibold">Tour Date</th>
                <th className="pb-3 font-semibold">Guests</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Payment</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const guest = store.getGuestById(booking.guestId)
                return (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 font-medium">{booking.bookingNumber}</td>
                    <td className="py-3">{guest ? `${guest.firstName} ${guest.lastName}` : "N/A"}</td>
                    <td className="py-3">{new Date(booking.tourDate).toLocaleDateString()}</td>
                    <td className="py-3">{booking.numberOfGuests}</td>
                    <td className="py-3 font-semibold">${booking.totalPrice}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : booking.status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.paymentStatus === "paid" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : booking.paymentStatus === "partially_paid" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenModal(booking)} className="gap-1">
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-destructive hover:text-destructive gap-1"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} booking={selectedBooking} />
    </div>
  )
}
