"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { AgentModal } from "@/components/modals/agent-modal"
import type { Agent } from "@/lib/types"

export function AgentsTab() {
  const [agents, setAgents] = useState<Agent[]>(store.getAgents())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteAgent = (id: string) => {
    store.deleteAgent(id)
    setAgents(store.getAgents())
  }

  const handleOpenModal = (agent?: Agent) => {
    setSelectedAgent(agent || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedAgent(null)
    setAgents(store.getAgents())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="text-muted-foreground mt-2">Manage booking agents</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add Agent
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search agents..."
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
                <th className="pb-3 font-semibold">Commission %</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{agent.name}</td>
                  <td className="py-3">{agent.email}</td>
                  <td className="py-3">{agent.phone}</td>
                  <td className="py-3">{agent.commission}%</td>
                  <td className="py-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal(agent)} className="gap-1">
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAgent(agent.id)}
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

      <AgentModal isOpen={isModalOpen} onClose={handleCloseModal} agent={selectedAgent} />
    </div>
  )
}
