"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { VehicleModal } from "@/components/modals/vehicle-modal"
import type { Vehicle } from "@/lib/types"

export function VehiclesTab() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔥 Fetch vehicles from backend
  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8080/api/vehical")
      if (!res.ok) throw new Error("Failed to fetch vehicles")
      const data = await res.json()
      setVehicles(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.vehicalNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vehicalModel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (vehicle?: Vehicle) => {
    setSelectedVehicle(vehicle || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVehicle(null)
    fetchVehicles() // 🔁 refresh after add/update
  }

  const getStatusLabel = (status: number) => {
    if (status === 1) return "available"
    if (status === 2) return "booked"
    return "inactive"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <p className="text-muted-foreground mt-2">
            Manage safari vehicles and fleet
          </p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add Vehicle
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading vehicles...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left text-muted-foreground">
                  <th className="pb-3 font-semibold">Vehicle</th>
                  <th className="pb-3 font-semibold">Model</th>
                  <th className="pb-3 font-semibold">Driver</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold">Capacity</th>
                  <th className="pb-3 font-semibold">Revenue Expire</th>
                  <th className="pb-3 font-semibold">Insurance Expire</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.jeetId} className="border-b hover:bg-muted/50">
                    <td className="py-3 font-medium">{vehicle.vehicalNo}</td>
                    <td className="py-3">{vehicle.vehicalModel}</td>
                    <td className="py-3">{vehicle.driverName}</td>
                    <td className="py-3">{vehicle.contactNo}</td>
                    <td className="py-3">{vehicle.capacity} Persons</td>
                    <td className="py-3">{vehicle.revenueLicenseExpireDate}</td>
                    <td className="py-3">{vehicle.insuranceExpireDate}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {getStatusLabel(vehicle.status)}
                      </span>
                    </td>
                    <td className="py-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(vehicle)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <VehicleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        vehicle={selectedVehicle}
      />
    </div>
  )
}
