"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { ExcursionModal } from "@/components/modals/excursion-modal"
import type { Excursion } from "@/lib/types"

export function ExcursionsTab() {
  const [excursions, setExcursions] = useState<Excursion[]>(store.getExcursions())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredExcursions = excursions.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteExcursion = (id: string) => {
    store.deleteExcursion(id)
    setExcursions(store.getExcursions())
  }

  const handleOpenModal = (excursion?: Excursion) => {
    setSelectedExcursion(excursion || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedExcursion(null)
    setExcursions(store.getExcursions())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Excursions</h1>
          <p className="text-muted-foreground mt-2">Manage safari tour packages</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add Excursion
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search excursions..."
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
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Duration (hrs)</th>
                <th className="pb-3 font-semibold">Base Price</th>
                <th className="pb-3 font-semibold">Max Capacity</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExcursions.map((excursion) => (
                <tr key={excursion.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{excursion.name}</td>
                  <td className="py-3 text-xs max-w-xs truncate">{excursion.description}</td>
                  <td className="py-3">{excursion.duration}</td>
                  <td className="py-3 font-semibold">${excursion.basePrice}</td>
                  <td className="py-3">{excursion.maxCapacity}</td>
                  <td className="py-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(excursion)} className="gap-1">
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExcursion(excursion.id)}
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

      <ExcursionModal isOpen={isModalOpen} onClose={handleCloseModal} excursion={selectedExcursion} />
    </div>
  )
}
