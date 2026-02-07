"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { GuestModal } from "@/components/modals/guest-modal"
import type { Guest } from "@/lib/types"

export function GuestsTab() {
  const [guests, setGuests] = useState<Guest[]>(store.getGuests())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredGuests = guests.filter(
    (g) =>
      g.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteGuest = (id: string) => {
    store.deleteGuest(id)
    setGuests(store.getGuests())
  }

  const handleOpenModal = (guest?: Guest) => {
    setSelectedGuest(guest || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGuest(null)
    setGuests(store.getGuests())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Guests</h1>
          <p className="text-muted-foreground mt-2">Manage guest information and records</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add Guest
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search guests..."
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
                <th className="pb-3 font-semibold">Nationality</th>
                <th className="pb-3 font-semibold">Passport</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{`${guest.firstName} ${guest.lastName}`}</td>
                  <td className="py-3">{guest.email}</td>
                  <td className="py-3">{guest.phone}</td>
                  <td className="py-3">{guest.nationality}</td>
                  <td className="py-3">{guest.passportNumber}</td>
                  <td className="py-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(guest)} className="gap-1">
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteGuest(guest.id)}
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

      <GuestModal isOpen={isModalOpen} onClose={handleCloseModal} guest={selectedGuest} />
    </div>
  )
}
