"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { SupplierModal } from "@/components/modals/supplier-modal"
import type { Supplier } from "@/lib/types"

export function SuppliersTab() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(store.getSuppliers())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteSupplier = (id: string) => {
    store.deleteSupplier(id)
    setSuppliers(store.getSuppliers())
  }

  const handleOpenModal = (supplier?: Supplier) => {
    setSelectedSupplier(supplier || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedSupplier(null)
    setSuppliers(store.getSuppliers())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground mt-2">Manage tour suppliers and service providers</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add Supplier
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Phone</th>
                <th className="pb-3 font-semibold">Bank Details</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{supplier.name}</td>
                  <td className="py-3">{supplier.email}</td>
                  <td className="py-3">{supplier.phone}</td>
                  <td className="py-3 text-xs">{supplier.bankDetails}</td>
                  <td className="py-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(supplier)} className="gap-1">
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSupplier(supplier.id)}
                      className="text-destructive hover:text-destructive gap-1"
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

      <SupplierModal isOpen={isModalOpen} onClose={handleCloseModal} supplier={selectedSupplier} />
    </div>
  )
}
