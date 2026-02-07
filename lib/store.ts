// In-memory data store
import type { Agent, Supplier, Excursion, Vehicle, Guest, Booking, Payment, User } from "./types"

class DataStore {
  private agents: Agent[] = []
  private suppliers: Supplier[] = []
  private excursions: Excursion[] = []
  private vehicles: Vehicle[] = []
  private guests: Guest[] = []
  private bookings: Booking[] = []
  private payments: Payment[] = []
  private users: User[] = []

  // Initialize with sample data
  constructor() {
    this.initializeSampleData()
    this.initializeUsers()
  }

  private initializeUsers() {
    // Demo users for login
    this.users = [
      { id: "1", username: "admin", password: "password", createdAt: new Date("2024-01-01") },
      { id: "2", username: "manager", password: "password123", createdAt: new Date("2024-01-05") },
    ]
  }

  private initializeSampleData() {
    // Sample agents
    this.agents = [
      {
        id: "1",
        name: "John Safari",
        email: "john@safari.com",
        phone: "+255123456789",
        commission: 15,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        name: "Jane Adventure",
        email: "jane@safari.com",
        phone: "+255987654321",
        commission: 12,
        createdAt: new Date("2024-02-20"),
      },
    ]

    // Sample suppliers
    this.suppliers = [
      {
        id: "1",
        name: "Serengeti Tours Ltd",
        email: "info@serengetitours.com",
        phone: "+255555555555",
        bankDetails: "Bank A - Account 123456",
        createdAt: new Date("2024-01-10"),
      },
    ]

    // Sample excursions
    this.excursions = [
      {
        id: "1",
        name: "Serengeti National Park Full Day",
        description: "Experience the vast plains and wildlife of Serengeti",
        duration: 8,
        basePrice: 150,
        maxCapacity: 6,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        name: "Ngorongoro Crater Half Day",
        description: "Explore the eighth wonder of the world",
        duration: 4,
        basePrice: 120,
        maxCapacity: 6,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "3",
        name: "Lake Nakuru National Park",
        description: "Spot flamingos and Big Five animals",
        duration: 6,
        basePrice: 100,
        maxCapacity: 8,
        createdAt: new Date("2024-01-01"),
      },
    ]

    // Sample vehicles
    this.vehicles = [
      {
        id: "1",
        registrationNumber: "KEN-001",
        model: "Land Cruiser Prado",
        driver: "Kamal",
        contact_no: "0771428333",
        capacity: 6,
        revenue_icense_expire: "2026-02-06",
        insurance_expire: "2026-02-06",
        status: "available",
        createdAt: new Date("2023-06-01"),
      },
      {
        id: "2",
        registrationNumber: "KEN-002",
        model: "Toyota Hilux",
        driver: "Kamal",
        contact_no: "0771428333",
        capacity: 8,
        revenue_icense_expire: "2026-02-06",
        insurance_expire: "2026-02-06",
        status: "available",
        createdAt: new Date("2023-06-01"),
      },
      {
        id: "3",
        registrationNumber: "KEN-003",
        model: "Land Cruiser V8",
        driver: "Amal",
        contact_no: "0771428333",
        capacity: 7,
        revenue_icense_expire: "2026-02-06",
        insurance_expire: "2026-02-06",
        status: "expired",
        createdAt: new Date("2023-06-01"),
      },
    ]

    // Sample guests
    this.guests = [
      {
        id: "1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        phone: "+1234567890",
        nationality: "USA",
        passportNumber: "USA123456789",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        firstName: "Michael",
        lastName: "Smith",
        email: "michael@example.com",
        phone: "+1234567891",
        nationality: "Canada",
        passportNumber: "CAN987654321",
        createdAt: new Date("2024-02-15"),
      },
    ]

    // Sample bookings
    this.bookings = [
      {
        id: "1",
        bookingNumber: "BK001",
        guestId: "1",
        excursionId: "1",
        vehicleId: "1",
        agentId: "1",
        supplierId: "1",
        bookingDate: new Date("2024-01-20"),
        tourDate: new Date("2024-02-05"),
        numberOfGuests: 3,
        totalPrice: 450,
        status: "confirmed",
        paymentStatus: "paid",
        notes: "Early morning departure",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        bookingNumber: "BK002",
        guestId: "2",
        excursionId: "2",
        vehicleId: "2",
        agentId: "2",
        supplierId: "1",
        bookingDate: new Date("2024-02-01"),
        tourDate: new Date("2024-02-10"),
        numberOfGuests: 4,
        totalPrice: 480,
        status: "pending",
        paymentStatus: "partially_paid",
        notes: "",
        createdAt: new Date("2024-02-01"),
      },
    ]

    // Sample payments
    this.payments = [
      {
        id: "1",
        bookingId: "1",
        amount: 450,
        paymentDate: new Date("2024-01-22"),
        method: "credit_card",
        reference: "TXN001",
        createdAt: new Date("2024-01-22"),
      },
      {
        id: "2",
        bookingId: "2",
        amount: 240,
        paymentDate: new Date("2024-02-02"),
        method: "bank_transfer",
        reference: "TXN002",
        createdAt: new Date("2024-02-02"),
      },
    ]
  }

  // Agent methods
  getAgents = () => this.agents
  getAgentById = (id: string) => this.agents.find((a) => a.id === id)
  addAgent = (agent: Omit<Agent, "id" | "createdAt">) => {
    const newAgent = { ...agent, id: Date.now().toString(), createdAt: new Date() }
    this.agents.push(newAgent)
    return newAgent
  }
  updateAgent = (id: string, updates: Partial<Agent>) => {
    const agent = this.agents.find((a) => a.id === id)
    if (agent) Object.assign(agent, updates)
    return agent
  }
  deleteAgent = (id: string) => {
    this.agents = this.agents.filter((a) => a.id !== id)
  }

