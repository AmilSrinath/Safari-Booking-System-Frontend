"use client"

import { useState } from "react"
import { store } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Lock } from "lucide-react"
import { UserModal } from "@/components/modals/user-modal"
import { ChangePasswordModal } from "@/components/modals/change-password-modal"
import type { User } from "@/lib/types"

export function UsersTab() {
  const [users, setUsers] = useState<User[]>(store.getUsers())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteUser = (id: string) => {
    if (users.length === 1) {
      alert("Cannot delete the last user")
      return
    }
    store.deleteUser(id)
    setUsers(store.getUsers())
  }

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
    setUsers(store.getUsers())
  }

  const handleOpenPasswordModal = (user: User) => {
    setSelectedUser(user)
    setIsPasswordModalOpen(true)
  }

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false)
    setSelectedUser(null)
    setUsers(store.getUsers())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">Manage system users and permissions</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus size={20} />
          Add User
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 font-semibold">Username</th>
                <th className="pb-3 font-semibold">Created</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 font-medium">{user.username}</td>
                  <td className="py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPasswordModal(user)}
                        className="gap-1"
                      >
                        <Lock size={16} />
                        Password
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(user)}
                        className="gap-1"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        )}
      </Card>

      <UserModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={handleCloseModal}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        user={selectedUser}
        onClose={handleClosePasswordModal}
      />
    </div>
  )
}
