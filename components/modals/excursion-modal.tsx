"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import type { Excursion } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface ExcursionModalProps {
  isOpen: boolean
  onClose: () => void
  excursion?: Excursion | null
}

export function ExcursionModal({ isOpen, onClose, excursion }: ExcursionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 0,
    basePrice: 0,
    maxCapacity: 0,
  })

  useEffect(() => {
    if (excursion) {
      setFormData({
        name: excursion.name,
        description: excursion.description,
        duration: excursion.duration,
        basePrice: excursion.basePrice,
        maxCapacity: excursion.maxCapacity,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        duration: 0,
        basePrice: 0,
        maxCapacity: 0,
      })
    }
  }, [excursion])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (excursion) {
      store.updateExcursion(excursion.id, formData)
    } else {
      store.addExcursion(formData)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold">{excursion ? "Edit Excursion" : "Add Excursion"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duration (hours) *</label>
            <Input
              type="number"
              step="0.5"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Base Price ($) *</label>
            <Input
              type="number"
              step="0.01"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: Number.parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Capacity *</label>
            <Input
              type="number"
              value={formData.maxCapacity}
              onChange={(e) => setFormData({ ...formData, maxCapacity: Number.parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {excursion ? "Update Excursion" : "Add Excursion"}
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
