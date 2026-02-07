"use client"

import React from "react"

import { useState, useEffect } from "react"
import { store } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { User } from "@/lib/types"

interface UserModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
}

export function UserModal({ isOpen, user, onClose }: UserModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
      setConfirmPassword(user.password)
      setError("")
    } else {
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      setError("")
    }
  }, [user, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Username is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!user) {
      // Check if username already exists
      if (store.getUserByUsername(username)) {
        setError("Username already exists")
        return
      }
      store.addUser({ username, password })
    } else {
      // Check if username is already taken by another user
      const existingUser = store.getUserByUsername(username)
      if (existingUser && existingUser.id !== user.id) {
        setError("Username already exists")
        return
      }
      store.updateUser(user.id, { username, password })
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">{user ? "Edit User" : "Add New User"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {user ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
