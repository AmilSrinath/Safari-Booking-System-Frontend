// Data types for the booking management system
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"
export type PaymentStatus = "unpaid" | "partially_paid" | "paid"
export type VehicleStatus = "available" | "booked" | "maintenance"

export interface User {
  id: string
  username: string
  password: string
  createdAt: Date
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  commission: number
  createdAt: Date
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  bankDetails: string
  createdAt: Date
}

export interface Excursion {
  id: string
  name: string
  description: string
  duration: number
  basePrice: number
  maxCapacity: number
  createdAt: Date
}

// @/lib/types.ts
export type Vehicle = {
  jeetId: number
  vehicalNo: string
  vehicalModel: string
  driverName: string
  contactNo: string
  capacity: number
  revenueLicenseExpireDate: string
  insuranceExpireDate: string
  status: number
}

export interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  passportNumber: string
  createdAt: Date
}

export interface Booking {
  id: string
  bookingNumber: string
  guestId: string
  excursionId: string
  vehicleId: string
  agentId: string
  supplierId: string
  bookingDate: Date
  tourDate: Date
  numberOfGuests: number
  totalPrice: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  notes: string
  createdAt: Date
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  paymentDate: Date
  method: string
  reference: string
  createdAt: Date
}
