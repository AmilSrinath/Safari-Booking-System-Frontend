"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import type { Vehicle } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface VehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicle?: Vehicle | null
}

export function VehicleModal({ isOpen, onClose, vehicle }: VehicleModalProps) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    model: "",
    capacity: 0,
    status: "available" as const,
    ownerName: "",
    contactNumber: "",
  })


  useEffect(() => {
    if (vehicle) {
      setFormData({
        registrationNumber: vehicle.registrationNumber,
        model: vehicle.model,
        capacity: vehicle.capacity,
        status: vehicle.status,
        ownerName: vehicle.ownerName,
        contactNumber: vehicle.contactNumber,
      })
    } else {
      setFormData({
        registrationNumber: "",
        model: "",
        capacity: 0,
        status: "available",
        ownerName: "",
        contactNumber: "",
      })
    }
  }, [vehicle])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (vehicle) {
      store.updateVehicle(vehicle.id, formData)
    } else {
      store.addVehicle(formData)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold">{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Vehical Number *</label>
            <Input
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Model *</label>
            <Input
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (Persons) *</label>
            <Input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Owner Name *</label>
            <Input
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Number *</label>
            <Input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Expired</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {vehicle ? "Update Vehicle" : "Add Vehicle"}
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