  // Supplier methods
  getSuppliers = () => this.suppliers
  getSupplierById = (id: string) => this.suppliers.find((s) => s.id === id)
  addSupplier = (supplier: Omit<Supplier, "id" | "createdAt">) => {
    const newSupplier = { ...supplier, id: Date.now().toString(), createdAt: new Date() }
    this.suppliers.push(newSupplier)
    return newSupplier
  }
  updateSupplier = (id: string, updates: Partial<Supplier>) => {
    const supplier = this.suppliers.find((s) => s.id === id)
    if (supplier) Object.assign(supplier, updates)
    return supplier
  }
  deleteSupplier = (id: string) => {
    this.suppliers = this.suppliers.filter((s) => s.id !== id)
  }

  // Excursion methods
  getExcursions = () => this.excursions
  getExcursionById = (id: string) => this.excursions.find((e) => e.id === id)
  addExcursion = (excursion: Omit<Excursion, "id" | "createdAt">) => {
    const newExcursion = { ...excursion, id: Date.now().toString(), createdAt: new Date() }
    this.excursions.push(newExcursion)
    return newExcursion
  }
  updateExcursion = (id: string, updates: Partial<Excursion>) => {
    const excursion = this.excursions.find((e) => e.id === id)
    if (excursion) Object.assign(excursion, updates)
    return excursion
  }
  deleteExcursion = (id: string) => {
    this.excursions = this.excursions.filter((e) => e.id !== id)
  }

  // Vehicle methods
  getVehicles = () => this.vehicles
  getVehicleById = (id: string) => this.vehicles.find((v) => v.id === id)
  addVehicle = (vehicle: Omit<Vehicle, "id" | "createdAt">) => {
    const newVehicle = { ...vehicle, id: Date.now().toString(), createdAt: new Date() }
    this.vehicles.push(newVehicle)
    return newVehicle
  }
  updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    const vehicle = this.vehicles.find((v) => v.id === id)
    if (vehicle) Object.assign(vehicle, updates)
    return vehicle
  }
  deleteVehicle = (id: string) => {
    this.vehicles = this.vehicles.filter((v) => v.id !== id)
  }

  // Guest methods
  getGuests = () => this.guests
  getGuestById = (id: string) => this.guests.find((g) => g.id === id)
  addGuest = (guest: Omit<Guest, "id" | "createdAt">) => {
    const newGuest = { ...guest, id: Date.now().toString(), createdAt: new Date() }
    this.guests.push(newGuest)
    return newGuest
  }
  updateGuest = (id: string, updates: Partial<Guest>) => {
    const guest = this.guests.find((g) => g.id === id)
    if (guest) Object.assign(guest, updates)
    return guest
  }
  deleteGuest = (id: string) => {
    this.guests = this.guests.filter((g) => g.id !== id)
  }

  // Booking methods
  getBookings = () => this.bookings
  getBookingById = (id: string) => this.bookings.find((b) => b.id === id)
  addBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking = { ...booking, id: Date.now().toString(), createdAt: new Date() }
    this.bookings.push(newBooking)
    return newBooking
  }
  updateBooking = (id: string, updates: Partial<Booking>) => {
    const booking = this.bookings.find((b) => b.id === id)
    if (booking) Object.assign(booking, updates)
    return booking
  }
  deleteBooking = (id: string) => {
    this.bookings = this.bookings.filter((b) => b.id !== id)
  }

  // Payment methods
  getPayments = () => this.payments
  getPaymentsByBookingId = (bookingId: string) => this.payments.filter((p) => p.bookingId === bookingId)
  addPayment = (payment: Omit<Payment, "id" | "createdAt">) => {
    const newPayment = { ...payment, id: Date.now().toString(), createdAt: new Date() }
    this.payments.push(newPayment)
    return newPayment
  }

  // Analytics methods
  getTotalRevenue = () => this.payments.reduce((sum, p) => sum + p.amount, 0)
  getTotalBookings = () => this.bookings.length
  getConfirmedBookings = () => this.bookings.filter((b) => b.status === "confirmed").length
  getPendingBookings = () => this.bookings.filter((b) => b.status === "pending").length
  getBookingsByMonth = (month: number, year: number) => {
    return this.bookings.filter((b) => {
      const date = new Date(b.tourDate)
      return date.getMonth() === month && date.getFullYear() === year
    })
  }

  // Authentication methods
  authenticate = (username: string, password: string): boolean => {
    return this.users.some(
      (user) => user.username === username && user.password === password
    )
  }

  // User management methods
  getUsers = () => this.users
  getUserById = (id: string) => this.users.find((u) => u.id === id)
  getUserByUsername = (username: string) => this.users.find((u) => u.username === username)
  addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser = { ...user, id: Date.now().toString(), createdAt: new Date() }
    this.users.push(newUser)
    return newUser
  }
  updateUser = (id: string, updates: Partial<User>) => {
    const user = this.users.find((u) => u.id === id)
    if (user) Object.assign(user, updates)
    return user
  }
  changePassword = (id: string, newPassword: string) => {
    const user = this.users.find((u) => u.id === id)
    if (user) {
      user.password = newPassword
    }
    return user
  }
  deleteUser = (id: string) => {
    this.users = this.users.filter((u) => u.id !== id)
  }
}

// Export singleton instance
export const store = new DataStore()
