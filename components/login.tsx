"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface LoginProps {
  onLogin: (username: string, password: string) => void
  isLoading?: boolean
}

export function LoginPage({ onLogin, isLoading = false }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    if (!password.trim()) {
      setError("Please enter a password")
      return
    }

    onLogin(username, password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-secondary p-4">
      <div className="w-full max-w-md">
        <Card className="border border-border bg-card shadow-lg">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                Safari Booking
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional booking management system
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                  autoComplete="username"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                  autoComplete="current-password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 text-xs text-muted-foreground">
                Demo Credentials:
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <span className="font-semibold">Username:</span> admin
                </p>
                <p>
                  <span className="font-semibold">Password:</span> password
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
