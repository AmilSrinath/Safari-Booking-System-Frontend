"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import type { Payment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  payment?: Payment | null
}

export function PaymentModal({ isOpen, onClose, payment }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    bookingId: "",
    amount: 0,
    paymentDate: new Date().toISOString().split("T")[0],
    method: "credit_card",
    reference: "",
  })

  useEffect(() => {
    if (payment) {
      setFormData({
        bookingId: payment.bookingId,
        amount: payment.amount,
        paymentDate: payment.paymentDate.toISOString().split("T")[0],
        method: payment.method,
        reference: payment.reference,
      })
    }
  }, [payment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    store.addPayment({
      bookingId: formData.bookingId,
      amount: formData.amount,
      paymentDate: new Date(formData.paymentDate),
      method: formData.method,
      reference: formData.reference,
    })

    onClose()
  }

  if (!isOpen) return null

  const bookings = store.getBookings()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Record Payment</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Booking ID *</label>
            <select
              value={formData.bookingId}
              onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              required
            >
              <option value="">Select Booking</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bookingNumber}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount ($) *</label>
            <Input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Payment Date *</label>
            <Input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method *</label>
            <select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Reference Number *</label>
            <Input
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Record Payment
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
