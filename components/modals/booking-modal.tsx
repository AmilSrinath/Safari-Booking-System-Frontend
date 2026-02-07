"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import type { Booking } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  booking?: Booking | null
}

export function BookingModal({ isOpen, onClose, booking }: BookingModalProps) {
  const [formData, setFormData] = useState({
    guestId: "",
    excursionId: "",
    vehicleId: "",
    agentId: "",
    supplierId: "",
    numberOfGuests: 1,
    tourDate: "",
    totalPrice: 0,
    status: "pending" as const,
    paymentStatus: "unpaid" as const,
    notes: "",
  })

  useEffect(() => {
    if (booking) {
      setFormData({
        guestId: booking.guestId,
        excursionId: booking.excursionId,
        vehicleId: booking.vehicleId,
        agentId: booking.agentId,
        supplierId: booking.supplierId,
        numberOfGuests: booking.numberOfGuests,
        tourDate: booking.tourDate.toISOString().split("T")[0],
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        notes: booking.notes,
      })
    }
  }, [booking])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (booking) {
      store.updateBooking(booking.id, {
        ...formData,
        tourDate: new Date(formData.tourDate),
      })
    } else {
      store.addBooking({
        bookingNumber: `BK${Date.now().toString().slice(-6)}`,
        bookingDate: new Date(),
        ...formData,
        tourDate: new Date(formData.tourDate),
      })
    }

    onClose()
  }

  if (!isOpen) return null

  const guests = store.getGuests()
  const excursions = store.getExcursions()
  const vehicles = store.getVehicles()
  const agents = store.getAgents()
  const suppliers = store.getSuppliers()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-border bg-background">
          <h2 className="text-2xl font-bold">{booking ? "Edit Booking" : "New Booking"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Guest</label>
              <select
                value={formData.guestId}
                onChange={(e) => setFormData({ ...formData, guestId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select Guest</option>
                {guests.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.firstName} {g.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excursion</label>
              <select
                value={formData.excursionId}
                onChange={(e) => setFormData({ ...formData, excursionId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select Excursion</option>
                {excursions.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Vehicle</label>
              <select
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.registrationNumber} - {v.model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Agent</label>
              <select
                value={formData.agentId}
                onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select Agent</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Supplier</label>
              <select
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tour Date</label>
              <Input
                type="date"
                value={formData.tourDate}
                onChange={(e) => setFormData({ ...formData, tourDate: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Number of Guests</label>
              <Input
                type="number"
                min="1"
                value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: Number.parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.totalPrice}
                onChange={(e) => setFormData({ ...formData, totalPrice: Number.parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Booking Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as any })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="unpaid">Unpaid</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {booking ? "Update Booking" : "Create Booking"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
