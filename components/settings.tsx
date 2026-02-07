"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function SettingsTab() {
  const [settings, setSettings] = useState({
    companyName: "Safari Safari Inc.",
    companyEmail: "info@safari.com",
    phone: "+255123456789",
    address: "Arusha, Tanzania",
    taxId: "TZ123456789",
    currency: "USD",
  })

  const handleSave = () => {
    // In a real system, this would save to a database
    console.log("Settings saved:", settings)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage application settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Company Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company Email</label>
              <Input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax ID</label>
              <Input value={settings.taxId} onChange={(e) => setSettings({ ...settings, taxId: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="TZS">TZS (TSh)</option>
              </select>
            </div>
          </div>
          <Button onClick={handleSave} className="mt-6">
            Save Settings
          </Button>
        </Card>

        {/* System Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">System Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">System Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Environment</span>
              <span className="font-medium">Production</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
