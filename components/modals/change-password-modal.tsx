"use client"

import React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { User } from "@/lib/types"

interface ChangePasswordModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
}

export function ChangePasswordModal({ isOpen, user, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setError("")
      setSuccess("")
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!user) return

    if (!currentPassword) {
      setError("Current password is required")
      return
    }

    if (currentPassword !== user.password) {
      setError("Current password is incorrect")
      return
    }

    if (!newPassword.trim()) {
      setError("New password is required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword === currentPassword) {
      setError("New password must be different from current password")
      return
    }

    store.changePassword(user.id, newPassword)
    setSuccess("Password changed successfully")
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-2">Change Password</h2>
        <p className="text-muted-foreground mb-6">User: {user.username}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Change Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
