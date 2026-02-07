"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { PaymentModal } from "@/components/modals/payment-modal"
import type { Payment } from "@/lib/types"

export function PaymentsTab() {
  const [payments, setPayments] = useState<Payment[]>(store.getPayments())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredPayments = payments.filter(
    (p) =>
      p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePayment = (id: string) => {
    // Note: In a real system, you'd prevent deletion of payments
    // This is just for demo purposes
    store.payments = payments.filter((p) => p.id !== id)
    setPayments(store.getPayments())
  }

  const handleOpenModal = (payment?: Payment) => {
    setSelectedPayment(payment || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPayment(null)
    setPayments(store.getPayments())
  }

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-2">Track all booking payments</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Record Payment
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Total Revenue: <span className="text-green-600">${totalRevenue.toLocaleString()}</span>
          </p>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Booking ID</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Payment Date</th>
                <th className="pb-3 font-semibold">Method</th>
                <th className="pb-3 font-semibold">Reference</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{payment.bookingId}</td>
                  <td className="py-3 font-semibold">${payment.amount.toLocaleString()}</td>
                  <td className="py-3">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td className="py-3 capitalize">{payment.method.replace("_", " ")}</td>
                  <td className="py-3 text-xs">{payment.reference}</td>
                  <td className="py-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive gap-1 bg-transparent"
                      onClick={() => handleDeletePayment(payment.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} payment={selectedPayment} />
    </div>
  )
}
