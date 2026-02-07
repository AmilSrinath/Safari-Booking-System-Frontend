"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import type { Agent } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface AgentModalProps {
  isOpen: boolean
  onClose: () => void
  agent?: Agent | null
}

export function AgentModal({ isOpen, onClose, agent }: AgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    commission: 0,
  })

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        commission: agent.commission,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        commission: 0,
      })
    }
  }, [agent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (agent) {
      store.updateAgent(agent.id, formData)
    } else {
      store.addAgent(formData)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold">{agent ? "Edit Agent" : "Add Agent"}</h2>
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
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Commission % *</label>
            <Input
              type="number"
              step="0.1"
              value={formData.commission}
              onChange={(e) => setFormData({ ...formData, commission: Number.parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {agent ? "Update Agent" : "Add Agent"}
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
